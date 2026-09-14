import { assertAdminMutationRequest, assertAdminRequest } from '@/lib/admin-auth'
import { reviewUpdateSchema } from '@/lib/review-validation'
import { getContentSubmission, updatePendingPostSubmission } from '@/lib/submissions-repository'
import { routeErrorResponse } from '@/lib/route-errors'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: Request, context: { params: Promise<{ id: string }> }): Promise<Response> {
	try {
		assertAdminRequest(request)
		const result = await getContentSubmission((await context.params).id)
		return result ? Response.json(result, { headers: { 'Cache-Control': 'no-store' } }) : Response.json({ error: '投稿不存在' }, { status: 404 })
	} catch (error) {
		return routeErrorResponse(error)
	}
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }): Promise<Response> {
	try {
		assertAdminMutationRequest(request)
		const input = reviewUpdateSchema.parse(await request.json())
		return Response.json(await updatePendingPostSubmission((await context.params).id, input.payload, input.expectedContentHash), {
			headers: { 'Cache-Control': 'no-store' }
		})
	} catch (error) {
		return routeErrorResponse(error)
	}
}
