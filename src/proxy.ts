import { NextResponse, type NextRequest } from 'next/server'
import { buildCsp } from '@/lib/csp-policy'

export function proxy(request: NextRequest) {
	const sensitivePage =
		request.nextUrl.pathname.startsWith('/admin/') || request.nextUrl.pathname === '/write' || request.nextUrl.pathname.startsWith('/write/')
	const nonce = sensitivePage ? btoa(crypto.randomUUID()) : undefined
	const requestHeaders = new Headers(request.headers)
	if (nonce) {
		requestHeaders.set('x-nonce', nonce)
		requestHeaders.set('Content-Security-Policy', buildCsp(nonce))
	}

	const response = NextResponse.next({ request: { headers: requestHeaders } })
	response.headers.set('Content-Security-Policy', buildCsp(nonce, false, !sensitivePage))
	if (!sensitivePage && (process.env.VERCEL_ENV === 'preview' || process.env.CSP_REPORT_ONLY === '1')) {
		response.headers.set('Content-Security-Policy-Report-Only', buildCsp(undefined, true))
	}
	return response
}

export const config = {
	matcher: [
		{
			source: '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|rss.xml).*)',
			missing: [
				{ type: 'header', key: 'next-router-prefetch' },
				{ type: 'header', key: 'purpose', value: 'prefetch' }
			]
		}
	]
}
