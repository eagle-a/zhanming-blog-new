import 'server-only'

import { and, asc, desc, eq, inArray, isNotNull, isNull, lte, notInArray, sql } from 'drizzle-orm'
import { unstable_cache } from 'next/cache'
import { getDb } from '@/db/client'
import { categories, media, postRevisions, posts, postTags, tags, type PostRow } from '@/db/schema'
import type { BlogIndexItem } from '@/app/blog/types'

export type PostRecord = BlogIndexItem & {
	contentMd: string
	status: 'draft' | 'published' | 'archived'
	version: number
	createdAt: string
	updatedAt: string
}

export type PostWriteInput = {
	slug: string
	title: string
	summary: string
	contentMd: string
	coverUrl?: string | null
	category?: string | null
	tags: string[]
	status: 'draft' | 'published'
	publishedAt: string
	expectedVersion?: number
}

export class PostConflictError extends Error {
	constructor(message = '文章已被其他会话修改，请刷新后重试') {
		super(message)
		this.name = 'PostConflictError'
	}
}

type Database = ReturnType<typeof getDb>
export type DatabaseTransaction = Parameters<Parameters<Database['transaction']>[0]>[0]

function normalizeTags(values: string[]): string[] {
	return Array.from(new Set(values.map(value => value.trim()).filter(Boolean))).slice(0, 30)
}

function normalizeCategory(value?: string | null): string | null {
	const normalized = value?.trim()
	return normalized || null
}

function iso(value: Date | string): string {
	return (value instanceof Date ? value : new Date(value)).toISOString()
}

function toIndexItem(row: PostRow, tagNames: string[]): BlogIndexItem {
	return {
		slug: row.slug,
		title: row.title,
		tags: tagNames,
		date: iso(row.publishedAt || row.createdAt),
		updatedAt: iso(row.updatedAt),
		summary: row.summary,
		cover: row.coverUrl || undefined,
		hidden: row.status !== 'published',
		category: row.category || undefined
	}
}

function toPostRecord(row: PostRow, tagNames: string[]): PostRecord {
	return {
		...toIndexItem(row, tagNames),
		contentMd: row.contentMd,
		status: row.status,
		version: row.version,
		createdAt: iso(row.createdAt),
		updatedAt: iso(row.updatedAt)
	}
}

async function tagsByPostIds(postIds: number[]): Promise<Map<number, string[]>> {
	const result = new Map<number, string[]>()
	if (postIds.length === 0) return result

	const rows = await getDb()
		.select({ postId: postTags.postId, name: tags.name })
		.from(postTags)
		.innerJoin(tags, eq(postTags.tagId, tags.id))
		.where(inArray(postTags.postId, postIds))
		.orderBy(asc(tags.name))

	for (const row of rows) {
		const list = result.get(row.postId) || []
		list.push(row.name)
		result.set(row.postId, list)
	}
	return result
}

export async function listPosts(includeDrafts = false): Promise<BlogIndexItem[]> {
	const now = new Date()
	const condition = includeDrafts ? isNull(posts.deletedAt) : and(eq(posts.status, 'published'), isNull(posts.deletedAt), lte(posts.publishedAt, now))

	const rows = await getDb().select().from(posts).where(condition).orderBy(desc(posts.publishedAt), desc(posts.id))
	const tagMap = await tagsByPostIds(rows.map(row => row.id))
	return rows.map(row => toIndexItem(row, tagMap.get(row.id) || []))
}

export async function getPost(slug: string, includeDrafts = false): Promise<PostRecord | null> {
	const now = new Date()
	const visibility = includeDrafts ? undefined : and(eq(posts.status, 'published'), lte(posts.publishedAt, now))
	const [row] = await getDb()
		.select()
		.from(posts)
		.where(and(eq(posts.slug, slug), isNull(posts.deletedAt), visibility))
		.limit(1)

	if (!row) return null
	const tagMap = await tagsByPostIds([row.id])
	return toPostRecord(row, tagMap.get(row.id) || [])
}

async function listCategories(): Promise<string[]> {
	const rows = await getDb().select({ name: categories.name }).from(categories).orderBy(asc(categories.sortOrder), asc(categories.name))
	return rows.map(row => row.name)
}

function metadataSnapshot(input: {
	slug: string
	title: string
	summary: string
	coverUrl?: string | null
	category?: string | null
	tags: string[]
	status: string
	publishedAt: Date | string | null
}) {
	return {
		slug: input.slug,
		title: input.title,
		summary: input.summary,
		coverUrl: input.coverUrl || null,
		category: input.category || null,
		tags: input.tags,
		status: input.status,
		publishedAt: input.publishedAt ? iso(input.publishedAt) : null
	}
}

