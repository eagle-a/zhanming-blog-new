import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'
import { PGlite } from '@electric-sql/pglite'
import { drizzle } from 'drizzle-orm/pglite'
import type * as Repository from '../src/lib/submissions-repository'

test('review repository: migrations, optimistic writes, exact approval, and cursor pagination', async () => {
	// PostgreSQL in memory only: never uses DATABASE_URL, credentials, sockets or persistent storage.
	const pg = new PGlite()
	const root = fileURLToPath(new URL('../', import.meta.url))
	const require = createRequire(new URL('../package.json', import.meta.url))
	const context = globalThis as typeof globalThis & { __reviewTestDb?: ReturnType<typeof drizzle> }
	context.__reviewTestDb = drizzle(pg)
	try {
		const journal = JSON.parse(await readFile(new URL('../drizzle/meta/_journal.json', import.meta.url), 'utf8'))
		for (const migration of journal.entries) await pg.exec(await readFile(new URL(`../drizzle/${migration.tag}.sql`, import.meta.url), 'utf8'))
		const bundle = await build({
			entryPoints: [fileURLToPath(new URL('../src/lib/submissions-repository.ts', import.meta.url))],
			absWorkingDir: root,
			bundle: true,
			write: false,
			platform: 'node',
			format: 'cjs',
			packages: 'external',
			plugins: [
				{
					name: 'isolated-database',
					setup(builder) {
						builder.onResolve({ filter: /^@\/db\/client$/ }, () => ({ path: 'db', namespace: 'fixture' }))
						builder.onResolve({ filter: /^server-only$/ }, () => ({ path: 'server-only', namespace: 'fixture' }))
						builder.onLoad({ filter: /.*/, namespace: 'fixture' }, args => ({
							contents: args.path === 'db' ? 'export const getDb = () => globalThis.__reviewTestDb' : '',
							loader: 'js'
						}))
					}
				}
			]
		})
		const module = { exports: {} }
		new Function('require', 'module', 'exports', bundle.outputFiles[0].text)(require, module, module.exports)
		const repo = module.exports as typeof Repository
		const payload = {
			title: 'First',
			slug: 'first',
			summary: '',
			contentMd: 'Body',
			tags: [],
			category: null,
			coverUrl: '',
			publishedAt: '2026-09-14T00:00:00Z'
		}
		const hash = createHash('sha256').update(JSON.stringify(payload)).digest('hex')
		const insert = async (id: string, date = '2026-09-14T00:00:00.000001Z') => {
			await pg.query(
				`insert into content_submissions (id, idempotency_key, type, status, payload, content_hash, validation_result, created_at) values ($1, $1, 'post', 'pending', $2::jsonb, $3, '[]', $4::timestamptz)`,
				[id, JSON.stringify(payload), hash, date]
			)
		}
		await insert('a')
		const attempts = await Promise.allSettled([
			repo.updatePendingPostSubmission('a', { ...payload, title: 'Window 1' }, hash),
			repo.updatePendingPostSubmission('a', { ...payload, title: 'Window 2' }, hash)
		])
		assert.equal(attempts.filter(result => result.status === 'fulfilled').length, 1)
		assert.equal(attempts.filter(result => result.status === 'rejected').length, 1)
		await assert.rejects(repo.approvePostSubmission('a', hash), /已被修改/)
		await assert.rejects(repo.rejectContentSubmission('a', 'Outdated review', hash), /已被修改/)
		assert.equal((await pg.query('select * from posts')).rows.length, 0, 'stale approval must not publish')
		const current = await repo.getContentSubmission('a')
		assert(current)
		await repo.approvePostSubmission('a', current.contentHash)
		const published = await pg.query<{ title: string }>('select title from posts')
		assert.equal(published.rows[0].title, (current.payload as typeof payload).title)
		await assert.rejects(repo.approvePostSubmission('a', current.contentHash), /已经处理/)
		assert.equal((await pg.query('select * from posts')).rows.length, 1, 'double approval cannot create another post')

		await insert('b')
		await insert('c')
		await insert('d', '2026-09-14T00:00:00.000002Z')
		const first = await repo.listContentSubmissions('pending', 2)
		assert.deepEqual(
			first.items.map(item => item.id),
			['d', 'c']
		)
		assert.equal('payload' in first.items[0], false, 'summary query must not return full Markdown')
		assert.equal(first.nextCursor?.createdAt, '2026-09-14T00:00:00.000001Z')
		const second = await repo.listContentSubmissions('pending', 2, first.nextCursor!)
		assert.deepEqual(
			second.items.map(item => item.id),
			['b']
		)
		assert.equal(second.nextCursor, null)
		await repo.rejectContentSubmission('b', 'Needs sources', hash)
		await assert.rejects(repo.updatePendingPostSubmission('b', payload, hash), /处理/)
	} finally {
		delete context.__reviewTestDb
		await pg.close()
	}
})
