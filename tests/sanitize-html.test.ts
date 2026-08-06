import test from 'node:test'
import assert from 'node:assert/strict'
import { sanitizeHtml } from '../src/lib/sanitize-html.ts'

test('removes executable HTML and unsafe URLs', () => {
	const output = sanitizeHtml('<p>safe</p><script>alert(1)</script><img src="javascript:alert(2)" onerror="alert(3)"><iframe src="https://evil.test"></iframe>')

	assert.match(output, /<p>safe<\/p>/)
	assert.doesNotMatch(output, /script|iframe|onerror|javascript:/i)
})

test('preserves safe links and images', () => {
	const output = sanitizeHtml('<a href="https://example.test/docs">docs</a><img src="/images/a.png" alt="a">')

	assert.match(output, /href="https:\/\/example\.test\/docs"/)
	assert.match(output, /src="\/images\/a\.png"/)
})

test('hardens new-window links and rejects non-image data URLs', () => {
	const output = sanitizeHtml('<a href="https://example.test" target="_blank">safe</a><a href="data:text/html;base64,PHNjcmlwdD4=">unsafe</a>')

	assert.match(output, /target="_blank" rel="noopener noreferrer"/)
	assert.doesNotMatch(output, /data:text\/html/i)
})

test('preserves code block metadata but strips unrelated data attributes', () => {
	const output = sanitizeHtml('<pre data-code="const value = 1" data-secret="x"><code class="language-ts">const value = 1</code></pre>')

	assert.match(output, /data-code="const value = 1"/)
	assert.match(output, /class="language-ts"/)
	assert.doesNotMatch(output, /data-secret/)
})
