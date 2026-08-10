import { revalidateTag } from 'next/cache'
import { assertAdminMutationRequest } from '@/lib/admin-auth'
import { assertValidSlug } from '@/lib/config-validation'
import { postInputSchema } from '@/lib/post-validation'
import { softDeletePost, upsertPost } from '@/lib/posts-repository'
import { routeErrorResponse } from '@/lib/route-errors'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function PATCH(request: Request, context: { params: Promise<{ slug: string }> }): Promise<Response> {
	try {
		assertAdminMutationRequest(request)
		const { slug: rawSlug } = await context.params
		const slug = assertValidSlug(rawSlug)
		const input = postInputSchema.parse(await request.json())
		if (input.slug !== slug) return Response.json({ error: '编辑模式不能修改 slug' }, { status: 400 })
		const post = await upsertPost(input)
		revalidateTag('posts', { expire: 0 })
		revalidateTag(`post:${slug}`, { expire: 0 })
		revalidateTag('post-categories', { expire: 0 })
		return Response.json(post)
	} catch (error) {
		return routeErrorResponse(error)
	}
}

export async function DELETE(request: Request, context: { params: Promise<{ slug: string }> }): Promise<Response> {
	try {
		assertAdminMutationRequest(request)
		const { slug: rawSlug } = await context.params
		const slug = assertValidSlug(rawSlug)
		const deleted = await softDeletePost(slug)
		if (!deleted) return Response.json({ error: '文章不存在或已删除' }, { status: 404 })
		revalidateTag('posts', { expire: 0 })
		revalidateTag(`post:${slug}`, { expire: 0 })
		revalidateTag('post-categories', { expire: 0 })
		return Response.json({ deleted: true })
	} catch (error) {
		return routeErrorResponse(error)
	}
}
