import { reviewListQuerySchema } from '@/lib/review-validation'
import { assertAdminRequest } from '@/lib/admin-auth'
import { listContentSubmissions } from '@/lib/submissions-repository'
import { routeErrorResponse } from '@/lib/route-errors'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: Request): Promise<Response> {
	try {
		assertAdminRequest(request)
		const { status, limit, cursor } = reviewListQuerySchema.parse(Object.fromEntries(new URL(request.url).searchParams))
		return Response.json(await listContentSubmissions(status, limit, cursor), { headers: { 'Cache-Control': 'no-store' } })
	} catch (error) {
		return routeErrorResponse(error)
	}
}
