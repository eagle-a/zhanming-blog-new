import Link from 'next/link'
import dayjs from 'dayjs'
import { ArticleEnhancements } from '@/components/article-enhancements'
import { BlogSidebar } from '@/components/blog-sidebar'
import LiquidGrass from '@/components/liquid-grass'
import type { BlogStats } from '@/lib/load-blog'
import type { PostRecord } from '@/lib/posts-repository'
import type { TocItem } from '@/lib/markdown-renderer'

type PublishedBlogArticleProps = {
	post: PostRecord
	html: string
	toc: TocItem[]
	stats: BlogStats
	summaryInContent: boolean
	coverDimensions?: { width: number; height: number }
}

export function PublishedBlogArticle({ post, html, toc, stats, summaryInContent, coverDimensions }: PublishedBlogArticleProps) {
	return (
		<>
			<ArticleEnhancements slug={post.slug} />
			<div className='mx-auto flex max-w-[1140px] justify-center gap-6 px-6 pt-28 pb-12 max-sm:px-0' data-published-article>
				<article className='card bg-article static flex-1 overflow-auto rounded-xl p-8'>
					<header>
						<h1 className='text-center text-2xl font-semibold'>{post.title || post.slug}</h1>
						<div className='text-secondary mt-4 flex flex-wrap items-center justify-center gap-3 px-8 text-center text-sm'>
							{post.tags.map(tag => (
								<span key={tag}>#{tag}</span>
							))}
						</div>
						<div className='text-secondary mt-3 flex flex-wrap items-center justify-center gap-3 text-center text-sm'>
							<time dateTime={post.date}>{dayjs(post.date).format('YYYY年 M月 D日')}</time>
							<span className='text-border'>|</span>
							<span>{stats.wordCount.toLocaleString()} 字</span>
							<span className='text-border'>|</span>
							<span>约 {stats.readingTime} 分钟</span>
						</div>
						{post.summary && summaryInContent && <p className='text-secondary mt-6 cursor-text text-center text-sm'>“{post.summary}”</p>}
					</header>
					<div className='prose mt-6 max-w-none cursor-text' dangerouslySetInnerHTML={{ __html: html }} />
				</article>

				<BlogSidebar cover={post.cover} coverDimensions={coverDimensions} summary={post.summary} toc={toc} slug={post.slug} stats={stats} />
			</div>

			<Link
				href={`/write/${post.slug}`}
				className='absolute top-4 right-6 rounded-xl border bg-white/60 px-6 py-2 text-sm backdrop-blur-sm transition-colors hover:bg-white/80 max-sm:hidden'>
				编辑
			</Link>

			{post.slug === 'liquid-grass' && <LiquidGrass />}
		</>
	)
}
