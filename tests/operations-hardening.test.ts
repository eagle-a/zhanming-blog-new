import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { buildCsp } from '../src/lib/csp-policy.ts'

test('uses nonce-based script CSP on administrator pages', () => {
	const policy = buildCsp('test-nonce')
	const scriptDirective = policy.split(';').find(value => value.trim().startsWith('script-src')) || ''
	assert.match(scriptDirective, /'nonce-test-nonce'/)
	assert.doesNotMatch(scriptDirective, /'unsafe-inline'/)
	assert.match(policy, /style-src-attr 'unsafe-inline'/)
})

test('keeps public CSP compatible while preview policy observes strict violations', () => {
	assert.match(buildCsp(undefined, false, true), /script-src 'self' 'unsafe-inline'/)
	const reportOnly = buildCsp(undefined, true)
	assert.doesNotMatch(reportOnly.split(';').find(value => value.trim().startsWith('script-src')) || '', /'unsafe-inline'/)
	assert.match(reportOnly, /report-uri \/api\/csp-report/)
})

test('allows eval only for the React development runtime', () => {
	assert.match(buildCsp(undefined, false, true, true), /script-src[^;]*'unsafe-eval'/)
	assert.doesNotMatch(buildCsp(undefined, false, true, false), /script-src[^;]*'unsafe-eval'/)
})

test('restore and media mutation scripts reject production and require explicit recovery inputs', async () => {
	const restore = await readFile(new URL('../scripts/restore-cms-backup.ts', import.meta.url), 'utf8')
	const media = await readFile(new URL('../scripts/maintain-media.ts', import.meta.url), 'utf8')
	const lifecycle = await readFile(new URL('../src/lib/media-lifecycle.ts', import.meta.url), 'utf8')
	const uploadRoute = await readFile(new URL('../src/app/api/admin/media/upload/route.ts', import.meta.url), 'utf8')
	assert.match(restore, /恢复脚本拒绝 production 环境/)
	assert.match(restore, /RESTORE_DATABASE_URL is required/)
	assert.match(media, /媒体写操作拒绝 production/)
	assert.match(media, /--action=delete 需要 --manifest=<file> 和 --archive=<new-directory>/)
	assert.match(media, /--action=recover 需要 --archive=<directory>/)
	assert.match(media, /pg_advisory_xact_lock/)
	assert.match(media, /status = 'deleting'/)
	assert.match(lifecycle, /reservePendingMediaUpload/)
	assert.match(uploadRoute, /Uploaded Blob integrity verification failed/)
})
