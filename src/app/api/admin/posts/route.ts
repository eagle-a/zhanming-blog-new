import { revalidateTag } from 'next/cache'
import { assertAdminMutationRequest } from '@/lib/admin-auth'
import { postInputSchema } from '@/lib/post-validation'
import { upsertPost } from '@/lib/posts-repository'
import { routeErrorResponse } from '@/lib/route-errors'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request): Promise<Response> {
	try {
		assertAdminMutationRequest(request)
		const input = postInputSchema.parse(await request.json())
		const post = await upsertPost(input)
		revalidateTag('posts', { expire: 0 })
		revalidateTag(`post:${post.slug}`, { expire: 0 })
		revalidateTag('post-categories', { expire: 0 })
		return Response.json(post, { status: 201 })
	} catch (error) {
		return routeErrorResponse(error)
	}
}
