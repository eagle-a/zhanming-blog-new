import { execFileSync } from 'node:child_process'

const status = execFileSync('git', ['status', '--porcelain'], { encoding: 'utf8' }).trim()
if (status) {
	console.error('Release refused: working tree is not clean.')
	console.error(status)
	process.exit(1)
}

const branch = execFileSync('git', ['branch', '--show-current'], { encoding: 'utf8' }).trim()
if (branch !== 'main') {
	console.error(`Release refused: expected branch main, got ${branch || '(detached HEAD)'}.`)
	process.exit(1)
}

console.log(`Release state is clean on ${branch}.`)
