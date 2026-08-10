import test from 'node:test'
import assert from 'node:assert/strict'
import { DEFAULT_PUBLIC_SITE_URL, resolvePublicSiteUrl, resolveSiteUrl, validateSlug } from '../src/lib/config-validation.ts'
import { DEFAULT_ABOUT_DESCRIPTION, DEFAULT_SITE_DESCRIPTION, resolveAboutDescription, resolveSiteDescription } from '../src/lib/site-metadata.ts'

test('rejects unsafe blog slugs', () => {
	assert.equal(validateSlug('valid-post-2026'), true)
	assert.equal(validateSlug('../secrets'), false)
	assert.equal(validateSlug('nested/post'), false)
	assert.equal(validateSlug(''), false)
})

test('normalizes the public site URL and rejects localhost in production config', () => {
	assert.equal(resolveSiteUrl('https://example.test/'), 'https://example.test')
	assert.equal(resolvePublicSiteUrl(''), DEFAULT_PUBLIC_SITE_URL)
	assert.throws(() => resolveSiteUrl('http://localhost:3000'), /must not be localhost/)
})

test('replaces stale student metadata while preserving current custom descriptions', () => {
	assert.equal(resolveSiteDescription('一名热爱技术的在校大学生'), DEFAULT_SITE_DESCRIPTION)
	assert.equal(resolveAboutDescription('本科在读'), DEFAULT_ABOUT_DESCRIPTION)
	assert.equal(resolveSiteDescription('自定义站点描述'), '自定义站点描述')
})
