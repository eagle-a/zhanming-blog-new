import 'server-only'
import { JUYA_AI_RSS_URL, parseJuyaAIFeed, type JuyaAIFeed } from './juya-ai-feed'

const MAX_RSS_BYTES = 1024 * 1024

export async function fetchJuyaAIFeed(): Promise<JuyaAIFeed> {
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
	return parseJuyaAIFeed(xml)
}
