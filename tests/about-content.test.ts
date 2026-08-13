import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { parseAboutContent } from '../src/lib/about-content-parser.ts'

test('parses About metadata and Markdown from the single Git source', async () => {
	const source = await readFile(new URL('../public/about/content.md', import.meta.url), 'utf8')
	const result = parseAboutContent(source)
	assert.equal(result.title, '关于本站')
	assert.match(result.description, /孙召顺/)
	assert.match(result.content, /^## 关于我/)
	assert.match(result.content, /2121612901@qq\.com/)
	assert.doesNotMatch(result.content, /18726727768/)
})

test('rejects missing, unknown or incomplete About frontmatter', () => {
	assert.throws(() => parseAboutContent('## 正文'), /frontmatter/)
	assert.throws(() => parseAboutContent('---\ntitle: 关于\n---\n正文'), /description/)
	assert.throws(() => parseAboutContent('---\ntitle: 关于\ndescription: 简介\nunknown: value\n---\n正文'))
})
