import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { assertAdminRequest, assertSameOrigin } from '@/lib/admin-auth'
import { mediaPayloadSchema } from '@/lib/post-validation'
import { contentMediaPayloadSchema } from '@/lib/content-validation'
import { recordMedia } from '@/lib/posts-repository'
import { routeErrorResponse } from '@/lib/route-errors'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function parseMediaPayload(value: string | null | undefined) {
	const raw = JSON.parse(value || '{}') as unknown
	const blog = mediaPayloadSchema.safeParse(raw)
	if (blog.success) return { kind: 'blog' as const, value: blog.data }
	const content = contentMediaPayloadSchema.safeParse(raw)
	if (content.success) return { kind: 'content' as const, value: content.data }
	throw blog.error
}

export async function POST(request: Request): Promise<Response> {
	try {
		const body = (await request.json()) as HandleUploadBody
		if (body.type === 'blob.generate-client-token') {
			assertSameOrigin(request)
			assertAdminRequest(request)
		}

		const result = await handleUpload({
			body,
			request,
			onBeforeGenerateToken: async (pathname, clientPayload) => {
				const payload = parseMediaPayload(clientPayload)
				const expectedPrefix =
					payload.kind === 'blog' ? `blog/${payload.value.slug}/${payload.value.sha256}.` : `content/${payload.value.namespace}/${payload.value.sha256}.`
				const validPath =
					payload.kind === 'blog'
						? /^blog\/[a-z0-9_-]{1,100}\/[a-f0-9]{64}\.[a-z0-9]{1,10}$/i.test(pathname)
						: /^content\/(site|bloggers|projects|shares|pictures)\/[a-f0-9]{64}\.[a-z0-9]{1,10}$/i.test(pathname)
				if (!pathname.startsWith(expectedPrefix) || !validPath) {
					throw new Error('Blob pathname is invalid')
				}
				return {
					allowedContentTypes: [payload.value.mimeType],
					maximumSizeInBytes: 25 * 1024 * 1024,
					addRandomSuffix: false,
					allowOverwrite: true,
					cacheControlMaxAge: 31536000,
					tokenPayload: JSON.stringify(payload)
				}
			},
			onUploadCompleted: async ({ blob, tokenPayload }) => {
				const payload = parseMediaPayload(tokenPayload).value
				await recordMedia({
					blobUrl: blob.url,
					pathname: blob.pathname,
					sha256: payload.sha256,
					mimeType: payload.mimeType,
					size: payload.size
				})
			}
		})
		return Response.json(result)
	} catch (error) {
		return routeErrorResponse(error)
	}
}
