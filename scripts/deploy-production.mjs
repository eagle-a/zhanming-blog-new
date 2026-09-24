import { spawnSync } from 'node:child_process'
import { checkReleaseState } from './check-release-state.mjs'
import { createReleaseSnapshot } from './release-snapshot.mjs'

// 发布链路上没有 GitHub：质量门禁在本地跑，Vercel CLI 负责部署。
// 只有明确知道自己在做什么时才用 --skip-check，它会跳过测试和构建。
const skipLocalCheck = process.argv.includes('--skip-check')
const pnpm = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm'

let snapshot
try {
	const release = await checkReleaseState()
	for (const warning of release.warnings) console.warn(`警告: ${warning}`)

	if (skipLocalCheck) {
		console.warn('警告: --skip-check 跳过了本地校验，这次发布的是未经测试的代码。')
	} else {
		console.log('本地校验: pnpm check（test / typecheck / format / db / build）')
		const check = spawnSync(pnpm, ['check'], {
			stdio: 'inherit',
			shell: process.platform === 'win32',
			windowsHide: true
		})
		if (check.error) throw check.error
		if (check.status !== 0) throw new Error('Release refused: 本地校验未通过。修好之后重跑，或用 --skip-check 明确跳过。')
	}

	snapshot = await createReleaseSnapshot(release.sha)
	console.log(`Deploying ${release.sha} to Vercel production`)
	const result = spawnSync(
		process.platform === 'win32' ? 'vercel.cmd' : 'vercel',
		[
			'deploy',
			'--prod',
			'--yes',
			'--meta',
			`releaseCommit=${release.sha}`,
			'--env',
			`BLOG_RELEASE_COMMIT=${release.sha}`,
			'--build-env',
			`BLOG_RELEASE_COMMIT=${release.sha}`
		],
		{
			stdio: 'inherit',
			cwd: snapshot.directory,
			shell: process.platform === 'win32',
			windowsHide: true
		}
	)
	if (result.error) throw result.error
	process.exitCode = result.status ?? 1
} catch (error) {
	console.error(error.message)
	process.exitCode = 1
} finally {
	try {
		await snapshot?.cleanup()
	} catch (error) {
		// Windows can retain the CLI's cwd handle briefly after a successful
		// deployment. Cleanup is local housekeeping, not the release outcome.
		console.warn(`Temporary snapshot cleanup failed (${error.code}); remove later: ${snapshot?.directory}`)
	}
}
