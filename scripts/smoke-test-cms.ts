import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { del } from '@vercel/blob'
import { upload } from '@vercel/blob/client'
import { and, eq, gt, sql } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/neon-serverless'
import * as schema from '../src/db/schema.ts'
import { mediaProxyUrl } from '../src/lib/media-url.ts'
import { assertIsolatedCmsTestEnvironment } from './lib/script-safety.ts'

const baseUrl = process.env.CMS_TEST_BASE_URL || 'http://localhost:2025'
const password = process.env.CMS_TEST_PASSWORD
assertIsolatedCmsTestEnvironment(process.env)
const databaseUrl = process.env.CMS_TEST_DATABASE_URL!
const blobToken = process.env.CMS_TEST_BLOB_READ_WRITE_TOKEN!
const slug = `codex-smoke-test-${Date.now()}`

if (!password) throw new Error('CMS_TEST_PASSWORD is required')
if (!databaseUrl) throw new Error('DATABASE_URL is required')

const db = drizzle(databaseUrl, { schema })
let blobUrl: string | undefined
let blobPathname: string | undefined
let contentBlobUrl: string | undefined
let contentBlobPathname: string | undefined
let cookie: string | undefined
let originalSnippets: string[] | undefined
let originalSnippetsVersion: number | undefined
let snippetsRestored = false
let testCategoryExisted = false
let failure: unknown
const contentMarker = `codex-content-smoke-${Date.now()}`

async function requestJson(url: string, init?: RequestInit): Promise<{ response: Response; body: any }> {
	const response = await fetch(url, init)
	const body = await response.json().catch(() => ({}))
	return { response, body }
}

