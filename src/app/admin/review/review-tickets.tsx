'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { responseJson } from './review-http'
import { ReviewDialog } from './review-dialog'
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

export default function ReviewTickets({ busy, beginAction, endAction }: { busy: boolean; beginAction: () => boolean; endAction: () => void }) {
	const [tickets, setTickets] = useState<SubmissionTicket[]>([])
	const [ticketLabel, setTicketLabel] = useState('本地 AI 单篇投稿')
	const [createdTicket, setCreatedTicket] = useState<CreatedTicket | null>(null)
	const [revokeId, setRevokeId] = useState<number | null>(null)
	const [loadError, setLoadError] = useState('')
	const [loading, setLoading] = useState(true)
	const busyRef = useRef(busy)
	busyRef.current = busy
	const sequence = useRef(0)
	const loadData = useCallback(async () => {
		const version = ++sequence.current
		try {
			const data = await fetch('/api/admin/submission-tickets', { cache: 'no-store' }).then(responseJson<SubmissionTicket[]>)
			if (version === sequence.current) {
				setTickets(data)
				setLoadError('')
			}
		} catch (error) {
			if (version === sequence.current) setLoadError(error instanceof Error ? error.message : '加载失败')
			throw error
		} finally {
			if (version === sequence.current) setLoading(false)
		}
	}, [])
	useEffect(() => {
		void loadData().catch(() => undefined)
		const timer = window.setInterval(() => {
			if (!busyRef.current && document.visibilityState === 'visible') void loadData().catch(() => undefined)
		}, 15000)
		return () => {
			window.clearInterval(timer)
			sequence.current++
		}
	}, [loadData])
	const createTicket = async () => {
		if (!beginAction()) return
		sequence.current++
		try {
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
			await loadData().catch(() => toast.error('投稿码已生成，但列表刷新失败'))
		} catch (error) {
			toast.error(error instanceof Error ? error.message : '投稿码生成失败')
		} finally {
			endAction()
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
		if (busyRef.current) return
		if (!beginAction()) return
		sequence.current++
		try {
			await responseJson(await fetch(`/api/admin/submission-tickets/${id}`, { method: 'DELETE' }))
			if (createdTicket?.id === id) setCreatedTicket(null)
			setRevokeId(null)
			toast.success('投稿码已撤销')
			await loadData().catch(() => toast.error('投稿码已撤销，但列表刷新失败'))
		} catch (error) {
			toast.error(error instanceof Error ? error.message : '投稿码撤销失败')
		} finally {
			endAction()
		}
	}

	return (
		<>
			{loadError && (
				<p role='alert' className='mb-4 text-red-600'>
					投稿码加载失败：{loadError} <button onClick={() => void loadData().catch(() => undefined)}>重试</button>
				</p>
			)}
			{loading && <p role='status'>正在加载投稿码...</p>}
			<div className='grid gap-6 lg:grid-cols-[420px_1fr]'>
				<section className='card static space-y-4 p-6'>
					<h2 className='font-semibold'>生成单篇投稿码</h2>
					<input
						aria-label='投稿码名称'
						maxLength={100}
						value={ticketLabel}
						onChange={event => setTicketLabel(event.target.value)}
						className='w-full rounded-xl border bg-white/70 px-4 py-3 text-sm'
					/>
					<p className='text-secondary text-xs'>有效期 30 分钟，只能成功投稿一次，权限固定为 posts:submit。投稿仍只进入待审批队列。</p>
					<button disabled={busy || !ticketLabel.trim()} onClick={createTicket} className='brand-btn px-5 py-2 disabled:opacity-50'>
						{busy ? '生成中...' : '生成并复制投稿码'}
					</button>
					{createdTicket && (
						<div className='rounded-xl border border-emerald-300 bg-emerald-50 p-4'>
							<p className='text-sm font-medium text-emerald-900'>投稿码只显示这一次</p>
							<p className='mt-1 text-xs text-emerald-800'>离开此页或刷新后无法找回；丢失就撤销并重新生成。</p>
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
										<div className='text-secondary mt-1 text-xs'>
											到期：{new Date(ticket.expiresAt).toLocaleString('zh-CN')} · {ticket.scope}
										</div>
									</div>
									<div className='flex items-center gap-3'>
										<span className={`text-xs ${status.className}`}>{status.label}</span>
										{status.active ? (
											<button
												disabled={busy}
												onClick={() => setRevokeId(ticket.id)}
												className='rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs text-red-600'>
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
			{revokeId !== null && (
				<ReviewDialog title='撤销投稿码？' busy={busy} onClose={() => setRevokeId(null)}>
					<p className='mt-4 text-sm'>撤销后，此投稿码将立即失效。</p>
					<div className='mt-5 flex justify-end gap-3'>
						<button disabled={busy} onClick={() => setRevokeId(null)} className='rounded-xl border px-4 py-2'>
							取消
						</button>
						<button disabled={busy} onClick={() => revokeTicket(revokeId)} className='rounded-xl bg-red-600 px-4 py-2 text-white'>
							确认撤销
						</button>
					</div>
				</ReviewDialog>
			)}
		</>
	)
}
