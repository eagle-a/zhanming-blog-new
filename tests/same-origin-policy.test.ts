import assert from 'node:assert/strict'
import test from 'node:test'
import { isSameOriginRequest } from '../src/lib/same-origin-policy.ts'

test('requires an Origin header for mutation requests', () => {
	assert.equal(isSameOriginRequest(new Request('https://example.com/api/admin/posts', { method: 'POST' })), false)
})

test('accepts only the externally forwarded origin', () => {
	const matching = new Request('http://127.0.0.1:3000/api/admin/posts', {
		method: 'POST',
		headers: { origin: 'https://blog.example.com', 'x-forwarded-host': 'blog.example.com', 'x-forwarded-proto': 'https' }
	})
	const crossSite = new Request('https://blog.example.com/api/admin/posts', {
		method: 'POST',
		headers: { origin: 'https://attacker.example', host: 'blog.example.com' }
	})
	assert.equal(isSameOriginRequest(matching), true)
	assert.equal(isSameOriginRequest(crossSite), false)
})

test('rejects ambiguous forwarded headers', () => {
	const request = new Request('https://blog.example.com/api/admin/posts', {
		method: 'POST',
		headers: { origin: 'https://blog.example.com', 'x-forwarded-host': 'blog.example.com, attacker.example', 'x-forwarded-proto': 'https' }
	})
	assert.equal(isSameOriginRequest(request), false)
})
