import assert from 'node:assert/strict'
import test from 'node:test'
import { evaluateWriteEnvironment } from '../src/lib/write-environment-policy.ts'

test('allows local development writes only for a loopback database', () => {
	assert.equal(
		evaluateWriteEnvironment({ NODE_ENV: 'development', DATABASE_URL: 'postgresql://postgres@127.0.0.1:54329/blog' }).allowed,
		true
	)
	assert.equal(
		evaluateWriteEnvironment({ NODE_ENV: 'development', DATABASE_URL: 'postgresql://user@example.neon.tech/blog' }).allowed,
		false
	)
})

test('requires an explicit resource environment on Vercel', () => {
	const missing = evaluateWriteEnvironment({ NODE_ENV: 'production', VERCEL_ENV: 'preview', DATABASE_URL: 'postgresql://user@example.neon.tech/blog' })
	assert.equal(missing.allowed, false)
	assert.equal(missing.expected, 'preview')

	const matching = evaluateWriteEnvironment({
		NODE_ENV: 'production',
		VERCEL_ENV: 'preview',
		BLOG_RESOURCE_ENV: 'preview',
		DATABASE_URL: 'postgresql://user@example.neon.tech/blog'
	})
	assert.equal(matching.allowed, true)
})

test('rejects resource environment mismatches and deployed loopback databases', () => {
	assert.equal(
		evaluateWriteEnvironment({
			NODE_ENV: 'production',
			VERCEL_ENV: 'production',
			BLOG_RESOURCE_ENV: 'preview',
			DATABASE_URL: 'postgresql://user@example.neon.tech/blog'
		}).allowed,
		false
	)
	assert.equal(
		evaluateWriteEnvironment({
			NODE_ENV: 'production',
			VERCEL_ENV: 'production',
			BLOG_RESOURCE_ENV: 'production',
			DATABASE_URL: 'postgresql://postgres@127.0.0.1:54329/blog'
		}).allowed,
		false
	)
})
