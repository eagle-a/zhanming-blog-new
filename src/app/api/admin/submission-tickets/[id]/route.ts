import { z } from 'zod'
import { assertAdminMutationRequest } from '@/lib/admin-auth'
import { revokeSubmissionTicket } from '@/lib/submission-tickets-repository'
import { routeErrorResponse } from '@/lib/route-errors'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function DELETE(request: Request, context: RouteContext<'/api/admin/submission-tickets/[id]'>): Promise<Response> {
	try {
		assertAdminMutationRequest(request)
		const id = z.coerce
			.number()
			.int()
			.positive()
			.parse((await context.params).id)
		const revoked = await revokeSubmissionTicket(id)
		return revoked ? Response.json({ revoked: true }) : Response.json({ error: '票据不存在或已失效' }, { status: 404 })
	} catch (error) {
		return routeErrorResponse(error)
	}
}
