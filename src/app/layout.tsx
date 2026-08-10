import '@/styles/globals.css'

import type { Metadata } from 'next'
import { cache } from 'react'
import Layout from '@/layout'
import Head from '@/layout/head'
import { LanguageProvider } from '@/i18n/context'
import { RuntimeConfigHydrator } from '@/components/runtime-config-hydrator'
import { WindowsPlatformClass } from '@/components/windows-platform-class'
import { AnalyticsTracker } from '@/components/analytics-tracker'
import { getCachedContentDocument, getFallbackContentDocument } from '@/lib/content-repository'
import { hasDatabaseConfiguration } from '@/lib/legacy-blog-reader'
import type { CardStyles, SiteContent } from '@/app/(home)/stores/config-store'
import { resolveSiteUrl } from '@/lib/config-validation'

const SITE_URL = resolveSiteUrl(
	process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://zhanmingblog.cc.cd')
)

const getRuntimeConfig = cache(async (): Promise<{ siteContent: SiteContent; cardStyles: CardStyles }> => {
	if (!hasDatabaseConfiguration()) {
		return {
			siteContent: getFallbackContentDocument<SiteContent>('site').data,
			cardStyles: getFallbackContentDocument<CardStyles>('card-styles').data
		}
	}
	try {
		const [site, styles] = await Promise.all([getCachedContentDocument<SiteContent>('site'), getCachedContentDocument<CardStyles>('card-styles')])
		return { siteContent: site.data, cardStyles: styles.data }
	} catch (error) {
		console.error('Runtime site configuration unavailable, using bundled backup:', error)
		return {
			siteContent: getFallbackContentDocument<SiteContent>('site').data,
			cardStyles: getFallbackContentDocument<CardStyles>('card-styles').data
		}
	}
})

export async function generateMetadata(): Promise<Metadata> {
	const { siteContent } = await getRuntimeConfig()
	const { title, description } = siteContent.meta
	return {
		metadataBase: new URL(SITE_URL),
		title,
		description,
		alternates: { canonical: '/' },
		openGraph: { title, description, url: '/' },
		twitter: { title, description }
	}
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	const { siteContent, cardStyles } = await getRuntimeConfig()
	const theme = siteContent.theme
	const htmlStyle = {
		cursor: 'url(/images/cursor.svg) 2 1, auto',
		'--color-brand': theme.colorBrand,
		'--color-primary': theme.colorPrimary,
		'--color-secondary': theme.colorSecondary,
		'--color-brand-secondary': theme.colorBrandSecondary,
		'--color-bg': theme.colorBg,
		'--color-border': theme.colorBorder,
		'--color-card': theme.colorCard,
		'--color-article': theme.colorArticle
	}
	return (
		<html lang='zh-CN' data-scroll-behavior='smooth' suppressHydrationWarning style={htmlStyle}>
			<Head faviconUrl={siteContent.faviconUrl} />

			<body>
				<RuntimeConfigHydrator siteContent={siteContent} cardStyles={cardStyles} />
				<WindowsPlatformClass />

				<LanguageProvider>
					<Layout>{children}</Layout>
				</LanguageProvider>
				{/* Vercel analytics scripts load from va.vercel-scripts.com and are blocked by
			    CSP in local dev and on sensitive routes (/admin, /write) whose script-src
			    does not allow va.vercel-scripts.com. Render them only in production builds
			    and skip them on sensitive routes to keep the dev console clean and avoid
			    pointless CSP violations. */}
				{process.env.NODE_ENV === 'production' && <AnalyticsTracker />}
			</body>
		</html>
	)
}
