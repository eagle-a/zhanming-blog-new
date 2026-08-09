import { JUYA_AI_RSS_URL, parseJuyaAIFeed } from '@/lib/juya-ai-feed'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAX_RSS_BYTES = 1024 * 1024

export async function GET(): Promise<Response> {
	try {
		const response = await fetch(JUYA_AI_RSS_URL, {
			headers: {
				Accept: 'application/rss+xml, application/xml, text/xml;q=0.9',
				'User-Agent': 'zhanming-blog-ai-daily/1.0'
			},
			signal: AbortSignal.timeout(12_000),
			next: { revalidate: 300, tags: ['ai-daily'] }
		})
		if (!response.ok) throw new Error(`Upstream RSS returned ${response.status}`)

		const declaredSize = Number(response.headers.get('content-length') || 0)
		if (declaredSize > MAX_RSS_BYTES) throw new Error('Upstream RSS exceeds the size limit')
		const xml = await response.text()
		if (new TextEncoder().encode(xml).byteLength > MAX_RSS_BYTES) throw new Error('Upstream RSS exceeds the size limit')

		return Response.json(parseJuyaAIFeed(xml), {
			headers: {
				'Cache-Control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=3600'
			}
		})
	} catch (error) {
		console.error('AI daily feed failed:', error)
		return Response.json({ error: '橘鸦 AI 早报暂时无法获取，请稍后重试' }, { status: 502, headers: { 'Cache-Control': 'no-store' } })
	}
}
