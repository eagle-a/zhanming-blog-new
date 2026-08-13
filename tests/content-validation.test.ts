import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { File as NodeFile } from 'node:buffer'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { hashFileSHA256 } from '../src/lib/file-utils.ts'
import { isAllowedMediaPathname } from '../src/lib/media-url.ts'
import {
	CONTENT_DOCUMENT_KEYS,
	contentMediaPayloadSchema,
	isContentDocumentKey,
	parseContentDocument,
	type ContentDocumentKey
} from '../src/lib/content-validation.ts'
import { FALLBACK_SHARE_LOGO, resolveShareLogo } from '../src/app/share/share-logo.ts'

const sourceFiles: Record<ContentDocumentKey, URL> = {
	site: new URL('../src/config/site-content.json', import.meta.url),
	'card-styles': new URL('../src/config/card-styles.json', import.meta.url),
	bloggers: new URL('../src/app/bloggers/list.json', import.meta.url),
	projects: new URL('../src/app/projects/list.json', import.meta.url),
	shares: new URL('../src/app/share/list.json', import.meta.url),
	pictures: new URL('../src/app/pictures/list.json', import.meta.url),
	snippets: new URL('../src/app/snippets/list.json', import.meta.url)
}

async function readDocument(key: ContentDocumentKey): Promise<any> {
	return JSON.parse(await readFile(sourceFiles[key], 'utf8'))
}

test('all seven runtime content documents pass strict validation', async () => {
	assert.equal(CONTENT_DOCUMENT_KEYS.length, 7)
	for (const key of CONTENT_DOCUMENT_KEYS) {
		const document = await readDocument(key)
		assert.doesNotThrow(() => parseContentDocument(key, document))
	}
})

test('rejects unknown document keys and unsafe runtime URLs', async () => {
	assert.equal(isContentDocumentKey('site'), true)
	assert.equal(isContentDocumentKey('about'), false)
	assert.equal(isContentDocumentKey('unknown'), false)

	const site = await readDocument('site')
	assert.throws(() => parseContentDocument('site', { ...site, avatarUrl: '//evil.example/avatar.png' }))
	assert.throws(() =>
		parseContentDocument('site', {
			...site,
			backgroundImages: [{ id: 'unsafe', url: 'javascript:alert(1)' }],
			currentBackgroundImageId: 'unsafe'
		})
	)
	assert.throws(() =>
		parseContentDocument('site', {
			...site,
			socialButtons: [{ id: 'unsafe', type: 'github', value: 'javascript:alert(1)', label: '', order: 1 }]
		})
	)
	assert.throws(() => parseContentDocument('site', { ...site, beian: { text: 'unsafe', link: 'http://example.com' } }))
})

test('rejects oversized content documents', () => {
	assert.throws(() => parseContentDocument('snippets', ['界'.repeat(700_000)]), /2 MB/)
})

test('returns the complete SHA-256 digest for uploaded files', async () => {
	const body = Buffer.from('complete digest')
	const file = new NodeFile([body], 'digest.txt')
	const digest = await hashFileSHA256(file as unknown as Parameters<typeof hashFileSHA256>[0])
	assert.match(digest, /^[a-f0-9]{64}$/)
	assert.equal(digest, createHash('sha256').update(body).digest('hex'))
})

test('restricts content Blob upload payloads', () => {
	const payload = { namespace: 'site', sha256: 'a'.repeat(64), mimeType: 'image/png', size: 1024 }
	assert.equal(contentMediaPayloadSchema.safeParse(payload).success, true)
	assert.equal(contentMediaPayloadSchema.safeParse({ ...payload, namespace: 'migrated' }).success, false)
	assert.equal(contentMediaPayloadSchema.safeParse({ ...payload, mimeType: 'text/html' }).success, false)
	assert.equal(contentMediaPayloadSchema.safeParse({ ...payload, size: 30 * 1024 * 1024 }).success, false)
	assert.equal(contentMediaPayloadSchema.safeParse({ ...payload, unexpected: true }).success, false)
})

test('allows only immutable blog and content Blob proxy paths', () => {
	const digest = 'a'.repeat(64)
	assert.equal(isAllowedMediaPathname(`blog/safe-post/${digest}.png`), true)
	assert.equal(isAllowedMediaPathname(`content/site/${digest}.webp`), true)
	assert.equal(isAllowedMediaPathname(`content/migrated/${digest}.svg`), true)
	assert.equal(isAllowedMediaPathname(`content/unknown/${digest}.png`), false)
	assert.equal(isAllowedMediaPathname(`content/site/../../secret.png`), false)
})

test('maps retired third-party share logos to a stable local asset', () => {
	assert.equal(resolveShareLogo('https://tinypng.com/static/images/george-anim/large_george_x2.webp'), '/images/share/tinypng.png')
	assert.equal(resolveShareLogo('https://example.com/favicon.png'), FALLBACK_SHARE_LOGO)
	assert.equal(resolveShareLogo(''), FALLBACK_SHARE_LOGO)
	assert.equal(resolveShareLogo('/images/share/example.svg'), '/images/share/example.svg')
})
