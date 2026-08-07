import assert from 'node:assert/strict'
import test from 'node:test'
import { mediaProxyUrl } from '../src/lib/media-url.ts'
import { mediaPayloadSchema, postInputSchema } from '../src/lib/post-validation.ts'

const validPost = {
	slug: 'safe-post',
	title: 'Safe post',
	summary: '',
	contentMd: '# Content',
	coverUrl: '/api/media/blog/safe-post/hash.png',
	category: '笔记',
	tags: ['Next.js'],
	status: 'published' as const,
	publishedAt: '2026-08-07T10:00:00+08:00'
}

test('validates article write input and rejects unsafe cover URLs', () => {
	assert.equal(postInputSchema.safeParse(validPost).success, true)
	assert.equal(postInputSchema.safeParse({ ...validPost, slug: '../escape' }).success, false)
	assert.equal(postInputSchema.safeParse({ ...validPost, coverUrl: 'javascript:alert(1)' }).success, false)
	assert.equal(postInputSchema.safeParse({ ...validPost, tags: Array.from({ length: 31 }, (_, index) => `tag-${index}`) }).success, false)
})

test('restricts client Blob token payloads', () => {
	const payload = {
		slug: 'safe-post',
		sha256: 'a'.repeat(64),
		mimeType: 'image/png',
		size: 1024
	}
	assert.equal(mediaPayloadSchema.safeParse(payload).success, true)
	assert.equal(mediaPayloadSchema.safeParse({ ...payload, mimeType: 'text/html' }).success, false)
	assert.equal(mediaPayloadSchema.safeParse({ ...payload, size: 30 * 1024 * 1024 }).success, false)
})

test('builds same-origin private Blob proxy URLs', () => {
	assert.equal(mediaProxyUrl('blog/safe-post/hash file.png'), '/api/media/blog/safe-post/hash%20file.png')
})
