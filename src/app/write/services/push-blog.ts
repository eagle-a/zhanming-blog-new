import { upload } from '@vercel/blob/client'
import { mutate } from 'swr'
import { hashFileSHA256 } from '@/lib/file-utils'
import type { ImageItem } from '../types'
import { getFileExt } from '@/lib/utils'
import { formatDateTimeLocal } from '../stores/write-store'
import { assertValidSlug } from '@/lib/config-validation'
import { mediaProxyUrl } from '@/lib/media-url'

export type PushBlogParams = {
	form: {
		slug: string
		title: string
		md: string
		tags: string[]
		date?: string
		summary?: string
		hidden?: boolean
		category?: string
		version?: number
	}
	cover?: ImageItem | null
	images?: ImageItem[]
	mode?: 'create' | 'edit'
	originalSlug?: string | null
}

async function responseError(response: Response): Promise<string> {
	try {
		const body = (await response.json()) as { error?: string }
		return body.error || '保存失败'
	} catch {
		return '保存失败'
	}
}

export async function pushBlog(params: PushBlogParams): Promise<void> {
	const { form, cover, images, mode = 'create', originalSlug } = params
	const slug = assertValidSlug(form.slug || '')
	if (mode === 'edit' && originalSlug && originalSlug !== slug) {
		throw new Error('编辑模式下不支持修改 slug，请保持原 slug 不变')
	}

	const localImages = new Map<string, Extract<ImageItem, { type: 'file' }>>()
	for (const image of images || []) if (image.type === 'file') localImages.set(image.id, image)
	if (cover?.type === 'file') localImages.set(cover.id, cover)

	let contentMd = form.md
	let coverUrl = cover?.type === 'url' ? cover.url : undefined

	const uploadedImages = await Promise.all(
		Array.from(localImages, async ([id, image]) => {
			const sha256 = image.hash || (await hashFileSHA256(image.file))
			const pathname = `blog/${slug}/${sha256}${getFileExt(image.file.name)}`
			const blob = await upload(pathname, image.file, {
				access: 'private',
				handleUploadUrl: '/api/admin/media/upload',
				contentType: image.file.type || 'application/octet-stream',
				multipart: image.file.size > 5 * 1024 * 1024,
				clientPayload: JSON.stringify({
					slug,
					sha256,
					mimeType: image.file.type || 'image/png',
					size: image.file.size
				})
			})
			return { id, url: mediaProxyUrl(blob.pathname) }
		})
	)

	for (const { id, url } of uploadedImages) {
		contentMd = contentMd.split(`(local-image:${id})`).join(`(${url})`)
		if (cover?.type === 'file' && cover.id === id) coverUrl = url
	}

	const payload = {
		slug,
		title: form.title,
		summary: form.summary || '',
		contentMd,
		coverUrl: coverUrl || null,
		category: form.category || null,
		tags: form.tags,
		status: form.hidden ? 'draft' : 'published',
		publishedAt: form.date || formatDateTimeLocal(),
		expectedVersion: mode === 'edit' ? form.version : undefined
	}
	const endpoint = mode === 'edit' ? `/api/admin/posts/${encodeURIComponent(slug)}` : '/api/admin/posts'
	const response = await fetch(endpoint, {
		method: mode === 'edit' ? 'PATCH' : 'POST',
		headers: { 'Content-Type': 'application/json' },
		credentials: 'same-origin',
		body: JSON.stringify(payload)
	})
	if (!response.ok) throw new Error(await responseError(response))

	await Promise.all([mutate('/api/posts'), mutate('/api/posts?scope=all'), mutate('/api/categories'), mutate(`/api/posts/${encodeURIComponent(slug)}`)])
}
