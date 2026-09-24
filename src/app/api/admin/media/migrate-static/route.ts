import { createHash } from 'node:crypto'
import { revalidateTag } from 'next/cache'
import { head, put } from '@vercel/blob'
import { z } from 'zod'
import { assertAdminMutationRequest } from '@/lib/admin-auth'
import { registerPendingMedia } from '@/lib/media-lifecycle'
import { mediaProxyUrl } from '@/lib/media-url'
import { getPost, upsertPost } from '@/lib/posts-repository'
import { routeErrorResponse } from '@/lib/route-errors'
import {
	buildMigratedPathname,
	extensionFromFileName,
	findStaticMediaReferences,
	mimeTypeForExtension,
	rewriteStaticMedia,
	type StaticMediaMigration
} from '@/lib/static-media-migration'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Server-side Blob writes for migrating article images out of `public/images/`.
 *
 * The client upload flow in `/api/admin/media/upload` needs
 * `BLOB_READ_WRITE_TOKEN`, which this project's production environment does not
 * define; `put()` here resolves the store through `BLOB_STORE_ID` and the
 * runtime OIDC token instead. Two steps share one route:
 *
 *   multipart/form-data  -> store one image and return its content-addressed URL
 *   application/json     -> rewrite the article body to the migrated URLs
 */

const MAX_IMAGE_BYTES = 4 * 1024 * 1024
const BLOB_CACHE_MAX_AGE = 31_536_000
const SHA256_PATTERN = /^[a-f0-9]{64}$/
const SLUG_PATTERN = /^[a-z0-9_-]{1,100}$/i

const finalizeSchema = z
	.object({
		slug: z.string().trim().min(1).max(100),
		expectedVersion: z.number().int().positive(),
		replacements: z
			.array(
				z
					.object({
						href: z.string().min(1).max(2048),
						pathname: z.string().min(1).max(300)
					})
					.strict()
			)
			.min(1)
			.max(100)
	})
	.strict()

function badRequest(message: string): Response {
	return Response.json({ error: message }, { status: 400 })
}

async function readDimensions(bytes: Buffer, mimeType: string): Promise<{ width?: number; height?: number }> {
	if (!mimeType.startsWith('image/') || mimeType === 'image/svg+xml') return {}
	try {
		const { default: sharp } = await import('sharp')
		const metadata = await sharp(bytes).metadata()
		return metadata.width && metadata.height ? { width: metadata.width, height: metadata.height } : {}
	} catch {
		return {}
	}
}

async function storeImage(request: Request): Promise<Response> {
	const form = await request.formData()
	const slug = String(form.get('slug') || '')
	const file = String(form.get('file') || '')
	const sha256 = String(form.get('sha256') || '').toLowerCase()
	const upload = form.get('bytes')

	if (!SLUG_PATTERN.test(slug)) return badRequest('slug 格式无效')
	if (!file || file.includes('/') || file.includes('\\')) return badRequest('文件名无效')
	if (!SHA256_PATTERN.test(sha256)) return badRequest('sha256 格式无效')
	if (!(upload instanceof Blob)) return badRequest('缺少图片内容')

	const extension = extensionFromFileName(file)
	const mimeType = extension ? mimeTypeForExtension(extension) : null
	if (!extension || !mimeType) return badRequest('不是支持的图片扩展名')

	const bytes = Buffer.from(await upload.arrayBuffer())
	if (bytes.length === 0) return badRequest('图片内容为空')
	if (bytes.length > MAX_IMAGE_BYTES) return badRequest(`图片超过 ${MAX_IMAGE_BYTES} 字节上限`)
	if (createHash('sha256').update(bytes).digest('hex') !== sha256) return badRequest('图片内容与声明的 sha256 不一致')

	const pathname = buildMigratedPathname(slug, sha256, extension)
	let url: string
	try {
		url = (
			await put(pathname, bytes, {
				access: 'private',
				contentType: mimeType,
				addRandomSuffix: false,
				allowOverwrite: false,
				cacheControlMaxAge: BLOB_CACHE_MAX_AGE
			})
		).url
	} catch (error) {
		// Pathnames are content-addressed, so "already exists" means the same
		// bytes are stored. Reuse them instead of failing a rerun.
		const existing = await head(pathname).catch(() => null)
		if (existing?.pathname !== pathname) throw error
		url = existing.url
	}

	await registerPendingMedia({ blobUrl: url, pathname, sha256, mimeType, size: bytes.length, ...(await readDimensions(bytes, mimeType)) })
	return Response.json({ pathname, url: mediaProxyUrl(pathname) })
}

async function finalize(request: Request): Promise<Response> {
	const input = finalizeSchema.parse(await request.json())
	const post = await getPost(input.slug, true)
	if (!post) return Response.json({ error: '文章不存在' }, { status: 404 })
	if (post.status === 'archived') return Response.json({ error: '已归档文章不支持图片迁移' }, { status: 409 })
	if (post.version !== input.expectedVersion) return Response.json({ error: '文章已被其他会话修改，请重新读取后再迁移' }, { status: 409 })

	const migrations: StaticMediaMigration[] = input.replacements.map(replacement => ({
		file: replacement.href.split('/').pop() || replacement.href,
		href: replacement.href,
		target: mediaProxyUrl(replacement.pathname)
	}))
	const rewritten = rewriteStaticMedia(post.contentMd, migrations)
	if (rewritten.replaced === 0) return badRequest('正文里没有找到待替换的引用，未改动文章')

	const updated = await upsertPost({
		slug: post.slug,
		title: post.title,
		summary: post.summary ?? '',
		contentMd: rewritten.contentMd,
		coverUrl: post.cover ?? null,
		category: post.category ?? null,
		tags: post.tags,
		status: post.status === 'published' ? 'published' : 'draft',
		publishedAt: post.date,
		expectedVersion: input.expectedVersion
	})

	revalidateTag('posts', { expire: 0 })
	revalidateTag(`post:${post.slug}`, { expire: 0 })

	return Response.json({
		slug: post.slug,
		replaced: rewritten.replaced,
		version: updated.version,
		remaining: findStaticMediaReferences(updated.contentMd, post.slug).map(reference => reference.href)
	})
}

export async function POST(request: Request): Promise<Response> {
	try {
		assertAdminMutationRequest(request)
		return (request.headers.get('content-type') || '').includes('multipart/form-data') ? await storeImage(request) : await finalize(request)
	} catch (error) {
		return routeErrorResponse(error)
	}
}
