import { revalidateTag } from 'next/cache'
import { assertAdminMutationRequest, assertAdminRequest } from '@/lib/admin-auth'
import { assertValidSlug } from '@/lib/config-validation'
import { getPostRevision, restorePostRevision } from '@/lib/posts-repository'
import { routeErrorResponse } from '@/lib/route-errors'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function parseVersion(value: string): number {
	const n = Number.parseInt(value, 10)
	if (!Number.isFinite(n) || n <= 0) throw new Response('Invalid version', { status: 400 })
	return n
}

export async function GET(request: Request, context: { params: Promise<{ slug: string; version: string }> }): Promise<Response> {
	try {
		assertAdminRequest(request)
		const { slug: rawSlug, version: rawVersion } = await context.params
		const slug = assertValidSlug(rawSlug)
		const version = parseVersion(rawVersion)
		const revision = await getPostRevision(slug, version)
		if (!revision) return Response.json({ error: '修订版本不存在' }, { status: 404 })
		return Response.json({ revision })
	} catch (error) {
		return routeErrorResponse(error)
	}
}

export async function POST(request: Request, context: { params: Promise<{ slug: string; version: string }> }): Promise<Response> {
	try {
		assertAdminMutationRequest(request)
		const { slug: rawSlug, version: rawVersion } = await context.params
		const slug = assertValidSlug(rawSlug)
		const version = parseVersion(rawVersion)
		const post = await restorePostRevision(slug, version)
		revalidateTag('posts', { expire: 0 })
		revalidateTag(`post:${slug}`, { expire: 0 })
		revalidateTag('post-categories', { expire: 0 })
		return Response.json(post)
	} catch (error) {
		return routeErrorResponse(error)
	}
}
