import { assertAdminRequest } from '@/lib/admin-auth'
import { assertValidSlug } from '@/lib/config-validation'
import { listPostRevisions } from '@/lib/posts-repository'
import { routeErrorResponse } from '@/lib/route-errors'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: Request, context: { params: Promise<{ slug: string }> }): Promise<Response> {
	try {
		assertAdminRequest(request)
		const { slug: rawSlug } = await context.params
		const slug = assertValidSlug(rawSlug)
		const revisions = await listPostRevisions(slug)
		return Response.json({ revisions })
	} catch (error) {
		return routeErrorResponse(error)
	}
}
