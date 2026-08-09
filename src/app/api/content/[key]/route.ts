import { getCachedContentDocument, getFallbackContentDocument } from '@/lib/content-repository'
import { isContentDocumentKey } from '@/lib/content-validation'
import { allowDevelopmentLegacyFallback } from '@/lib/legacy-blog-reader'
import { routeErrorResponse } from '@/lib/route-errors'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(_request: Request, { params }: { params: Promise<{ key: string }> }): Promise<Response> {
	try {
		const { key } = await params
		if (!isContentDocumentKey(key)) return Response.json({ error: '配置不存在' }, { status: 404 })
		if (allowDevelopmentLegacyFallback()) {
			return Response.json(getFallbackContentDocument(key), {
				headers: { 'Cache-Control': 'public, max-age=0, must-revalidate' }
			})
		}
		const document = await getCachedContentDocument(key)
		return Response.json(document, {
			headers: { 'Cache-Control': 'public, max-age=0, must-revalidate' }
		})
	} catch (error) {
		return routeErrorResponse(error)
	}
}
