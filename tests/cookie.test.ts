import assert from 'node:assert/strict'
import test from 'node:test'
import { readCookieValue } from '../src/lib/cookie.ts'

test('reads valid encoded cookie values', () => {
	assert.equal(readCookieValue('other=1; blog_admin_session=hello%20world', 'blog_admin_session'), 'hello world')
})

test('treats malformed cookie encoding as an invalid cookie', () => {
	assert.equal(readCookieValue('blog_admin_session=%', 'blog_admin_session'), null)
	assert.equal(readCookieValue('blog_admin_session=%E0%A4%A', 'blog_admin_session'), null)
})
