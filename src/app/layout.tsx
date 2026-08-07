import '@/styles/globals.css'

import type { Metadata } from 'next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import Layout from '@/layout'
import Head from '@/layout/head'
import { LanguageProvider } from '@/i18n/context'
import { RuntimeConfigHydrator } from '@/components/runtime-config-hydrator'
import { getCachedContentDocument, getFallbackContentDocument } from '@/lib/content-repository'
import type { CardStyles, SiteContent } from '@/app/(home)/stores/config-store'

async function getRuntimeConfig(): Promise<{ siteContent: SiteContent; cardStyles: CardStyles }> {
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
	return { title, description, openGraph: { title, description }, twitter: { title, description } }
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
		<html lang='en' suppressHydrationWarning style={htmlStyle}>
			<Head faviconUrl={siteContent.faviconUrl} />

			<body>
				<RuntimeConfigHydrator siteContent={siteContent} cardStyles={cardStyles} />
				<script
					dangerouslySetInnerHTML={{
						__html: `
					if (/windows|win32/i.test(navigator.userAgent)) {
						document.documentElement.classList.add('windows');
					}
			      `
					}}
				/>

				<LanguageProvider>
					<Layout>{children}</Layout>
				</LanguageProvider>
				<SpeedInsights />
				<Analytics />
			</body>
		</html>
	)
}
