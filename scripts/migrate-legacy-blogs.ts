import { createHash } from 'node:crypto'
import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { BlobNotFoundError, del, head, put } from '@vercel/blob'
import { eq, inArray } from 'drizzle-orm'
import { drizzle as neonDrizzle } from 'drizzle-orm/neon-serverless'
import { drizzle as nodePostgresDrizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from '../src/db/schema.ts'
import { validateSlug } from '../src/lib/config-validation.ts'
import { mediaProxyUrl } from '../src/lib/media-url.ts'
import { assertApplyConfirmation, assertLocalAssetsDatabase } from './lib/script-safety.ts'

type LegacyIndexItem = {
	slug: string
	title: string
	tags?: string[]
	date?: string
	summary?: string
	cover?: string
	hidden?: boolean
	category?: string
}

type PlannedMedia = {
	body: Buffer
	mimeType: string
	pathname: string
	sha256: string
	size: number
}

type PlannedPost = {
	slug: string
	title: string
	summary: string
	contentMd: string
	coverUrl: string | null
	category: string | null
	tags: string[]
	status: 'draft' | 'published'
	publishedAt: Date
}

const root = process.cwd()
const legacyRoot = path.join(root, 'public', 'blogs')
const apply = process.argv.includes('--apply')
const localAssets = process.argv.includes('--local-assets')
const databaseUrl = process.env.DATABASE_URL?.trim()
const blobToken = process.env.BLOB_READ_WRITE_TOKEN?.trim()

if (localAssets) {
	const configuredEnvironment = process.env.DATA_ENVIRONMENT?.trim().toLowerCase()
	if (configuredEnvironment && configuredEnvironment !== 'development') {
		throw new Error('Local-assets migration refused: DATA_ENVIRONMENT must be development')
	}
	process.env.DATA_ENVIRONMENT = 'development'
}
assertApplyConfirmation({ apply, argv: process.argv.slice(2), environment: process.env })
if (!databaseUrl) throw new Error('DATABASE_URL is required. Run vercel env pull .env.local after logging in.')
assertLocalAssetsDatabase(localAssets, databaseUrl)
if (!blobToken && !localAssets) throw new Error('BLOB_READ_WRITE_TOKEN is required.')

const localPool = localAssets ? new Pool({ connectionString: databaseUrl, max: 4 }) : null
const db = (localPool ? nodePostgresDrizzle(localPool, { schema }) : neonDrizzle(databaseUrl, { schema })) as ReturnType<
	typeof neonDrizzle<typeof schema>
>
const legacyIndex = JSON.parse(await readFile(path.join(legacyRoot, 'index.json'), 'utf8')) as LegacyIndexItem[]
const categoryConfig = JSON.parse(await readFile(path.join(legacyRoot, 'categories.json'), 'utf8').catch(() => '{"categories":[]}')) as {
	categories?: string[]
}

function extension(fileName: string): string {
	const value = path.extname(fileName).toLowerCase()
	return /^\.(png|jpe?g|webp|gif|svg|avif)$/.test(value) ? (value === '.jpeg' ? '.jpg' : value) : '.bin'
}

function mimeType(value: string): string {
	return (
		{
			'.png': 'image/png',
			'.jpg': 'image/jpeg',
			'.webp': 'image/webp',
			'.gif': 'image/gif',
			'.svg': 'image/svg+xml',
			'.avif': 'image/avif',
			'.bin': 'application/octet-stream'
		}[value] || 'application/octet-stream'
	)
}

function sha256(buffer: Buffer): string {
	return createHash('sha256').update(buffer).digest('hex')
}

function legacyReferences(slug: string, fileName: string): string[] {
	return [`/blogs/${slug}/${fileName}`, `blogs/${slug}/${fileName}`, `./${fileName}`, fileName]
}

function normalizeTags(tags: string[] | undefined): string[] {
	return Array.from(new Set((tags || []).map(tag => tag.trim()).filter(Boolean))).sort()
}

function sameDate(left: Date | null, right: Date): boolean {
	return Boolean(left && left.toISOString() === right.toISOString())
}

const plannedMedia = new Map<string, PlannedMedia>()
const plannedPosts: PlannedPost[] = []
const seenSlugs = new Set<string>()
let mediaReferences = 0

// Phase 1: read and validate every source before any Blob or database mutation.
for (const item of legacyIndex) {
	if (!validateSlug(item.slug)) throw new Error(`Invalid legacy slug: ${item.slug}`)
	if (seenSlugs.has(item.slug)) throw new Error(`Duplicate legacy slug: ${item.slug}`)
	seenSlugs.add(item.slug)

	const folder = path.join(legacyRoot, item.slug)
	const config = JSON.parse(await readFile(path.join(folder, 'config.json'), 'utf8').catch(() => '{}')) as LegacyIndexItem
	const merged = { ...item, ...config }
	let contentMd = await readFile(path.join(folder, 'index.md'), 'utf8')
	const files = await readdir(folder, { withFileTypes: true })
	const mediaFiles = files.filter(file => file.isFile() && file.name !== 'index.md' && file.name !== 'config.json')
	const replacements = new Map<string, string>()

	for (const file of mediaFiles) {
		mediaReferences++
		if (localAssets) continue
		const body = await readFile(path.join(folder, file.name))
		const digest = sha256(body)
		const ext = extension(file.name)
		const pathname = `blog/${item.slug}/${digest}${ext}`
		plannedMedia.set(pathname, { body, mimeType: mimeType(ext), pathname, sha256: digest, size: body.byteLength })
		for (const reference of legacyReferences(item.slug, file.name)) replacements.set(reference, mediaProxyUrl(pathname))
	}

	for (const [reference, url] of replacements) contentMd = contentMd.split(reference).join(url)
	if (!localAssets) {
		const unresolved = Array.from(contentMd.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g))
			.map(match => match[1]?.trim())
			.filter((reference): reference is string => Boolean(reference && (reference.startsWith(`/blogs/${item.slug}/`) || reference.startsWith('./'))))
		if (unresolved.length > 0) throw new Error(`Unresolved legacy media in ${item.slug}: ${unresolved.join(', ')}`)
	}

	let coverUrl = merged.cover?.trim() || null
	if (!localAssets && coverUrl?.startsWith(`/blogs/${item.slug}/`)) {
		const replacement = replacements.get(coverUrl)
		if (!replacement) throw new Error(`Unresolved legacy cover in ${item.slug}: ${coverUrl}`)
		coverUrl = replacement
	}
	const publishedAt = new Date(merged.date || new Date().toISOString())
	if (Number.isNaN(publishedAt.getTime())) throw new Error(`Invalid published date in ${item.slug}: ${merged.date}`)

	plannedPosts.push({
		slug: item.slug,
		title: merged.title?.trim() || item.slug,
		summary: merged.summary?.trim() || '',
		contentMd,
		coverUrl,
		category: merged.category?.trim() || null,
		tags: normalizeTags(merged.tags),
		status: merged.hidden ? 'draft' : 'published',
		publishedAt
	})
}

