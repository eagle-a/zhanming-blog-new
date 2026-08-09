import { z } from 'zod'
import { assertAdminMutationRequest, assertAdminRequest } from '@/lib/admin-auth'
import { createSubmissionTicket, listSubmissionTickets } from '@/lib/submission-tickets-repository'
import { routeErrorResponse } from '@/lib/route-errors'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const createTicketSchema = z
	.object({
		label: z.string().trim().min(1).max(100)
	})
	.strict()

export async function GET(request: Request): Promise<Response> {
	try {
		assertAdminRequest(request)
		return Response.json(await listSubmissionTickets(), { headers: { 'Cache-Control': 'no-store' } })
	} catch (error) {
		return routeErrorResponse(error)
	}
}

export async function POST(request: Request): Promise<Response> {
	try {
		assertAdminMutationRequest(request)
		const { label } = createTicketSchema.parse(await request.json())
		return Response.json(await createSubmissionTicket(label), {
			status: 201,
			headers: { 'Cache-Control': 'no-store, private', Pragma: 'no-cache' }
		})
	} catch (error) {
		return routeErrorResponse(error)
	}
}
