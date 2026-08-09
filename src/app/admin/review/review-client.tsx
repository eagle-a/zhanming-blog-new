'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { useAdminSession } from '@/hooks/use-admin-session'
import { useMarkdownRender } from '@/hooks/use-markdown-render'
import type { AgentPostSubmission, SubmissionFinding } from '@/lib/agent-submission-validation'

type Submission = {
	id: string
	type: 'post'
	status: 'staging' | 'pending' | 'approved' | 'rejected'
	payload: AgentPostSubmission
	validationResult: SubmissionFinding[]
	createdAt: string
	updatedAt: string
	reviewedAt?: string | null
	rejectionReason?: string | null
	agentName: string
}

type SubmissionTicket = {
	id: number
	label: string
	scope: 'posts:submit'
	createdAt: string
	expiresAt: string
	usedAt?: string | null
	revokedAt?: string | null
}

type CreatedTicket = SubmissionTicket & { token: string }

function ticketStatus(ticket: SubmissionTicket): { label: string; className: string; active: boolean } {
	if (ticket.usedAt) return { label: '已使用', className: 'text-emerald-700', active: false }
	if (ticket.revokedAt) return { label: '已撤销', className: 'text-red-600', active: false }
	if (new Date(ticket.expiresAt).getTime() <= Date.now()) return { label: '已过期', className: 'text-secondary', active: false }
	return { label: '可使用', className: 'text-amber-700', active: true }
}

async function responseJson<T>(response: Response): Promise<T> {
	const body = (await response.json().catch(() => ({}))) as { error?: string } & T
	if (!response.ok) throw new Error(body.error || `请求失败 (${response.status})`)
	return body
}

function MarkdownPreview({ payload }: { payload: AgentPostSubmission }) {
	const { content, loading } = useMarkdownRender(payload.contentMd)
	return (
		<article className='bg-article min-h-[360px] rounded-xl border p-6'>
			<h1 className='text-2xl font-semibold'>{payload.title}</h1>
			<p className='text-secondary mt-2 text-sm'>{payload.summary}</p>
			{loading ? <p className='text-secondary mt-8 text-sm'>渲染中...</p> : <div className='prose mt-6'>{content}</div>}
		</article>
	)
}

