import { execFileSync } from 'node:child_process'
import { pathToFileURL } from 'node:url'
import path from 'node:path'

/** @param {{exec?: (file: string, args: string[], options: import('node:child_process').ExecFileSyncOptionsWithStringEncoding) => string, request?: typeof fetch}} dependencies */
export async function checkReleaseState({ exec = execFileSync, request = fetch } = {}) {
	const options = { encoding: 'utf8', timeout: 30_000, windowsHide: true }
	const status = exec('git', ['status', '--porcelain'], options).trim()
	if (status) throw new Error(`Release refused: working tree is not clean.\n${status}`)

	const branch = exec('git', ['branch', '--show-current'], options).trim()
	if (branch !== 'main') throw new Error(`Release refused: expected branch main, got ${branch || '(detached HEAD)'}.`)
	const sha = exec('git', ['rev-parse', 'HEAD'], options).trim()
	if (!/^[a-f0-9]{40}$/.test(sha)) throw new Error('Release refused: invalid commit SHA.')
	const remote = exec('git', ['remote', 'get-url', 'origin'], options).trim()
	const match = remote.match(/^(?:https:\/\/github\.com\/|git@github\.com:)([\w.-]+)\/([\w.-]+?)(?:\.git)?$/)
	if (!match) throw new Error('Release refused: origin must be a canonical GitHub repository URL.')
	const remoteHead = exec('git', ['ls-remote', '--exit-code', 'origin', 'refs/heads/main'], options).trim().split(/\s+/)[0]
	if (sha !== remoteHead) throw new Error('Release refused: local HEAD does not match remote main. Push and wait for CI first.')
	const [, owner, repo] = match
	const response = await request(
		`https://api.github.com/repos/${owner}/${repo}/actions/workflows/ci.yml/runs?head_sha=${sha}&branch=main&event=push&per_page=1`,
		{
			headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'blog-release-check' },
			signal: AbortSignal.timeout(30_000)
		}
	)
	if (!response.ok) throw new Error(`Release refused: cannot verify GitHub CI (HTTP ${response.status}).`)
	const { workflow_runs: runs } = await response.json()
	const run = runs?.[0]
	if (!run || run.head_sha !== sha || run.head_branch !== 'main' || run.event !== 'push' || run.status !== 'completed' || run.conclusion !== 'success') {
		throw new Error('Release refused: the latest CI run for this exact main commit has not succeeded.')
	}
	// Recheck after network requests so edits or a checkout switch cannot bypass the gate.
	if (
		exec('git', ['status', '--porcelain'], options).trim() ||
		exec('git', ['rev-parse', 'HEAD'], options).trim() !== sha ||
		exec('git', ['branch', '--show-current'], options).trim() !== 'main'
	) {
		throw new Error('Release refused: checkout changed during verification.')
	}
	return { sha, repository: `${owner}/${repo}`, ciRun: run.html_url }
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
	try {
		console.log(JSON.stringify(await checkReleaseState(), null, 2))
	} catch (error) {
		console.error(error.message)
		process.exitCode = 1
	}
}
