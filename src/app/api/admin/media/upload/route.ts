import { createHash } from 'node:crypto'
import { get } from '@vercel/blob'
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { assertAdminMutationRequest, assertWritableEnvironment } from '@/lib/admin-auth'
import { mediaPayloadSchema } from '@/lib/post-validation'
import { contentMediaPayloadSchema } from '@/lib/content-validation'
import { registerPendingMedia, reservePendingMediaUpload } from '@/lib/media-lifecycle'
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
		assertWritableEnvironment()
		const body = (await request.json()) as HandleUploadBody
		if (body.type === 'blob.generate-client-token') {
			assertAdminMutationRequest(request)
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
				await reservePendingMediaUpload(pathname)
				return {
					allowedContentTypes: [payload.value.mimeType],
					maximumSizeInBytes: 25 * 1024 * 1024,
					addRandomSuffix: false,
					allowOverwrite: false,
					cacheControlMaxAge: 31536000,
					tokenPayload: JSON.stringify(payload)
				}
			},
			onUploadCompleted: async ({ blob, tokenPayload }) => {
				const payload = parseMediaPayload(tokenPayload).value
				const result = await get(blob.pathname, { access: 'private', useCache: false })
				if (!result || result.statusCode !== 200) throw new Error('Uploaded Blob cannot be verified')
				const bytes = Buffer.from(await new Response(result.stream).arrayBuffer())
				const sha256 = createHash('sha256').update(bytes).digest('hex')
				if (sha256 !== payload.sha256 || bytes.length !== payload.size || result.blob.contentType !== payload.mimeType) {
					throw new Error('Uploaded Blob integrity verification failed')
				}
				const mimeType = result.blob.contentType
				let dimensions: { width?: number; height?: number } = {}
				if (mimeType.startsWith('image/') && mimeType !== 'image/svg+xml') {
					try {
						const { default: sharp } = await import('sharp')
						const metadata = await sharp(bytes).metadata()
						if (metadata.width && metadata.height) dimensions = { width: metadata.width, height: metadata.height }
					} catch {
						// Dimension extraction is best-effort; non-fatal if sharp fails.
					}
				}
				await registerPendingMedia({
					blobUrl: blob.url,
					pathname: blob.pathname,
					sha256,
					mimeType,
					size: bytes.length,
					...dimensions
				})
			}
		})
		return Response.json(result)
	} catch (error) {
		return routeErrorResponse(error)
	}
}
