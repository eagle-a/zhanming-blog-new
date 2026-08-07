import { mutate } from 'swr'
import type { BlogIndexItem } from '@/app/blog/types'

export async function saveBlogEdits(originalItems: BlogIndexItem[], nextItems: BlogIndexItem[], categories: string[]): Promise<void> {
	const removedSlugs = originalItems.filter(item => !nextItems.some(next => next.slug === item.slug)).map(item => item.slug)
	const assignments = nextItems.map(item => ({ slug: item.slug, category: item.category || null }))
	const response = await fetch('/api/admin/posts/batch', {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		credentials: 'same-origin',
		body: JSON.stringify({ removedSlugs, assignments, categories })
	})
	if (!response.ok) {
		const body = (await response.json().catch(() => ({}))) as { error?: string }
		throw new Error(body.error || '保存失败')
	}
	await Promise.all([mutate('/api/posts'), mutate('/api/posts?scope=all'), mutate('/api/categories')])
}
