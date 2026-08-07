'use client'

import { upload } from '@vercel/blob/client'
import { mutate } from 'swr'
import { hashFileSHA256 } from '@/lib/file-utils'
import { mediaProxyUrl } from '@/lib/media-url'
import { getFileExt } from '@/lib/utils'
import type { ContentDocumentKey } from '@/lib/content-validation'

export type ClientContentDocument<T = unknown> = {
	key: ContentDocumentKey
	data: T
	version: number
	updatedAt: string | null
}

async function responseError(response: Response): Promise<string> {
	try {
		const body = (await response.json()) as { error?: string }
		return body.error || '请求失败'
	} catch {
		return '请求失败'
	}
}

export async function fetchContentDocument<T>(key: ContentDocumentKey): Promise<ClientContentDocument<T>> {
	const response = await fetch(`/api/content/${encodeURIComponent(key)}`, { credentials: 'same-origin' })
	if (!response.ok) throw new Error(await responseError(response))
	return response.json()
}

export async function saveContentDocument<T>(key: ContentDocumentKey, data: T, expectedVersion: number): Promise<ClientContentDocument<T>> {
	const response = await fetch(`/api/admin/content/${encodeURIComponent(key)}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		credentials: 'same-origin',
		body: JSON.stringify({ data, expectedVersion })
	})
	if (!response.ok) throw new Error(await responseError(response))
	const document = (await response.json()) as ClientContentDocument<T>
	await mutate(`/api/content/${key}`, document, { revalidate: false })
	return document
}

export async function saveContentDocuments(
	items: Array<{ key: ContentDocumentKey; data: unknown; expectedVersion: number }>
): Promise<ClientContentDocument[]> {
	const response = await fetch('/api/admin/content/batch', {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		credentials: 'same-origin',
		body: JSON.stringify({ items })
	})
	if (!response.ok) throw new Error(await responseError(response))
	const body = (await response.json()) as { documents: ClientContentDocument[] }
	await Promise.all(body.documents.map(document => mutate(`/api/content/${document.key}`, document, { revalidate: false })))
	return body.documents
}

export type ContentMediaNamespace = 'site' | 'bloggers' | 'projects' | 'shares' | 'pictures'

export async function uploadContentImage(namespace: ContentMediaNamespace, file: File): Promise<string> {
	const sha256 = await hashFileSHA256(file)
	const pathname = `content/${namespace}/${sha256}${getFileExt(file.name)}`
	const blob = await upload(pathname, file, {
		access: 'private',
		handleUploadUrl: '/api/admin/media/upload',
		contentType: file.type || 'image/png',
		multipart: file.size > 5 * 1024 * 1024,
		clientPayload: JSON.stringify({ namespace, sha256, mimeType: file.type || 'image/png', size: file.size })
	})
	return mediaProxyUrl(blob.pathname)
}
