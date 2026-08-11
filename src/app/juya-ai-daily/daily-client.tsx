'use client'

import { useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'
import { AlertCircle, Clock3, ExternalLink, RefreshCw, Rss } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { sanitizeHtml } from '@/lib/sanitize-html'
import type { JuyaAIFeedView, JuyaAIIssue } from '@/lib/juya-ai-feed'

async function fetchFeed(url: string): Promise<JuyaAIFeedView> {
	const response = await fetch(url, { credentials: 'same-origin' })
	const body = (await response.json()) as JuyaAIFeedView & { error?: string }
	if (!response.ok) throw new Error(body.error || 'AI 日报加载失败')
	return body
}

function formatUpdatedAt(value: string): string {
	return new Intl.DateTimeFormat('zh-CN', {
		timeZone: 'Asia/Shanghai',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false
	}).format(new Date(value))
}

function LoadingState() {
	return (
		<div className='grid gap-6 lg:grid-cols-[210px_minmax(0,1fr)]'>
			<div className='card relative! h-72 animate-pulse' />
			<div className='card relative! min-h-[720px] animate-pulse p-6'>
				<div className='mb-6 h-7 w-52 rounded-lg bg-black/5' />
				<div className='mb-8 h-48 rounded-2xl bg-black/5' />
				<div className='space-y-3'>
					<div className='h-4 w-full rounded bg-black/5' />
					<div className='h-4 w-11/12 rounded bg-black/5' />
					<div className='h-4 w-4/5 rounded bg-black/5' />
				</div>
			</div>
		</div>
	)
}

function IssueContent({ issue }: { issue: JuyaAIIssue }) {
	const content = useMemo(() => sanitizeHtml(issue.contentHtml), [issue.contentHtml])
	return (
		<motion.article
			key={issue.id}
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.25 }}
			className='card relative! w-full max-w-full min-w-0 overflow-hidden p-5 sm:p-7'>
			<div className='mb-7 flex min-w-0 flex-col gap-3 border-b pb-5 sm:flex-row sm:items-center sm:justify-between'>
				<div className='min-w-0'>
					<p className='text-secondary mb-1 text-sm'>橘鸦 AI 早报</p>
					<h2 className='text-2xl font-bold break-words sm:text-3xl'>AI 早报 {issue.title}</h2>
				</div>
				<a
					href={issue.link}
					target='_blank'
					rel='noopener noreferrer'
					className='brand-btn inline-flex shrink-0 items-center justify-center gap-2 px-4 text-sm'>
					查看原文
					<ExternalLink className='h-4 w-4' />
				</a>
			</div>
			<div className='ai-daily-article' dangerouslySetInnerHTML={{ __html: content }} />
		</motion.article>
	)
}

function IssueLoadingState() {
	return (
		<div className='card relative! min-h-[720px] animate-pulse p-6' aria-label='正在加载所选日报'>
			<div className='mb-6 h-7 w-52 rounded-lg bg-black/5' />
			<div className='mb-8 h-48 rounded-2xl bg-black/5' />
			<div className='space-y-3'>
				<div className='h-4 w-full rounded bg-black/5' />
				<div className='h-4 w-11/12 rounded bg-black/5' />
				<div className='h-4 w-4/5 rounded bg-black/5' />
			</div>
		</div>
	)
}

