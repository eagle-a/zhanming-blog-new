'use client'

import { usePathname } from 'next/navigation'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'

const SENSITIVE_ROUTE_PREFIXES = ['/admin', '/write']

function isSensitiveRoute(pathname: string): boolean {
	return SENSITIVE_ROUTE_PREFIXES.some(prefix => pathname === prefix || pathname.startsWith(prefix + '/'))
}

export function AnalyticsTracker() {
	const pathname = usePathname()
	if (!pathname || isSensitiveRoute(pathname)) return null
	return (
		<>
			<SpeedInsights />
			<Analytics />
		</>
	)
}
