import { createHash } from 'node:crypto'
import { copyFile, mkdir, readFile, stat, unlink, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

type PictureGroup = { id: string; uploadedAt: string; images: string[] }

const apply = process.argv.includes('--apply')
const archiveArgument = process.argv.find(argument => argument.startsWith('--archive='))?.slice('--archive='.length)
const root = path.resolve(process.cwd())
const publicRoot = path.join(root, 'public')
const listPath = path.join(root, 'src', 'app', 'pictures', 'list.json')
const groups = JSON.parse(await readFile(listPath, 'utf8')) as PictureGroup[]
const urls = [...new Set(groups.flatMap(group => group.images))]

const plan = await Promise.all(
	urls.map(async url => {
		if (!/^\/images\/pictures\/[A-Za-z0-9._-]+\.(?:jpe?g|png)$/i.test(url)) throw new Error(`图片墙路径不安全: ${url}`)
		const source = path.resolve(publicRoot, `.${url}`)
		if (!source.startsWith(`${path.join(publicRoot, 'images', 'pictures')}${path.sep}`)) throw new Error(`图片墙路径越界: ${url}`)
		const outputUrl = url.replace(/\.(?:jpe?g|png)$/i, '.webp')
		const output = path.resolve(publicRoot, `.${outputUrl}`)
		return { url, source, outputUrl, output, bytes: (await stat(source)).size }
	})
)

if (!apply) {
	console.log(JSON.stringify({ readOnly: true, files: plan.map(item => ({ source: item.url, output: item.outputUrl, bytes: item.bytes })) }, null, 2))
	process.exit(0)
}
if (!archiveArgument) throw new Error('--apply 需要 --archive=<new-directory>')
const archiveRoot = path.resolve(archiveArgument)
const relativeArchive = path.relative(root, archiveRoot)
if (!relativeArchive || (!relativeArchive.startsWith(`..${path.sep}`) && relativeArchive !== '..')) throw new Error('归档目录必须位于项目仓库之外')
await mkdir(archiveRoot)

const manifest: Array<{
	source: string
	archivedFile: string
	originalBytes: number
	optimizedBytes: number
	originalSha256: string
	optimizedSha256: string
}> = []
for (const item of plan) {
	const archivedFile = path.join(archiveRoot, path.basename(item.source))
	await copyFile(item.source, archivedFile)
	const original = await readFile(item.source)
	const archived = await readFile(archivedFile)
	const originalSha256 = createHash('sha256').update(original).digest('hex')
	if (createHash('sha256').update(archived).digest('hex') !== originalSha256) throw new Error(`原图归档校验失败: ${item.url}`)
	await sharp(original)
		.rotate()
		.resize({ width: 2560, height: 2560, fit: 'inside', withoutEnlargement: true })
		.webp({ quality: 82, effort: 6, smartSubsample: true })
		.toFile(item.output)
	const optimized = await readFile(item.output)
	manifest.push({
		source: item.url,
		archivedFile: path.basename(archivedFile),
		originalBytes: original.length,
		optimizedBytes: optimized.length,
		originalSha256,
		optimizedSha256: createHash('sha256').update(optimized).digest('hex')
	})
}

const replacements = new Map(plan.map(item => [item.url, item.outputUrl]))
const updated = groups.map(group => ({ ...group, images: group.images.map(url => replacements.get(url) || url) }))
await writeFile(listPath, `${JSON.stringify(updated, null, '\t')}\n`, { encoding: 'utf8', flag: 'w' })
await writeFile(path.join(archiveRoot, 'manifest.json'), `${JSON.stringify({ version: 1, createdAt: new Date().toISOString(), files: manifest }, null, 2)}\n`, {
	encoding: 'utf8',
	flag: 'wx'
})
for (const item of plan) await unlink(item.source)

console.log(
	JSON.stringify(
		{
			applied: true,
			archiveRoot,
			files: manifest.length,
			originalBytes: manifest.reduce((sum, item) => sum + item.originalBytes, 0),
			optimizedBytes: manifest.reduce((sum, item) => sum + item.optimizedBytes, 0)
		},
		null,
		2
	)
)
