import fs from 'node:fs'
import path from 'node:path'

import siteContent from '@/config/site-content.json'
import type { BlogIndexItem } from '@/app/blog/types'
import { marked } from 'marked'
import { sanitizeHtml } from '@/lib/sanitize-html'
import { assertValidSlug, resolveSiteUrl } from '@/lib/config-validation'
import { getCachedPublishedPost, getCachedPublishedPosts } from '@/lib/posts-repository'
import { allowDevelopmentLegacyFallback, readLegacyPosts } from '@/lib/legacy-blog-reader'

// 配置 marked 为同步模式
marked.use({
	async: false
})

const FEED_PATH = '/rss.xml'
const SITE_ORIGIN = resolveSiteUrl(
	process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://eagle-a.github.io')
)
const FEED_URL = `${SITE_ORIGIN}${FEED_PATH}`
const PUBLIC_DIR = path.join(process.cwd(), 'public')

const escapeXml = (value: string): string =>
	value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')

const wrapCdata = (value: string): string => `<![CDATA[${value.replace(/]]>/g, ']]]]><![CDATA[>')}]]>`

const getExtension = (input: string): string | undefined => {
	const clean = input.split(/[?#]/)[0]
	return clean.split('.').pop()?.toLowerCase()
}

const getMimeTypeFromUrl = (url?: string): string | null => {
	if (!url) return null
	const ext = getExtension(url)
	if (!ext) return null
	if (ext === 'jpg' || ext === 'jpeg') return 'image/jpeg'
	if (ext === 'png') return 'image/png'
	if (ext === 'gif') return 'image/gif'
	if (ext === 'webp') return 'image/webp'
	if (ext === 'svg') return 'image/svg+xml'
	return null
}

const buildEnclosure = (cover?: string): string | null => {
	if (!cover) return null
	const absoluteUrl = /^https?:\/\//.test(cover) ? cover : `${SITE_ORIGIN}${cover}`
	const type = getMimeTypeFromUrl(absoluteUrl)
	if (!type) return null

	let length: number | null = null

	if (!/^https?:\/\//.test(cover)) {
		const filePath = path.join(PUBLIC_DIR, cover.replace(/^\/+/, ''))
		try {
			const stat = fs.statSync(filePath)
			if (stat.isFile()) {
				length = stat.size
			}
		} catch {
			length = null
		}
	}

	if (length === null) {
		return null
	}

	return `<enclosure url="${escapeXml(absoluteUrl)}" type="${type}" length="${length}" />`
}

const serializeItem = async (item: BlogIndexItem): Promise<string> => {
	const slug = assertValidSlug(item.slug)
	const link = `${SITE_ORIGIN}/blog/${slug}`
	const title = escapeXml(item.title || item.slug)

	const sanitizedSummary = sanitizeHtml(item.summary || '')
	let content = sanitizedSummary
	try {
		const post = await getCachedPublishedPost(slug)
		if (post) content = sanitizeHtml(marked.parse(post.contentMd, { async: false }) as string)
	} catch (error) {
		console.error(`Error reading blog content for ${item.slug}:`, error)
	}

	const description = wrapCdata(sanitizedSummary || content.substring(0, 200) + '...')
	const contentEncoded = wrapCdata(content)
	const pubDate = new Date(item.date).toUTCString()
	const categories = (item.tags || [])
		.filter(Boolean)
		.map(tag => `<category>${escapeXml(tag)}</category>`)
		.join('')

	const enclosure = buildEnclosure(item.cover)

	return `
		<item>
			<title>${title}</title>
			<link>${link}</link>
			<guid isPermaLink="false">${escapeXml(link)}</guid>
			<description>${description}</description>
			<content:encoded>${contentEncoded}</content:encoded>
			<pubDate>${pubDate}</pubDate>
			${categories}
			${enclosure ?? ''}
		</item>`.trim()
}

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(): Promise<Response> {
	const blogs = allowDevelopmentLegacyFallback() ? readLegacyPosts(false) : await getCachedPublishedPosts()
	const title = siteContent.meta?.title || 'Blog'
	const description = siteContent.meta?.description || 'Latest updates from Blog'
	const username = siteContent.meta?.username || 'author'

	// 获取最新的文章发布日期作为频道发布日期
	const latestDate = blogs.length > 0 ? new Date(blogs[0].date).toUTCString() : new Date().toUTCString()

	const items = (await Promise.all(blogs.filter(item => item?.slug).map(serializeItem))).join('')

	const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
	<channel xmlns:atom="http://www.w3.org/2005/Atom">
		<title>${escapeXml(title)}</title>
		<link>${SITE_ORIGIN}</link>
		<atom:link href="${FEED_URL}" rel="self" type="application/rss+xml" />
		<description>${escapeXml(description)}</description>
		<language>zh-CN</language>
		<copyright>© ${new Date().getFullYear()} ${escapeXml(username)}</copyright>
		<managingEditor>${escapeXml(username)}</managingEditor>
		<webMaster>${escapeXml(username)}</webMaster>
		<pubDate>${latestDate}</pubDate>
		<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
		<generator>Next.js RSS Generator</generator>
		<docs>https://www.rssboard.org/rss-specification</docs>
		<ttl>60</ttl>
		<image>
			<url>${SITE_ORIGIN}/favicon.png</url>
			<title>${escapeXml(title)}</title>
			<link>${SITE_ORIGIN}</link>
		</image>
		${items}
	</channel>
</rss>`

	return new Response(rss, {
		headers: {
			'Content-Type': 'application/rss+xml; charset=utf-8',
			'Cache-Control': 'public, max-age=0, must-revalidate'
		}
	})
}
