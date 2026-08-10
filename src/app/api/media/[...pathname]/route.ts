import { get } from '@vercel/blob'
import { isAllowedMediaPathname } from '@/lib/media-url'
import { parseResponsiveMediaWidth } from '@/lib/responsive-media'
import { routeErrorResponse } from '@/lib/route-errors'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const IMAGE_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'])

export async function GET(request: Request, context: { params: Promise<{ pathname: string[] }> }): Promise<Response> {
	try {
		const { pathname: segments } = await context.params
		const pathname = segments.join('/')
		if (!isAllowedMediaPathname(pathname)) {
			return new Response('Not found', { status: 404 })
		}
		const url = new URL(request.url)
		const requestedWidth = url.searchParams.get('w')
		const targetWidth = parseResponsiveMediaWidth(requestedWidth)
		if (requestedWidth !== null && targetWidth === null) {
			return new Response('Unsupported image width', { status: 400 })
		}

		const result = await get(pathname, { access: 'private', token: process.env.BLOB_READ_WRITE_TOKEN })
		if (!result) return new Response('Not found', { status: 404 })

		const contentType = result.blob.contentType || 'application/octet-stream'
		const baseHeaders: Record<string, string> = {
			'Cache-Control': 'public, max-age=31536000, immutable',
			'Vercel-CDN-Cache-Control': 'public, max-age=31536000, immutable',
			ETag: result.blob.etag,
			'Content-Security-Policy': "sandbox; default-src 'none'; style-src 'unsafe-inline'",
			'X-Content-Type-Options': 'nosniff'
		}

		// Only resize raster images when an explicit width is requested.
		// SVG, video and other non-raster types always pass through unchanged.
		if (targetWidth !== null && IMAGE_MIME_TYPES.has(contentType)) {
			const { default: sharp } = await import('sharp')
			const bytes = Buffer.from(await new Response(result.stream).arrayBuffer())
			const image = sharp(bytes, { animated: contentType === 'image/gif' })
			const metadata = await image.metadata()
			// Do not upscale beyond the original width.
			const effectiveWidth = Math.min(targetWidth, metadata.width || targetWidth)
			if (effectiveWidth < (metadata.width || 0)) {
				const format = (metadata.format || contentType.split('/')[1] || 'webp') as keyof import('sharp').FormatEnum
				const resized = await image.resize({ width: effectiveWidth, withoutEnlargement: true }).toFormat(format, { quality: 82 }).toBuffer()
				return new Response(resized, {
					headers: {
						...baseHeaders,
						'Content-Type': contentType,
						ETag: `${result.blob.etag}-w${effectiveWidth}-q82-v1`
					}
				})
			}
			// Original is not larger than requested; fall through to serve as-is.
			return new Response(bytes, { headers: { ...baseHeaders, 'Content-Type': contentType } })
		}

		return new Response(result.stream, {
			headers: { ...baseHeaders, 'Content-Type': contentType }
		})
	} catch (error) {
		return routeErrorResponse(error)
	}
}
