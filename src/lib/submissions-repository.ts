import 'server-only'

import { createHash, randomUUID } from 'node:crypto'
import { and, desc, eq, gt, isNull, sql } from 'drizzle-orm'
import { getDb } from '@/db/client'
import { agentApiKeys, auditEvents, contentSubmissions, submissionTickets } from '@/db/schema'
import { agentPostSubmissionSchema, scanAgentSubmission, type AgentPostSubmission } from '@/lib/agent-submission-validation'
import { upsertPostInTransaction } from '@/lib/posts-repository'
import { hashSubmissionTicket } from '@/lib/submission-ticket'

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
			agentKeyId: null,
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

export async function listContentSubmissions(status?: 'pending' | 'approved' | 'rejected') {
	return getDb()
		.select({
			id: contentSubmissions.id,
			type: contentSubmissions.type,
			status: contentSubmissions.status,
			payload: contentSubmissions.payload,
			validationResult: contentSubmissions.validationResult,
			createdAt: contentSubmissions.createdAt,
			updatedAt: contentSubmissions.updatedAt,
			reviewedAt: contentSubmissions.reviewedAt,
			rejectionReason: contentSubmissions.rejectionReason,
			agentName: sql<string>`coalesce(${agentApiKeys.name}, ${submissionTickets.label})`
		})
		.from(contentSubmissions)
		.leftJoin(agentApiKeys, eq(contentSubmissions.agentKeyId, agentApiKeys.id))
		.leftJoin(submissionTickets, eq(contentSubmissions.submissionTicketId, submissionTickets.id))
		.where(status ? eq(contentSubmissions.status, status) : undefined)
		.orderBy(desc(contentSubmissions.createdAt))
}

export async function getContentSubmission(id: string) {
	const [result] = await getDb()
		.select({
			id: contentSubmissions.id,
			type: contentSubmissions.type,
			status: contentSubmissions.status,
			payload: contentSubmissions.payload,
			validationResult: contentSubmissions.validationResult,
			createdAt: contentSubmissions.createdAt,
			updatedAt: contentSubmissions.updatedAt,
			reviewedAt: contentSubmissions.reviewedAt,
			rejectionReason: contentSubmissions.rejectionReason,
			agentName: sql<string>`coalesce(${agentApiKeys.name}, ${submissionTickets.label})`
		})
		.from(contentSubmissions)
		.leftJoin(agentApiKeys, eq(contentSubmissions.agentKeyId, agentApiKeys.id))
		.leftJoin(submissionTickets, eq(contentSubmissions.submissionTicketId, submissionTickets.id))
		.where(eq(contentSubmissions.id, id))
		.limit(1)
	return result || null
}

export async function updatePendingPostSubmission(id: string, input: AgentPostSubmission) {
	const payload = agentPostSubmissionSchema.parse(input)
	const validation = scanAgentSubmission(searchableText(payload))
	if (!validation.accepted) throw Response.json({ error: '投稿包含疑似密钥，已拒绝', findings: validation.findings }, { status: 422 })
	await getDb().transaction(async tx => {
		const [updated] = await tx
			.update(contentSubmissions)
			.set({ payload, contentHash: contentHash(payload), validationResult: validation.findings, updatedAt: new Date() })
			.where(and(eq(contentSubmissions.id, id), eq(contentSubmissions.status, 'pending'), eq(contentSubmissions.type, 'post')))
			.returning({ id: contentSubmissions.id })
		if (!updated) throw new SubmissionConflictError('投稿不存在或已经处理')
		await tx.insert(auditEvents).values({
			actorType: 'admin',
			actorId: 'session',
			action: 'submission.updated',
			targetType: 'content-submission',
			targetId: id,
			metadata: { contentHash: contentHash(payload) }
		})
	})
	return getContentSubmission(id)
}

export async function approvePostSubmission(id: string) {
	const db = getDb()
	let slug = ''
	await db.transaction(async tx => {
		const [submission] = await tx.select().from(contentSubmissions).where(eq(contentSubmissions.id, id)).for('update').limit(1)
		if (!submission || submission.type !== 'post' || submission.status !== 'pending') throw new SubmissionConflictError('投稿不存在或已经处理')
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

export async function rejectContentSubmission(id: string, reason: string) {
	await getDb().transaction(async tx => {
		const [rejected] = await tx
			.update(contentSubmissions)
			.set({ status: 'rejected', rejectionReason: reason, reviewedAt: new Date(), reviewedBy: 'admin', updatedAt: new Date() })
			.where(and(eq(contentSubmissions.id, id), eq(contentSubmissions.status, 'pending')))
			.returning({ id: contentSubmissions.id })
		if (!rejected) throw new SubmissionConflictError('投稿不存在或已经处理')
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
