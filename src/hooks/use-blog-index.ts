import useSWR from 'swr'
import type { BlogIndexItem } from '@/app/blog/types'
import { useAdminSession } from '@/hooks/use-admin-session'

export type { BlogIndexItem } from '@/app/blog/types'

// 改进 fetcher，抛出状态码以便处理 404
const fetcher = async (url: string) => {
	const res = await fetch(url, { cache: 'no-store' })
	if (!res.ok) {
		const error: any = new Error('Fetch failed')
		error.status = res.status
		throw error
	}
	const data = await res.json()
	return Array.isArray(data) ? data : []
}

export function useBlogIndex(initialItems: BlogIndexItem[] = []) {
	const { isAuth } = useAdminSession()
	const endpoint = isAuth ? '/api/posts?scope=all' : '/api/posts'
	const { data, error, isLoading } = useSWR<BlogIndexItem[]>(endpoint, fetcher, {
		fallbackData: initialItems,
		revalidateOnFocus: false,
		revalidateOnReconnect: true
	})

	return {
		items: data || [],
		loading: isLoading && !(data?.length || initialItems.length),
		error
	}
}

export function useLatestBlog() {
	const { items, loading, error } = useBlogIndex()

	const latestBlog = items.length > 0 ? [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0] : null

	return {
		blog: latestBlog,
		loading,
		error
	}
}
