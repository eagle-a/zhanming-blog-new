import { revalidateTag } from 'next/cache'
import { assertAdminMutationRequest } from '@/lib/admin-auth'
import { approvePostSubmission } from '@/lib/submissions-repository'
import { routeErrorResponse } from '@/lib/route-errors'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request, context: { params: Promise<{ id: string }> }): Promise<Response> {
	try {
		assertAdminMutationRequest(request)
		const result = await approvePostSubmission((await context.params).id)
		revalidateTag('posts', { expire: 0 })
		revalidateTag(`post:${result.slug}`, { expire: 0 })
		revalidateTag('post-categories', { expire: 0 })
		return Response.json(result, { headers: { 'Cache-Control': 'no-store' } })
	} catch (error) {
		return routeErrorResponse(error)
	}
}
