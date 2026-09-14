import assert from 'node:assert/strict'
import test from 'node:test'
import { checkReleaseState } from '../scripts/check-release-state.mjs'

const sha = 'a'.repeat(40)
function fixture(
	options: { dirty?: boolean; branch?: string; remoteSha?: string; conclusion?: string; ciSha?: string; changed?: boolean; http?: number } = {}
) {
	let statusReads = 0
	return {
		exec(_command: string, args: string[]) {
			if (args[0] === 'status') {
				statusReads++
				return options.dirty || (options.changed && statusReads > 1) ? ' M file.ts' : ''
			}
			if (args[0] === 'branch') return options.branch ?? 'main'
			if (args[0] === 'rev-parse') return sha
			if (args[0] === 'remote') return 'https://github.com/eagle-a/zhanming-blog-new.git'
			if (args[0] === 'ls-remote') return `${options.remoteSha ?? sha}\trefs/heads/main`
			throw new Error(`Unexpected command ${args}`)
		},
		request: (async (url: string) => {
			assert.match(url, /workflows\/ci.yml\/runs\?head_sha=/)
			return new Response(
				JSON.stringify({
					workflow_runs: [
						{
							head_sha: options.ciSha ?? sha,
							head_branch: 'main',
							event: 'push',
							status: 'completed',
							conclusion: options.conclusion ?? 'success',
							html_url: 'https://github.com/example/actions/runs/1'
						}
					]
				}),
				{ status: options.http ?? 200 }
			)
		}) as typeof fetch
	}
}

test('release gate accepts only the clean exact remote commit with successful CI', async () => {
	assert.equal((await checkReleaseState(fixture())).sha, sha)
})

test('release gate refuses dirty, wrong branch, unpushed, failed CI, and stale CI states', async () => {
	for (const options of [
		{ dirty: true },
		{ branch: 'feature' },
		{ remoteSha: 'b'.repeat(40) },
		{ conclusion: 'failure' },
		{ ciSha: 'c'.repeat(40) },
		{ changed: true },
		{ http: 403 }
	]) {
		await assert.rejects(checkReleaseState(fixture(options)), /Release refused/)
	}
})