try {
	const [existingTestCategory] = await db.select({ id: schema.categories.id }).from(schema.categories).where(eq(schema.categories.name, '测试')).limit(1)
	testCategoryExisted = Boolean(existingTestCategory)
	const login = await requestJson(`${baseUrl}/api/admin/session`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', Origin: baseUrl },
		body: JSON.stringify({ password })
	})
	if (!login.response.ok) throw new Error(`Login failed: ${login.response.status}`)
	cookie = login.response.headers.getSetCookie()[0]?.split(';')[0]
	if (!cookie) throw new Error('Login did not return a session cookie')
	if (!login.response.headers.getSetCookie()[0]?.includes('HttpOnly')) throw new Error('Admin session cookie is not HttpOnly')

	const contentBefore = await requestJson(`${baseUrl}/api/content/snippets`)
	if (!contentBefore.response.ok || !Array.isArray(contentBefore.body.data) || typeof contentBefore.body.version !== 'number') {
		throw new Error('Runtime snippets document could not be read')
	}
	const snippetsBefore = contentBefore.body.data as string[]
	originalSnippets = snippetsBefore
	originalSnippetsVersion = contentBefore.body.version
	const contentUpdated = await requestJson(`${baseUrl}/api/admin/content/snippets`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json', Cookie: cookie, Origin: baseUrl },
		body: JSON.stringify({ data: [...snippetsBefore, contentMarker], expectedVersion: contentBefore.body.version })
	})
	if (!contentUpdated.response.ok || contentUpdated.body.version !== contentBefore.body.version + 1) {
		throw new Error(`Content update failed: ${contentUpdated.response.status} ${JSON.stringify(contentUpdated.body)}`)
	}
	const publicContent = await requestJson(`${baseUrl}/api/content/snippets`)
	if (!publicContent.response.ok || !publicContent.body.data.includes(contentMarker)) throw new Error('Public content did not reflect the update')

	const contentConflict = await requestJson(`${baseUrl}/api/admin/content/snippets`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json', Cookie: cookie, Origin: baseUrl },
		body: JSON.stringify({ data: snippetsBefore, expectedVersion: contentBefore.body.version })
	})
	if (contentConflict.response.status !== 409) throw new Error('Stale content version was not rejected')

	const contentRestored = await requestJson(`${baseUrl}/api/admin/content/snippets`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json', Cookie: cookie, Origin: baseUrl },
		body: JSON.stringify({ data: snippetsBefore, expectedVersion: contentUpdated.body.version })
	})
	if (!contentRestored.response.ok) throw new Error('Runtime snippets document could not be restored')
	snippetsRestored = true

	const contentImage = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"><desc>${contentMarker}</desc></svg>`)
	const contentSha256 = createHash('sha256').update(contentImage).digest('hex')
	const contentPathname = `content/site/${contentSha256}.svg`
	const contentBlob = await upload(contentPathname, contentImage, {
		access: 'private',
		contentType: 'image/svg+xml',
		handleUploadUrl: `${baseUrl}/api/admin/media/upload`,
		headers: { Cookie: cookie, Origin: baseUrl },
		clientPayload: JSON.stringify({ namespace: 'site', sha256: contentSha256, mimeType: 'image/svg+xml', size: contentImage.byteLength })
	})
	contentBlobUrl = contentBlob.url
	contentBlobPathname = contentBlob.pathname
	const contentMedia = await fetch(`${baseUrl}${mediaProxyUrl(contentBlob.pathname)}`)
	if (!contentMedia.ok || contentMedia.headers.get('content-security-policy')?.includes('sandbox') !== true) {
		throw new Error('Content Blob proxy verification failed')
	}

	const imagePath = path.join(process.cwd(), 'public', 'blogs', 'readme', '730266f17fab9717.png')
	const image = await readFile(imagePath)
	const sha256 = createHash('sha256').update(image).digest('hex')
	const pathname = `blog/${slug}/${sha256}.png`
	const blob = await upload(pathname, image, {
		access: 'private',
		contentType: 'image/png',
		handleUploadUrl: `${baseUrl}/api/admin/media/upload`,
		headers: { Cookie: cookie, Origin: baseUrl },
		clientPayload: JSON.stringify({ slug, sha256, mimeType: 'image/png', size: image.byteLength })
	})
	blobUrl = blob.url
	blobPathname = blob.pathname
	const proxyUrl = mediaProxyUrl(blob.pathname)

	const created = await requestJson(`${baseUrl}/api/admin/posts`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', Cookie: cookie, Origin: baseUrl },
		body: JSON.stringify({
			slug,
			title: 'Codex CMS smoke test',
			summary: 'Temporary integration test',
			contentMd: `# Smoke test\n\n![](${proxyUrl})`,
			coverUrl: proxyUrl,
			category: '测试',
			tags: ['cms-smoke'],
			status: 'published',
			publishedAt: new Date().toISOString()
		})
	})
	if (created.response.status !== 201) throw new Error(`Create failed: ${created.response.status} ${JSON.stringify(created.body)}`)

	const listed = await requestJson(`${baseUrl}/api/posts`)
	if (!listed.response.ok || !Array.isArray(listed.body) || !listed.body.some((post: { slug?: string }) => post.slug === slug)) {
		throw new Error('Published post was not visible in the public list')
	}

	const media = await fetch(`${baseUrl}${proxyUrl}`)
	const mediaBytes = (await media.arrayBuffer()).byteLength
	const mediaType = media.headers.get('content-type')
	if (!media.ok || mediaType !== 'image/png' || mediaBytes !== image.byteLength) {
		throw new Error(`Private Blob proxy verification failed: status=${media.status} type=${mediaType} bytes=${mediaBytes} expected=${image.byteLength}`)
	}

	const updated = await requestJson(`${baseUrl}/api/admin/posts/${slug}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json', Cookie: cookie, Origin: baseUrl },
		body: JSON.stringify({
			slug,
			title: 'Codex CMS smoke test updated',
			summary: 'Temporary integration test',
			contentMd: `# Smoke test updated\n\n![](${proxyUrl})`,
			coverUrl: proxyUrl,
			category: '测试',
			tags: ['cms-smoke'],
			status: 'published',
			publishedAt: new Date().toISOString(),
			expectedVersion: created.body.version
		})
	})
	if (!updated.response.ok || updated.body.version !== created.body.version + 1) throw new Error('Optimistic version update failed')

	const removed = await fetch(`${baseUrl}/api/admin/posts/${slug}`, {
		method: 'DELETE',
		headers: { Cookie: cookie, Origin: baseUrl }
	})
	if (!removed.ok) throw new Error(`Delete failed: ${removed.status}`)
	const missing = await fetch(`${baseUrl}/api/posts/${slug}`)
	if (missing.status !== 404) throw new Error('Deleted post remained publicly visible')

	console.log(
		JSON.stringify(
			{
				login: true,
				articleUpload: true,
				contentUpload: true,
				articleCreateUpdateDelete: true,
				contentVersionUpdate: true,
				contentConflict: true,
				contentRestored: true,
				cacheInvalidation: true
			},
			null,
			2
		)
	)
} catch (error) {
	failure = error
} finally {
	if (originalSnippets && originalSnippetsVersion !== undefined) {
		const originalVersion = originalSnippetsVersion
		await db.transaction(async tx => {
			await tx.execute(sql`select pg_advisory_xact_lock(hashtext('snippets'))`)
			const [current] = await tx.select().from(schema.contentDocuments).where(eq(schema.contentDocuments.key, 'snippets')).for('update').limit(1)
			if (!current) return
			const changedOnlyBySmoke =
				(Array.isArray(current.data) && current.data.includes(contentMarker)) || (snippetsRestored && current.version <= originalVersion + 2)
			if (!changedOnlyBySmoke) throw new Error('Smoke cleanup refused: snippets changed concurrently')
			await tx
				.update(schema.contentDocuments)
				.set({ data: originalSnippets, version: originalVersion, updatedAt: new Date() })
				.where(eq(schema.contentDocuments.key, 'snippets'))
			await tx
				.delete(schema.contentDocumentRevisions)
				.where(and(eq(schema.contentDocumentRevisions.documentKey, 'snippets'), gt(schema.contentDocumentRevisions.version, originalVersion)))
		})
	}
	await db.delete(schema.posts).where(eq(schema.posts.slug, slug))
	await db.delete(schema.tags).where(eq(schema.tags.name, 'cms-smoke'))
	if (!testCategoryExisted) await db.delete(schema.categories).where(eq(schema.categories.name, '测试'))
	if (blobPathname) await db.delete(schema.media).where(eq(schema.media.pathname, blobPathname))
	if (contentBlobPathname) await db.delete(schema.media).where(eq(schema.media.pathname, contentBlobPathname))
	if (blobUrl) await del(blobUrl, { token: blobToken })
	if (contentBlobUrl) await del(contentBlobUrl, { token: blobToken })
	await db.$client.end()
}

if (failure) throw failure
