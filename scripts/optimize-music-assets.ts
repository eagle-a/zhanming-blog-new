import { execFile } from 'node:child_process'
import { createHash } from 'node:crypto'
import { copyFile, mkdir, readFile, rename, stat, unlink, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { promisify } from 'node:util'
import { MUSIC_LIST } from '../src/config/music-list.ts'

const execFileAsync = promisify(execFile)
const apply = process.argv.includes('--apply')
const archiveArgument = process.argv.find(argument => argument.startsWith('--archive='))?.slice('--archive='.length)
const root = path.resolve(process.cwd())
const musicRoot = path.join(root, 'public', 'music')
const usedFiles = MUSIC_LIST.map(item => path.join(musicRoot, `${item.id}.mp3`))
const unusedFiles = [path.join(musicRoot, 'christmas.m4a'), path.join(musicRoot, 'search_links.txt')]

const plan = await Promise.all(
	usedFiles.map(async file => {
		const { stdout } = await execFileAsync('ffprobe', ['-v', 'error', '-show_entries', 'format=bit_rate,duration', '-of', 'json', '--', file])
		const format = (JSON.parse(stdout) as { format: { bit_rate?: string; duration?: string } }).format
		return {
			file,
			bytes: (await stat(file)).size,
			bitRate: Number(format.bit_rate || 0),
			durationSeconds: Number(format.duration || 0),
			transcode: Number(format.bit_rate || 0) > 160_000
		}
	})
)

if (!apply) {
	console.log(
		JSON.stringify(
			{
				readOnly: true,
				used: plan.map(item => ({ file: path.basename(item.file), bytes: item.bytes, bitRate: item.bitRate, transcode: item.transcode })),
				unused: unusedFiles.map(file => path.basename(file))
			},
			null,
			2
		)
	)
	process.exit(0)
}
if (!archiveArgument) throw new Error('--apply 需要 --archive=<new-directory>')
const archiveRoot = path.resolve(archiveArgument)
const relativeArchive = path.relative(root, archiveRoot)
if (!relativeArchive || (!relativeArchive.startsWith(`..${path.sep}`) && relativeArchive !== '..')) throw new Error('归档目录必须位于项目仓库之外')
await mkdir(archiveRoot)

const manifest: Array<{
	file: string
	originalBytes: number
	optimizedBytes: number | null
	originalSha256: string
	action: 'transcoded' | 'preserved' | 'removed-unused'
}> = []
for (const item of plan) {
	const archived = path.join(archiveRoot, path.basename(item.file))
	await copyFile(item.file, archived)
	const original = await readFile(item.file)
	const originalSha256 = createHash('sha256').update(original).digest('hex')
	if (
		createHash('sha256')
			.update(await readFile(archived))
			.digest('hex') !== originalSha256
	)
		throw new Error(`音乐归档校验失败: ${path.basename(item.file)}`)
	if (!item.transcode) {
		manifest.push({ file: path.basename(item.file), originalBytes: original.length, optimizedBytes: original.length, originalSha256, action: 'preserved' })
		continue
	}
	const temporary = `${item.file}.optimized.mp3`
	await execFileAsync('ffmpeg', ['-v', 'error', '-i', item.file, '-map_metadata', '0', '-vn', '-codec:a', 'libmp3lame', '-b:a', '128k', temporary])
	const optimizedBytes = (await stat(temporary)).size
	if (optimizedBytes <= 0 || optimizedBytes >= original.length) throw new Error(`音乐转码没有产生有效缩减: ${path.basename(item.file)}`)
	await unlink(item.file)
	await rename(temporary, item.file)
	manifest.push({ file: path.basename(item.file), originalBytes: original.length, optimizedBytes, originalSha256, action: 'transcoded' })
}

for (const file of unusedFiles) {
	const archived = path.join(archiveRoot, path.basename(file))
	await copyFile(file, archived)
	const original = await readFile(file)
	const originalSha256 = createHash('sha256').update(original).digest('hex')
	if (
		createHash('sha256')
			.update(await readFile(archived))
			.digest('hex') !== originalSha256
	)
		throw new Error(`未使用资产归档校验失败: ${path.basename(file)}`)
	await unlink(file)
	manifest.push({ file: path.basename(file), originalBytes: original.length, optimizedBytes: null, originalSha256, action: 'removed-unused' })
}

await writeFile(path.join(archiveRoot, 'manifest.json'), `${JSON.stringify({ version: 1, createdAt: new Date().toISOString(), files: manifest }, null, 2)}\n`, {
	encoding: 'utf8',
	flag: 'wx'
})
console.log(
	JSON.stringify(
		{
			applied: true,
			archiveRoot,
			originalBytes: manifest.reduce((sum, item) => sum + item.originalBytes, 0),
			optimizedBytes: manifest.reduce((sum, item) => sum + (item.optimizedBytes || 0), 0)
		},
		null,
		2
	)
)
