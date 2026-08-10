import { useEffect, useState } from 'react'
import type { PostSearchResult } from '@/lib/posts-repository'

type SearchState = {
	query: string
	results: PostSearchResult[]
	loading: boolean
	error: string | null
}

const DEBOUNCE_MS = 300
const MIN_QUERY_LENGTH = 1

export function useBlogSearch() {
	const [query, setQuery] = useState('')
	const [debounced, setDebounced] = useState('')
	const [results, setResults] = useState<PostSearchResult[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const handle = setTimeout(() => setDebounced(query.trim()), DEBOUNCE_MS)
		return () => clearTimeout(handle)
	}, [query])

	useEffect(() => {
		if (debounced.length < MIN_QUERY_LENGTH) {
			setResults([])
			setLoading(false)
			setError(null)
			return
		}

		const controller = new AbortController()
		setLoading(true)
		setError(null)

		fetch(`/api/search?q=${encodeURIComponent(debounced)}`, { credentials: 'same-origin', signal: controller.signal })
			.then(async res => {
				if (!res.ok) {
					const body = await res.json().catch(() => ({}))
					throw new Error(body.error || '搜索失败')
				}
				return res.json()
			})
			.then(data => {
				if (controller.signal.aborted) return
				setResults(data.results || [])
			})
			.catch(err => {
				if (controller.signal.aborted) return
				setError(err instanceof Error ? err.message : '搜索失败')
				setResults([])
			})
			.finally(() => {
				if (!controller.signal.aborted) setLoading(false)
			})

		return () => controller.abort()
	}, [debounced])

	const state: SearchState = { query, results, loading, error }
	const isSearching = query.trim().length >= MIN_QUERY_LENGTH

	return { ...state, setQuery, isSearching }
}
