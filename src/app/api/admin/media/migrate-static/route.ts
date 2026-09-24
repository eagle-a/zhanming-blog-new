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

const MAX_IMAGES_PER_REQUEST = 60
const MAX_IMAGE_BYTES = 25 * 1024 * 1024
const BLOB_CACHE_MAX_AGE = 31_536_000

const requestSchema = z
	.object({
		slug: z.string().trim().min(1).max(100),
		apply: z.boolean().default(false)
	})
	.strict()

type SkippedImage = { file: string; reason: string }

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

/**
 * Upload to Blob without overwriting. Pathnames are content-addressed, so an
 * existing object already holds identical bytes and a rerun simply adopts it.
 */
async function putMigratedBlob(pathname: string, bytes: Buffer, contentType: string): Promise<{ url: string }> {
	try {
		return await put(pathname, bytes, {
			access: 'private',
			contentType,
			addRandomSuffix: false,
			allowOverwrite: false,
			cacheControlMaxAge: BLOB_CACHE_MAX_AGE
		})
	} catch (error) {
		const existing = await head(pathname).catch(() => null)
		if (existing?.pathname === pathname) return { url: existing.url }
		throw error
	}
}

export async function POST(request: Request): Promise<Response> {
	try {
		assertAdminMutationRequest(request)
		const input = requestSchema.parse(await request.json())
		const post = await getPost(input.slug, true)
		if (!post) return Response.json({ error: '文章不存在' }, { status: 404 })
		if (post.status === 'archived') return Response.json({ error: '已归档文章不支持图片迁移' }, { status: 409 })

		const references = findStaticMediaReferences(post.contentMd, post.slug)
		if (references.length > MAX_IMAGES_PER_REQUEST) {
			return Response.json({ error: `一次最多迁移 ${MAX_IMAGES_PER_REQUEST} 张图片，本次发现 ${references.length} 张` }, { status: 400 })
		}

		const origin = new URL(request.url).origin

		if (!input.apply) {
			const plan = []
			for (const reference of references) {
				let status: number | string
				try {
					const response = await fetch(new URL(reference.href, origin), {
						method: 'HEAD',
						signal: AbortSignal.timeout(20_000)
					})
					status = response.status
				} catch (error) {
					status = error instanceof Error ? error.message : 'unknown'
				}
				plan.push({ file: reference.file, from: reference.href, staticStatus: status })
			}
			return Response.json({ slug: post.slug, dryRun: true, references: references.length, version: post.version, plan })
		}

		const migrations: StaticMediaMigration[] = []
		const skipped: SkippedImage[] = []

		for (const reference of references) {
			const extension = extensionFromFileName(reference.file)
			const mimeType = extension ? mimeTypeForExtension(extension) : null
			if (!extension || !mimeType) {
				skipped.push({ file: reference.file, reason: '不是支持的图片扩展名' })
				continue
			}

			const response = await fetch(new URL(reference.href, origin), { signal: AbortSignal.timeout(30_000) })
			if (!response.ok) {
				skipped.push({ file: reference.file, reason: `静态文件返回 ${response.status}` })
				continue
			}

			const bytes = Buffer.from(await response.arrayBuffer())
			if (bytes.length === 0 || bytes.length > MAX_IMAGE_BYTES) {
				skipped.push({ file: reference.file, reason: `文件大小异常：${bytes.length} 字节` })
				continue
			}

			const sha256 = createHash('sha256').update(bytes).digest('hex')
			const pathname = buildMigratedPathname(post.slug, sha256, extension)
			const blob = await putMigratedBlob(pathname, bytes, mimeType)
			await registerPendingMedia({
				blobUrl: blob.url,
				pathname,
				sha256,
				mimeType,
				size: bytes.length,
				...(await readDimensions(bytes, mimeType))
			})
			migrations.push({ file: reference.file, href: reference.href, target: mediaProxyUrl(pathname) })
		}

		if (migrations.length === 0) {
			return Response.json({ slug: post.slug, dryRun: false, references: references.length, migrated: [], skipped })
		}

		const rewritten = rewriteStaticMedia(post.contentMd, migrations)
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
			expectedVersion: post.version
		})

		revalidateTag('posts', { expire: 0 })
		revalidateTag(`post:${post.slug}`, { expire: 0 })

		return Response.json({
			slug: post.slug,
			dryRun: false,
			references: references.length,
			replaced: rewritten.replaced,
			version: updated.version,
			migrated: migrations.map(migration => ({ file: migration.file, url: migration.target })),
			skipped
		})
	} catch (error) {
		return routeErrorResponse(error)
	}
}
