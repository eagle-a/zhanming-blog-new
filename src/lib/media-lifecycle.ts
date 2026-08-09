import 'server-only'

import { and, eq, inArray, isNull, sql } from 'drizzle-orm'
import { getDb } from '@/db/client'
import { media } from '@/db/schema'
import { extractMediaPathnames, MEDIA_REFERENCE_MUTATION_LOCK } from '@/lib/media-references'

type Database = ReturnType<typeof getDb>
export type DatabaseTransaction = Parameters<Parameters<Database['transaction']>[0]>[0]

export async function lockMediaReferenceMutation(tx: DatabaseTransaction): Promise<void> {
	await tx.execute(sql`select pg_advisory_xact_lock(hashtextextended(${MEDIA_REFERENCE_MUTATION_LOCK}, 0))`)
}

/**
 * Mark only indexed media as observed by a successful content write.
 * Missing historical rows are intentionally not recreated here: reconciliation
 * must verify Blob metadata before any backfill.
 */
export async function markMediaReferencesCommitted(tx: DatabaseTransaction, ...values: unknown[]): Promise<void> {
	const pathnames = extractMediaPathnames(values)
	if (pathnames.length === 0) return
	await lockMediaReferenceMutation(tx)

	const now = new Date()
	await tx
		.update(media)
		.set({
			state: 'committed',
			pendingAt: sql`null`,
			committedAt: now,
			lastSeenAt: now,
			orphanedAt: sql`null`,
			deletedAt: sql`null`
		})
		.where(and(inArray(media.pathname, pathnames), isNull(media.deletedAt)))
}

export async function reservePendingMediaUpload(pathname: string): Promise<void> {
	const db = getDb()
	await db.transaction(async tx => {
		await lockMediaReferenceMutation(tx)
		const [existing] = await tx
			.select({ state: media.state, deletedAt: media.deletedAt })
			.from(media)
			.where(eq(media.pathname, pathname))
			.for('update')
			.limit(1)
		if (!existing || (existing.state === 'committed' && !existing.deletedAt)) return
		await tx
			.update(media)
			.set({ state: 'pending', pendingAt: new Date(), committedAt: sql`null`, orphanedAt: sql`null`, deletedAt: sql`null` })
			.where(eq(media.pathname, pathname))
	})
}

export async function registerPendingMedia(input: { blobUrl: string; pathname: string; sha256: string; mimeType: string; size: number }): Promise<void> {
	const db = getDb()
	await db.transaction(async tx => {
		await lockMediaReferenceMutation(tx)
		const [existing] = await tx
			.select({ state: media.state, pendingAt: media.pendingAt, committedAt: media.committedAt })
			.from(media)
			.where(eq(media.pathname, input.pathname))
			.for('update')
			.limit(1)

		if (!existing) {
			await tx.insert(media).values({
				...input,
				state: 'pending',
				pendingAt: new Date(),
				committedAt: sql`null`,
				lastSeenAt: sql`null`,
				orphanedAt: sql`null`,
				deletedAt: sql`null`
			})
			return
		}

		const isCommitted = existing.state === 'committed'
		await tx
			.update(media)
			.set({
				...input,
				state: isCommitted ? 'committed' : 'pending',
				pendingAt: isCommitted ? existing.pendingAt || sql`null` : new Date(),
				committedAt: isCommitted ? existing.committedAt || sql`null` : sql`null`,
				orphanedAt: sql`null`,
				deletedAt: sql`null`
			})
			.where(eq(media.pathname, input.pathname))
	})
}
