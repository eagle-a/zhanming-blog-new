import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { buildCsp } from '../src/lib/csp-policy.ts'

test('uses nonce-based script CSP on administrator pages', () => {
	const policy = buildCsp({ nonce: 'test-nonce', development: false })
	const scriptDirective = policy.split(';').find(value => value.trim().startsWith('script-src')) || ''
	assert.match(scriptDirective, /'nonce-test-nonce'/)
	assert.doesNotMatch(scriptDirective, /'unsafe-inline'/)
	assert.doesNotMatch(policy.split(';').find(value => value.trim().startsWith('style-src ')) || '', /'unsafe-inline'/)
	assert.match(policy, /style-src-attr 'unsafe-inline'/)
})

test('keeps static public pages compatible while sensitive pages remain strict', () => {
	const policy = buildCsp({ allowInlineScripts: true, development: false })
	const scriptDirective = policy.split(';').find(value => value.trim().startsWith('script-src')) || ''
	assert.match(scriptDirective, /'unsafe-inline'/)
	assert.doesNotMatch(scriptDirective, /'unsafe-eval'/)
	assert.match(policy, /report-uri \/api\/csp-report/)
	assert.match(policy, /https:\/\/owo\.imaegoo\.com/)
})

test('allows eval only for the React development runtime', () => {
	assert.match(buildCsp({ allowInlineScripts: true, development: true }), /script-src[^;]*'unsafe-eval'/)
	assert.doesNotMatch(buildCsp({ allowInlineScripts: true, development: false }), /script-src[^;]*'unsafe-eval'/)
})

test('about page has one Git-backed content source in every environment', async () => {
	const loader = await readFile(new URL('../src/lib/about-content.ts', import.meta.url), 'utf8')
	const page = await readFile(new URL('../src/app/about/page.tsx', import.meta.url), 'utf8')
	assert.match(loader, /'public', 'about', 'content\.md'/)
	assert.match(page, /readAboutContent\(\)/)
	assert.doesNotMatch(page, /getCachedContentDocument|DATABASE_URL|editable=/)
})

test('legacy article fallback is explicit and old public URLs are blocked', async () => {
	const legacyReader = await readFile(new URL('../src/lib/legacy-blog-reader.ts', import.meta.url), 'utf8')
	const runner = await readFile(new URL('../scripts/run-local-next.mjs', import.meta.url), 'utf8')
	const proxy = await readFile(new URL('../src/proxy.ts', import.meta.url), 'utf8')
	assert.match(legacyReader, /process\.env\.BLOG_CONTENT_SOURCE === 'legacy'/)
	assert.match(runner, /process\.env\.BLOG_CONTENT_SOURCE = localPostgresAvailable \? 'database' : 'legacy'/)
	assert.match(proxy, /pathname === '\/blogs' \|\| request\.nextUrl\.pathname\.startsWith\('\/blogs\/'\)/)
})

test('admin diagnostics exposes resource identity without credentials', async () => {
	const route = await readFile(new URL('../src/app/api/admin/diagnostics/route.ts', import.meta.url), 'utf8')
	assert.match(route, /assertAdminRequest\(request\)/)
	assert.match(route, /current_database\(\)/)
	assert.match(route, /createHash\('sha256'\)/)
	assert.doesNotMatch(route, /connectionString[,}]|DATABASE_URL\s*:/)
})

test('login throttling does not trust generic forwarded headers in production', async () => {
	const source = await readFile(new URL('../src/lib/admin-login-rate-limit.ts', import.meta.url), 'utf8')
	assert.match(source, /process\.env\.VERCEL === '1'/)
	assert.match(source, /untrusted-production-proxy/)
	assert.match(source, /client-spoofable/)
})

test('release check refuses a dirty or non-main checkout', async () => {
	const script = await readFile(new URL('../scripts/check-release-state.mjs', import.meta.url), 'utf8')
	assert.match(script, /git', \['status', '--porcelain'\]/)
	assert.match(script, /working tree is not clean/)
	assert.match(script, /branch !== 'main'/)
})

test('allows the fixed CSP-safe PIXI runtime without enabling unsafe eval', async () => {
	const viewer = await readFile(new URL('../src/app/live2d/live2d-viewer.tsx', import.meta.url), 'utf8')
	const productionPolicy = buildCsp({ allowInlineScripts: true, development: false })
	assert.match(viewer, /@pixi\/unsafe-eval@6\.2\.0/)
	assert.match(viewer, /sha384-Cz4ciWNnlODg3vtRpl\+FCafCs2bQO9Sd9hweBNVGXsor10XlHqA6OQG8LLsq3ZqO/)
	assert.match(productionPolicy, /@pixi\/unsafe-eval@6\.2\.0/)
	assert.doesNotMatch(productionPolicy, /'unsafe-eval'/)
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
	assert.match(uploadRoute, /allowOverwrite:\s*false/)
	assert.doesNotMatch(uploadRoute, /allowOverwrite:\s*true/)
	assert.match(restore, /RESTORE_FAULT_INJECT_AFTER_BLOBS/)
	assert.match(restore, /--repair-blobs-only/)
	assert.match(restore, /目标 Blob 已存在但内容不一致，拒绝覆盖/)
	assert.ok(restore.indexOf('const blobResult = await restoreArchivedBlobs()') < restore.indexOf('await db.transaction(async tx =>'))
})
