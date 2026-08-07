'use client'

import useSWR from 'swr'
import { fetchContentDocument, saveContentDocument, type ClientContentDocument } from '@/lib/content-client'
import type { ContentDocumentKey } from '@/lib/content-validation'

export function useContentDocument<T>(key: ContentDocumentKey, fallback: T) {
	const { data, error, isLoading, mutate } = useSWR<ClientContentDocument<T>>(`/api/content/${key}`, () => fetchContentDocument<T>(key), {
		revalidateOnFocus: false,
		revalidateOnReconnect: true
	})

	const save = async (nextData: T): Promise<ClientContentDocument<T>> => {
		const saved = await saveContentDocument(key, nextData, data?.version ?? 0)
		await mutate(saved, { revalidate: false })
		return saved
	}

	return { data: data?.data ?? fallback, version: data?.version ?? 0, error, loading: isLoading, save }
}
