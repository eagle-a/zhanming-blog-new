import { revalidateTag } from 'next/cache'
import { assertAdminRequest, assertSameOrigin } from '@/lib/admin-auth'
import { batchPostEditSchema } from '@/lib/post-validation'
import { applyBatchPostEdits } from '@/lib/posts-repository'
import { routeErrorResponse } from '@/lib/route-errors'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function PUT(request: Request): Promise<Response> {
	try {
		assertSameOrigin(request)
		assertAdminRequest(request)
		const input = batchPostEditSchema.parse(await request.json())
		await applyBatchPostEdits(input)
		revalidateTag('posts', { expire: 0 })
		revalidateTag('post-categories', { expire: 0 })
		for (const slug of input.removedSlugs) revalidateTag(`post:${slug}`, { expire: 0 })
		return Response.json({ saved: true })
	} catch (error) {
		return routeErrorResponse(error)
	}
}
