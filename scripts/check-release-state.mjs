import { execFileSync } from 'node:child_process'
import { pathToFileURL } from 'node:url'
import path from 'node:path'

/**
 * 发布前提检查。只核实本机能确认的事实，不调用 GitHub，也不要求远端 CI。
 *
 * 代码质量由 deploy-production.mjs 在部署前跑本地 `pnpm check` 保证。这里负责的是
 * 「要发的这个提交是否可复现」以及「Vercel 的 Git 集成是否仍被禁用」。
 *
 * 未推送不是错误，只是警告：远端没有这个提交时，部署出去的源码只存在于本机。
 *
 * @param {{exec?: (file: string, args: string[], options: import('node:child_process').ExecFileSyncOptionsWithStringEncoding) => string}} dependencies
 */
export async function checkReleaseState({ exec = execFileSync } = {}) {
	const options = { encoding: 'utf8', timeout: 30_000, windowsHide: true }
	const status = exec('git', ['status', '--porcelain'], options).trim()
	if (status) throw new Error(`Release refused: working tree is not clean.\n${status}`)

	const branch = exec('git', ['branch', '--show-current'], options).trim()
	if (branch !== 'main') throw new Error(`Release refused: expected branch main, got ${branch || '(detached HEAD)'}.`)
	const sha = exec('git', ['rev-parse', 'HEAD'], options).trim()
	if (!/^[a-f0-9]{40}$/.test(sha)) throw new Error('Release refused: invalid commit SHA.')
	const config = JSON.parse(exec('git', ['show', `${sha}:vercel.json`], options))
	if (config.git?.deploymentEnabled !== false && config.git?.deploymentEnabled?.main !== false) {
		throw new Error('Release refused: Git auto-deployment of main must be disabled in vercel.json.')
	}

	const warnings = []
	const remoteSha = readRemoteSha(exec, options, warnings)
	if (remoteSha && remoteSha !== sha) {
		warnings.push(`HEAD ${sha.slice(0, 7)} 尚未推送到 origin/main（远端是 ${remoteSha.slice(0, 7)}）：这次部署的源码只存在于本机。`)
	}

	// 读远端会让出事件循环，所以再确认一次，避免期间切分支或改文件。
	if (
		exec('git', ['status', '--porcelain'], options).trim() ||
		exec('git', ['rev-parse', 'HEAD'], options).trim() !== sha ||
		exec('git', ['branch', '--show-current'], options).trim() !== 'main'
	) {
		throw new Error('Release refused: checkout changed during verification.')
	}
	return { sha, branch, pushed: remoteSha === sha, warnings }
}

function readRemoteSha(exec, options, warnings) {
	let remote
	try {
		remote = exec('git', ['remote', 'get-url', 'origin'], options).trim()
	} catch (error) {
		warnings.push(`读不到 origin（${error.message.trim()}）：跳过推送状态核对。`)
		return null
	}
	if (!/^(?:https:\/\/github\.com\/|git@github\.com:)[\w.-]+\/[\w.-]+?(?:\.git)?$/.test(remote)) {
		warnings.push(`origin 不是规范的 GitHub 地址（${remote}）：跳过推送状态核对。`)
		return null
	}
	try {
		return exec('git', ['ls-remote', '--exit-code', 'origin', 'refs/heads/main'], options).trim().split(/\s+/)[0]
	} catch (error) {
		warnings.push(`无法核对远端 main（${error.message.trim()}）：这次部署的源码可能只存在于本机。`)
		return null
	}
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
	try {
		const release = await checkReleaseState()
		for (const warning of release.warnings) console.warn(`warning: ${warning}`)
		console.log(JSON.stringify(release, null, 2))
	} catch (error) {
		console.error(error.message)
		process.exitCode = 1
	}
}