export function DailyClient({ initialFeed }: { initialFeed: JuyaAIFeedView | null }) {
	const reduceMotion = useReducedMotion()
	const { data, error, isLoading, isValidating, mutate } = useSWR<JuyaAIFeedView>('/api/ai-daily', fetchFeed, {
		fallbackData: initialFeed || undefined,
		revalidateOnFocus: false,
		revalidateIfStale: false,
		dedupingInterval: 60_000,
		keepPreviousData: true
	})
	const [selectedId, setSelectedId] = useState('')
	const effectiveSelectedId = selectedId || data?.selectedIssue.id || ''
	const selectedUrl = data && effectiveSelectedId !== data.selectedIssue.id ? `/api/ai-daily?issue=${encodeURIComponent(effectiveSelectedId)}` : null
	const {
		data: selectedView,
		error: selectedError,
		isValidating: isSelectedValidating,
		mutate: mutateSelected
	} = useSWR<JuyaAIFeedView>(selectedUrl, fetchFeed, {
		revalidateOnFocus: false,
		dedupingInterval: 60_000,
		keepPreviousData: false
	})

	useEffect(() => {
		if (!data?.issues.length) return
		if (!data.issues.some(issue => issue.id === selectedId)) setSelectedId(data.issues[0].id)
	}, [data, selectedId])

	const selectedIssue =
		data?.selectedIssue.id === effectiveSelectedId
			? data.selectedIssue
			: selectedView?.selectedIssue.id === effectiveSelectedId
				? selectedView.selectedIssue
				: undefined
	const currentError = error || selectedError
	const refreshing = isValidating || isSelectedValidating
	const reload = () => Promise.all([mutate(), selectedUrl ? mutateSelected() : Promise.resolve()])

	return (
		<main className='min-h-screen overflow-x-clip px-4 pt-28 pb-14 sm:px-6'>
			<div className='mx-auto w-full max-w-[1120px]'>
				<motion.header initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className='mb-8 text-center'>
					<h1 className='text-4xl font-bold tracking-tight sm:text-5xl'>AI 日报</h1>
					<p className='text-secondary mt-3 text-base sm:text-lg'>同步橘鸦 AI 早报，阅读最近 10 期内容</p>
				</motion.header>

				<div className='mb-7 flex flex-wrap items-center justify-center gap-2 sm:gap-3'>
					{data?.updatedAt ? (
						<span className='text-secondary inline-flex items-center gap-2 px-2 text-sm'>
							<Clock3 className='h-4 w-4' />
							最后更新 {formatUpdatedAt(data.updatedAt)}
						</span>
					) : null}
					<a
						href={data?.homeUrl || 'https://daily.juya.uk/'}
						target='_blank'
						rel='noopener noreferrer'
						className='bg-card inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm'>
						<ExternalLink className='h-4 w-4' />
						官网
					</a>
					<a
						href={data?.rssUrl || 'https://daily.juya.uk/rss.xml'}
						target='_blank'
						rel='noopener noreferrer'
						className='bg-card inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm'>
						<Rss className='h-4 w-4' />
						RSS
					</a>
					<button
						type='button'
						onClick={() => void reload()}
						disabled={refreshing}
						className='bg-card inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm disabled:cursor-wait disabled:opacity-60'>
						<RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
						重新加载
					</button>
				</div>

				{currentError ? (
					<div className='card relative! mx-auto max-w-xl p-8 text-center'>
						<AlertCircle className='mx-auto mb-3 h-8 w-8 text-red-500' />
						<h2 className='mb-2 text-lg font-semibold'>AI 日报暂时无法加载</h2>
						<p className='text-secondary mb-5 text-sm'>{currentError instanceof Error ? currentError.message : '请稍后重试'}</p>
						<button type='button' onClick={() => void reload()} className='brand-btn px-5'>
							重试
						</button>
					</div>
				) : isLoading || !data ? (
					<LoadingState />
				) : (
					<div className='grid min-w-0 items-start gap-5 lg:grid-cols-[210px_minmax(0,1fr)]'>
						<aside className='card relative! min-w-0 p-3 lg:sticky lg:top-24'>
							<h2 className='px-3 pt-2 pb-3 text-base font-semibold'>最近 {data.issues.length} 期</h2>
							<nav aria-label='AI 日报期数' className='flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible'>
								{data.issues.map(issue => {
									const active = issue.id === effectiveSelectedId
									return (
										<button
											key={issue.id}
											type='button'
											onClick={() => setSelectedId(issue.id)}
											aria-current={active ? 'page' : undefined}
											className={`shrink-0 rounded-xl border px-4 py-3 text-left text-sm transition-colors lg:w-full ${active ? 'border-brand bg-brand/10 text-brand font-medium' : 'hover:border-border border-transparent hover:bg-white/40'}`}>
											{issue.title}
										</button>
									)
								})}
							</nav>
						</aside>
						{selectedIssue ? <IssueContent issue={selectedIssue} /> : <IssueLoadingState />}
					</div>
				)}

				<footer className='text-secondary mt-8 text-center text-sm'>
					内容同步自
					<a href='https://daily.juya.uk/' target='_blank' rel='noopener noreferrer' className='text-brand mx-1 hover:underline'>
						橘鸦 AI 早报
					</a>
					，版权归原作者及原始来源所有。
				</footer>
			</div>
		</main>
	)
}
