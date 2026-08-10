import { getCachedCategories } from '@/lib/posts-repository'
import { routeErrorResponse } from '@/lib/route-errors'
import { allowDevelopmentLegacyFallback, readLegacyCategories } from '@/lib/legacy-blog-reader'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(): Promise<Response> {
	if (allowDevelopmentLegacyFallback()) {
		return Response.json({ categories: readLegacyCategories() }, { headers: { 'Cache-Control': 'public, max-age=0, must-revalidate' } })
	}

	try {
		return Response.json({ categories: await getCachedCategories() }, { headers: { 'Cache-Control': 'public, max-age=0, must-revalidate' } })
	} catch (error) {
		return routeErrorResponse(error)
	}
}
