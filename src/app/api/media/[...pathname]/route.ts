import { get } from '@vercel/blob'
import { isAllowedMediaPathname } from '@/lib/media-url'
import { routeErrorResponse } from '@/lib/route-errors'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(_request: Request, context: { params: Promise<{ pathname: string[] }> }): Promise<Response> {
	try {
		const { pathname: segments } = await context.params
		const pathname = segments.join('/')
		if (!isAllowedMediaPathname(pathname)) {
			return new Response('Not found', { status: 404 })
		}
		const result = await get(pathname, { access: 'private', token: process.env.BLOB_READ_WRITE_TOKEN })
		if (!result) return new Response('Not found', { status: 404 })
		return new Response(result.stream, {
			headers: {
				'Content-Type': result.blob.contentType || 'application/octet-stream',
				'Cache-Control': 'public, max-age=31536000, immutable',
				ETag: result.blob.etag,
				'Content-Security-Policy': "sandbox; default-src 'none'; style-src 'unsafe-inline'",
				'X-Content-Type-Options': 'nosniff'
			}
		})
	} catch (error) {
		return routeErrorResponse(error)
	}
}
