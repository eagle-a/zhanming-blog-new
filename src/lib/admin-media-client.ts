'use client'

import { hashFileSHA256 } from '@/lib/file-utils'

export type AdminMediaTarget = { kind: 'blog'; slug: string } | { kind: 'content'; namespace: string }

async function responseError(response: Response): Promise<string> {
	try {
		const body = (await response.json()) as { error?: string }
		return body.error || '图片上传失败'
	} catch {
		return '图片上传失败'
	}
}

/**
 * Upload an administrator image through `/api/admin/media/store` and return its
 * `/api/media/...` URL. The route stores the bytes server-side, so this works
 * without the `BLOB_READ_WRITE_TOKEN` that client uploads require.
 */
export async function uploadAdminMedia(target: AdminMediaTarget, file: File): Promise<string> {
	const sha256 = await hashFileSHA256(file)
	const form = new FormData()
	form.append('kind', target.kind)
	if (target.kind === 'blog') form.append('slug', target.slug)
	else form.append('namespace', target.namespace)
	form.append('file', file.name)
	form.append('sha256', sha256)
	form.append('bytes', file, file.name)

	const response = await fetch('/api/admin/media/store', { method: 'POST', body: form, credentials: 'same-origin' })
	if (!response.ok) throw new Error(await responseError(response))
	return ((await response.json()) as { url: string }).url
}
