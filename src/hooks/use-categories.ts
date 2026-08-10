'use client'

import useSWR from 'swr'

export type CategoriesConfig = {
	categories: string[]
}

const fetcher = async (url: string): Promise<CategoriesConfig> => {
	const res = await fetch(url)
	if (!res.ok) {
		return { categories: [] }
	}
	const data = await res.json()
	if (Array.isArray(data)) {
		return { categories: data.filter((item): item is string => typeof item === 'string') }
	}
	if (Array.isArray((data as any)?.categories)) {
		return { categories: (data as any).categories.filter((item: unknown): item is string => typeof item === 'string') }
	}
	return { categories: [] }
}

export function useCategories(initialCategories: string[] = []) {
	const { data, error, isLoading } = useSWR<CategoriesConfig>('/api/categories', fetcher, {
		fallbackData: { categories: initialCategories },
		revalidateOnFocus: false,
		revalidateOnReconnect: true,
		revalidateIfStale: false
	})

	return {
		categories: data?.categories ?? [],
		loading: isLoading,
		error
	}
}
