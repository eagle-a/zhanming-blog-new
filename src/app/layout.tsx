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
import { resolvePublicSiteUrl } from '@/lib/config-validation'
import { resolveSiteDescription } from '@/lib/site-metadata'

const SITE_URL = resolvePublicSiteUrl()

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
	const title = siteContent.meta.title
	const description = resolveSiteDescription(siteContent.meta.description)
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
				{/* These same-origin endpoints exist only on Vercel. A local `next start`
				    is also a production build, but must not request /_vercel/* scripts. */}
				{process.env.VERCEL === '1' && <AnalyticsTracker />}
			</body>
		</html>
	)
}
