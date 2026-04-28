'use client'

import { motion } from 'motion/react'
import { INIT_DELAY } from '@/consts'
import { useMarkdownRender } from '@/hooks/use-markdown-render'
import { useSize } from '@/hooks/use-size'
import { BlogSidebar } from '@/components/blog-sidebar'
import { useConfigStore } from '@/app/(home)/stores/config-store'
import { useEffect, useState } from 'react'
import type { BlogStats } from '@/lib/load-blog'

type BlogPreviewProps = {
	markdown: string
	title: string
	tags: string[]
	date: string
	summary?: string
	cover?: string
	slug?: string
	stats?: BlogStats
}

export function BlogPreview({ markdown, title, tags, date, summary, cover, slug, stats }: BlogPreviewProps) {
	const { maxSM: isMobile } = useSize()
	const { content, toc, loading } = useMarkdownRender(markdown)
	const { siteContent } = useConfigStore()
	const summaryInContent = siteContent.summaryInContent ?? false
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY
			const docHeight = document.documentElement.scrollHeight - window.innerHeight
			const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
			setProgress(Math.min(100, Math.max(0, percent)))
		}
		handleScroll()
		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	if (loading) {
		return <div className='text-secondary flex h-full items-center justify-center text-sm'>渲染中...</div>
	}

	return (
		<>
			{/* 阅读进度条 */}
			<div className='fixed top-0 left-0 z-50 h-[2px] bg-brand transition-[width] duration-150 ease-out' style={{ width: `${progress}%` }} />
			<div className='mx-auto flex max-w-[1140px] justify-center gap-6 px-6 pt-28 pb-12 max-sm:px-0'>
				<motion.article
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: INIT_DELAY }}
					className='card bg-article static flex-1 overflow-auto rounded-xl p-8'>
					<div>
						<div className='text-center text-2xl font-semibold'>{title}</div>

						<div className='text-secondary mt-4 flex flex-wrap items-center justify-center gap-3 px-8 text-center text-sm'>
							{tags.map(t => (
								<span key={t}>#{t}</span>
							))}
						</div>

						<div className='text-secondary mt-3 flex flex-wrap items-center justify-center gap-3 text-center text-sm'>
							<span>{date}</span>
							{stats && (
								<>
									<span className='text-border'>|</span>
									<span>{stats.wordCount.toLocaleString()} 字</span>
									<span className='text-border'>|</span>
									<span>约 {stats.readingTime} 分钟</span>
								</>
							)}
						</div>

						{summary && summaryInContent && <div className='text-secondary mt-6 cursor-text text-center text-sm'>“{summary}”</div>}

						<div className='prose mt-6 max-w-none cursor-text'>{content}</div>
					</div>
				</motion.article>

				{!isMobile && <BlogSidebar cover={cover} summary={summary} toc={toc} slug={slug} stats={stats} />}
			</div>
		</>
	)
}
