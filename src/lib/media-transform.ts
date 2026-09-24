/**
 * Decide what a `/api/media/...?w=<width>` request should return.
 *
 * The proxy reads a private Blob store, so every variant is produced on demand.
 * Two rules keep that honest:
 *
 * 1. Never upscale. When the stored image is narrower than the requested
 *    width, the derivative is capped at the stored width.
 * 2. Re-encode JPEG/PNG to WebP. The format is decided by the URL and never by
 *    `Accept`, so a cached response can never reach a client that cannot decode
 *    it: browsers without WebP support load the plain URL, which is served byte
 *    for byte.
 *
 * `null` means "serve the stored bytes unchanged".
 */

export const WEBP_QUALITY = 82

const RASTER_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'])
const WEBP_SOURCE_MIME_TYPES = new Set(['image/jpeg', 'image/png'])

export function isTransformableMediaType(contentType: string): boolean {
	return RASTER_MIME_TYPES.has(contentType)
}

export type MediaDerivative = {
	/** Width to encode at; never larger than the stored image. */
	width: number
	/** True when the derivative has to be encoded as WebP instead of the source format. */
	toWebp: boolean
}

export function planMediaDerivative(input: { contentType: string; requestedWidth: number; sourceWidth: number | undefined }): MediaDerivative | null {
	if (!isTransformableMediaType(input.contentType)) return null

	const width = input.sourceWidth ? Math.min(input.requestedWidth, input.sourceWidth) : input.requestedWidth
	const shouldResize = input.sourceWidth === undefined || width < input.sourceWidth
	const toWebp = WEBP_SOURCE_MIME_TYPES.has(input.contentType)
	if (!shouldResize && !toWebp) return null
	return { width, toWebp }
}
