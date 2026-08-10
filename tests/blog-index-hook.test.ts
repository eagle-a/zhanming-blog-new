import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

test('latest-post hook fetches on mount when it has no server fallback', async () => {
	const source = await readFile(new URL('../src/hooks/use-blog-index.ts', import.meta.url), 'utf8')
	assert.match(source, /fallbackData:\s*hasInitialItems\s*\?\s*initialItems\s*:\s*undefined/)
	assert.match(source, /revalidateOnMount:\s*!hasInitialItems/)
	assert.match(source, /usePostIndex\('\/api\/posts'\)/)
})

test('local public APIs select the Git fallback before querying the database', async () => {
	for (const relativePath of ['../src/app/api/posts/route.ts', '../src/app/api/categories/route.ts', '../src/app/api/posts/[slug]/route.ts']) {
		const source = await readFile(new URL(relativePath, import.meta.url), 'utf8')
		const routeBody = source.slice(source.indexOf('export async function GET'))
		assert.ok(routeBody.indexOf('allowDevelopmentLegacyFallback()') < routeBody.indexOf('getCached'), relativePath)
	}
})
