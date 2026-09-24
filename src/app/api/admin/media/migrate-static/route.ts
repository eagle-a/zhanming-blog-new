import { revalidateTag } from 'next/cache'
import { z } from 'zod'
import { assertAdminMutationRequest } from '@/lib/admin-auth'
import { mediaProxyUrl } from '@/lib/media-url'
import { getPost, upsertPost } from '@/lib/posts-repository'
import { routeErrorResponse } from '@/lib/route-errors'
import { findStaticMediaReferences, rewriteStaticMedia, type StaticMediaMigration } from '@/lib/static-media-migration'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Last step of `pnpm media:migrate-static`: rewrite an article body from the old
 * `/images/<slug>/...` references to the `/api/media/...` URLs that the images
 * were already uploaded to through `/api/admin/media/store`. The rewrite happens
 * here so the read-modify-write stays inside one transaction and a concurrently
 * edited article is rejected by version.
 */

const finalizeSchema = z
	.object({
		slug: z.string().trim().min(1).max(100),
		expectedVersion: z.number().int().positive(),
		replacements: z
			.array(
				z
					.object({
						href: z.string().min(1).max(2048),
						pathname: z.string().min(1).max(300)
					})
					.strict()
			)
			.min(1)
			.max(100)
	})
	.strict()

function badRequest(message: string): Response {
	return Response.json({ error: message }, { status: 400 })
}

async function finalize(request: Request): Promise<Response> {
	const input = finalizeSchema.parse(await request.json())
	const post = await getPost(input.slug, true)
	if (!post) return Response.json({ error: '文章不存在' }, { status: 404 })
	if (post.status === 'archived') return Response.json({ error: '已归档文章不支持图片迁移' }, { status: 409 })
	if (post.version !== input.expectedVersion) return Response.json({ error: '文章已被其他会话修改，请重新读取后再迁移' }, { status: 409 })

	const migrations: StaticMediaMigration[] = input.replacements.map(replacement => ({
		file: replacement.href.split('/').pop() || replacement.href,
		href: replacement.href,
		target: mediaProxyUrl(replacement.pathname)
	}))
	const rewritten = rewriteStaticMedia(post.contentMd, migrations)
	if (rewritten.replaced === 0) return badRequest('正文里没有找到待替换的引用，未改动文章')

	const updated = await upsertPost({
		slug: post.slug,
		title: post.title,
		summary: post.summary ?? '',
		contentMd: rewritten.contentMd,
		coverUrl: post.cover ?? null,
		category: post.category ?? null,
		tags: post.tags,
		status: post.status === 'published' ? 'published' : 'draft',
		publishedAt: post.date,
		expectedVersion: input.expectedVersion
	})

	revalidateTag('posts', { expire: 0 })
	revalidateTag(`post:${post.slug}`, { expire: 0 })

	return Response.json({
		slug: post.slug,
		replaced: rewritten.replaced,
		version: updated.version,
		remaining: findStaticMediaReferences(updated.contentMd, post.slug).map(reference => reference.href)
	})
}

export async function POST(request: Request): Promise<Response> {
	try {
		assertAdminMutationRequest(request)
		return await finalize(request)
	} catch (error) {
		return routeErrorResponse(error)
	}
}