const slugs = plannedPosts.map(post => post.slug)
const existingPosts =
	slugs.length > 0 ? await db.select().from(schema.posts).where(inArray(schema.posts.slug, slugs)) : []
const existingBySlug = new Map(existingPosts.map(post => [post.slug, post]))
const existingTagRows =
	existingPosts.length > 0
		? await db
				.select({ postId: schema.postTags.postId, name: schema.tags.name })
				.from(schema.postTags)
				.innerJoin(schema.tags, eq(schema.postTags.tagId, schema.tags.id))
				.where(inArray(schema.postTags.postId, existingPosts.map(post => post.id)))
		: []
const existingTags = new Map<number, string[]>()
for (const row of existingTagRows) existingTags.set(row.postId, [...(existingTags.get(row.postId) || []), row.name])

const conflicts: string[] = []
for (const planned of plannedPosts) {
	const existing = existingBySlug.get(planned.slug)
	if (!existing) continue
	const same =
		existing.title === planned.title &&
		existing.summary === planned.summary &&
		existing.contentMd === planned.contentMd &&
		existing.coverUrl === planned.coverUrl &&
		existing.category === planned.category &&
		existing.status === planned.status &&
		sameDate(existing.publishedAt, planned.publishedAt) &&
		JSON.stringify(normalizeTags(existingTags.get(existing.id))) === JSON.stringify(planned.tags)
	if (!same) conflicts.push(planned.slug)
}
if (conflicts.length > 0) {
	throw new Error(`Migration refused: existing posts differ from legacy sources: ${conflicts.join(', ')}`)
}

