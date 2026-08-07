import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { assertAdminRequest, assertSameOrigin } from '@/lib/admin-auth'
import { mediaPayloadSchema } from '@/lib/post-validation'
import { recordMedia } from '@/lib/posts-repository'
import { routeErrorResponse } from '@/lib/route-errors'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

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
				const payload = mediaPayloadSchema.parse(JSON.parse(clientPayload || '{}'))
				const expectedPrefix = `blog/${payload.slug}/${payload.sha256}.`
				if (!pathname.startsWith(expectedPrefix) || !/^blog\/[a-z0-9_-]{1,100}\/[a-f0-9]{64}\.[a-z0-9]{1,10}$/i.test(pathname)) {
					throw new Error('Blob pathname is invalid')
				}
				return {
					allowedContentTypes: [payload.mimeType],
					maximumSizeInBytes: 25 * 1024 * 1024,
					addRandomSuffix: false,
					allowOverwrite: true,
					cacheControlMaxAge: 31536000,
					tokenPayload: JSON.stringify(payload)
				}
			},
			onUploadCompleted: async ({ blob, tokenPayload }) => {
				const payload = mediaPayloadSchema.parse(JSON.parse(tokenPayload || '{}'))
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
