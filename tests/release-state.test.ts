import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { checkReleaseState } from '../scripts/check-release-state.mjs'

const sha = 'a'.repeat(40)
function fixture(
	options: {
		dirty?: boolean
		branch?: string
		remoteSha?: string
		changed?: boolean
		autoDeploy?: boolean
		remote?: string
		noRemote?: boolean
		remoteFails?: boolean
	} = {}
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
			if (args[0] === 'show') return JSON.stringify({ git: { deploymentEnabled: { main: options.autoDeploy ?? false } } })
			if (args[0] === 'remote') {
				if (options.noRemote) throw new Error("error: No such remote 'origin'")
				return options.remote ?? 'https://github.com/eagle-a/zhanming-blog-new.git'
			}
			if (args[0] === 'ls-remote') {
				if (options.remoteFails) throw new Error('fatal: unable to access remote')
				return `${options.remoteSha ?? sha}\trefs/heads/main`
			}
			throw new Error(`Unexpected command ${args}`)
		}
	}
}

test('发布前提检查放行干净 main 上的已推送提交', async () => {
	const release = await checkReleaseState(fixture() as never)
	assert.equal(release.sha, sha)
	assert.equal(release.branch, 'main')
	assert.equal(release.pushed, true)
	assert.deepEqual(release.warnings, [])
})

test('未推送只警告，不阻断发布', async () => {
	const release = await checkReleaseState(fixture({ remoteSha: 'b'.repeat(40) }) as never)
	assert.equal(release.pushed, false)
	assert.equal(release.warnings.length, 1)
	assert.match(release.warnings[0], /尚未推送/)
})

test('GitHub 不可达或仓库没有 origin 时不阻断发布，只警告源码只在本机', async () => {
	const offline = await checkReleaseState(fixture({ remoteFails: true }) as never)
	assert.equal(offline.pushed, false)
	assert.match(offline.warnings[0], /无法核对远端 main/)

	const noRemote = await checkReleaseState(fixture({ noRemote: true }) as never)
	assert.equal(noRemote.pushed, false)
	assert.match(noRemote.warnings[0], /读不到 origin/)

	const otherRemote = await checkReleaseState(fixture({ remote: 'https://example.com/repo.git' }) as never)
	assert.equal(otherRemote.pushed, false)
	assert.match(otherRemote.warnings[0], /不是规范的 GitHub 地址/)
})

test('发布前提检查仍然拒绝脏工作区、非 main、开启的 Git 自动部署和校验期间的状态变化', async () => {
	for (const options of [{ dirty: true }, { branch: 'feature' }, { autoDeploy: true }, { changed: true }]) {
		await assert.rejects(checkReleaseState(fixture(options) as never), /Release refused/)
	}
})

test('发布前提检查不再访问 GitHub Actions', async () => {
	const script = await readFile(new URL('../scripts/check-release-state.mjs', import.meta.url), 'utf8')
	assert.doesNotMatch(script, /api\.github\.com/)
	assert.doesNotMatch(script, /workflows\/ci\.yml/)
	assert.doesNotMatch(script, /GITHUB_TOKEN/)
	assert.doesNotMatch(script, /request = fetch/)
})

test('生产部署在本地跑质量门禁，并保留显式跳过开关', async () => {
	const deploy = await readFile(new URL('../scripts/deploy-production.mjs', import.meta.url), 'utf8')
	assert.match(deploy, /pnpm check/)
	assert.match(deploy, /--skip-check/)
	assert.match(deploy, /本地校验未通过/)
	assert.doesNotMatch(deploy, /release\.ciRun/)
})
