import { searchPosts } from '@/lib/posts-repository'
import { routeErrorResponse } from '@/lib/route-errors'
import { allowDevelopmentLegacyFallback } from '@/lib/legacy-blog-reader'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAX_QUERY_LENGTH = 200
const DEFAULT_LIMIT = 20
const MAX_LIMIT = 50

export async function GET(request: Request): Promise<Response> {
	try {
		const url = new URL(request.url)
		const rawQuery = url.searchParams.get('q') || ''
		const query = rawQuery.trim().slice(0, MAX_QUERY_LENGTH)
		if (!query) return Response.json({ results: [] })

		const rawLimit = Number.parseInt(url.searchParams.get('limit') || '', 10)
		const limit = Number.isFinite(rawLimit) && rawLimit > 0 ? Math.min(rawLimit, MAX_LIMIT) : DEFAULT_LIMIT

		// Database unavailable in local dev without PostgreSQL — fall back to
		// legacy reader so search still returns something useful.
		if (allowDevelopmentLegacyFallback()) {
			return Response.json({ results: [], fallback: true })
		}

		const results = await searchPosts(query, limit)
		return Response.json({ results }, { headers: { 'Cache-Control': 'private, max-age=0, must-revalidate' } })
	} catch (error) {
		return routeErrorResponse(error)
	}
}
