import { get } from '@vercel/blob'
import { routeErrorResponse } from '@/lib/route-errors'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(_request: Request, context: { params: Promise<{ pathname: string[] }> }): Promise<Response> {
	try {
		const { pathname: segments } = await context.params
		const pathname = segments.join('/')
		if (!/^blog\/[a-z0-9_-]{1,100}\/[a-f0-9]{64}\.[a-z0-9]{1,10}$/i.test(pathname)) {
			return new Response('Not found', { status: 404 })
		}
		const result = await get(pathname, { access: 'private', token: process.env.BLOB_READ_WRITE_TOKEN })
		if (!result) return new Response('Not found', { status: 404 })
		return new Response(result.stream, {
			headers: {
				'Content-Type': result.blob.contentType || 'application/octet-stream',
				'Cache-Control': 'public, max-age=31536000, immutable',
				'ETag': result.blob.etag
			}
		})
	} catch (error) {
		return routeErrorResponse(error)
	}
}
