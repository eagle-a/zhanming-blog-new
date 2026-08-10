import assert from 'node:assert/strict'
import test from 'node:test'
import { renderMarkdown } from '../src/lib/markdown-renderer.ts'

test('renders stable unique heading ids across repeated calls', async () => {
	const markdown = '# 标题\n\n## 标题\n\n# 标题'
	const first = await renderMarkdown(markdown)
	const second = await renderMarkdown(markdown)

	assert.deepEqual(first.toc, [
		{ id: '标题', text: '标题', level: 1 },
		{ id: '标题-2', text: '标题', level: 2 },
		{ id: '标题-3', text: '标题', level: 1 }
	])
	assert.equal(first.html, second.html)
	assert.match(first.html, /id="标题-2"/)
})

test('does not accumulate math extensions between renders', async () => {
	const first = await renderMarkdown('行内公式 $x+1$')
	const second = await renderMarkdown('行内公式 $x+1$')

	assert.equal(first.html, second.html)
	assert.equal((second.html.match(/katex/g) || []).length, (first.html.match(/katex/g) || []).length)
})

test('image renderer adds lazy and async attributes', async () => {
	const { html } = await renderMarkdown('![alt](/api/media/blog/test/abc.webp)')
	assert.match(html, /loading="lazy"/)
	assert.match(html, /decoding="async"/)
})

test('image renderer adds width height and srcset when dimensions are known', async () => {
	const dimensions = new Map([['blog/test/abc.webp', { width: 1920, height: 1080 }]])
	const { html } = await renderMarkdown('![alt](/api/media/blog/test/abc.webp)', dimensions)
	assert.match(html, /width="1920"/)
	assert.match(html, /height="1080"/)
	assert.match(html, /srcset="[^"]*w=480 480w[^"]*w=800 800w[^"]*w=1200 1200w[^"]*w=1920 1920w"/)
	assert.match(html, /sizes="\(max-width: 640px\) 100vw, 800px"/)
})

test('image renderer omits srcset widths larger than original', async () => {
	const dimensions = new Map([['blog/test/abc.webp', { width: 600, height: 400 }]])
	const { html } = await renderMarkdown('![alt](/api/media/blog/test/abc.webp)', dimensions)
	assert.match(html, /width="600"/)
	assert.match(html, /height="400"/)
	assert.match(html, /w=480 480w/)
	assert.doesNotMatch(html, /w=800/)
	assert.doesNotMatch(html, /w=1200/)
	assert.doesNotMatch(html, /w=1920/)
})

test('image renderer handles external urls without srcset', async () => {
	const { html } = await renderMarkdown('![alt](https://example.com/image.png)')
	assert.match(html, /loading="lazy"/)
	assert.doesNotMatch(html, /srcset/)
})
