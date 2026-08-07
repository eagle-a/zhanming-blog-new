import { mutate } from 'swr'
import { assertValidSlug } from '@/lib/config-validation'

export async function deleteBlog(input: string): Promise<void> {
	const slug = assertValidSlug(input)
	const response = await fetch(`/api/admin/posts/${encodeURIComponent(slug)}`, {
		method: 'DELETE',
		credentials: 'same-origin'
	})
	if (!response.ok) {
		const body = (await response.json().catch(() => ({}))) as { error?: string }
		throw new Error(body.error || '删除失败')
	}
	await Promise.all([mutate('/api/posts'), mutate('/api/posts?scope=all'), mutate(`/api/posts/${encodeURIComponent(slug)}`)])
}