// Phase 2: inventory Blob state. Authentication/network errors are not treated as a missing object.
const blobLocations = new Map<string, { url: string; pathname: string; existed: boolean }>()
for (const media of plannedMedia.values()) {
	try {
		const existing = await head(media.pathname, { token: blobToken })
		blobLocations.set(media.pathname, { url: existing.url, pathname: existing.pathname, existed: true })
	} catch (error) {
		if (!(error instanceof BlobNotFoundError)) throw error
		if (!apply) {
			blobLocations.set(media.pathname, { url: `[dry-run]${media.pathname}`, pathname: media.pathname, existed: false })
			continue
		}
		const uploaded = await put(media.pathname, media.body, {
			access: 'private',
			addRandomSuffix: false,
			allowOverwrite: false,
			contentType: media.mimeType,
			cacheControlMaxAge: 31536000,
			token: blobToken
		})
		blobLocations.set(media.pathname, { url: uploaded.url, pathname: uploaded.pathname, existed: false })
	}
}

const uploadedLocations = Array.from(blobLocations.values()).filter(location => !location.existed && apply)
let inserted = 0
try {
	if (apply) {
		await db.transaction(async tx => {
			for (const media of plannedMedia.values()) {
				const location = blobLocations.get(media.pathname)
				if (!location) throw new Error(`Missing Blob location: ${media.pathname}`)
				await tx
					.insert(schema.media)
					.values({
						blobUrl: location.url,
						pathname: location.pathname,
						sha256: media.sha256,
						mimeType: media.mimeType,
						size: media.size
					})
					.onConflictDoUpdate({
						target: schema.media.pathname,
						set: { blobUrl: location.url, sha256: media.sha256, mimeType: media.mimeType, size: media.size }
					})
			}

			for (const post of plannedPosts) {
				if (existingBySlug.has(post.slug)) continue
				const [created] = await tx
					.insert(schema.posts)
					.values({
						slug: post.slug,
						title: post.title,
						summary: post.summary,
						contentMd: post.contentMd,
						coverUrl: post.coverUrl,
						category: post.category,
						status: post.status,
						publishedAt: post.publishedAt,
						version: 1
					})
					.returning({ id: schema.posts.id })
				await tx.insert(schema.postRevisions).values({
					postId: created.id,
					version: 1,
					contentMd: post.contentMd,
					metadataSnapshot: { ...post, publishedAt: post.publishedAt.toISOString() },
					createdBy: 'legacy-migration'
				})
				if (post.tags.length > 0) {
					await tx.insert(schema.tags).values(post.tags.map(name => ({ name }))).onConflictDoNothing()
					const tagRows = await tx.select({ id: schema.tags.id }).from(schema.tags).where(inArray(schema.tags.name, post.tags))
					await tx.insert(schema.postTags).values(tagRows.map(tag => ({ postId: created.id, tagId: tag.id }))).onConflictDoNothing()
				}
				inserted++
			}

			const categoryNames = Array.from(
				new Set([
					...(categoryConfig.categories || []).map(value => value.trim()).filter(Boolean),
					...plannedPosts.map(post => post.category).filter((value): value is string => Boolean(value))
				])
			)
			for (const [sortOrder, name] of categoryNames.entries()) {
				await tx.insert(schema.categories).values({ name, sortOrder }).onConflictDoNothing()
			}
		})
	}
} catch (error) {
	for (const location of uploadedLocations) await del(location.url, { token: blobToken }).catch(() => undefined)
	throw error
}

if (apply) {
	const stored = await db.select().from(schema.posts).where(inArray(schema.posts.slug, slugs))
	if (stored.length !== plannedPosts.length) throw new Error('Verification failed: not all legacy posts exist')
	const indexedMedia =
		plannedMedia.size > 0
			? await db.select({ pathname: schema.media.pathname }).from(schema.media).where(inArray(schema.media.pathname, Array.from(plannedMedia.keys())))
			: []
	if (indexedMedia.length !== plannedMedia.size) throw new Error('Verification failed: not all migrated Blob objects are indexed')
}

console.log(
	JSON.stringify(
		{
			mode: apply ? 'apply' : 'dry-run',
			assetMode: localAssets ? 'public-local' : 'private-blob',
			posts: plannedPosts.length,
			inserted,
			alreadyPresent: existingPosts.length,
			mediaReferences,
			uniqueMedia: plannedMedia.size,
			blobsAlreadyPresent: Array.from(blobLocations.values()).filter(location => location.existed).length,
			blobsUploaded: uploadedLocations.length,
			conflicts: conflicts.length,
			unresolvedReferences: 0
		},
		null,
		2
	)
)

if (localPool) await localPool.end()
else await db.$client.end()