export async function upsertPostInTransaction(
	tx: DatabaseTransaction,
	input: PostWriteInput,
	createdBy = 'admin',
	mode: 'upsert' | 'create-only' = 'upsert'
): Promise<void> {
	const tagNames = normalizeTags(input.tags)
	const category = normalizeCategory(input.category)
	const publishedAt = new Date(input.publishedAt)

	// PostgreSQL row locks cannot lock a slug that does not exist yet. A
	// transaction-scoped advisory lock closes the insert-vs-insert race and
	// makes create-only approval deterministic instead of occasionally 500ing.
	await tx.execute(sql`select pg_advisory_xact_lock(hashtext(${`post-slug:${input.slug}`}))`)
	const [current] = await tx.select().from(posts).where(eq(posts.slug, input.slug)).for('update').limit(1)

	if (current && mode === 'create-only') {
		throw new PostConflictError('该 slug 已被正式文章或历史文章占用；AI 投稿不能覆盖或复活现有内容，请修改 slug')
	}

	if (current && input.expectedVersion !== undefined && current.version !== input.expectedVersion) {
		throw new PostConflictError()
	}

	const nextVersion = current ? current.version + 1 : 1
	let postId: number

	if (current) {
		const [updated] = await tx
			.update(posts)
			.set({
				title: input.title,
				summary: input.summary,
				contentMd: input.contentMd,
				coverUrl: input.coverUrl || null,
				category,
				status: input.status,
				publishedAt,
				updatedAt: new Date(),
				version: nextVersion,
				deletedAt: null
			})
			.where(eq(posts.id, current.id))
			.returning({ id: posts.id })
		postId = updated.id
	} else {
		const [created] = await tx
			.insert(posts)
			.values({
				slug: input.slug,
				title: input.title,
				summary: input.summary,
				contentMd: input.contentMd,
				coverUrl: input.coverUrl || null,
				category,
				status: input.status,
				publishedAt,
				version: nextVersion
			})
			.returning({ id: posts.id })
		postId = created.id
	}

	await tx.insert(postRevisions).values({
		postId,
		version: nextVersion,
		contentMd: input.contentMd,
		metadataSnapshot: metadataSnapshot({ ...input, category, tags: tagNames, publishedAt }),
		createdBy
	})

	await tx.delete(postTags).where(eq(postTags.postId, postId))
	if (tagNames.length > 0) {
		await tx
			.insert(tags)
			.values(tagNames.map(name => ({ name })))
			.onConflictDoNothing()
		const tagRows = await tx.select({ id: tags.id }).from(tags).where(inArray(tags.name, tagNames))
		await tx
			.insert(postTags)
			.values(tagRows.map(tag => ({ postId, tagId: tag.id })))
			.onConflictDoNothing()
	}

	if (category) {
		const [lastCategory] = await tx.select({ nextSortOrder: categories.sortOrder }).from(categories).orderBy(desc(categories.sortOrder)).limit(1)
		await tx
			.insert(categories)
			.values({ name: category, sortOrder: (lastCategory?.nextSortOrder ?? -1) + 1 })
			.onConflictDoNothing()
	}
}

export async function upsertPost(input: PostWriteInput): Promise<PostRecord> {
	await getDb().transaction(tx => upsertPostInTransaction(tx, input))

	const result = await getPost(input.slug, true)
	if (!result) throw new Error('文章保存后无法读取')
	return result
}

export async function softDeletePost(slug: string): Promise<boolean> {
	const db = getDb()
	return db.transaction(async tx => {
		const [current] = await tx
			.select()
			.from(posts)
			.where(and(eq(posts.slug, slug), isNull(posts.deletedAt)))
			.for('update')
			.limit(1)
		if (!current) return false

		const tagRows = await tx.select({ name: tags.name }).from(postTags).innerJoin(tags, eq(postTags.tagId, tags.id)).where(eq(postTags.postId, current.id))
		const nextVersion = current.version + 1
		await tx.update(posts).set({ status: 'archived', deletedAt: new Date(), updatedAt: new Date(), version: nextVersion }).where(eq(posts.id, current.id))
		await tx.insert(postRevisions).values({
			postId: current.id,
			version: nextVersion,
			contentMd: current.contentMd,
			metadataSnapshot: metadataSnapshot({ ...current, tags: tagRows.map(row => row.name), status: 'archived' })
		})
		return true
	})
}

