'use client'

import useSWR, { mutate } from 'swr'

type SessionResponse = { authenticated: boolean }

async function fetchSession(url: string): Promise<SessionResponse> {
	const response = await fetch(url, { cache: 'no-store', credentials: 'same-origin' })
	if (!response.ok) return { authenticated: false }
	return response.json()
}

async function readError(response: Response): Promise<string> {
	try {
		const body = (await response.json()) as { error?: string }
		return body.error || '请求失败'
	} catch {
		return '请求失败'
	}
}

export function useAdminSession() {
	const { data, isLoading } = useSWR<SessionResponse>('/api/admin/session', fetchSession, {
		revalidateOnFocus: false,
		revalidateOnReconnect: true
	})

	const login = async (password: string): Promise<void> => {
		const response = await fetch('/api/admin/session', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'same-origin',
			body: JSON.stringify({ password })
		})
		if (!response.ok) throw new Error(await readError(response))
		await mutate('/api/admin/session', { authenticated: true }, { revalidate: false })
		await Promise.all([mutate('/api/posts'), mutate('/api/posts?scope=all')])
	}

	const logout = async (): Promise<void> => {
		await fetch('/api/admin/session', { method: 'DELETE', credentials: 'same-origin' })
		await mutate('/api/admin/session', { authenticated: false }, { revalidate: false })
		await Promise.all([mutate('/api/posts'), mutate('/api/posts?scope=all')])
	}

	return { isAuth: data?.authenticated === true, loading: isLoading, login, logout }
}
