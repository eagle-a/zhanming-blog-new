'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import type { PropsWithChildren } from 'react'
import type { CardStyles, SiteContent } from '@/app/(home)/stores/config-store'
import { SiteToaster } from '@/components/site-toaster'

const PublicShell = dynamic(() => import('@/components/public-shell'))

type RouteShellProps = PropsWithChildren<{
	siteContent: SiteContent
	cardStyles: CardStyles
	analyticsEnabled: boolean
}>

function isSensitiveRoute(pathname: string): boolean {
	return pathname === '/write' || pathname.startsWith('/write/') || pathname === '/admin' || pathname.startsWith('/admin/')
}

export function RouteShell({ children, siteContent, cardStyles, analyticsEnabled }: RouteShellProps) {
	const pathname = usePathname()
	if (isSensitiveRoute(pathname)) {
		return (
			<main data-minimal-shell>
				{children}
				<SiteToaster />
			</main>
		)
	}

	return (
		<PublicShell siteContent={siteContent} cardStyles={cardStyles} analyticsEnabled={analyticsEnabled}>
			{children}
		</PublicShell>
	)
}
