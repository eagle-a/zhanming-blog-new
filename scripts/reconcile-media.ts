import { list } from '@vercel/blob'
import * as schema from '../src/db/schema.ts'
import { extractMediaPathnames } from '../src/lib/media-references.ts'
import { openScriptDatabase } from './lib/database.ts'

const databaseUrl = process.env.DATABASE_URL?.trim()
const includeBlobs = process.argv.includes('--include-blobs')
if (!databaseUrl) throw new Error('DATABASE_URL is required')

function collectMediaReferences(value: unknown, references: Set<string>) {
	for (const pathname of extractMediaPathnames(value)) references.add(pathname)
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

const { db, close } = openScriptDatabase(databaseUrl)
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

const activeMediaRows = mediaRows.filter(row => !row.deletedAt)
const dbPathnames = new Set(activeMediaRows.map(row => row.pathname))
const sortedDifference = (left: Set<string>, right: Set<string>) => [...left].filter(value => !right.has(value)).sort()
const now = Date.now()
const pendingGraceHours = 24
const pendingGraceMs = pendingGraceHours * 60 * 60 * 1000
const pendingCandidates = activeMediaRows
	.filter(row => row.state === 'pending' && !references.has(row.pathname) && now - (row.pendingAt?.getTime() ?? now) >= pendingGraceMs)
	.map(row => ({
		pathname: row.pathname,
		pendingAt: row.pendingAt?.toISOString() ?? null,
		ageHours: Math.floor((now - (row.pendingAt?.getTime() ?? now)) / 3_600_000)
	}))
const referencedPending = activeMediaRows.filter(row => row.state === 'pending' && references.has(row.pathname)).map(row => row.pathname)
const referencedDeleted = mediaRows.filter(row => row.deletedAt && references.has(row.pathname)).map(row => row.pathname)
const report = {
	readOnly: true,
	deletionPerformed: false,
	policy: {
		pendingGraceHours,
		pendingCandidatesRequireManualReview: true,
		unreferencedCommittedRowsAreNotDeletionCandidatesWithoutBlobVerification: true
	},
	counts: {
		references: references.size,
		databaseMedia: dbPathnames.size,
		deletedMediaRows: mediaRows.length - activeMediaRows.length,
		blobObjects: blobPathnames?.size ?? null,
		pendingMedia: activeMediaRows.filter(row => row.state === 'pending').length,
		pendingCandidates: pendingCandidates.length,
		referencedPending: referencedPending.length
	},
	pendingCandidates,
	referencedPending,
	referencedDeleted,
	missingDatabaseRows: sortedDifference(references, dbPathnames),
	unreferencedDatabaseRows: sortedDifference(dbPathnames, references),
	missingBlobObjects: blobPathnames ? sortedDifference(dbPathnames, blobPathnames) : null,
	untrackedBlobObjects: blobPathnames ? sortedDifference(blobPathnames, dbPathnames) : null
}

console.log(JSON.stringify(report, null, 2))
if (report.missingDatabaseRows.length > 0 || report.referencedDeleted.length > 0 || (report.missingBlobObjects?.length ?? 0) > 0) process.exitCode = 2
await close()