export async function applyBatchPostEdits(input: {
	removedSlugs: string[]
	assignments: Array<{ slug: string; category?: string | null }>
	categories: string[]
}): Promise<void> {
	const db = getDb()
	const categoryNames = Array.from(new Set(input.categories.map(value => value.trim()).filter(Boolean)))
	const removed = new Set(input.removedSlugs)

	await db.transaction(async tx => {
		for (const slug of removed) {
			const [row] = await tx
				.select()
				.from(posts)
				.where(and(eq(posts.slug, slug), isNull(posts.deletedAt)))
				.for('update')
				.limit(1)
			if (!row) continue
			const tagRows = await tx.select({ name: tags.name }).from(postTags).innerJoin(tags, eq(postTags.tagId, tags.id)).where(eq(postTags.postId, row.id))
			const nextVersion = row.version + 1
			await tx.update(posts).set({ status: 'archived', deletedAt: new Date(), updatedAt: new Date(), version: nextVersion }).where(eq(posts.id, row.id))
			await tx.insert(postRevisions).values({
				postId: row.id,
				version: nextVersion,
				contentMd: row.contentMd,
				metadataSnapshot: metadataSnapshot({ ...row, tags: tagRows.map(tag => tag.name), status: 'archived' })
			})
		}

		for (const assignment of input.assignments) {
			if (removed.has(assignment.slug)) continue
			const category = normalizeCategory(assignment.category)
			const [row] = await tx
				.select()
				.from(posts)
				.where(and(eq(posts.slug, assignment.slug), isNull(posts.deletedAt)))
				.for('update')
				.limit(1)
			if (!row || row.category === category) continue
			const tagRows = await tx.select({ name: tags.name }).from(postTags).innerJoin(tags, eq(postTags.tagId, tags.id)).where(eq(postTags.postId, row.id))
			const nextVersion = row.version + 1
			await tx.update(posts).set({ category, updatedAt: new Date(), version: nextVersion }).where(eq(posts.id, row.id))
			await tx.insert(postRevisions).values({
				postId: row.id,
				version: nextVersion,
				contentMd: row.contentMd,
				metadataSnapshot: metadataSnapshot({ ...row, category, tags: tagRows.map(tag => tag.name), status: row.status })
			})
		}

		const invalidCategoryCondition =
			categoryNames.length > 0
				? and(isNull(posts.deletedAt), isNotNull(posts.category), notInArray(posts.category, categoryNames))
				: and(isNull(posts.deletedAt), isNotNull(posts.category))
		const uncategorizedRows = await tx.select().from(posts).where(invalidCategoryCondition).for('update')
		for (const row of uncategorizedRows) {
			const tagRows = await tx.select({ name: tags.name }).from(postTags).innerJoin(tags, eq(postTags.tagId, tags.id)).where(eq(postTags.postId, row.id))
			const nextVersion = row.version + 1
			await tx.update(posts).set({ category: null, updatedAt: new Date(), version: nextVersion }).where(eq(posts.id, row.id))
			await tx.insert(postRevisions).values({
				postId: row.id,
				version: nextVersion,
				contentMd: row.contentMd,
				metadataSnapshot: metadataSnapshot({ ...row, category: null, tags: tagRows.map(tag => tag.name), status: row.status })
			})
		}

		for (const [sortOrder, name] of categoryNames.entries()) {
			await tx
				.insert(categories)
				.values({ name, sortOrder, updatedAt: new Date() })
				.onConflictDoUpdate({ target: categories.name, set: { sortOrder, updatedAt: new Date() } })
		}
		if (categoryNames.length > 0) await tx.delete(categories).where(notInArray(categories.name, categoryNames))
		else await tx.delete(categories)
	})
}

export async function recordMedia(input: { blobUrl: string; pathname: string; sha256: string; mimeType: string; size: number }): Promise<void> {
	await getDb()
		.insert(media)
		.values(input)
		.onConflictDoUpdate({
			target: media.pathname,
			set: { blobUrl: input.blobUrl, sha256: input.sha256, mimeType: input.mimeType, size: input.size }
		})
}

export const getCachedPublishedPosts = unstable_cache(() => listPosts(false), ['published-posts'], {
	tags: ['posts'],
	revalidate: 3600
})

export function getCachedPublishedPost(slug: string): Promise<PostRecord | null> {
	return unstable_cache(() => getPost(slug, false), ['published-post', slug], {
		tags: ['posts', `post:${slug}`],
		revalidate: 3600
	})()
}

export const getCachedCategories = unstable_cache(listCategories, ['post-categories'], {
	tags: ['post-categories'],
	revalidate: 3600
})
