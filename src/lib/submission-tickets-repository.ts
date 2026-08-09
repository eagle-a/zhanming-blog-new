import 'server-only'

import { and, count, desc, eq, gt, isNull, sql } from 'drizzle-orm'
import { getDb } from '@/db/client'
import { auditEvents, submissionTickets } from '@/db/schema'
import { createSubmissionTicketToken, hashSubmissionTicket } from '@/lib/submission-ticket'

const SUBMISSION_TICKET_LIFETIME_MINUTES = 30
const MAX_ACTIVE_TICKETS = 20

export class SubmissionTicketConflictError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'SubmissionTicketConflictError'
	}
}

export async function createSubmissionTicket(label: string) {
	const token = createSubmissionTicketToken()
	const tokenHash = hashSubmissionTicket(token)
	const now = new Date()
	const expiresAt = new Date(now.getTime() + SUBMISSION_TICKET_LIFETIME_MINUTES * 60 * 1000)

	return getDb().transaction(async tx => {
		await tx.execute(sql`select pg_advisory_xact_lock(hashtext('submission-ticket:create'))`)
		const [active] = await tx
			.select({ value: count() })
			.from(submissionTickets)
			.where(
				and(
					isNull(submissionTickets.usedAt),
					isNull(submissionTickets.revokedAt),
					gt(submissionTickets.expiresAt, now)
				)
			)
		if ((active?.value || 0) >= MAX_ACTIVE_TICKETS) {
			throw new SubmissionTicketConflictError(`未使用票据已达到 ${MAX_ACTIVE_TICKETS} 个，请先撤销或等待过期`)
		}

		const [created] = await tx
			.insert(submissionTickets)
			.values({ label, tokenHash, scope: 'posts:submit', createdAt: now, expiresAt })
			.returning({
				id: submissionTickets.id,
				label: submissionTickets.label,
				scope: submissionTickets.scope,
				createdAt: submissionTickets.createdAt,
				expiresAt: submissionTickets.expiresAt
			})
		await tx.insert(auditEvents).values({
			actorType: 'admin',
			actorId: 'session',
			action: 'submission-ticket.created',
			targetType: 'submission-ticket',
			targetId: String(created.id),
			metadata: { label: created.label, scope: created.scope, expiresAt: created.expiresAt.toISOString() }
		})
		return { ...created, token }
	})
}

export async function listSubmissionTickets() {
	return getDb()
		.select({
			id: submissionTickets.id,
			label: submissionTickets.label,
			scope: submissionTickets.scope,
			createdAt: submissionTickets.createdAt,
			expiresAt: submissionTickets.expiresAt,
			usedAt: submissionTickets.usedAt,
			revokedAt: submissionTickets.revokedAt
		})
		.from(submissionTickets)
		.orderBy(desc(submissionTickets.createdAt))
		.limit(100)
}

export async function revokeSubmissionTicket(id: number): Promise<boolean> {
	return getDb().transaction(async tx => {
		const [revoked] = await tx
			.update(submissionTickets)
			.set({ revokedAt: new Date() })
			.where(and(eq(submissionTickets.id, id), isNull(submissionTickets.usedAt), isNull(submissionTickets.revokedAt)))
			.returning({ id: submissionTickets.id })
		if (!revoked) return false
		await tx.insert(auditEvents).values({
			actorType: 'admin',
			actorId: 'session',
			action: 'submission-ticket.revoked',
			targetType: 'submission-ticket',
			targetId: String(id),
			metadata: {}
		})
		return true
	})
}
