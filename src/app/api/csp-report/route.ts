export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAX_REPORT_BYTES = 32 * 1024

function safeUrl(value: unknown): string | null {
	if (typeof value !== 'string') return null
	try {
		const url = new URL(value)
		return `${url.origin}${url.pathname}`.slice(0, 500)
	} catch {
		return value.slice(0, 500)
	}
}

export async function POST(request: Request): Promise<Response> {
	const length = Number(request.headers.get('content-length') || '0')
	if (Number.isFinite(length) && length > MAX_REPORT_BYTES) return new Response(null, { status: 413 })
	const body = await request.text()
	if (Buffer.byteLength(body) > MAX_REPORT_BYTES) return new Response(null, { status: 413 })
	try {
		const parsed = JSON.parse(body) as Record<string, any>
		const report = parsed['csp-report'] || parsed.body || parsed
		console.info('csp-violation', {
			documentUri: safeUrl(report['document-uri'] || report.documentURL),
			blockedUri: safeUrl(report['blocked-uri'] || report.blockedURL),
			violatedDirective: String(report['violated-directive'] || report.effectiveDirective || '').slice(0, 120),
			disposition: String(report.disposition || '').slice(0, 30)
		})
	} catch {
		return new Response(null, { status: 400 })
	}
	return new Response(null, { status: 204, headers: { 'Cache-Control': 'no-store' } })
}
