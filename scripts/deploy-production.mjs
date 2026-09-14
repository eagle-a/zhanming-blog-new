import { spawnSync } from 'node:child_process'
import { checkReleaseState } from './check-release-state.mjs'
import { createReleaseSnapshot } from './release-snapshot.mjs'

let snapshot
try {
	const release = await checkReleaseState()
	snapshot = await createReleaseSnapshot(release.sha)
	console.log(`Deploying verified commit ${release.sha}; CI: ${release.ciRun}`)
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