export default function ReviewClient() {
	const { isAuth, loading: authLoading, login } = useAdminSession()
	const [password, setPassword] = useState('')
	const [submissions, setSubmissions] = useState<Submission[]>([])
	const [selectedId, setSelectedId] = useState<string | null>(null)
	const [draft, setDraft] = useState<AgentPostSubmission | null>(null)
	const [tickets, setTickets] = useState<SubmissionTicket[]>([])
	const [ticketLabel, setTicketLabel] = useState('本地 AI 单篇投稿')
	const [createdTicket, setCreatedTicket] = useState<CreatedTicket | null>(null)
	const [tab, setTab] = useState<'review' | 'tickets'>('review')
	const [busy, setBusy] = useState(false)

	const selected = useMemo(() => submissions.find(item => item.id === selectedId) || null, [selectedId, submissions])

	const loadData = useCallback(async () => {
		const [reviewData, ticketData] = await Promise.all([
			fetch('/api/admin/review?status=pending', { cache: 'no-store' }).then(responseJson<Submission[]>),
			fetch('/api/admin/submission-tickets', { cache: 'no-store' }).then(responseJson<SubmissionTicket[]>)
		])
		setSubmissions(reviewData)
		setTickets(ticketData)
		setSelectedId(current => (current && reviewData.some(item => item.id === current) ? current : reviewData[0]?.id || null))
	}, [])

	useEffect(() => {
		if (!isAuth) return
		loadData().catch(error => toast.error(error instanceof Error ? error.message : '后台数据加载失败'))
	}, [isAuth, loadData])

	useEffect(() => {
		if (!isAuth) return
		const timer = window.setInterval(() => {
			if (document.visibilityState === 'visible') loadData().catch(() => undefined)
		}, 15_000)
		return () => window.clearInterval(timer)
	}, [isAuth, loadData])

	useEffect(() => {
		setDraft(selected?.payload || null)
	}, [selectedId])

	const submitLogin = async (event: React.FormEvent) => {
		event.preventDefault()
		try {
			await login(password)
			setPassword('')
		} catch (error) {
			toast.error(error instanceof Error ? error.message : '登录失败')
		}
	}

	const saveDraft = async () => {
		if (!selected || !draft) return
		await responseJson(
			await fetch(`/api/admin/review/${selected.id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(draft)
			})
		)
	}

	const approve = async () => {
		if (!selected || !draft) return
		try {
			setBusy(true)
			await saveDraft()
			await responseJson(await fetch(`/api/admin/review/${selected.id}/approve`, { method: 'POST' }))
			toast.success('已批准并发布')
			await loadData()
		} catch (error) {
			toast.error(error instanceof Error ? error.message : '批准失败')
		} finally {
			setBusy(false)
		}
	}

	const reject = async () => {
		if (!selected) return
		const reason = window.prompt('请输入拒绝原因')?.trim()
		if (!reason) return
		try {
			setBusy(true)
			await responseJson(
				await fetch(`/api/admin/review/${selected.id}/reject`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ reason })
				})
			)
			toast.success('已拒绝投稿')
			await loadData()
		} catch (error) {
			toast.error(error instanceof Error ? error.message : '拒绝失败')
		} finally {
			setBusy(false)
		}
	}

	const createTicket = async () => {
		try {
			setBusy(true)
			const result = await responseJson<CreatedTicket>(
				await fetch('/api/admin/submission-tickets', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ label: ticketLabel })
				})
			)
			setCreatedTicket(result)
			try {
				await navigator.clipboard.writeText(result.token)
				toast.success('一次性投稿码已生成并复制')
			} catch {
				toast.success('一次性投稿码已生成，请手动复制')
			}
			await loadData()
		} catch (error) {
			toast.error(error instanceof Error ? error.message : '投稿码生成失败')
		} finally {
			setBusy(false)
		}
	}

	const copyTicket = async () => {
		if (!createdTicket) return
		try {
			await navigator.clipboard.writeText(createdTicket.token)
			toast.success('投稿码已复制')
		} catch {
			toast.error('浏览器无法访问剪贴板，请手动复制')
		}
	}

	const revokeTicket = async (id: number) => {
		if (!window.confirm('撤销后这个一次性投稿码将立即失效，确定撤销？')) return
		try {
			await responseJson(await fetch(`/api/admin/submission-tickets/${id}`, { method: 'DELETE' }))
			if (createdTicket?.id === id) setCreatedTicket(null)
			await loadData()
		} catch (error) {
			toast.error(error instanceof Error ? error.message : '投稿码撤销失败')
		}
	}

	if (authLoading) return <div className='text-secondary flex min-h-[70vh] items-center justify-center text-sm'>正在检查后台会话...</div>
	if (!isAuth) {
		return (
			<div className='flex min-h-[75vh] items-center justify-center px-6'>
				<form onSubmit={submitLogin} className='card static w-full max-w-sm space-y-4 p-6'>
					<h1 className='text-xl font-semibold'>AI 投稿审批后台</h1>
					<label htmlFor='review-admin-username' className='sr-only'>
						管理员账号
					</label>
					<input id='review-admin-username' name='username' type='text' value='admin' readOnly autoComplete='username' tabIndex={-1} className='sr-only' />
					<label htmlFor='review-admin-password' className='text-secondary block text-sm'>
						管理员密码
					</label>
					<input
						id='review-admin-password'
						name='password'
						type='password'
						value={password}
						onChange={event => setPassword(event.target.value)}
						autoComplete='current-password'
						className='w-full rounded-xl border bg-white/70 px-4 py-3 text-sm'
					/>
					<button type='submit' className='brand-btn w-full px-5 py-2'>
						登录
					</button>
				</form>
			</div>
		)
	}

	return (
		<div className='mx-auto min-h-screen max-w-[1400px] px-6 pt-24 pb-16'>
			<header className='mb-6 flex flex-wrap items-center justify-between gap-4'>
				<div>
					<h1 className='text-2xl font-semibold'>AI 投稿审批后台</h1>
					<p className='text-secondary mt-1 text-sm'>AI 只能投稿；批准后内容才会公开。</p>
				</div>
				<div className='flex gap-2'>
					<button onClick={() => loadData().catch(error => toast.error(error instanceof Error ? error.message : '刷新失败'))} className='rounded-xl border bg-white/60 px-4 py-2 text-sm'>
						刷新
					</button>
					<button onClick={() => setTab('review')} className={tab === 'review' ? 'brand-btn px-4 py-2' : 'rounded-xl border bg-white/60 px-4 py-2 text-sm'}>
						待审批 ({submissions.length})
					</button>
					<button onClick={() => setTab('tickets')} className={tab === 'tickets' ? 'brand-btn px-4 py-2' : 'rounded-xl border bg-white/60 px-4 py-2 text-sm'}>
						一次性投稿码
					</button>
				</div>
			</header>

			{tab === 'tickets' ? (
				<div className='grid gap-6 lg:grid-cols-[420px_1fr]'>
					<section className='card static space-y-4 p-6'>
						<h2 className='font-semibold'>生成单篇投稿码</h2>
						<input value={ticketLabel} onChange={event => setTicketLabel(event.target.value)} className='w-full rounded-xl border bg-white/70 px-4 py-3 text-sm' />
						<p className='text-secondary text-xs'>有效期 30 分钟，只能成功投稿一次，权限固定为 posts:submit。投稿仍只进入待审批队列。</p>
						<button disabled={busy || !ticketLabel.trim()} onClick={createTicket} className='brand-btn px-5 py-2 disabled:opacity-50'>
							{busy ? '生成中...' : '生成并复制投稿码'}
						</button>
						{createdTicket && (
							<div className='rounded-xl border border-emerald-300 bg-emerald-50 p-4'>
								<p className='text-sm font-medium text-emerald-900'>投稿码只显示这一次</p>
								<p className='mt-1 text-xs text-emerald-800'>刷新页面后无法找回；丢失就撤销并重新生成。</p>
								<code className='mt-3 block rounded-lg bg-white/70 p-3 font-mono text-xs break-all text-emerald-900'>{createdTicket.token}</code>
								<button onClick={copyTicket} className='mt-3 rounded-lg border border-emerald-300 bg-white px-3 py-1.5 text-xs text-emerald-800'>
									复制投稿码
								</button>
							</div>
						)}
					</section>
					<section className='card static p-6'>
						<h2 className='mb-4 font-semibold'>最近投稿码</h2>
						<div className='space-y-3'>
							{tickets.map(ticket => {
								const status = ticketStatus(ticket)
								return (
									<div key={ticket.id} className='flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-white/50 p-4'>
										<div>
											<div className='font-medium'>{ticket.label}</div>
											<div className='text-secondary mt-1 text-xs'>到期：{new Date(ticket.expiresAt).toLocaleString('zh-CN')} · {ticket.scope}</div>
										</div>
										<div className='flex items-center gap-3'>
											<span className={`text-xs ${status.className}`}>{status.label}</span>
											{status.active ? (
												<button onClick={() => revokeTicket(ticket.id)} className='rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs text-red-600'>
													撤销
												</button>
											) : null}
										</div>
									</div>
								)
							})}
							{tickets.length === 0 && <p className='text-secondary text-sm'>还没有生成投稿码。</p>}
						</div>
					</section>
				</div>
			) : submissions.length === 0 ? (
				<div className='card static py-20 text-center'>
					<p className='text-secondary text-sm'>当前没有待审批投稿。</p>
				</div>
			) : (
				<div className='grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]'>
					<aside className='card static max-h-[calc(100vh-160px)] space-y-2 overflow-auto p-3'>
						{submissions.map(item => (
							<button
								key={item.id}
								onClick={() => setSelectedId(item.id)}
								className={`w-full rounded-xl border p-4 text-left ${item.id === selectedId ? 'border-brand bg-white/80' : 'border-transparent bg-white/40'}`}>
								<div className='truncate font-medium'>{item.payload.title}</div>
								<div className='text-secondary mt-1 truncate text-xs'>
									{item.payload.slug} · {item.agentName}
								</div>
								<div className='text-secondary mt-2 text-xs'>{new Date(item.createdAt).toLocaleString('zh-CN')}</div>
							</button>
						))}
					</aside>

					{selected && draft && (
						<main className='space-y-6'>
							{selected.validationResult.length > 0 && (
								<div className='rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900'>
									{selected.validationResult.map(finding => (
										<div key={finding.code}>{finding.message}</div>
									))}
								</div>
							)}
							<section className='card static grid gap-4 p-6 md:grid-cols-2'>
								<label className='text-sm'>
									标题
									<input
										value={draft.title}
										onChange={event => setDraft({ ...draft, title: event.target.value })}
										className='mt-1 w-full rounded-xl border bg-white/70 px-3 py-2'
									/>
								</label>
								<label className='text-sm'>
									Slug
									<input
										value={draft.slug}
										onChange={event => setDraft({ ...draft, slug: event.target.value })}
										className='mt-1 w-full rounded-xl border bg-white/70 px-3 py-2'
									/>
								</label>
								<label className='text-sm md:col-span-2'>
									摘要
									<textarea
										value={draft.summary}
										onChange={event => setDraft({ ...draft, summary: event.target.value })}
										className='mt-1 h-20 w-full rounded-xl border bg-white/70 p-3'
									/>
								</label>
								<label className='text-sm'>
									分类
									<input
										value={draft.category || ''}
										onChange={event => setDraft({ ...draft, category: event.target.value || null })}
										className='mt-1 w-full rounded-xl border bg-white/70 px-3 py-2'
									/>
								</label>
								<label className='text-sm'>
									标签（逗号分隔）
									<input
										value={draft.tags.join(', ')}
										onChange={event =>
											setDraft({
												...draft,
												tags: event.target.value
													.split(',')
													.map(value => value.trim())
													.filter(Boolean)
											})
										}
										className='mt-1 w-full rounded-xl border bg-white/70 px-3 py-2'
									/>
								</label>
								<label className='text-sm md:col-span-2'>
									Markdown
									<textarea
										value={draft.contentMd}
										onChange={event => setDraft({ ...draft, contentMd: event.target.value })}
										className='mt-1 h-[420px] w-full rounded-xl border bg-white/70 p-4 font-mono text-sm'
									/>
								</label>
								<div className='flex flex-wrap gap-3 md:col-span-2'>
									<button disabled={busy} onClick={approve} className='brand-btn px-5 py-2 disabled:opacity-50'>
										{busy ? '处理中...' : '保存并批准发布'}
									</button>
									<button
										disabled={busy}
										onClick={reject}
										className='rounded-xl border border-red-200 bg-red-50 px-5 py-2 text-sm text-red-600 disabled:opacity-50'>
										拒绝
									</button>
								</div>
							</section>
							<MarkdownPreview payload={draft} />
						</main>
					)}
				</div>
			)}
		</div>
	)
}
