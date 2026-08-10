import type { MetadataRoute } from 'next'
import { resolvePublicSiteUrl } from '@/lib/config-validation'

export default function robots(): MetadataRoute.Robots {
	const baseUrl = resolvePublicSiteUrl()

	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/admin/', '/write', '/api/']
		},
		sitemap: `${baseUrl}/sitemap.xml`,
		host: baseUrl
	}
}
