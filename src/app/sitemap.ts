import { MetadataRoute } from 'next'
import type { BlogIndexItem } from '@/app/blog/types'
import { assertValidSlug, resolveSiteUrl } from '@/lib/config-validation'
import { getCachedPublishedPosts } from '@/lib/posts-repository'
import { allowDevelopmentLegacyFallback, readLegacyPosts } from '@/lib/legacy-blog-reader'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	// 域名配置：
	// 1. 优先使用 SITE_URL (你在 Vercel 手动设置的正式域名)
	// 2. 其次尝试 VERCEL_URL (Vercel 自动生成的预览域名，通常不带 https://)
	// 3. 最后回退到本地开发地址
	const baseUrl = resolveSiteUrl(
		process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://eagle-a.github.io')
	)

	console.log(`[Sitemap] Generating for: ${baseUrl}`)

	const posts: BlogIndexItem[] = allowDevelopmentLegacyFallback() ? readLegacyPosts(false) : await getCachedPublishedPosts()

	const postEntries: MetadataRoute.Sitemap = posts.map(post => ({
		url: `${baseUrl}/blog/${assertValidSlug(post.slug)}`,
		lastModified: post.date ? new Date(post.date) : new Date(),
		changeFrequency: 'weekly',
		priority: 0.8
	}))

	const staticEntries: MetadataRoute.Sitemap = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1
		}
	]

	return [...staticEntries, ...postEntries]
}
