import 'server-only'

import { createHash, randomUUID } from 'node:crypto'
import { and, desc, eq, gt, isNull, sql } from 'drizzle-orm'
import { getDb } from '@/db/client'
import { auditEvents, contentSubmissions, submissionTickets } from '@/db/schema'
import { agentPostSubmissionSchema, scanAgentSubmission, type AgentPostSubmission, type SubmissionFinding } from '@/lib/agent-submission-validation'
import { lockMediaReferenceMutation, type DatabaseTransaction } from '@/lib/media-lifecycle'
import { upsertPostInTransaction } from '@/lib/posts-repository'
import { hashSubmissionTicket } from '@/lib/submission-ticket'
import { evaluateSubmissionReplay } from '@/lib/submission-replay-policy'
import type { ReviewCursor } from '@/lib/review-validation'

export class SubmissionConflictError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'SubmissionConflictError'
	}
}

function contentHash(payload: unknown): string {
	return createHash('sha256').update(JSON.stringify(payload)).digest('hex')
}

function searchableText(value: unknown): string {
	if (typeof value === 'string') return value
	if (Array.isArray(value)) return value.map(searchableText).join('\n')
	if (value && typeof value === 'object') return Object.values(value).map(searchableText).join('\n')
	return ''
}

export async function createPostSubmissionWithTicket(ticket: string, input: AgentPostSubmission, idempotencyKey: string) {
	const payload = agentPostSubmissionSchema.parse(input)
	const validation = scanAgentSubmission(searchableText(payload))
	if (!validation.accepted) throw Response.json({ error: '投稿包含疑似密钥，已拒绝', findings: validation.findings }, { status: 422 })
	const hash = contentHash(payload)
	const db = getDb()
	const now = new Date()
	const ticketHash = hashSubmissionTicket(ticket)

	return db.transaction(async tx => {
		await lockMediaReferenceMutation(tx as DatabaseTransaction)
		await tx.execute(sql`select pg_advisory_xact_lock(hashtextextended(${`submission-idempotency:${idempotencyKey}`}, 0))`)
		const [existing] = await tx
			.select({
				id: contentSubmissions.id,
				status: contentSubmissions.status,
				contentHash: contentSubmissions.contentHash,
				validationResult: contentSubmissions.validationResult,
				ticketHash: submissionTickets.tokenHash
			})
			.from(contentSubmissions)
			.innerJoin(submissionTickets, eq(contentSubmissions.submissionTicketId, submissionTickets.id))
			.where(eq(contentSubmissions.idempotencyKey, idempotencyKey))
			.for('update')
			.limit(1)
		const replay = evaluateSubmissionReplay(existing, { ticketHash, contentHash: hash })
		if (replay.kind === 'unauthorized') throw new Response('Unauthorized', { status: 401 })
		if (replay.kind === 'conflict') throw new SubmissionConflictError(replay.reason)
		if (replay.kind === 'replay') {
			return { id: replay.record.id, status: 'pending' as const, findings: replay.record.validationResult as SubmissionFinding[] }
		}
		const [consumedTicket] = await tx
			.update(submissionTickets)
			.set({ usedAt: now })
			.where(
				and(
					eq(submissionTickets.tokenHash, ticketHash),
					eq(submissionTickets.scope, 'posts:submit'),
					isNull(submissionTickets.usedAt),
					isNull(submissionTickets.revokedAt),
					gt(submissionTickets.expiresAt, now)
				)
			)
			.returning({ id: submissionTickets.id, label: submissionTickets.label })
		if (!consumedTicket) throw new Response('Unauthorized', { status: 401 })

		const id = randomUUID()
		await tx.insert(contentSubmissions).values({
			id,
			submissionTicketId: consumedTicket.id,
			idempotencyKey,
			type: 'post',
			status: 'pending',
			contentHash: hash,
			payload,
			validationResult: validation.findings
		})
		await tx.insert(auditEvents).values({
			actorType: 'submission-ticket',
			actorId: String(consumedTicket.id),
			action: 'submission.created',
			targetType: 'content-submission',
			targetId: id,
			metadata: { type: 'post', contentHash: hash, idempotencyKey }
		})
		return { id, status: 'pending' as const, findings: validation.findings }
	})
}

export async function listContentSubmissions(status: 'pending' | 'approved' | 'rejected' = 'pending', limit = 20, cursor?: ReviewCursor) {
	const rows = await getDb()
		.select({
			id: contentSubmissions.id,
			type: contentSubmissions.type,
			status: contentSubmissions.status,
			title: sql<string>`${contentSubmissions.payload}->>'title'`,
			slug: sql<string>`${contentSubmissions.payload}->>'slug'`,
			contentHash: contentSubmissions.contentHash,
			createdAt: contentSubmissions.createdAt,
			// Keep PostgreSQL microseconds in the cursor; JS Date truncates them.
			cursorCreatedAt: sql<string>`to_char(${contentSubmissions.createdAt} at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"')`,
			updatedAt: contentSubmissions.updatedAt,
			agentName: submissionTickets.label
		})
		.from(contentSubmissions)
		.leftJoin(submissionTickets, eq(contentSubmissions.submissionTicketId, submissionTickets.id))
		.where(
			and(
				eq(contentSubmissions.status, status),
				cursor ? sql`(${contentSubmissions.createdAt}, ${contentSubmissions.id}) < (${cursor.createdAt}::timestamptz, ${cursor.id})` : undefined
			)
		)
		.orderBy(desc(contentSubmissions.createdAt), desc(contentSubmissions.id))
		.limit(limit + 1)
	const items = rows.slice(0, limit)
	const last = items[items.length - 1]
	return {
		items: items.map(({ cursorCreatedAt, ...item }) => item),
		nextCursor: rows.length > limit && last ? { createdAt: last.cursorCreatedAt, id: last.id } : null
	}
}

