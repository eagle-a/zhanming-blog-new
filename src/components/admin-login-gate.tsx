'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useAdminSession } from '@/hooks/use-admin-session'

export function AdminLoginGate({ title = '文章编辑器' }: { title?: string }) {
	const router = useRouter()
	const { login } = useAdminSession()
	const [password, setPassword] = useState('')
	const [busy, setBusy] = useState(false)

	const submit = async (event: React.FormEvent) => {
		event.preventDefault()
		try {
			setBusy(true)
			await login(password)
			setPassword('')
			router.refresh()
		} catch (error) {
			toast.error(error instanceof Error ? error.message : '登录失败')
		} finally {
			setBusy(false)
		}
	}

	return (
		<div className='flex min-h-screen items-center justify-center px-6'>
			<form onSubmit={submit} className='card static w-full max-w-sm space-y-4 p-6'>
				<h1 className='text-xl font-semibold'>{title}</h1>
				<p className='text-secondary text-sm'>此页面只对管理员开放。</p>
				<label htmlFor='write-admin-username' className='sr-only'>
					管理员账号
				</label>
				<input id='write-admin-username' name='username' type='text' value='admin' readOnly autoComplete='username' tabIndex={-1} className='sr-only' />
				<label htmlFor='write-admin-password' className='block space-y-2'>
					<span className='text-sm'>管理员密码</span>
					<input
						id='write-admin-password'
						type='password'
						name='password'
						autoComplete='current-password'
						value={password}
						onChange={event => setPassword(event.target.value)}
						required
						className='w-full rounded-xl border bg-white/70 px-3 py-2 outline-none focus:border-brand'
					/>
				</label>
				<button type='submit' disabled={busy} className='brand-btn w-full px-4 py-2 disabled:opacity-60'>
					{busy ? '登录中…' : '登录'}
				</button>
			</form>
		</div>
	)
}
