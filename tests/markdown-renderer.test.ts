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
