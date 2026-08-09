import { readdir, stat } from 'node:fs/promises'
import path from 'node:path'

const publicRoot = path.resolve(process.cwd(), 'public')
const thresholdArgument = process.argv.find(argument => argument.startsWith('--min-bytes='))?.slice('--min-bytes='.length)
const threshold = thresholdArgument ? Number.parseInt(thresholdArgument, 10) : 1024 * 1024
if (!Number.isSafeInteger(threshold) || threshold < 0) throw new Error('--min-bytes must be a non-negative integer')

const largeFiles: Array<{ path: string; bytes: number; mebibytes: number; protectedUserContent: boolean }> = []
async function walk(directory: string) {
	for (const entry of await readdir(directory, { withFileTypes: true })) {
		const absolute = path.join(directory, entry.name)
		if (entry.isDirectory()) await walk(absolute)
		else if (entry.isFile()) {
			const info = await stat(absolute)
			if (info.size >= threshold) {
				const relativePath = path.relative(publicRoot, absolute).replaceAll(path.sep, '/')
				largeFiles.push({
					path: relativePath,
					bytes: info.size,
					mebibytes: Number((info.size / 1024 / 1024).toFixed(2)),
					protectedUserContent: relativePath.startsWith('blogs/hardware-kb/')
				})
			}
		}
	}
}

await walk(publicRoot)
largeFiles.sort((left, right) => right.bytes - left.bytes)
console.log(
	JSON.stringify(
		{
			readOnly: true,
			thresholdBytes: threshold,
			files: largeFiles,
			totalBytes: largeFiles.reduce((sum, file) => sum + file.bytes, 0),
			actionableBytes: largeFiles.filter(file => !file.protectedUserContent).reduce((sum, file) => sum + file.bytes, 0),
			protectedBytes: largeFiles.filter(file => file.protectedUserContent).reduce((sum, file) => sum + file.bytes, 0)
		},
		null,
		2
	)
)
