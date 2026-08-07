import { assertValidSlug } from '@/lib/config-validation'
import { isAdminRequest } from '@/lib/admin-auth'
import { getCachedPublishedPost, getPost } from '@/lib/posts-repository'
import { routeErrorResponse } from '@/lib/route-errors'
import { allowDevelopmentLegacyFallback, readLegacyPost } from '@/lib/legacy-blog-reader'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: Request, context: { params: Promise<{ slug: string }> }): Promise<Response> {
	try {
		const { slug: rawSlug } = await context.params
		const slug = assertValidSlug(rawSlug)
		const includeDrafts = isAdminRequest(request)
		const post = includeDrafts ? await getPost(slug, true) : await getCachedPublishedPost(slug)
		if (!post) return Response.json({ error: '文章不存在' }, { status: 404 })
		return Response.json(post, { headers: { 'Cache-Control': includeDrafts ? 'private, no-store' : 'public, max-age=0, must-revalidate' } })
	} catch (error) {
		if (allowDevelopmentLegacyFallback()) {
			const { slug: rawSlug } = await context.params
			const legacy = readLegacyPost(rawSlug)
			if (legacy) return Response.json(legacy)
		}
		return routeErrorResponse(error)
	}
}
