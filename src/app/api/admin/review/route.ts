import { z } from 'zod'
import { assertAdminRequest } from '@/lib/admin-auth'
import { listContentSubmissions } from '@/lib/submissions-repository'
import { routeErrorResponse } from '@/lib/route-errors'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const statusSchema = z.enum(['pending', 'approved', 'rejected']).optional()

export async function GET(request: Request): Promise<Response> {
	try {
		assertAdminRequest(request)
		const status = statusSchema.parse(new URL(request.url).searchParams.get('status') || undefined)
		return Response.json(await listContentSubmissions(status), { headers: { 'Cache-Control': 'no-store' } })
	} catch (error) {
		return routeErrorResponse(error)
	}
}
