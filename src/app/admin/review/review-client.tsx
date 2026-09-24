'use client'

import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useAdminSession } from '@/hooks/use-admin-session'
import { responseJson } from './review-http'
import type { AgentPostSubmission } from '@/lib/agent-submission-validation'
import { describeRemaining, fromLocalDateTimeInput, publicationSchedule, toLocalDateTimeInput } from '@/lib/publication-schedule'
import { ReviewDialog } from './review-dialog'
import {
	createReviewDraft,
	isReviewDirty,
	receiveReviewDraft,
	reviewPayload,
	type ReviewDraft,
	type Submission,
	type SubmissionSummary,
	type SubmissionPage
} from './review-state'
import type { ReviewCursor } from '@/lib/review-validation'

const MarkdownPreview = lazy(() => import('./review-preview'))
const ReviewTickets = lazy(() => import('./review-tickets'))

export default function ReviewClient() {
	const { isAuth, loading: authLoading, login } = useAdminSession()
	const [password, setPassword] = useState('')
	const [submissions, setSubmissions] = useState<SubmissionSummary[]>([])
	const [serverSelected, setServerSelected] = useState<Submission | null>(null)
	const [detailError, setDetailError] = useState('')
	const [detailRetry, setDetailRetry] = useState(0)
	const [cursorStack, setCursorStack] = useState<Array<ReviewCursor | null>>([null])
	const [pageIndex, setPageIndex] = useState(0)
	const [nextCursor, setNextCursor] = useState<ReviewCursor | null>(null)
	const [pageTarget, setPageTarget] = useState<number | null>(null)
	const cursor = cursorStack[pageIndex]
	const [selectedId, setSelectedId] = useState<string | null>(null)
	const [edit, setEdit] = useState<ReviewDraft | null>(null)
	const [rejectDialogOpen, setRejectDialogOpen] = useState(false)
	const [rejectionReason, setRejectionReason] = useState('')
	const [tab, setTab] = useState<'review' | 'tickets'>('review')
	const [busy, setBusy] = useState(false)
	const busyRef = useRef(false)
	const loadSequence = useRef(0)
	const [loadingData, setLoadingData] = useState(true)
	const [loadError, setLoadError] = useState('')
	const [switchTarget, setSwitchTarget] = useState<string | null>(null)
	const [reloadDialog, setReloadDialog] = useState(false)
	const [approveDialog, setApproveDialog] = useState(false)
	const [publishedAtText, setPublishedAtText] = useState('')
	const draft = edit?.payload || null
	const dirty = isReviewDirty(edit)
	const schedule = draft ? publicationSchedule(draft.publishedAt) : null
	const setDraft = (payload: AgentPostSubmission) => setEdit(current => (current ? { ...current, payload } : current))

	const summaryHash = submissions.find(item => item.id === selectedId)?.contentHash
	const selected = (serverSelected?.id === selectedId ? serverSelected : null) || (edit?.source.id === selectedId ? edit.source : null)
	const conflict =
		!!edit &&
		edit.source.id === selectedId &&
		(!serverSelected ||
			serverSelected.status !== 'pending' ||
			serverSelected.contentHash !== edit.source.contentHash ||
			(!!summaryHash && summaryHash !== edit.source.contentHash))

	const loadData = useCallback(async () => {
		const sequence = ++loadSequence.current
		try {
			const reviewData = await fetch(`/api/admin/review?status=pending&limit=20${cursor ? `&cursor=${encodeURIComponent(JSON.stringify(cursor))}` : ''}`, {
				cache: 'no-store'
			}).then(responseJson<SubmissionPage>)
			if (sequence !== loadSequence.current) return
			setSubmissions(reviewData.items)
			setNextCursor(reviewData.nextCursor)
			setSelectedId(current => current || reviewData.items[0]?.id || null)
			setLoadError('')
		} catch (error) {
			if (sequence === loadSequence.current) setLoadError(error instanceof Error ? error.message : '后台数据加载失败')
			throw error
		} finally {
			if (sequence === loadSequence.current) setLoadingData(false)
		}
	}, [cursor])

	useEffect(() => {
		if (!isAuth || !selectedId || busy) return
		const controller = new AbortController()
		setDetailError('')
		fetch(`/api/admin/review/${selectedId}`, { cache: 'no-store', signal: controller.signal })
			.then(async response => (response.status === 404 ? null : responseJson<Submission>(response)))
			.then(value => {
				if (!controller.signal.aborted) {
					setServerSelected(value)
					if (!value) setDetailError('投稿不存在，请选择其他投稿')
					else if (value.status !== 'pending') setDetailError('投稿已经处理，请选择其他投稿')
				}
			})
			.catch(error => {
				if (!controller.signal.aborted) setDetailError(error instanceof Error ? error.message : '正文加载失败')
			})
		return () => controller.abort()
	}, [isAuth, selectedId, summaryHash, busy, detailRetry])

	useEffect(() => {
		if (!isAuth) return
		loadData().catch(error => toast.error(error instanceof Error ? error.message : '后台数据加载失败'))
	}, [isAuth, loadData])

	useEffect(() => {
		if (!isAuth) return
		const timer = window.setInterval(() => {
			if (document.visibilityState === 'visible' && !busyRef.current) loadData().catch(() => undefined)
		}, 15_000)
		return () => window.clearInterval(timer)
	}, [isAuth, loadData])

	useEffect(() => {
		if (serverSelected?.id === selectedId && serverSelected.status === 'pending')
			setEdit(current => receiveReviewDraft(current, serverSelected, busy || rejectDialogOpen || approveDialog))
	}, [selectedId, serverSelected, busy, rejectDialogOpen, approveDialog])

	useEffect(() => {
		if (!dirty && !busy) return
		const handler = (event: BeforeUnloadEvent) => {
			event.preventDefault()
			event.returnValue = ''
		}
		window.addEventListener('beforeunload', handler)
		return () => window.removeEventListener('beforeunload', handler)
	}, [dirty, busy])

	// The publish-time field keeps its own text buffer: a half-typed datetime-local
	// value reports an empty string, and that must never overwrite the stored time.
	useEffect(() => {
		if (draft?.publishedAt) setPublishedAtText(toLocalDateTimeInput(draft.publishedAt))
	}, [draft?.publishedAt])

	const beginAction = () => {
		if (busyRef.current) return false
		busyRef.current = true
		loadSequence.current += 1 // Ignore any poll started before this mutation.
		setBusy(true)
		return true
	}
	const endAction = () => {
		busyRef.current = false
		setBusy(false)
	}
	const chooseSubmission = (id: string) => {
		if (busyRef.current || id === selectedId) return
		if (dirty) {
			setSwitchTarget(id)
			return
		}
		setSelectedId(id)
		setRejectionReason('')
	}
	const goToPage = (index: number) => {
		if (busyRef.current) return
		if (dirty) {
			setPageTarget(index)
			return
		}
		applyPage(index)
	}
	const applyPage = (index: number) => {
		loadSequence.current += 1
		if (index > pageIndex && nextCursor) setCursorStack(current => [...current.slice(0, pageIndex + 1), nextCursor])
		setPageIndex(index)
		setSelectedId(null)
		setServerSelected(null)
		setEdit(null)
		setLoadingData(true)
		setPageTarget(null)
		setRejectionReason('')
	}

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
		if (!edit) throw new Error('请先选择投稿')
		const saved = await responseJson<Pick<Submission, 'id' | 'payload' | 'contentHash' | 'updatedAt' | 'validationResult'>>(
			await fetch(`/api/admin/review/${edit.source.id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ payload: reviewPayload(edit), expectedContentHash: edit.source.contentHash })
			})
		)
		const source = { ...edit.source, ...saved }
		setSubmissions(current =>
			current.map(item => (item.id === source.id ? { ...item, contentHash: source.contentHash, title: source.payload.title, slug: source.payload.slug } : item))
		)
		setServerSelected(source)
		setEdit(createReviewDraft(source))
		return source
	}

	const approve = async () => {
		if (!selected || !draft || !beginAction()) return
		try {
			const saved = await saveDraft()
			await responseJson(
				await fetch(`/api/admin/review/${saved.id}/approve`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ expectedContentHash: saved.contentHash })
				})
			)
			toast.success('已批准并发布')
			setApproveDialog(false)
			setSelectedId(null)
			setEdit(null)
			await loadData().catch(() => toast.error('已发布，但列表刷新失败，请重试刷新'))
		} catch (error) {
			toast.error(error instanceof Error ? error.message : '批准失败')
		} finally {
			endAction()
		}
	}

	const saveDraftOnly = async () => {
		if (!selected || !draft || !beginAction()) return
		try {
			await saveDraft()
			toast.success('草稿已保存')
			await loadData().catch(() => toast.error('草稿已保存，但列表刷新失败'))
		} catch (error) {
			toast.error(error instanceof Error ? error.message : '草稿保存失败')
		} finally {
			endAction()
		}
	}

	const reject = async () => {
		if (!selected || !edit) return
		const reason = rejectionReason.trim()
		if (!reason || reason.length > 2000 || conflict || !beginAction()) return
		try {
			await responseJson(
				await fetch(`/api/admin/review/${selected.id}/reject`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ reason, expectedContentHash: edit.source.contentHash })
				})
			)
			toast.success('已拒绝投稿')
			setRejectDialogOpen(false)
			setRejectionReason('')
			setSelectedId(null)
			setEdit(null)
			await loadData().catch(() => toast.error('已拒绝，但列表刷新失败，请重试刷新'))
		} catch (error) {
			toast.error(error instanceof Error ? error.message : '拒绝失败')
		} finally {
			endAction()
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
				<div className='flex flex-wrap gap-2'>
					<button
						disabled={busy}
						onClick={() => loadData().catch(error => toast.error(error instanceof Error ? error.message : '刷新失败'))}
						className='rounded-xl border bg-white/60 px-4 py-2 text-sm'>
						刷新
					</button>
					<button
						disabled={busy}
						onClick={() => setTab('review')}
						className={tab === 'review' ? 'brand-btn px-4 py-2' : 'rounded-xl border bg-white/60 px-4 py-2 text-sm'}>
						待审批（本页 {submissions.length}）
					</button>
					<button
						disabled={busy}
						onClick={() => setTab('tickets')}
						className={tab === 'tickets' ? 'brand-btn px-4 py-2' : 'rounded-xl border bg-white/60 px-4 py-2 text-sm'}>
						一次性投稿码
					</button>
				</div>
			</header>
			{tab === 'review' && (
				<nav aria-label='投稿分页' className='mb-4 flex items-center gap-4 text-sm'>
					<button
						disabled={busy || loadingData || pageIndex === 0}
						onClick={() => goToPage(pageIndex - 1)}
						className='rounded-xl border px-3 py-2 disabled:opacity-40'>
						上一页
					</button>
					<span>第 {pageIndex + 1} 页</span>
					<button
						disabled={busy || loadingData || !nextCursor}
						onClick={() => goToPage(pageIndex + 1)}
						className='rounded-xl border px-3 py-2 disabled:opacity-40'>
						下一页
					</button>
				</nav>
			)}
			{detailError && (
				<p role='alert' className='mb-4 text-red-600'>
					正文加载失败：{detailError}{' '}
					<button onClick={() => setDetailRetry(value => value + 1)} className='underline'>
						重试正文
					</button>
				</p>
			)}
			{loadError && (
				<p role='alert' className='mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700'>
					加载失败：{loadError}。请点击刷新重试。
				</p>
			)}

			{tab === 'tickets' ? (
				<Suspense fallback={<p>正在加载投稿码管理...</p>}>
					<ReviewTickets busy={busy} beginAction={beginAction} endAction={endAction} />
				</Suspense>
			) : loadingData ? (
				<p role='status'>正在加载投稿...</p>
			) : submissions.length === 0 && !edit ? (
				<div className='card static py-20 text-center'>
					<p className='text-secondary text-sm'>{loadError ? '暂时无法读取待审批列表。' : '当前没有待审批投稿。'}</p>
				</div>
			) : (
				<div className='grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]'>
					<aside className='card static max-h-[calc(100vh-160px)] space-y-2 overflow-auto p-3'>
						{submissions.map(item => (
							<button
								key={item.id}
								disabled={busy}
								onClick={() => chooseSubmission(item.id)}
								className={`w-full rounded-xl border p-4 text-left ${item.id === selectedId ? 'border-brand bg-white/80' : 'border-transparent bg-white/40'}`}>
								<div className='truncate font-medium'>{item.title}</div>
								<div className='text-secondary mt-1 truncate text-xs'>
									{item.slug} · {item.agentName}
								</div>
								<div className='text-secondary mt-2 text-xs'>{new Date(item.createdAt).toLocaleString('zh-CN')}</div>
							</button>
						))}
					</aside>
					{selectedId && edit?.source.id !== selectedId && !detailError && <p role='status'>正在加载所选投稿正文...</p>}

					{selected && draft && edit?.source.id === selected.id && (
						<main className='space-y-6'>
							<p role='status' className='text-secondary text-sm'>
								{dirty ? '有未保存修改，自动刷新不会覆盖草稿。' : '草稿已与服务器同步。'}
							</p>
							{conflict && (
								<div role='alert' className='rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900'>
									投稿已被其他窗口修改或处理。本地编辑仍保留，请先复制需要的内容，再重新加载。
									<button disabled={busy} onClick={() => setReloadDialog(true)} className='ml-2 underline'>
										重新加载
									</button>
								</div>
							)}
							{selected.validationResult.length > 0 && (
								<div className='rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900'>
									{selected.validationResult.map((finding, index) => (
										<div key={`${finding.code}-${index}`}>{finding.message}</div>
									))}
								</div>
							)}
							<fieldset disabled={busy} className='card static grid min-w-0 gap-4 p-6 md:grid-cols-2'>
								<div className='md:col-span-2'>
									<label htmlFor='review-published-at' className='text-sm'>
										发布时间（本机时区，改成当前时间就能立刻公开）
										<input
											id='review-published-at'
											type='datetime-local'
											value={publishedAtText}
											onChange={event => {
												const text = event.target.value
												setPublishedAtText(text)
												const nextPublishedAt = fromLocalDateTimeInput(text)
												if (nextPublishedAt) setDraft({ ...draft, publishedAt: nextPublishedAt })
											}}
											className='mt-1 w-full rounded-xl border bg-white/70 px-3 py-2'
										/>
									</label>
									<p className='mt-1 text-sm'>
										{!fromLocalDateTimeInput(publishedAtText) ? (
											<span className='text-amber-700'>时间填写不完整，保存时会保留原来的发布时间</span>
										) : schedule?.scheduled ? (
											<span className='text-amber-700'>{`定时发布：约 ${describeRemaining(schedule.remainingMs)}后才公开，之前文章页是 404`}</span>
										) : (
											<span className='text-secondary'>批准后立即公开</span>
										)}
									</p>
								</div>
								<label htmlFor='review-title' className='text-sm'>
									标题
									<input
										id='review-title'
										value={draft.title}
										onChange={event => setDraft({ ...draft, title: event.target.value })}
										className='mt-1 w-full rounded-xl border bg-white/70 px-3 py-2'
									/>
								</label>
								<label htmlFor='review-slug' className='text-sm'>
									Slug
									<input
										id='review-slug'
										value={draft.slug}
										onChange={event => setDraft({ ...draft, slug: event.target.value })}
										className='mt-1 w-full rounded-xl border bg-white/70 px-3 py-2'
									/>
								</label>
								<label className='text-sm md:col-span-2'>
									摘要
									<textarea
										aria-label='摘要'
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
										value={edit.tagsText}
										onChange={event => setEdit(current => (current ? { ...current, tagsText: event.target.value } : current))}
										className='mt-1 w-full rounded-xl border bg-white/70 px-3 py-2'
									/>
								</label>
								<label className='text-sm md:col-span-2'>
									Markdown
									<textarea
										aria-label='Markdown'
										value={draft.contentMd}
										onChange={event => setDraft({ ...draft, contentMd: event.target.value })}
										className='mt-1 h-[420px] w-full rounded-xl border bg-white/70 p-4 font-mono text-sm'
									/>
								</label>
								<div className='flex flex-wrap gap-3 md:col-span-2'>
									<button disabled={busy || conflict} onClick={saveDraftOnly} className='rounded-xl border bg-white/70 px-5 py-2 text-sm disabled:opacity-50'>
										{busy ? '处理中...' : '保存草稿'}
									</button>
									<button disabled={busy || conflict} onClick={() => setApproveDialog(true)} className='brand-btn px-5 py-2 disabled:opacity-50'>
										{busy ? '处理中...' : '保存并批准发布'}
									</button>
									<button
										disabled={busy || conflict}
										onClick={() => setRejectDialogOpen(true)}
										className='rounded-xl border border-red-200 bg-red-50 px-5 py-2 text-sm text-red-600 disabled:opacity-50'>
										拒绝
									</button>
								</div>
							</fieldset>
							<Suspense fallback={<p>正在加载预览...</p>}>
								<MarkdownPreview payload={draft} />
							</Suspense>
						</main>
					)}
				</div>
			)}

			{rejectDialogOpen && selected && (
				<ReviewDialog title='拒绝投稿' busy={busy} onClose={() => setRejectDialogOpen(false)}>
					{conflict && (
						<p role='alert' className='mt-3 text-red-600'>
							投稿已变化，请关闭弹窗并重新加载后审核。
						</p>
					)}
					<p className='mt-2 text-sm break-words'>正在处理：{selected.payload.title}</p>
					<p className='text-secondary mt-2 text-sm'>请填写拒绝原因，原因会记录到审批结果中。</p>
					<label htmlFor='reject-reason' className='sr-only'>
						拒绝原因
					</label>
					<textarea
						id='reject-reason'
						disabled={busy}
						maxLength={2000}
						autoFocus
						value={rejectionReason}
						onChange={event => setRejectionReason(event.target.value)}
						placeholder='例如：内容需要补充来源或存在不准确表述'
						className='mt-4 min-h-32 w-full resize-y rounded-xl border bg-white/70 p-3 text-sm'
					/>
					<div className='mt-5 flex justify-end gap-3'>
						<button type='button' disabled={busy} onClick={() => setRejectDialogOpen(false)} className='rounded-xl border bg-white/60 px-4 py-2 text-sm'>
							取消
						</button>
						<button
							type='button'
							disabled={busy || conflict || !rejectionReason.trim()}
							onClick={reject}
							className='rounded-xl bg-red-600 px-4 py-2 text-sm text-white disabled:opacity-50'>
							{busy ? '处理中...' : '确认拒绝'}
						</button>
					</div>
				</ReviewDialog>
			)}
			{approveDialog && selected && (
				<ReviewDialog title='确认批准发布' busy={busy} onClose={() => setApproveDialog(false)}>
					<p className='mt-4 text-sm break-words'>将保存当前编辑并公开发布「{draft?.title}」。请确认内容和来源已经审核。</p>
					{schedule?.scheduled && draft && (
						<p role='alert' className='mt-3 rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900'>
							{`这是定时发布：批准后要到 ${new Date(draft.publishedAt).toLocaleString('zh-CN')}（约 ${describeRemaining(schedule.remainingMs)}后）才公开，在那之前访客看到的是 404。想立刻公开，先在编辑区把发布时间改成当前时间。`}
						</p>
					)}
					<div className='mt-5 flex justify-end gap-3'>
						<button disabled={busy} onClick={() => setApproveDialog(false)} className='rounded-xl border px-4 py-2'>
							取消
						</button>
						<button disabled={busy || conflict} onClick={approve} className='brand-btn px-4 py-2'>
							{busy ? '发布中...' : '确认发布'}
						</button>
					</div>
				</ReviewDialog>
			)}
			{(switchTarget || reloadDialog || pageTarget !== null) && (
				<ReviewDialog
					title='放弃未保存的修改？'
					busy={busy}
					onClose={() => {
						setSwitchTarget(null)
						setReloadDialog(false)
						setPageTarget(null)
					}}>
					<p className='mt-4 text-sm'>此操作会替换当前本地草稿。请先保存或复制需要保留的文字。</p>
					<div className='mt-5 flex justify-end gap-3'>
						<button
							onClick={() => {
								setSwitchTarget(null)
								setReloadDialog(false)
								setPageTarget(null)
							}}
							className='rounded-xl border px-4 py-2'>
							继续编辑
						</button>
						<button
							onClick={() => {
								if (pageTarget !== null) applyPage(pageTarget)
								else if (switchTarget) setSelectedId(switchTarget)
								else {
									setEdit(serverSelected?.status === 'pending' ? createReviewDraft(serverSelected) : null)
									if (!serverSelected || serverSelected.status !== 'pending') setSelectedId(null)
								}
								setRejectionReason('')
								setSwitchTarget(null)
								setReloadDialog(false)
							}}
							className='rounded-xl bg-red-600 px-4 py-2 text-white'>
							放弃并继续
						</button>
					</div>
				</ReviewDialog>
			)}
		</div>
	)
}
