import 'server-only'

import { eq, sql } from 'drizzle-orm'
import { unstable_cache } from 'next/cache'
import { getDb } from '@/db/client'
import { contentDocumentRevisions, contentDocuments } from '@/db/schema'
import type { ContentDocumentKey } from '@/lib/content-validation'

import aboutFallback from '@/app/about/list.json'
import bloggersFallback from '@/app/bloggers/list.json'
import picturesFallback from '@/app/pictures/list.json'
import projectsFallback from '@/app/projects/list.json'
import sharesFallback from '@/app/share/list.json'
import snippetsFallback from '@/app/snippets/list.json'
import cardStylesFallback from '@/config/card-styles.json'
import siteFallback from '@/config/site-content.json'

export type ContentDocumentRecord<T = unknown> = {
	key: ContentDocumentKey
	data: T
	version: number
	updatedAt: string | null
}

const fallbacks: Record<ContentDocumentKey, unknown> = {
	site: siteFallback,
	'card-styles': cardStylesFallback,
	about: aboutFallback,
	bloggers: bloggersFallback,
	projects: projectsFallback,
	shares: sharesFallback,
	pictures: picturesFallback,
	snippets: snippetsFallback
}

export class ContentDocumentConflictError extends Error {
	constructor(message = '配置已被其他会话修改，请刷新后重试') {
		super(message)
		this.name = 'ContentDocumentConflictError'
	}
}

export function getFallbackContentDocument<T>(key: ContentDocumentKey): ContentDocumentRecord<T> {
	return { key, data: fallbacks[key] as T, version: 0, updatedAt: null }
}

export async function getContentDocument<T>(key: ContentDocumentKey): Promise<ContentDocumentRecord<T>> {
	const [row] = await getDb().select().from(contentDocuments).where(eq(contentDocuments.key, key)).limit(1)
	if (!row) return getFallbackContentDocument<T>(key)
	return {
		key,
		data: row.data as T,
		version: row.version,
		updatedAt: row.updatedAt.toISOString()
	}
}

export function getCachedContentDocument<T>(key: ContentDocumentKey): Promise<ContentDocumentRecord<T>> {
	return unstable_cache(() => getContentDocument<T>(key), ['content-document', key], {
		tags: [`content:${key}`],
		revalidate: 3600
	})()
}

export async function upsertContentDocument<T>(
	key: ContentDocumentKey,
	data: T,
	expectedVersion: number,
	createdBy = 'admin'
): Promise<ContentDocumentRecord<T>> {
	await getDb().transaction(async tx => {
		await tx.execute(sql`select pg_advisory_xact_lock(hashtext(${key}))`)
		const [current] = await tx.select().from(contentDocuments).where(eq(contentDocuments.key, key)).for('update').limit(1)
		const currentVersion = current?.version ?? 0
		if (currentVersion !== expectedVersion) throw new ContentDocumentConflictError()

		const nextVersion = currentVersion + 1
		if (current) {
			await tx.update(contentDocuments).set({ data, version: nextVersion, updatedAt: new Date() }).where(eq(contentDocuments.key, key))
		} else {
			await tx.insert(contentDocuments).values({ key, data, version: nextVersion })
		}
		await tx.insert(contentDocumentRevisions).values({ documentKey: key, version: nextVersion, data, createdBy })
	})

	return getContentDocument<T>(key)
}

export async function upsertContentDocuments(
	items: Array<{ key: ContentDocumentKey; data: unknown; expectedVersion: number }>,
	createdBy = 'admin'
): Promise<ContentDocumentRecord[]> {
	const unique = new Map(items.map(item => [item.key, item]))
	if (unique.size !== items.length) throw new Error('同一配置不能在批量请求中重复')
	const sorted = Array.from(unique.values()).sort((a, b) => a.key.localeCompare(b.key))

	await getDb().transaction(async tx => {
		for (const item of sorted) {
			await tx.execute(sql`select pg_advisory_xact_lock(hashtext(${item.key}))`)
			const [current] = await tx.select().from(contentDocuments).where(eq(contentDocuments.key, item.key)).for('update').limit(1)
			const currentVersion = current?.version ?? 0
			if (currentVersion !== item.expectedVersion) throw new ContentDocumentConflictError()
			const nextVersion = currentVersion + 1
			if (current) {
				await tx.update(contentDocuments).set({ data: item.data, version: nextVersion, updatedAt: new Date() }).where(eq(contentDocuments.key, item.key))
			} else {
				await tx.insert(contentDocuments).values({ key: item.key, data: item.data, version: nextVersion })
			}
			await tx.insert(contentDocumentRevisions).values({
				documentKey: item.key,
				version: nextVersion,
				data: item.data,
				createdBy
			})
		}
	})

	return Promise.all(sorted.map(item => getContentDocument(item.key)))
}
