import '@/styles/globals.css'

import type { Metadata } from 'next'
import Script from 'next/script'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import Layout from '@/layout'
import Head from '@/layout/head'
import { LanguageProvider } from '@/i18n/context'
import { RuntimeConfigHydrator } from '@/components/runtime-config-hydrator'
import { getCachedContentDocument, getFallbackContentDocument } from '@/lib/content-repository'
import { hasDatabaseConfiguration } from '@/lib/legacy-blog-reader'
import type { CardStyles, SiteContent } from '@/app/(home)/stores/config-store'
import { resolveSiteUrl } from '@/lib/config-validation'

const SITE_URL = resolveSiteUrl(
	process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://zhanmingblog.cc.cd')
)

async function getRuntimeConfig(): Promise<{ siteContent: SiteContent; cardStyles: CardStyles }> {
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
}

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
				<Script id='windows-platform-class' strategy='beforeInteractive'>
					{`
					if (/windows|win32/i.test(navigator.userAgent)) {
						document.documentElement.classList.add('windows');
					}
			      `}
				</Script>

				<LanguageProvider>
					<Layout>{children}</Layout>
				</LanguageProvider>
				<SpeedInsights />
				<Analytics />
			</body>
		</html>
	)
}
