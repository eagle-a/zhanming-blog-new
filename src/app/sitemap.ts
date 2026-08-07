import { MetadataRoute } from 'next'
import type { BlogIndexItem } from '@/app/blog/types'
import { assertValidSlug, resolveSiteUrl } from '@/lib/config-validation'
import { getCachedPublishedPosts } from '@/lib/posts-repository'
import { allowDevelopmentLegacyFallback, readLegacyPosts } from '@/lib/legacy-blog-reader'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = resolveSiteUrl(
		process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://zhanmingblog.cc.cd')
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
