import { createHash } from 'node:crypto'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { get, list } from '@vercel/blob'
import * as schema from '../src/db/schema.ts'
import { openScriptDatabase } from './lib/database.ts'

const FORMAT_VERSION = 2
const root = path.resolve(process.cwd())
const outputArgument = process.argv.find(argument => argument.startsWith('--output='))?.slice('--output='.length)
const includeBlobs = process.argv.includes('--include-blobs')
const archiveBlobs = process.argv.includes('--archive-blobs')
const maxArchiveBytesArgument = process.argv.find(argument => argument.startsWith('--max-blob-bytes='))?.slice('--max-blob-bytes='.length)
const maxArchiveBlobBytes = maxArchiveBytesArgument ? Number.parseInt(maxArchiveBytesArgument, 10) : 100 * 1024 * 1024
const databaseUrl = process.env.DATABASE_URL?.trim()

if (!outputArgument) throw new Error('必须显式指定仓库外的新目录：--output=<directory>')
if (!databaseUrl) throw new Error('DATABASE_URL is required')
if (!Number.isSafeInteger(maxArchiveBlobBytes) || maxArchiveBlobBytes <= 0) throw new Error('--max-blob-bytes must be a positive integer')
if (archiveBlobs && !includeBlobs) throw new Error('--archive-blobs 必须同时指定 --include-blobs')

const output = path.resolve(outputArgument)
const relativeToRoot = path.relative(root, output)
if (!relativeToRoot || (!relativeToRoot.startsWith(`..${path.sep}`) && relativeToRoot !== '..')) {
	throw new Error('备份目录必须位于项目仓库之外，防止内容或私密数据被 Git 提交')
}

const { db, close } = openScriptDatabase(databaseUrl)

async function listBlobManifest() {
	if (!includeBlobs) return null
	if (!process.env.BLOB_READ_WRITE_TOKEN?.trim() && !process.env.BLOB_STORE_ID?.trim()) {
		throw new Error('--include-blobs 需要 BLOB_READ_WRITE_TOKEN，或 Vercel OIDC 与 BLOB_STORE_ID')
	}

	const blobs: Array<{ pathname: string; size: number; uploadedAt: Date; etag: string }> = []
	let cursor: string | undefined
	do {
		const page = await list({ limit: 1000, cursor })
		blobs.push(...page.blobs.map(blob => ({ pathname: blob.pathname, size: blob.size, uploadedAt: blob.uploadedAt, etag: blob.etag })))
		cursor = page.hasMore ? page.cursor : undefined
	} while (cursor)
	return blobs
}

async function archiveBlobObjects(blobs: Array<{ pathname: string; size: number; uploadedAt: Date; etag: string }>) {
	if (!archiveBlobs) return []
	const archiveRoot = path.join(output, 'blobs')
	await mkdir(archiveRoot)
	const archived: Array<{ pathname: string; file: string; size: number; sha256: string; etag: string; contentType: string }> = []
	for (const listed of blobs) {
		if (listed.size > maxArchiveBlobBytes) {
			throw new Error(`Blob ${listed.pathname} exceeds --max-blob-bytes; refusing partial archive`)
		}
		const result = await get(listed.pathname, { access: 'private' })
		if (!result || result.statusCode !== 200) throw new Error(`Blob ${listed.pathname} could not be downloaded`)
		const bytes = Buffer.from(await new Response(result.stream).arrayBuffer())
		if (bytes.byteLength !== listed.size) throw new Error(`Blob ${listed.pathname} size changed during backup`)
		const fileName = `${createHash('sha256').update(listed.pathname).digest('hex')}.bin`
		await writeFile(path.join(archiveRoot, fileName), bytes, { flag: 'wx' })
		archived.push({
			pathname: listed.pathname,
			file: path.posix.join('blobs', fileName),
			size: bytes.byteLength,
			sha256: createHash('sha256').update(bytes).digest('hex'),
			etag: listed.etag,
			contentType: result.blob.contentType
		})
	}
	return archived
}

const [
	posts,
	postRevisions,
	tags,
	postTags,
	categories,
	contentDocuments,
	contentDocumentRevisions,
	media,
	contentSubmissions,
	auditEvents,
	submissionTicketMetadata,
	blobs
] = await Promise.all([
	db.select().from(schema.posts),
	db.select().from(schema.postRevisions),
	db.select().from(schema.tags),
	db.select().from(schema.postTags),
	db.select().from(schema.categories),
	db.select().from(schema.contentDocuments),
	db.select().from(schema.contentDocumentRevisions),
	db.select().from(schema.media),
	db.select().from(schema.contentSubmissions),
	db.select().from(schema.auditEvents),
	db
		.select({
			id: schema.submissionTickets.id,
			label: schema.submissionTickets.label,
			scope: schema.submissionTickets.scope,
			createdBy: schema.submissionTickets.createdBy,
			createdAt: schema.submissionTickets.createdAt,
			expiresAt: schema.submissionTickets.expiresAt,
			usedAt: schema.submissionTickets.usedAt,
			revokedAt: schema.submissionTickets.revokedAt
		})
		.from(schema.submissionTickets),
	listBlobManifest()
])

const exportedAt = new Date().toISOString()
await mkdir(output)
const archivedBlobs = blobs ? await archiveBlobObjects(blobs) : []
const data = {
	formatVersion: FORMAT_VERSION,
	exportedAt,
	tables: {
		posts,
		postRevisions,
		tags,
		postTags,
		categories,
		contentDocuments,
		contentDocumentRevisions,
		media,
		contentSubmissions,
		auditEvents,
		submissionTicketMetadata
	},
	blobs,
	archivedBlobs: archivedBlobs
}
const body = `${JSON.stringify(data, null, 2)}\n`
const sha256 = createHash('sha256').update(body).digest('hex')
const manifest = {
	formatVersion: FORMAT_VERSION,
	exportedAt,
	dataFile: 'cms-data.json',
	sha256,
	includesBlobManifest: blobs !== null,
	includesBlobArchive: archiveBlobs,
	excludedSensitiveTables: ['admin_login_attempts', 'submission_tickets']
}

await writeFile(path.join(output, 'cms-data.json'), body, { encoding: 'utf8', flag: 'wx' })
await writeFile(path.join(output, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, { encoding: 'utf8', flag: 'wx' })

console.log(
	JSON.stringify(
		{ output, sha256, counts: Object.fromEntries(Object.entries(data.tables).map(([name, rows]) => [name, rows.length])), blobs: blobs?.length ?? null },
		null,
		2
	)
)
await close()
