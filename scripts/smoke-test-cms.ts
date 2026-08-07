import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { del } from '@vercel/blob'
import { upload } from '@vercel/blob/client'
import { eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/neon-serverless'
import * as schema from '../src/db/schema.ts'
import { mediaProxyUrl } from '../src/lib/media-url.ts'

const baseUrl = process.env.CMS_TEST_BASE_URL || 'http://localhost:2025'
const password = process.env.CMS_TEST_PASSWORD
const databaseUrl = process.env.DATABASE_URL
const slug = 'codex-smoke-test'

if (!password) throw new Error('CMS_TEST_PASSWORD is required')
if (!databaseUrl) throw new Error('DATABASE_URL is required')

const db = drizzle(databaseUrl, { schema })
let blobUrl: string | undefined
let blobPathname: string | undefined
let failure: unknown

async function requestJson(url: string, init?: RequestInit): Promise<{ response: Response; body: any }> {
	const response = await fetch(url, init)
	const body = await response.json().catch(() => ({}))
	return { response, body }
}

try {
	const login = await requestJson(`${baseUrl}/api/admin/session`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', Origin: baseUrl },
		body: JSON.stringify({ password })
	})
	if (!login.response.ok) throw new Error(`Login failed: ${login.response.status}`)
	const cookie = login.response.headers.getSetCookie()[0]?.split(';')[0]
	if (!cookie) throw new Error('Login did not return a session cookie')

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
	if (!media.ok || media.headers.get('content-type') !== 'image/png' || (await media.arrayBuffer()).byteLength !== image.byteLength) {
		throw new Error('Private Blob proxy verification failed')
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

	console.log(JSON.stringify({ login: true, upload: true, create: true, update: true, delete: true, cacheInvalidation: true }, null, 2))
} catch (error) {
	failure = error
} finally {
	await db.delete(schema.posts).where(eq(schema.posts.slug, slug))
	await db.delete(schema.tags).where(eq(schema.tags.name, 'cms-smoke'))
	if (blobPathname) await db.delete(schema.media).where(eq(schema.media.pathname, blobPathname))
	if (blobUrl) await del(blobUrl, { token: process.env.BLOB_READ_WRITE_TOKEN })
	await db.$client.end()
}

if (failure) throw failure
