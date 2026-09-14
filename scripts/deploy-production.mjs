import { spawnSync } from 'node:child_process'
import { checkReleaseState } from './check-release-state.mjs'

try {
	const release = await checkReleaseState()
	console.log(`Deploying verified commit ${release.sha}; CI: ${release.ciRun}`)
	const result = spawnSync(process.platform === 'win32' ? 'vercel.cmd' : 'vercel', ['deploy', '--prod', '--yes', '--meta', `releaseCommit=${release.sha}`], {
		stdio: 'inherit',
		shell: process.platform === 'win32',
		windowsHide: true
	})
	if (result.error) throw result.error
	process.exitCode = result.status ?? 1
} catch (error) {
	console.error(error.message)
	process.exitCode = 1
}
