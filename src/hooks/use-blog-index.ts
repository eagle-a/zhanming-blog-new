import useSWR from 'swr'
import type { BlogIndexItem } from '@/app/blog/types'
import { useAdminSession } from '@/hooks/use-admin-session'

export type { BlogIndexItem } from '@/app/blog/types'

// 改进 fetcher，抛出状态码以便处理 404
const fetcher = async (url: string) => {
	const res = await fetch(url)
	if (!res.ok) {
		const error = new Error('Fetch failed') as Error & { status: number }
		error.status = res.status
		throw error
	}
	const data = await res.json()
	return Array.isArray(data) ? data : []
}

function usePostIndex(endpoint: string, initialItems: BlogIndexItem[] = []) {
	const hasInitialItems = initialItems.length > 0
	const { data, error, isLoading } = useSWR<BlogIndexItem[]>(endpoint, fetcher, {
		fallbackData: hasInitialItems ? initialItems : undefined,
		revalidateOnFocus: false,
		revalidateOnReconnect: true,
		revalidateIfStale: false,
		revalidateOnMount: !hasInitialItems
	})

	return {
		items: data || [],
		loading: isLoading && !(data?.length || initialItems.length),
		error
	}
}

export function useBlogIndex(initialItems: BlogIndexItem[] = []) {
	const { isAuth } = useAdminSession()
	const endpoint = isAuth ? '/api/posts?scope=all' : '/api/posts'
	return usePostIndex(endpoint, isAuth ? [] : initialItems)
}

export function useLatestBlog() {
	const { items, loading, error } = usePostIndex('/api/posts')

	const latestBlog = items.length > 0 ? [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0] : null

	return {
		blog: latestBlog,
		loading,
		error
	}
}
