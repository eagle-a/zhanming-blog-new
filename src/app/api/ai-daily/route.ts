import { createJuyaAIFeedView } from '@/lib/juya-ai-feed'
import { fetchJuyaAIFeed } from '@/lib/juya-ai-feed-server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: Request): Promise<Response> {
	try {
		const selectedId = new URL(request.url).searchParams.get('issue')?.trim() || undefined
		if (selectedId && selectedId.length > 256) return Response.json({ error: '无效的日报编号' }, { status: 400 })

		const view = createJuyaAIFeedView(await fetchJuyaAIFeed(), selectedId)
		if (!view) return Response.json({ error: '所选日报不存在或已下线' }, { status: 404, headers: { 'Cache-Control': 'no-store' } })

		return Response.json(view, {
			headers: {
				'Cache-Control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=3600'
			}
		})
	} catch (error) {
		console.error('AI daily feed failed:', error)
		return Response.json({ error: '橘鸦 AI 早报暂时无法获取，请稍后重试' }, { status: 502, headers: { 'Cache-Control': 'no-store' } })
	}
}
