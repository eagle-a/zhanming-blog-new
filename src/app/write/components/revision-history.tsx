'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { toast } from 'sonner'
import { History, RotateCcw, X, ChevronRight } from 'lucide-react'

type RevisionSummary = {
	id: number
	version: number
	createdAt: string
	createdBy: string
	metadataSnapshot: {
		title: string
		status: string
		category: string | null
		tags: string[]
	}
}

type RevisionDetail = RevisionSummary & {
	contentMd: string
}

function formatDate(iso: string): string {
	return new Intl.DateTimeFormat('zh-CN', {
		timeZone: 'Asia/Shanghai',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false
	}).format(new Date(iso))
}

type RestorePayload = {
	contentMd: string
	version: number
	title: string
	summary: string
	tags: string[]
	category: string | null
	date: string
	cover: string | null
	status: string
}

type RevisionHistoryProps = {
	slug: string
	currentVersion?: number
	onRestore: (payload: RestorePayload) => void
}

export function RevisionHistory({ slug, currentVersion, onRestore }: RevisionHistoryProps) {
	const [open, setOpen] = useState(false)
	const [loading, setLoading] = useState(false)
	const [revisions, setRevisions] = useState<RevisionSummary[]>([])
	const [hasLoaded, setHasLoaded] = useState(false)
	const [selectedVersion, setSelectedVersion] = useState<number | null>(null)
	const [revisionDetail, setRevisionDetail] = useState<RevisionDetail | null>(null)
	const [detailLoading, setDetailLoading] = useState(false)
	const [restoring, setRestoring] = useState(false)

	const loadRevisions = useCallback(async () => {
		setLoading(true)
		try {
			const res = await fetch(`/api/admin/posts/${encodeURIComponent(slug)}/revisions`, { credentials: 'same-origin' })
			if (!res.ok) {
				const body = await res.json().catch(() => ({}))
				throw new Error(body.error || '加载修订历史失败')
			}
			const data = await res.json()
			setRevisions(data.revisions || [])
		} catch (error) {
			toast.error(error instanceof Error ? error.message : '加载修订历史失败')
		} finally {
			setLoading(false)
			setHasLoaded(true)
		}
	}, [slug])

	const loadDetail = useCallback(
		async (version: number) => {
			setDetailLoading(true)
			setRevisionDetail(null)
			try {
				const res = await fetch(`/api/admin/posts/${encodeURIComponent(slug)}/revisions/${version}`, { credentials: 'same-origin' })
				if (!res.ok) {
					const body = await res.json().catch(() => ({}))
					throw new Error(body.error || '加载修订详情失败')
				}
				const data = await res.json()
				setRevisionDetail(data.revision)
			} catch (error) {
				toast.error(error instanceof Error ? error.message : '加载修订详情失败')
			} finally {
				setDetailLoading(false)
			}
		},
		[slug]
	)

	const handleRestore = async () => {
		if (!selectedVersion) return
		if (!window.confirm(`确定恢复到版本 ${selectedVersion} 吗？这将创建一个新版本，不会丢失当前内容。`)) return
		setRestoring(true)
		try {
			const res = await fetch(`/api/admin/posts/${encodeURIComponent(slug)}/revisions/${selectedVersion}`, {
				method: 'POST',
				credentials: 'same-origin'
			})
			if (!res.ok) {
				const body = await res.json().catch(() => ({}))
				throw new Error(body.error || '恢复修订失败')
			}
			const post = await res.json()
			toast.success(`已恢复到版本 ${selectedVersion}`)
			onRestore({
				contentMd: post.contentMd,
				version: post.version,
				title: post.title || '',
				summary: post.summary || '',
				tags: post.tags || [],
				category: post.category ?? null,
				date: post.date,
				cover: post.cover ?? null,
				status: post.status
			})
			setOpen(false)
			setSelectedVersion(null)
			setRevisionDetail(null)
		} catch (error) {
			toast.error(error instanceof Error ? error.message : '恢复修订失败')
		} finally {
			setRestoring(false)
		}
	}

	useEffect(() => {
		if (open && !hasLoaded && !loading) {
			void loadRevisions()
		}
	}, [open, hasLoaded, loading, loadRevisions])

	const handleSelectVersion = (version: number) => {
		if (selectedVersion === version) {
			setSelectedVersion(null)
			setRevisionDetail(null)
			return
		}
		setSelectedVersion(version)
		void loadDetail(version)
	}

	return (
		<>
			<motion.button
				initial={{ opacity: 0, scale: 0.6 }}
				animate={{ opacity: 1, scale: 1 }}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				className='bg-card rounded-xl border px-4 py-2 text-sm'
				onClick={() => setOpen(true)}>
				<History className='inline-block h-4 w-4' /> 修订历史
			</motion.button>

			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4'
						onClick={e => {
							if (e.target === e.currentTarget) setOpen(false)
						}}>
						<motion.div
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							className='card flex max-h-[85vh] w-full max-w-4xl flex-col overflow-hidden'>
							<div className='flex items-center justify-between border-b px-6 py-4'>
								<h2 className='text-lg font-semibold'>修订历史 — {slug}</h2>
								<button onClick={() => setOpen(false)} className='text-secondary hover:text-primary'>
									<X className='h-5 w-5' />
								</button>
							</div>

							<div className='flex min-h-0 flex-1 flex-col md:flex-row'>
								{/* Revision list */}
								<div className='md:w-72 md:shrink-0 md:overflow-y-auto md:border-r'>
									{loading ? (
										<div className='text-secondary p-6 text-center text-sm'>加载中...</div>
									) : revisions.length === 0 ? (
										<div className='text-secondary p-6 text-center text-sm'>暂无修订记录</div>
									) : (
										<ul className='divide-y'>
											{revisions.map(rev => (
												<li key={rev.id}>
													<button
														onClick={() => handleSelectVersion(rev.version)}
														className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm transition-colors ${
															selectedVersion === rev.version ? 'bg-brand/10 text-brand' : 'hover:bg-white/40'
														}`}>
														<div className='min-w-0'>
															<div className='flex items-center gap-2'>
																<span className='font-medium'>v{rev.version}</span>
																{rev.version === currentVersion && <span className='bg-brand/10 text-brand rounded px-1.5 py-0.5 text-xs'>当前</span>}
																{rev.metadataSnapshot.status === 'archived' && (
																	<span className='rounded bg-red-50 px-1.5 py-0.5 text-xs text-red-600'>已删除</span>
																)}
															</div>
															<div className='text-secondary mt-0.5 truncate text-xs'>{formatDate(rev.createdAt)}</div>
															<div className='text-secondary truncate text-xs'>{rev.metadataSnapshot.title || slug}</div>
														</div>
														<ChevronRight className='h-4 w-4 shrink-0' />
													</button>
												</li>
											))}
										</ul>
									)}
								</div>

								{/* Detail panel */}
								<div className='min-h-0 flex-1 overflow-y-auto p-6'>
									{!selectedVersion ? (
										<div className='text-secondary flex h-full items-center justify-center text-sm'>选择左侧的版本查看内容</div>
									) : detailLoading ? (
										<div className='text-secondary flex h-full items-center justify-center text-sm'>加载中...</div>
									) : revisionDetail ? (
										<div className='flex h-full flex-col'>
											<div className='mb-4 flex items-center justify-between gap-4'>
												<div>
													<span className='text-lg font-semibold'>版本 {revisionDetail.version}</span>
													<span className='text-secondary ml-3 text-sm'>{formatDate(revisionDetail.createdAt)}</span>
												</div>
												{revisionDetail.version !== currentVersion && (
													<button
														onClick={handleRestore}
														disabled={restoring}
														className='brand-btn inline-flex items-center gap-2 px-4 py-2 text-sm disabled:opacity-60'>
														<RotateCcw className='h-4 w-4' />
														{restoring ? '恢复中...' : '恢复此版本'}
													</button>
												)}
											</div>
											<div className='text-secondary mb-3 flex flex-wrap gap-4 text-xs'>
												<span>状态: {revisionDetail.metadataSnapshot.status}</span>
												<span>分类: {revisionDetail.metadataSnapshot.category || '无'}</span>
												<span>标签: {revisionDetail.metadataSnapshot.tags?.join(', ') || '无'}</span>
											</div>
											<pre className='bg-muted/30 max-h-[50vh] overflow-auto rounded-lg p-4 text-xs leading-relaxed'>{revisionDetail.contentMd}</pre>
										</div>
									) : (
										<div className='text-secondary flex h-full items-center justify-center text-sm'>加载失败</div>
									)}
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}
