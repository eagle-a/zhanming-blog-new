import { MetadataRoute } from 'next'
import type { BlogIndexItem } from '@/app/blog/types'
import { assertValidSlug, resolvePublicSiteUrl } from '@/lib/config-validation'
import { getCachedPublishedPosts } from '@/lib/posts-repository'
import { allowDevelopmentLegacyFallback, readLegacyPosts } from '@/lib/legacy-blog-reader'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = resolvePublicSiteUrl()

	const posts: BlogIndexItem[] = allowDevelopmentLegacyFallback() ? readLegacyPosts(false) : await getCachedPublishedPosts()

	const postEntries: MetadataRoute.Sitemap = posts.map(post => ({
		url: `${baseUrl}/blog/${assertValidSlug(post.slug)}`,
		lastModified: new Date(post.updatedAt || post.date),
		changeFrequency: 'weekly',
		priority: 0.8
	}))

	const staticRoutes = [
		'',
		'/about',
		'/blog',
		'/bloggers',
		'/clock',
		'/comments',
		'/image-toolbox',
		'/juya-ai-daily',
		'/live2d',
		'/pictures',
		'/projects',
		'/share',
		'/snippets',
		'/svgs'
	]
	const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(route => ({
		url: `${baseUrl}${route}`,
		changeFrequency: route === '' || route === '/blog' ? 'daily' : 'monthly',
		priority: route === '' ? 1 : route === '/blog' ? 0.9 : 0.6
	}))

	return [...staticEntries, ...postEntries]
}
