import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { assertApplyConfirmation, assertIsolatedCmsTestEnvironment, assertLocalAssetsDatabase } from '../scripts/lib/script-safety.ts'

test('dry-run does not require a mutation confirmation', () => {
	assert.doesNotThrow(() => assertApplyConfirmation({ apply: false, argv: [], environment: {} }))
})

test('apply requires an explicit named environment confirmation', () => {
	assert.throws(
		() => assertApplyConfirmation({ apply: true, argv: ['--apply'], environment: { DATA_ENVIRONMENT: 'production' } }),
		/--confirm-environment=production/
	)
	assert.doesNotThrow(() =>
		assertApplyConfirmation({
			apply: true,
			argv: ['--apply', '--confirm-environment=preview'],
			environment: { DATA_ENVIRONMENT: 'preview' }
		})
	)
})

test('CMS smoke tests reject production and shared default credentials', () => {
	assert.throws(
		() => assertIsolatedCmsTestEnvironment({ VERCEL_ENV: 'production', CMS_TEST_DATABASE_URL: 'postgres://test', CMS_TEST_BLOB_READ_WRITE_TOKEN: 'blob' }),
		/production/i
	)
	assert.throws(() => assertIsolatedCmsTestEnvironment({ DATABASE_URL: 'postgres://shared', BLOB_READ_WRITE_TOKEN: 'blob' }), /CMS_TEST_DATABASE_URL/)
	assert.doesNotThrow(() =>
		assertIsolatedCmsTestEnvironment({
			VERCEL_ENV: 'development',
			CMS_TEST_DATABASE_URL: 'postgres://isolated-test',
			CMS_TEST_BLOB_READ_WRITE_TOKEN: 'test-blob',
			DATABASE_URL: 'postgres://isolated-test',
			BLOB_READ_WRITE_TOKEN: 'test-blob'
		})
	)
})

test('local-assets migration is restricted to loopback PostgreSQL', () => {
	assert.doesNotThrow(() => assertLocalAssetsDatabase(true, 'postgresql://postgres@127.0.0.1:54329/blog'))
	assert.doesNotThrow(() => assertLocalAssetsDatabase(true, 'postgresql://postgres@localhost:54329/blog'))
	assert.throws(() => assertLocalAssetsDatabase(true, 'postgresql://user:secret@example.neon.tech/blog'), /loopback/)
	assert.doesNotThrow(() => assertLocalAssetsDatabase(false, 'postgresql://user:secret@example.neon.tech/blog'))
})

test('AI submission CLI accepts only a hidden one-time ticket and a constrained destination', async () => {
	const source = await readFile(new URL('../scripts/submit-ai-post.ts', import.meta.url), 'utf8')
	assert.doesNotMatch(source, /BLOG_AGENT_(?:TOKEN|API_URL)|process\.env\.[A-Z_]*TOKEN/)
	assert.match(source, /input hidden/)
	assert.match(source, /isSubmissionTicket\(ticket\)/)
	assert.match(source, /url\.protocol !== 'https:'/)
	assert.match(source, /isLoopback/)
	assert.doesNotMatch(source, /zhanming-blog-submit|scripts\/windows|LocalMachine|KeyExportPolicy/)
})
