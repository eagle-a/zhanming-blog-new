import assert from 'node:assert/strict'
import test from 'node:test'
import { extractMediaPathnames } from '../src/lib/media-references.ts'

test('extracts unique same-origin media pathnames from nested content', () => {
	const paths = extractMediaPathnames({
		cover: '/api/media/blog/demo/image.png?cache=1',
		body: ['![image](/api/media/blog/demo/image.png)', 'external https://cdn.example/api/media/ignored.png'],
		settings: { avatar: '/api/media/content/site/icon.webp' }
	})

	assert.deepEqual(paths.sort(), ['blog/demo/image.png', 'content/site/icon.webp'])
})

test('ignores malformed encoded media references', () => {
	assert.deepEqual(extractMediaPathnames('/api/media/blog/demo/%E0%A4%A'), [])
})
