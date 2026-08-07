import { mutate } from 'swr'
import type { BlogIndexItem } from '@/app/blog/types'

export async function batchDeleteBlogs(slugs: string[], _currentItems: BlogIndexItem[] = []): Promise<void> {
	const uniqueSlugs = Array.from(new Set(slugs.filter(Boolean)))
	const responses = await Promise.all(
		uniqueSlugs.map(slug => fetch(`/api/admin/posts/${encodeURIComponent(slug)}`, { method: 'DELETE', credentials: 'same-origin' }))
	)
	const failed = responses.find(response => !response.ok)
	if (failed) {
		const body = (await failed.json().catch(() => ({}))) as { error?: string }
		throw new Error(body.error || '批量删除失败')
	}
	await Promise.all([mutate('/api/posts'), mutate('/api/posts?scope=all')])
}