export async function getContentSubmission(id: string) {
	const [result] = await getDb()
		.select({
			id: contentSubmissions.id,
			type: contentSubmissions.type,
			status: contentSubmissions.status,
			payload: contentSubmissions.payload,
			contentHash: contentSubmissions.contentHash,
			validationResult: contentSubmissions.validationResult,
			createdAt: contentSubmissions.createdAt,
			updatedAt: contentSubmissions.updatedAt,
			reviewedAt: contentSubmissions.reviewedAt,
			rejectionReason: contentSubmissions.rejectionReason,
			agentName: submissionTickets.label
		})
		.from(contentSubmissions)
		.leftJoin(submissionTickets, eq(contentSubmissions.submissionTicketId, submissionTickets.id))
		.where(eq(contentSubmissions.id, id))
		.limit(1)
	return result || null
}

export async function updatePendingPostSubmission(id: string, input: AgentPostSubmission, expectedContentHash: string) {
	const payload = agentPostSubmissionSchema.parse(input)
	const validation = scanAgentSubmission(searchableText(payload))
	if (!validation.accepted) throw Response.json({ error: '投稿包含疑似密钥，已拒绝', findings: validation.findings }, { status: 422 })
	return getDb().transaction(async tx => {
		await lockMediaReferenceMutation(tx as DatabaseTransaction)
		const [updated] = await tx
			.update(contentSubmissions)
			.set({ payload, contentHash: contentHash(payload), validationResult: validation.findings, updatedAt: new Date() })
			.where(
				and(
					eq(contentSubmissions.id, id),
					eq(contentSubmissions.status, 'pending'),
					eq(contentSubmissions.type, 'post'),
					eq(contentSubmissions.contentHash, expectedContentHash)
				)
			)
			.returning({
				id: contentSubmissions.id,
				payload: contentSubmissions.payload,
				contentHash: contentSubmissions.contentHash,
				updatedAt: contentSubmissions.updatedAt,
				validationResult: contentSubmissions.validationResult
			})
		if (!updated) throw new SubmissionConflictError('投稿已被修改或处理，请重新加载后审核；本地草稿已保留')
		await tx.insert(auditEvents).values({
			actorType: 'admin',
			actorId: 'session',
			action: 'submission.updated',
			targetType: 'content-submission',
			targetId: id,
			metadata: { contentHash: contentHash(payload) }
		})
		return updated
	})
}

export async function approvePostSubmission(id: string, expectedContentHash: string) {
	const db = getDb()
	let slug = ''
	await db.transaction(async tx => {
		await lockMediaReferenceMutation(tx as DatabaseTransaction)
		const [submission] = await tx.select().from(contentSubmissions).where(eq(contentSubmissions.id, id)).for('update').limit(1)
		if (!submission || submission.type !== 'post' || submission.status !== 'pending') throw new SubmissionConflictError('投稿不存在或已经处理')
		if (submission.contentHash !== expectedContentHash) throw new SubmissionConflictError('投稿已被修改，请重新加载后审核，尚未发布')
		const payload = agentPostSubmissionSchema.parse(submission.payload)
		slug = payload.slug
		await upsertPostInTransaction(
			tx,
			{
				slug: payload.slug,
				title: payload.title,
				summary: payload.summary,
				contentMd: payload.contentMd,
				coverUrl: payload.coverUrl,
				category: payload.category,
				tags: payload.tags,
				status: 'published',
				publishedAt: payload.publishedAt
			},
			`agent-submission:${id}`,
			'create-only'
		)
		await tx
			.update(contentSubmissions)
			.set({ status: 'approved', reviewedAt: new Date(), reviewedBy: 'admin', updatedAt: new Date() })
			.where(and(eq(contentSubmissions.id, id), eq(contentSubmissions.status, 'pending')))
		await tx.insert(auditEvents).values({
			actorType: 'admin',
			actorId: 'session',
			action: 'submission.approved',
			targetType: 'content-submission',
			targetId: id,
			metadata: { slug }
		})
	})
	return { id, slug, status: 'approved' as const }
}

export async function rejectContentSubmission(id: string, reason: string, expectedContentHash: string) {
	await getDb().transaction(async tx => {
		const [rejected] = await tx
			.update(contentSubmissions)
			.set({ status: 'rejected', rejectionReason: reason, reviewedAt: new Date(), reviewedBy: 'admin', updatedAt: new Date() })
			.where(and(eq(contentSubmissions.id, id), eq(contentSubmissions.status, 'pending'), eq(contentSubmissions.contentHash, expectedContentHash)))
			.returning({ id: contentSubmissions.id })
		if (!rejected) throw new SubmissionConflictError('投稿已被修改或处理，请重新加载后审核')
		await tx.insert(auditEvents).values({
			actorType: 'admin',
			actorId: 'session',
			action: 'submission.rejected',
			targetType: 'content-submission',
			targetId: id,
			metadata: { reason }
		})
	})
	return { id, status: 'rejected' as const }
}
