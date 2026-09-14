import { execFileSync } from 'node:child_process'
import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'

// Deploy committed files only. Ignored .env files, dependencies and local drafts
// must never become inputs to a release that claims to represent a Git SHA.
export async function createReleaseSnapshot(sha, cwd = process.cwd()) {
	if (!/^[a-f0-9]{40}$/.test(sha)) throw new Error('Invalid release SHA')
	const project = JSON.parse(await readFile(path.join(cwd, '.vercel/project.json'), 'utf8'))
	if (!project.orgId || !project.projectId) throw new Error('Link this checkout to its Vercel project before releasing.')
	const temporary = await mkdtemp(path.join(tmpdir(), 'blog-release-'))
	const directory = path.join(temporary, 'source')
	try {
		await mkdir(directory)
		const archive = path.join(temporary, 'source.tar')
		execFileSync('git', ['archive', '--format=tar', `--output=${archive}`, sha], { cwd, windowsHide: true, timeout: 30_000 })
		execFileSync('tar', ['-xf', archive, '-C', directory], { windowsHide: true, timeout: 30_000 })
		await mkdir(path.join(directory, '.vercel'), { recursive: true })
		await writeFile(path.join(directory, '.vercel/project.json'), JSON.stringify({ orgId: project.orgId, projectId: project.projectId }))
		return { directory, cleanup: () => rm(temporary, { recursive: true, force: true }) }
	} catch (error) {
		await rm(temporary, { recursive: true, force: true })
		throw error
	}
}
