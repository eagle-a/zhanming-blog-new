import { list } from '@vercel/blob'
import { drizzle } from 'drizzle-orm/neon-serverless'
import * as schema from '../src/db/schema.ts'

const databaseUrl = process.env.DATABASE_URL?.trim()
const includeBlobs = process.argv.includes('--include-blobs')
if (!databaseUrl) throw new Error('DATABASE_URL is required')

function collectMediaReferences(value: unknown, references: Set<string>) {
	if (typeof value === 'string') {
		for (const match of value.matchAll(/\/api\/media\/([^\s"'()<>{}\]]+)/g)) {
			try {
				const pathname = match[1]
					.split('/')
					.map(segment => decodeURIComponent(segment))
					.join('/')
				references.add(pathname.split(/[?#]/, 1)[0])
			} catch {
				// Malformed references remain visible through the source counts below.
			}
		}
		return
	}
	if (Array.isArray(value)) {
		for (const item of value) collectMediaReferences(item, references)
		return
	}
	if (value && typeof value === 'object') {
		for (const item of Object.values(value)) collectMediaReferences(item, references)
	}
}

async function listBlobPathnames(): Promise<Set<string> | null> {
	if (!includeBlobs) return null
	if (!process.env.BLOB_READ_WRITE_TOKEN?.trim() && !process.env.BLOB_STORE_ID?.trim()) {
		throw new Error('--include-blobs 需要 BLOB_READ_WRITE_TOKEN，或 Vercel OIDC 与 BLOB_STORE_ID')
	}
	const pathnames = new Set<string>()
	let cursor: string | undefined
	do {
		const page = await list({ limit: 1000, cursor })
		for (const blob of page.blobs) pathnames.add(blob.pathname)
		cursor = page.hasMore ? page.cursor : undefined
	} while (cursor)
	return pathnames
}

const db = drizzle(databaseUrl, { schema })
const [posts, postRevisions, contentDocuments, contentDocumentRevisions, contentSubmissions, mediaRows, blobPathnames] = await Promise.all([
	db.select().from(schema.posts),
	db.select().from(schema.postRevisions),
	db.select().from(schema.contentDocuments),
	db.select().from(schema.contentDocumentRevisions),
	db.select().from(schema.contentSubmissions),
	db.select().from(schema.media),
	listBlobPathnames()
])

const references = new Set<string>()
for (const row of posts) collectMediaReferences([row.coverUrl, row.contentMd], references)
for (const row of postRevisions) collectMediaReferences([row.contentMd, row.metadataSnapshot], references)
for (const row of contentDocuments) collectMediaReferences(row.data, references)
for (const row of contentDocumentRevisions) collectMediaReferences(row.data, references)
for (const row of contentSubmissions) collectMediaReferences(row.payload, references)

const dbPathnames = new Set(mediaRows.map(row => row.pathname))
const sortedDifference = (left: Set<string>, right: Set<string>) => [...left].filter(value => !right.has(value)).sort()
const report = {
	readOnly: true,
	counts: {
		references: references.size,
		databaseMedia: dbPathnames.size,
		blobObjects: blobPathnames?.size ?? null
	},
	missingDatabaseRows: sortedDifference(references, dbPathnames),
	unreferencedDatabaseRows: sortedDifference(dbPathnames, references),
	missingBlobObjects: blobPathnames ? sortedDifference(dbPathnames, blobPathnames) : null,
	untrackedBlobObjects: blobPathnames ? sortedDifference(blobPathnames, dbPathnames) : null
}

console.log(JSON.stringify(report, null, 2))
if (report.missingDatabaseRows.length > 0 || (report.missingBlobObjects?.length ?? 0) > 0) process.exitCode = 2
