'use client'

import { useAdminSession } from '@/hooks/use-admin-session'
import { toast } from 'sonner'

export function useAdminAction() {
	const { isAuth, loading, login, logout } = useAdminSession()

	const runAuthenticated = async (action: () => Promise<void>): Promise<void> => {
		try {
			if (!isAuth) {
				const password = window.prompt('请输入后台管理密码')
				if (!password) return
				await login(password)
			}
			await action()
		} catch (error) {
			toast.error(error instanceof Error ? error.message : '登录失败')
		}
	}

	return { isAuth, loading, login, logout, runAuthenticated }
}
