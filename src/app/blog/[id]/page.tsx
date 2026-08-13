import { cache } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PublishedBlogArticle } from '@/components/published-blog-article'
import type { SiteContent } from '@/app/(home)/stores/config-store'
import { assertValidSlug } from '@/lib/config-validation'
import { getCachedContentDocument, getFallbackContentDocument } from '@/lib/content-repository'
import { allowDevelopmentLegacyFallback, readLegacyPost } from '@/lib/legacy-blog-reader'
import { calculateBlogStats } from '@/lib/load-blog'
import { renderMarkdown, stripLeadingDuplicateHeading } from '@/lib/markdown-renderer'
import { extractMediaPathnameFromUrl, getMediaDimensions, type MediaDimensions } from '@/lib/media-dimensions'
import { extractMediaPathnames } from '@/lib/media-references'
import { getCachedPublishedPost, type PostRecord } from '@/lib/posts-repository'

type BlogPageProps = {
	params: Promise<{ id: string }>
}

const loadPublishedPost = cache(async (rawSlug: string) => {
	let slug: string
	try {
		slug = assertValidSlug(rawSlug)
	} catch {
		return null
	}
	if (!allowDevelopmentLegacyFallback()) return getCachedPublishedPost(slug)
	const legacy = readLegacyPost(slug)
	if (!legacy) return null
	return { ...legacy, status: 'published' } satisfies PostRecord
})

function descriptionFor(markdown: string, summary?: string): string {
	if (summary?.trim()) return summary.trim().slice(0, 160)
	return markdown
		.replace(/```[\s\S]*?```/g, ' ')
		.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
		.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
		.replace(/[#>*_`|~-]/g, ' ')
		.replace(/\s+/g, ' ')
		.trim()
		.slice(0, 160)
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
	const { id } = await params
	const post = await loadPublishedPost(id)
	if (!post) return { title: '文章不存在', robots: { index: false, follow: false } }
	const description = descriptionFor(post.contentMd, post.summary)
	return {
		title: post.title,
		description,
		alternates: { canonical: `/blog/${post.slug}` },
		openGraph: {
			type: 'article',
			title: post.title,
			description,
			url: `/blog/${post.slug}`,
			publishedTime: post.date,
			tags: post.tags,
			...(post.cover ? { images: [post.cover] } : {})
		},
		twitter: {
			card: post.cover ? 'summary_large_image' : 'summary',
			title: post.title,
			description,
			...(post.cover ? { images: [post.cover] } : {})
		}
	}
}

export default async function BlogPage({ params }: BlogPageProps) {
	const { id } = await params
	const post = await loadPublishedPost(id)
	if (!post) notFound()

	// Look up stored image dimensions for CLS prevention and responsive srcset.
	const mediaPathnames = extractMediaPathnames([post.contentMd, post.cover])
	let imageDimensions: Map<string, MediaDimensions> = new Map()
	let coverDimensions: MediaDimensions | undefined
	if (mediaPathnames.length > 0) {
		try {
			imageDimensions = await getMediaDimensions(mediaPathnames)
		} catch {
			// Database may be unavailable in legacy fallback mode.
		}
	}
	if (post.cover) {
		const coverPath = extractMediaPathnameFromUrl(post.cover)
		if (coverPath) coverDimensions = imageDimensions.get(coverPath)
	}

	const [{ html, toc }, site] = await Promise.all([
		renderMarkdown(stripLeadingDuplicateHeading(post.contentMd, post.title), imageDimensions),
		allowDevelopmentLegacyFallback()
			? Promise.resolve(getFallbackContentDocument<SiteContent>('site'))
			: getCachedContentDocument<SiteContent>('site').catch(() => getFallbackContentDocument<SiteContent>('site'))
	])
	return (
		<PublishedBlogArticle
			post={post}
			html={html}
			toc={toc}
			stats={calculateBlogStats(post.contentMd)}
			summaryInContent={site.data.summaryInContent ?? false}
			coverDimensions={coverDimensions}
		/>
	)
}
