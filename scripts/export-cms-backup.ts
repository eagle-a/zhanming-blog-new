import { createHash } from 'node:crypto'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { list } from '@vercel/blob'
import { drizzle } from 'drizzle-orm/neon-serverless'
import * as schema from '../src/db/schema.ts'

const FORMAT_VERSION = 1
const root = path.resolve(process.cwd())
const outputArgument = process.argv.find(argument => argument.startsWith('--output='))?.slice('--output='.length)
const includeBlobs = process.argv.includes('--include-blobs')
const databaseUrl = process.env.DATABASE_URL?.trim()

if (!outputArgument) throw new Error('必须显式指定仓库外的新目录：--output=<directory>')
if (!databaseUrl) throw new Error('DATABASE_URL is required')

const output = path.resolve(outputArgument)
const relativeToRoot = path.relative(root, output)
if (!relativeToRoot || (!relativeToRoot.startsWith(`..${path.sep}`) && relativeToRoot !== '..')) {
	throw new Error('备份目录必须位于项目仓库之外，防止内容或私密数据被 Git 提交')
}

const db = drizzle(databaseUrl, { schema })

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

const [posts, postRevisions, tags, postTags, categories, contentDocuments, contentDocumentRevisions, media, contentSubmissions, auditEvents, blobs] =
	await Promise.all([
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
		listBlobManifest()
	])

const exportedAt = new Date().toISOString()
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
		auditEvents
	},
	blobs
}
const body = `${JSON.stringify(data, null, 2)}\n`
const sha256 = createHash('sha256').update(body).digest('hex')
const manifest = {
	formatVersion: FORMAT_VERSION,
	exportedAt,
	dataFile: 'cms-data.json',
	sha256,
	includesBlobManifest: blobs !== null,
	excludedSensitiveTables: ['admin_login_attempts', 'agent_api_keys', 'agent_request_nonces', 'submission_tickets']
}

await mkdir(output)
await writeFile(path.join(output, 'cms-data.json'), body, { encoding: 'utf8', flag: 'wx' })
await writeFile(path.join(output, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, { encoding: 'utf8', flag: 'wx' })

console.log(
	JSON.stringify(
		{ output, sha256, counts: Object.fromEntries(Object.entries(data.tables).map(([name, rows]) => [name, rows.length])), blobs: blobs?.length ?? null },
		null,
		2
	)
)
