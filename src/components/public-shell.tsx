'use client'

import type { PropsWithChildren } from 'react'
import type { CardStyles, SiteContent } from '@/app/(home)/stores/config-store'
import { AnalyticsTracker } from '@/components/analytics-tracker'
import { RuntimeConfigHydrator } from '@/components/runtime-config-hydrator'
import { SiteToaster } from '@/components/site-toaster'
import { WindowsPlatformClass } from '@/components/windows-platform-class'
import { LanguageProvider } from '@/i18n/context'
import Layout from '@/layout'

type PublicShellProps = PropsWithChildren<{
	siteContent: SiteContent
	cardStyles: CardStyles
	analyticsEnabled: boolean
}>

export default function PublicShell({ children, siteContent, cardStyles, analyticsEnabled }: PublicShellProps) {
	return (
		<div data-public-shell>
			<RuntimeConfigHydrator siteContent={siteContent} cardStyles={cardStyles} />
			<WindowsPlatformClass />
			<LanguageProvider>
				<Layout>{children}</Layout>
			</LanguageProvider>
			<SiteToaster />
			{analyticsEnabled && <AnalyticsTracker />}
		</div>
	)
}
