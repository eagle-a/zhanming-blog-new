import type { MetadataRoute } from 'next'
import { resolveSiteUrl } from '@/lib/config-validation'

export default function robots(): MetadataRoute.Robots {
	const baseUrl = resolveSiteUrl(
		process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://zhanmingblog.cc.cd')
	)

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
