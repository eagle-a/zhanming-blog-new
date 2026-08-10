import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { evaluateWriteEnvironment, isLoopbackDatabase } from '../src/lib/write-environment-policy.ts'

test('allows local development writes only for a loopback database', () => {
	assert.equal(isLoopbackDatabase('postgresql://postgres@127.0.0.1:54329/blog'), true)
	assert.equal(isLoopbackDatabase('postgresql://user@example.neon.tech/blog'), false)
	assert.equal(evaluateWriteEnvironment({ NODE_ENV: 'development', DATABASE_URL: 'postgresql://postgres@127.0.0.1:54329/blog' }).allowed, true)
	assert.equal(evaluateWriteEnvironment({ NODE_ENV: 'development', DATABASE_URL: 'postgresql://user@example.neon.tech/blog' }).allowed, false)
})

test('local runner uses a non-empty read-only sentinel when PostgreSQL is unavailable', async () => {
	const runner = await readFile(new URL('../scripts/run-local-next.mjs', import.meta.url), 'utf8')
	const legacyReader = await readFile(new URL('../src/lib/legacy-blog-reader.ts', import.meta.url), 'utf8')
	assert.match(runner, /localPostgresAvailable\s*\?\s*'postgresql:[^']+'\s*:\s*'legacy:\/\/read-only'/)
	assert.match(legacyReader, /databaseUrl !== LOCAL_LEGACY_DATABASE_SENTINEL/)
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
