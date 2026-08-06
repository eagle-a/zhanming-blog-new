import test from 'node:test'
import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import { filterPublicBlogs } from '../src/lib/blog-visibility.ts'
import { validateSlug } from '../src/lib/config-validation.ts'

test('filters hidden posts from public feeds', () => {
	const result = filterPublicBlogs([
		{ slug: 'public', title: 'Public', tags: [], date: '2026-01-01', hidden: false },
		{ slug: 'hidden', title: 'Hidden', tags: [], date: '2026-01-02', hidden: true }
	])

	assert.deepEqual(
		result.map(item => item.slug),
		['public']
	)
})

test('blog index has unique safe slugs and complete content files', async () => {
	const indexUrl = new URL('../public/blogs/index.json', import.meta.url)
	const items = JSON.parse(await readFile(indexUrl, 'utf8')) as Array<{ slug: string }>
	const slugs = items.map(item => item.slug)

	assert.equal(new Set(slugs).size, slugs.length, 'blog slugs must be unique')
	for (const slug of slugs) {
		assert.equal(validateSlug(slug), true, `unsafe blog slug: ${slug}`)
		await access(new URL(`../public/blogs/${slug}/config.json`, import.meta.url))
		await access(new URL(`../public/blogs/${slug}/index.md`, import.meta.url))
	}
})
