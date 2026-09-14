import { reviewRejectSchema } from '@/lib/review-validation'
import { assertAdminMutationRequest } from '@/lib/admin-auth'
import { rejectContentSubmission } from '@/lib/submissions-repository'
import { routeErrorResponse } from '@/lib/route-errors'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request, context: { params: Promise<{ id: string }> }): Promise<Response> {
	try {
		assertAdminMutationRequest(request)
		const { reason, expectedContentHash } = reviewRejectSchema.parse(await request.json())
		return Response.json(await rejectContentSubmission((await context.params).id, reason, expectedContentHash), { headers: { 'Cache-Control': 'no-store' } })
	} catch (error) {
		return routeErrorResponse(error)
	}
}
