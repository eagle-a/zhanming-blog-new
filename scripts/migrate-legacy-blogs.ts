import { createHash } from 'node:crypto'
import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { put, head } from '@vercel/blob'
import { eq, inArray } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/neon-serverless'
import * as schema from '../src/db/schema.ts'
import { validateSlug } from '../src/lib/config-validation.ts'
import { mediaProxyUrl } from '../src/lib/media-url.ts'

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

const root = process.cwd()
const legacyRoot = path.join(root, 'public', 'blogs')
const apply = process.argv.includes('--apply')
const databaseUrl = process.env.DATABASE_URL?.trim()

if (!databaseUrl) throw new Error('DATABASE_URL is required. Run vercel env pull .env.local after logging in.')
if (!process.env.BLOB_READ_WRITE_TOKEN) throw new Error('BLOB_READ_WRITE_TOKEN is required.')

const db = drizzle(databaseUrl, { schema })
const legacyIndex = JSON.parse(await readFile(path.join(legacyRoot, 'index.json'), 'utf8')) as LegacyIndexItem[]
const categoryConfig = JSON.parse(await readFile(path.join(legacyRoot, 'categories.json'), 'utf8').catch(() => '{"categories":[]}')) as { categories?: string[] }

function extension(fileName: string): string {
	const ext = path.extname(fileName).toLowerCase()
	return /^\.(png|jpe?g|webp|gif|svg|avif)$/.test(ext) ? ext : '.bin'
}

function hash(buffer: Buffer): string {
	return createHash('sha256').update(buffer).digest('hex')
}

function legacyReference(slug: string, fileName: string): string[] {
	return [`/blogs/${slug}/${fileName}`, `blogs/${slug}/${fileName}`, `./${fileName}`, fileName]
}

async function uploadIfNeeded(slug: string, fileName: string): Promise<{ url: string; pathname: string; sha256: string; size: number }> {
	const body = await readFile(path.join(legacyRoot, slug, fileName))
	const sha256 = hash(body)
	const pathname = `blog/${slug}/${sha256}${extension(fileName)}`
	let blob: { url: string; pathname: string } | null = null
	try {
		const existing = await head(pathname)
		blob = { url: existing.url, pathname: existing.pathname }
	} catch {
		if (!apply) {
			blob = { url: `[dry-run]${pathname}`, pathname }
		} else {
			const uploaded = await put(pathname, body, {
				access: 'private',
				addRandomSuffix: false,
				allowOverwrite: true,
				contentType: extension(fileName) === '.bin' ? 'application/octet-stream' : undefined,
				cacheControlMaxAge: 31536000
			})
			blob = { url: uploaded.url, pathname: uploaded.pathname }
		}
	}
	return { url: apply ? mediaProxyUrl(blob.pathname) : blob.url, pathname: blob.pathname, sha256, size: body.byteLength }
}

const stats = { posts: 0, inserted: 0, skipped: 0, media: 0, missingRefs: 0 }
const migratedBySlug = new Map<string, { contentMd: string; coverUrl: string | null; title: string; tags: string[]; category: string | null; summary: string; hidden: boolean }>()
const insertedSlugs = new Set<string>()

for (const item of legacyIndex) {
	if (!validateSlug(item.slug)) throw new Error(`Invalid legacy slug: ${item.slug}`)
	const folder = path.join(legacyRoot, item.slug)
	const config = JSON.parse(await readFile(path.join(folder, 'config.json'), 'utf8').catch(() => '{}')) as LegacyIndexItem
	const merged = { ...item, ...config }
	const markdown = await readFile(path.join(folder, 'index.md'), 'utf8')
	const files = await readdir(folder, { withFileTypes: true })
	const mediaFiles = files.filter(file => file.isFile() && file.name !== 'index.md' && file.name !== 'config.json')
	const replacements = new Map<string, string>()
	for (const file of mediaFiles) {
		const uploaded = await uploadIfNeeded(item.slug, file.name)
		stats.media++
		for (const reference of legacyReference(item.slug, file.name)) replacements.set(reference, uploaded.url)
	}

	let contentMd = markdown
	for (const [reference, url] of replacements) contentMd = contentMd.split(reference).join(url)
	for (const reference of Array.from(contentMd.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)).map(match => match[1])) {
		if (reference.startsWith(`/blogs/${item.slug}/`) && !replacements.has(reference)) stats.missingRefs++
	}

	let coverUrl = merged.cover || null
	if (coverUrl?.startsWith(`/blogs/${item.slug}/`)) coverUrl = replacements.get(coverUrl) || coverUrl
	const post = {
		slug: item.slug,
		title: merged.title || item.slug,
		summary: merged.summary || '',
		contentMd,
		coverUrl,
		category: merged.category || null,
		tags: Array.from(new Set((merged.tags || []).map(tag => tag.trim()).filter(Boolean))),
		status: merged.hidden ? ('draft' as const) : ('published' as const),
		publishedAt: new Date(merged.date || new Date().toISOString()),
		hidden: Boolean(merged.hidden)
	}
	migratedBySlug.set(item.slug, post)
	stats.posts++

	if (!apply) continue
	const [existing] = await db.select({ id: schema.posts.id }).from(schema.posts).where(eq(schema.posts.slug, post.slug)).limit(1)
	if (existing) {
		stats.skipped++
		continue
	}

	await db.transaction(async tx => {
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
			metadataSnapshot: {
				slug: post.slug,
				title: post.title,
				summary: post.summary,
				coverUrl: post.coverUrl,
				category: post.category,
				tags: post.tags,
				status: post.status,
				publishedAt: post.publishedAt.toISOString()
			},
			createdBy: 'legacy-migration'
		})
		if (post.tags.length > 0) {
			await tx.insert(schema.tags).values(post.tags.map(name => ({ name }))).onConflictDoNothing()
			const tagRows = await tx.select({ id: schema.tags.id }).from(schema.tags).where(inArray(schema.tags.name, post.tags))
			await tx.insert(schema.postTags).values(tagRows.map(tag => ({ postId: created.id, tagId: tag.id }))).onConflictDoNothing()
		}
	})
	stats.inserted++
	insertedSlugs.add(post.slug)
}

if (apply) {
	const categories = Array.from(new Set((categoryConfig.categories || []).map(value => value.trim()).filter(Boolean)))
		.concat(Array.from(migratedBySlug.values()).map(post => post.category).filter((value): value is string => Boolean(value)))
	const uniqueCategories = Array.from(new Set(categories))
	await db.delete(schema.categories)
	if (uniqueCategories.length > 0) await db.insert(schema.categories).values(uniqueCategories.map((name, sortOrder) => ({ name, sortOrder })))

	const dbRows = await db.select({ slug: schema.posts.slug, contentMd: schema.posts.contentMd }).from(schema.posts).where(inArray(schema.posts.slug, legacyIndex.map(item => item.slug)))
	const contentBySlug = new Map(dbRows.map(row => [row.slug, row.contentMd]))
	for (const [slug, post] of migratedBySlug) {
		if (!insertedSlugs.has(slug)) continue
		const stored = contentBySlug.get(slug)
		if (!stored || stored !== post.contentMd) throw new Error(`Verification failed for ${slug}`)
	}
}

console.log(JSON.stringify({ mode: apply ? 'apply' : 'dry-run', ...stats, missingRefs: stats.missingRefs }, null, 2))
if (stats.missingRefs > 0) throw new Error('Migration stopped: unresolved legacy image references remain')
