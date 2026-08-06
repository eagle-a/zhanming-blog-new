import test from 'node:test'
import assert from 'node:assert/strict'
import { resolveSiteUrl, validateGitHubConfig, validateSlug } from '../src/lib/config-validation.ts'

test('rejects unsafe blog slugs', () => {
	assert.equal(validateSlug('valid-post-2026'), true)
	assert.equal(validateSlug('../secrets'), false)
	assert.equal(validateSlug('nested/post'), false)
	assert.equal(validateSlug(''), false)
})

test('fails closed when GitHub configuration is incomplete', () => {
	assert.throws(() => validateGitHubConfig({ owner: '', repo: 'repo', branch: 'main', appId: '' }), /Missing GitHub configuration/)

	assert.doesNotThrow(() => validateGitHubConfig({ owner: 'owner', repo: 'repo', branch: 'main', appId: '123' }))
})

test('normalizes the public site URL and rejects localhost in production config', () => {
	assert.equal(resolveSiteUrl('https://example.test/'), 'https://example.test')
	assert.throws(() => resolveSiteUrl('http://localhost:3000'), /must not be localhost/)
})
