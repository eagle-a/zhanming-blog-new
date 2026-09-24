import 'server-only'

import { createHash } from 'node:crypto'
import { head, put } from '@vercel/blob'
import { isAllowedMediaPathname, mediaProxyUrl } from '@/lib/media-url'
import { registerPendingMedia } from '@/lib/media-lifecycle'
import { extensionFromFileName, mimeTypeForExtension } from '@/lib/static-media-migration'

/**
 * Server-side Blob writes for administrator uploads.
 *
 * The `@vercel/blob/client` flow needs `BLOB_READ_WRITE_TOKEN`, which this
 * project does not define; `put()` resolves the store through `BLOB_STORE_ID`
 * plus the runtime OIDC token instead, so uploads keep working without it.
 *
 * The platform caps serverless request bodies at about 4.5 MB, so images larger
 * than the limit below have to be compressed before uploading.
 */

export const MAX_ADMIN_MEDIA_BYTES = 4 * 1024 * 1024
const BLOB_CACHE_MAX_AGE = 31_536_000
const CONTENT_NAMESPACES = new Set(['site', 'bloggers', 'projects', 'shares', 'pictures'])
const SLUG_PATTERN = /^[a-z0-9_-]{1,100}$/i
const SHA256_PATTERN = /^[a-f0-9]{64}$/

export type StoreAdminMediaTarget = { kind: 'blog'; slug: string } | { kind: 'content'; namespace: string }

export type StoreAdminMediaResult = {
	pathname: string
	url: string
	/** False when the image is stored but the media index row could not be written. */
	indexed: boolean
}

export class MediaStoreError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'MediaStoreError'
	}
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

export function buildAdminMediaPathname(target: StoreAdminMediaTarget, sha256: string, extension: string): string {
	const pathname = target.kind === 'blog' ? `blog/${target.slug}/${sha256}.${extension}` : `content/${target.namespace}/${sha256}.${extension}`
	if (!isAllowedMediaPathname(pathname)) throw new MediaStoreError('媒体路径不合法')
	return pathname
}

export async function storeAdminMedia(target: StoreAdminMediaTarget, input: { file: string; sha256: string; bytes: Buffer }): Promise<StoreAdminMediaResult> {
	if (target.kind === 'blog' && !SLUG_PATTERN.test(target.slug)) throw new MediaStoreError('slug 格式无效')
	if (target.kind === 'content' && !CONTENT_NAMESPACES.has(target.namespace)) throw new MediaStoreError('媒体分组无效')
	if (!input.file || input.file.includes('/') || input.file.includes('\\')) throw new MediaStoreError('文件名无效')
	if (!SHA256_PATTERN.test(input.sha256)) throw new MediaStoreError('sha256 格式无效')

	const extension = extensionFromFileName(input.file)
	const mimeType = extension ? mimeTypeForExtension(extension) : null
	if (!extension || !mimeType) throw new MediaStoreError('只支持 png / jpg / webp / avif / gif 图片')
	if (input.bytes.length === 0) throw new MediaStoreError('图片内容为空')
	if (input.bytes.length > MAX_ADMIN_MEDIA_BYTES) {
		throw new MediaStoreError(`图片超过 ${Math.round(MAX_ADMIN_MEDIA_BYTES / 1024 / 1024)} MB，请先压缩再上传`)
	}
	if (createHash('sha256').update(input.bytes).digest('hex') !== input.sha256) throw new MediaStoreError('图片内容与声明的 sha256 不一致')

	const pathname = buildAdminMediaPathname(target, input.sha256, extension)
	let url: string
	try {
		url = (
			await put(pathname, input.bytes, {
				access: 'private',
				contentType: mimeType,
				addRandomSuffix: false,
				allowOverwrite: false,
				cacheControlMaxAge: BLOB_CACHE_MAX_AGE
			})
		).url
	} catch (error) {
		// Pathnames are content-addressed, so "already exists" means the same
		// bytes are stored. Reuse them instead of failing a repeated upload.
		const existing = await head(pathname).catch(() => null)
		if (existing?.pathname !== pathname) throw error
		url = existing.url
	}

	let indexed = true
	try {
		await registerPendingMedia({
			blobUrl: url,
			pathname,
			sha256: input.sha256,
			mimeType,
			size: input.bytes.length,
			...(await readDimensions(input.bytes, mimeType))
		})
	} catch (error) {
		// The image is already stored and readable, so a media-index failure must
		// not make the upload look failed. This is what an outdated `media` table
		// looks like from here: `width`/`height` arrive in migration 0011, and
		// until that runs every insert of an image row fails.
		indexed = false
		console.error(`Media index registration failed for ${pathname}:`, error)
	}
	return { pathname, url: mediaProxyUrl(pathname), indexed }
}
