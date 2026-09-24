import assert from 'node:assert/strict'
import test from 'node:test'
import { isTransformableMediaType, planMediaDerivative } from '../src/lib/media-transform.ts'
import { parseResponsiveMediaWidth, RESPONSIVE_MEDIA_WIDTHS } from '../src/lib/responsive-media.ts'

test('accepts only renderer-supported responsive media widths', () => {
	assert.deepEqual(RESPONSIVE_MEDIA_WIDTHS, [480, 800, 1200, 1920])
	for (const width of RESPONSIVE_MEDIA_WIDTHS) {
		assert.equal(parseResponsiveMediaWidth(String(width)), width)
	}
})

test('rejects arbitrary, malformed and ambiguous responsive media widths', () => {
	for (const value of [null, '', '16', '479', '3840', '800px', '0800', '800.0', '-800']) {
		assert.equal(parseResponsiveMediaWidth(value), null)
	}
})

test('never upscales a stored image and caps the derivative at its real width', () => {
	assert.deepEqual(planMediaDerivative({ contentType: 'image/png', requestedWidth: 1200, sourceWidth: 1664 }), { width: 1200, toWebp: true })
	assert.deepEqual(planMediaDerivative({ contentType: 'image/png', requestedWidth: 1200, sourceWidth: 600 }), { width: 600, toWebp: true })
	assert.deepEqual(planMediaDerivative({ contentType: 'image/jpeg', requestedWidth: 1920, sourceWidth: 800 }), { width: 800, toWebp: true })
})

test('re-encodes JPEG and PNG to WebP but leaves already-efficient formats alone', () => {
	assert.equal(planMediaDerivative({ contentType: 'image/jpeg', requestedWidth: 480, sourceWidth: 2400 })?.toWebp, true)
	assert.equal(planMediaDerivative({ contentType: 'image/png', requestedWidth: 480, sourceWidth: 2400 })?.toWebp, true)
	// WebP/AVIF sources are only ever resized, never re-encoded to another format.
	assert.deepEqual(planMediaDerivative({ contentType: 'image/webp', requestedWidth: 800, sourceWidth: 2000 }), { width: 800, toWebp: false })
	assert.deepEqual(planMediaDerivative({ contentType: 'image/avif', requestedWidth: 800, sourceWidth: 2000 }), { width: 800, toWebp: false })
	// Animated GIFs keep their format.
	assert.deepEqual(planMediaDerivative({ contentType: 'image/gif', requestedWidth: 480, sourceWidth: 900 }), { width: 480, toWebp: false })
})

test('passes through anything that is already the best available bytes', () => {
	// Narrower than requested and nothing to re-encode: the stored bytes win.
	assert.equal(planMediaDerivative({ contentType: 'image/webp', requestedWidth: 1200, sourceWidth: 600 }), null)
	for (const contentType of ['image/svg+xml', 'video/mp4', 'application/octet-stream']) {
		assert.equal(isTransformableMediaType(contentType), false)
		assert.equal(planMediaDerivative({ contentType, requestedWidth: 800, sourceWidth: 2000 }), null)
	}
})
