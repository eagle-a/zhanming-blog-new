import assert from 'node:assert/strict'
import test from 'node:test'
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
