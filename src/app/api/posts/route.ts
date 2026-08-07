import { getCachedPublishedPosts, listPosts } from '@/lib/posts-repository'
import { isAdminRequest } from '@/lib/admin-auth'
import { routeErrorResponse } from '@/lib/route-errors'
import { allowDevelopmentLegacyFallback, readLegacyPosts } from '@/lib/legacy-blog-reader'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: Request): Promise<Response> {
	try {
		const includeDrafts = new URL(request.url).searchParams.get('scope') === 'all' && isAdminRequest(request)
		const result = includeDrafts ? await listPosts(true) : await getCachedPublishedPosts()
		return Response.json(result, { headers: { 'Cache-Control': includeDrafts ? 'private, no-store' : 'public, max-age=0, must-revalidate' } })
	} catch (error) {
		if (allowDevelopmentLegacyFallback()) return Response.json(readLegacyPosts(false))
		return routeErrorResponse(error)
	}
}
