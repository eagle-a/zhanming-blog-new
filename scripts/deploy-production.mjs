import { spawnSync } from 'node:child_process'
import { checkReleaseState } from './check-release-state.mjs'
import { createReleaseSnapshot } from './release-snapshot.mjs'

let snapshot
try {
	const release = await checkReleaseState()
	snapshot = await createReleaseSnapshot(release.sha)
	console.log(`Deploying verified commit ${release.sha}; CI: ${release.ciRun}`)
	const result = spawnSync(process.platform === 'win32' ? 'vercel.cmd' : 'vercel', ['deploy', '--prod', '--yes', '--meta', `releaseCommit=${release.sha}`], {
		stdio: 'inherit',
		cwd: snapshot.directory,
		shell: process.platform === 'win32',
		windowsHide: true
	})
	if (result.error) throw result.error
	process.exitCode = result.status ?? 1
} catch (error) {
	console.error(error.message)
	process.exitCode = 1
} finally {
	await snapshot?.cleanup()
}
