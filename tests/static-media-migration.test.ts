import assert from 'node:assert/strict'
import test from 'node:test'
import {
	buildMigratedPathname,
	extensionFromFileName,
	findStaticMediaReferences,
	migratedPathnameFromUrl,
	mimeTypeForExtension,
	rewriteStaticMedia,
	staticMediaHref
} from '../src/lib/static-media-migration.ts'

const SLUG = 'weekly-report-2026-09-23'

test('collects raster image references that point at the article static directory', () => {
	const content = [
		'![噪声预算](/images/weekly-report-2026-09-23/noise_budget.png)',
		'',
		'文本里出现同一条路径：/images/weekly-report-2026-09-23/noise_budget.png',
		'',
		'![另一张](/images/weekly-report-2026-09-23/alias_folding_verdict.png "标题")',
		'',
		'![别的文章](/images/weekly-report-2026-09-18/dac_scope_test.webp)',
		'![矢量图](/images/weekly-report-2026-09-23/diagram.svg)'
	].join('\n')

	const references = findStaticMediaReferences(content, SLUG)
	assert.deepEqual(
		references.map(reference => reference.file),
		['noise_budget.png', 'alias_folding_verdict.png']
	)
	assert.equal(references[0].href, '/images/weekly-report-2026-09-23/noise_budget.png')
})

test('decodes escaped file names without losing the original reference text', () => {
	const content = '![图](/images/weekly-report-2026-09-23/scope%20shot.png)'
	const [reference] = findStaticMediaReferences(content, SLUG)
	assert.equal(reference.file, 'scope shot.png')
	assert.equal(reference.href, '/images/weekly-report-2026-09-23/scope%20shot.png')
	assert.equal(staticMediaHref(SLUG, reference.file), reference.href)
})

test('ignores unsupported file extensions', () => {
	assert.equal(extensionFromFileName('diagram.svg'), null)
	assert.equal(extensionFromFileName('archive.zip'), null)
	assert.equal(extensionFromFileName('figure.PNG'), 'png')
	assert.equal(mimeTypeForExtension('JPEG'), 'image/jpeg')
	assert.equal(mimeTypeForExtension('svg'), null)
})

test('builds content-addressed pathnames inside the article Blob namespace', () => {
	const sha256 = 'a'.repeat(64)
	assert.equal(buildMigratedPathname(SLUG, sha256, 'PNG'), `blog/${SLUG}/${sha256}.png`)
	assert.equal(migratedPathnameFromUrl(`/api/media/blog/${SLUG}/${sha256}.png`), `blog/${SLUG}/${sha256}.png`)
	assert.equal(migratedPathnameFromUrl('https://cdn.example.com/other.png'), null)
})

test('rewrites every occurrence of a migrated reference', () => {
	const content = ['![a](/images/slug-1/one.png)', '', '再次引用：/images/slug-1/one.png'].join('\n')
	const sha256 = 'b'.repeat(64)
	const { contentMd, replaced } = rewriteStaticMedia(content, [
		{ file: 'one.png', href: '/images/slug-1/one.png', target: `/api/media/blog/slug-1/${sha256}.png` }
	])

	assert.equal(replaced, 2)
	assert.doesNotMatch(contentMd, /\/images\/slug-1\//)
	assert.equal(contentMd.split(`/api/media/blog/slug-1/${sha256}.png`).length - 1, 2)
})

test('leaves the body untouched when nothing was migrated', () => {
	const content = '![a](/images/slug-1/one.png)'
	assert.deepEqual(rewriteStaticMedia(content, []), { contentMd: content, replaced: 0 })
})
