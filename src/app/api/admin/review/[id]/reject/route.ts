import { z } from 'zod'
import { assertAdminMutationRequest } from '@/lib/admin-auth'
import { rejectContentSubmission } from '@/lib/submissions-repository'
import { routeErrorResponse } from '@/lib/route-errors'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const rejectSchema = z.object({ reason: z.string().trim().min(1).max(2000) }).strict()

export async function POST(request: Request, context: { params: Promise<{ id: string }> }): Promise<Response> {
	try {
		assertAdminMutationRequest(request)
		const { reason } = rejectSchema.parse(await request.json())
		return Response.json(await rejectContentSubmission((await context.params).id, reason), { headers: { 'Cache-Control': 'no-store' } })
	} catch (error) {
		return routeErrorResponse(error)
	}
}
