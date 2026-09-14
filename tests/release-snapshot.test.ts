import assert from 'node:assert/strict'
import test from 'node:test'
import { execFileSync } from 'node:child_process'
import { mkdtemp, mkdir, readFile, writeFile, rm, access } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { createReleaseSnapshot } from '../scripts/release-snapshot.mjs'

test('release snapshot contains the exact commit, not ignored files or later edits', async () => {
	const cwd = await mkdtemp(path.join(tmpdir(), 'blog-snapshot-test-'))
	let snapshot
	const git = (...args: string[]) => execFileSync('git', args, { cwd, encoding: 'utf8', windowsHide: true })
	try {
		git('init', '--quiet')
		await writeFile(path.join(cwd, '.gitignore'), '.env*\n.vercel\n')
		await writeFile(path.join(cwd, 'source.txt'), 'committed')
		git('add', '.')
		git('-c', 'user.name=Fixture', '-c', 'user.email=fixture@example.invalid', 'commit', '--quiet', '-m', 'fixture')
		const sha = git('rev-parse', 'HEAD').trim()
		await writeFile(path.join(cwd, 'source.txt'), 'later local edits')
		await writeFile(path.join(cwd, '.env.local'), 'TEST_ONLY=not-a-real-credential')
		await mkdir(path.join(cwd, '.vercel'))
		await writeFile(path.join(cwd, '.vercel/project.json'), JSON.stringify({ orgId: 'team_fixture', projectId: 'prj_fixture', ignored: 'local state' }))
		snapshot = await createReleaseSnapshot(sha, cwd)
		assert.equal(await readFile(path.join(snapshot.directory, 'source.txt'), 'utf8'), 'committed')
		await assert.rejects(access(path.join(snapshot.directory, '.env.local')))
		assert.deepEqual(JSON.parse(await readFile(path.join(snapshot.directory, '.vercel/project.json'), 'utf8')), {
			orgId: 'team_fixture',
			projectId: 'prj_fixture'
		})
	} finally {
		await snapshot?.cleanup()
		await rm(cwd, { recursive: true, force: true })
	}
})
