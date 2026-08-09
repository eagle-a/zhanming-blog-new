import { createHash } from 'node:crypto'
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { del, get, head, list, put } from '@vercel/blob'
import { and, eq, isNull, sql } from 'drizzle-orm'
import * as schema from '../src/db/schema.ts'
import { extractMediaPathnames, MEDIA_REFERENCE_MUTATION_LOCK } from '../src/lib/media-references.ts'
import { openScriptDatabase, type ScriptDatabase } from './lib/database.ts'

type Action = 'plan' | 'backfill' | 'mark' | 'delete' | 'recover'
type BlobInfo = { pathname: string; size: number; uploadedAt: Date; etag: string }
type Candidate = { pathname: string; sha256: string; size: number; mimeType: string; etag: string; orphanedAt: string }
type RecoveryItem = Candidate & { file: string; archiveSha256: string; status: 'archived' | 'deleting' | 'deleted' | 'recovered' }
type ScriptTransaction = Parameters<Parameters<ScriptDatabase['transaction']>[0]>[0]

const root = path.resolve(process.cwd())
const action = (process.argv.find(argument => argument.startsWith('--action='))?.slice('--action='.length) || 'plan') as Action
const outputArgument = process.argv.find(argument => argument.startsWith('--output='))?.slice('--output='.length)
const manifestArgument = process.argv.find(argument => argument.startsWith('--manifest='))?.slice('--manifest='.length)
const archiveArgument = process.argv.find(argument => argument.startsWith('--archive='))?.slice('--archive='.length)
const graceHoursArgument = process.argv.find(argument => argument.startsWith('--grace-hours='))?.slice('--grace-hours='.length)
const graceHours = graceHoursArgument ? Number.parseInt(graceHoursArgument, 10) : 7 * 24
const databaseUrl = process.env.DATABASE_URL?.trim()

if (!['plan', 'backfill', 'mark', 'delete', 'recover'].includes(action)) throw new Error('--action is invalid')
if (!databaseUrl) throw new Error('DATABASE_URL is required')
if (!Number.isSafeInteger(graceHours) || graceHours < 24) throw new Error('--grace-hours must be an integer of at least 24')

function outsideRepository(argument: string, label: string): string {
	const resolved = path.resolve(argument)
	const relative = path.relative(root, resolved)
	if (!relative || (!relative.startsWith(`..${path.sep}`) && relative !== '..')) throw new Error(`${label} 必须位于项目仓库之外`)
	return resolved
}

function assertMutationEnvironment() {
	const confirmation = process.argv.find(argument => argument.startsWith('--confirm-environment='))?.slice('--confirm-environment='.length)
	const environment =
		process.env.BLOG_RESOURCE_ENV?.trim() || (['localhost', '127.0.0.1', '[::1]'].includes(new URL(databaseUrl!).hostname.toLowerCase()) ? 'development' : '')
	if (!environment || environment === 'production') throw new Error('媒体写操作拒绝 production，并要求 BLOG_RESOURCE_ENV')
	if (!['development', 'preview', 'restore-drill'].includes(environment)) throw new Error('BLOG_RESOURCE_ENV 不允许执行媒体维护')
	if (confirmation !== environment) throw new Error('--confirm-environment 必须与 BLOG_RESOURCE_ENV 完全一致')
	return environment
}

async function listBlobMap(): Promise<Map<string, BlobInfo>> {
	if (!process.env.BLOB_READ_WRITE_TOKEN?.trim() && !process.env.BLOB_STORE_ID?.trim()) throw new Error('媒体维护需要 Blob 只读/读写凭据或 Vercel OIDC')
	const result = new Map<string, BlobInfo>()
	let cursor: string | undefined
	do {
		const page = await list({ limit: 1000, cursor })
		for (const blob of page.blobs) result.set(blob.pathname, { pathname: blob.pathname, size: blob.size, uploadedAt: blob.uploadedAt, etag: blob.etag })
		cursor = page.hasMore ? page.cursor : undefined
	} while (cursor)
	return result
}

function collectReferences(values: unknown[]): Set<string> {
	const result = new Set<string>()
	for (const value of values) for (const pathname of extractMediaPathnames(value)) result.add(pathname)
	return result
}

function expectedSha256(pathname: string): string | null {
	return pathname.match(/\/([a-f0-9]{64})\.[a-z0-9]{1,10}$/i)?.[1]?.toLowerCase() || null
}

function seal<T extends Record<string, unknown>>(payload: T) {
	const body = JSON.stringify(payload)
	return { ...payload, sha256: createHash('sha256').update(body).digest('hex') }
}

function verifySeal<T extends Record<string, unknown> & { sha256: string }>(value: T): Omit<T, 'sha256'> {
	const { sha256, ...payload } = value
	if (createHash('sha256').update(JSON.stringify(payload)).digest('hex') !== sha256) throw new Error('manifest SHA-256 校验失败')
	return payload
}

async function atomicJson(file: string, value: unknown) {
	const temporary = `${file}.tmp`
	await writeFile(temporary, `${JSON.stringify(value, null, 2)}\n`, { flag: 'w' })
	await rename(temporary, file)
}

const { db, close } = openScriptDatabase(databaseUrl)

async function lockMediaReferenceMutation(tx: ScriptTransaction) {
	await tx.execute(sql`select pg_advisory_xact_lock(hashtextextended(${MEDIA_REFERENCE_MUTATION_LOCK}, 0))`)
}

async function loadCurrentReferences(database: ScriptDatabase | ScriptTransaction): Promise<Set<string>> {
	const [currentPosts, currentRevisions, currentDocuments, currentDocumentRevisions, currentSubmissions] = await Promise.all([
		database.select().from(schema.posts),
		database.select().from(schema.postRevisions),
		database.select().from(schema.contentDocuments),
		database.select().from(schema.contentDocumentRevisions),
		database.select().from(schema.contentSubmissions)
	])
	return collectReferences([
		...currentPosts.map(row => [row.coverUrl, row.contentMd]),
		...currentRevisions.map(row => [row.contentMd, row.metadataSnapshot]),
		...currentDocuments.map(row => row.data),
		...currentDocumentRevisions.map(row => row.data),
		...currentSubmissions.map(row => row.payload)
	])
}

const [posts, revisions, documents, documentRevisions, submissions, mediaRows, blobMap] = await Promise.all([
	db.select().from(schema.posts),
	db.select().from(schema.postRevisions),
	db.select().from(schema.contentDocuments),
	db.select().from(schema.contentDocumentRevisions),
	db.select().from(schema.contentSubmissions),
	db.select().from(schema.media),
	listBlobMap()
])
const references = collectReferences([
	...posts.map(row => [row.coverUrl, row.contentMd]),
	...revisions.map(row => [row.contentMd, row.metadataSnapshot]),
	...documents.map(row => row.data),
	...documentRevisions.map(row => row.data),
	...submissions.map(row => row.payload)
])
const rowsByPath = new Map(mediaRows.map(row => [row.pathname, row]))
const now = Date.now()
const graceMs = graceHours * 60 * 60 * 1000
const missingIndex = [...references].filter(pathname => !rowsByPath.has(pathname))
const backfillCandidates = missingIndex.filter(pathname => blobMap.has(pathname) && expectedSha256(pathname))
const orphanCandidates = mediaRows.filter(row => {
	const lastSeen = row.lastSeenAt || row.committedAt || row.createdAt
	return row.state === 'committed' && !row.deletedAt && !references.has(row.pathname) && blobMap.has(row.pathname) && now - lastSeen.getTime() >= graceMs
})

if (action === 'plan') {
	console.log(
		JSON.stringify(
			{
				readOnly: true,
				graceHours,
				missingIndex,
				backfillCandidates,
				missingBlobObjects: missingIndex.filter(pathname => !blobMap.has(pathname)),
				orphanCandidates: orphanCandidates.map(row => row.pathname),
				alreadyMarked: mediaRows.filter(row => row.state === 'orphaned' && !row.deletedAt).map(row => row.pathname),
				deletedRecoverableRows: mediaRows.filter(row => row.deletedAt).map(row => row.pathname)
			},
			null,
			2
		)
	)
} else if (action === 'backfill') {
	assertMutationEnvironment()
	for (const pathname of backfillCandidates) {
		const expected = expectedSha256(pathname)
		const result = await get(pathname, { access: 'private', useCache: false })
		if (!expected || !result || result.statusCode !== 200) throw new Error(`无法读取 ${pathname}`)
		const bytes = Buffer.from(await new Response(result.stream).arrayBuffer())
		const actual = createHash('sha256').update(bytes).digest('hex')
		if (actual !== expected || bytes.length !== result.blob.size) throw new Error(`Blob 完整性校验失败: ${pathname}`)
		await db.insert(schema.media).values({
			blobUrl: result.blob.url,
			pathname,
			sha256: actual,
			mimeType: result.blob.contentType,
			size: bytes.length,
			state: 'committed',
			committedAt: new Date(),
			lastSeenAt: new Date()
		})
	}
	console.log(JSON.stringify({ action, backfilled: backfillCandidates }, null, 2))
} else if (action === 'mark') {
	const environment = assertMutationEnvironment()
	if (!outputArgument) throw new Error('--action=mark 需要 --output=<manifest.json>')
	const output = outsideRepository(outputArgument, '候选清单')
	const markedAt = new Date()
	const candidates: Candidate[] = []
	const markPlans = new Map([...orphanCandidates, ...mediaRows.filter(row => row.state === 'orphaned' && !row.deletedAt)].map(row => [row.pathname, row]))
	for (const planned of markPlans.values()) {
		const candidate = await db.transaction(async tx => {
			await lockMediaReferenceMutation(tx)
			const currentReferences = await loadCurrentReferences(tx)
			if (currentReferences.has(planned.pathname)) return null
			const [row] = await tx.select().from(schema.media).where(eq(schema.media.pathname, planned.pathname)).for('update').limit(1)
			const lastSeen = row?.lastSeenAt || row?.committedAt || row?.createdAt
			if (!row || row.deletedAt || !['committed', 'orphaned'].includes(row.state)) return null
			if (row.state === 'committed' && (row.orphanedAt || !lastSeen || Date.now() - lastSeen.getTime() < graceMs)) return null
			if (row.state === 'orphaned' && !row.orphanedAt) throw new Error(`孤儿媒体缺少 orphaned_at: ${row.pathname}`)
			const blob = await head(row.pathname)
			if (blob.size !== row.size) throw new Error(`Blob 元数据与媒体索引不一致: ${row.pathname}`)
			let orphanedAt = row.orphanedAt
			if (row.state === 'committed') {
				const [updated] = await tx
					.update(schema.media)
					.set({ state: 'orphaned', orphanedAt: markedAt })
					.where(
						and(eq(schema.media.pathname, row.pathname), eq(schema.media.state, 'committed'), isNull(schema.media.orphanedAt), isNull(schema.media.deletedAt))
					)
					.returning({ orphanedAt: schema.media.orphanedAt })
				if (!updated?.orphanedAt) return null
				orphanedAt = updated.orphanedAt
			}
			return {
				pathname: row.pathname,
				sha256: row.sha256,
				size: row.size,
				mimeType: row.mimeType,
				etag: blob.etag,
				orphanedAt: orphanedAt!.toISOString()
			} satisfies Candidate
		})
		if (candidate) candidates.push(candidate)
	}
	await writeFile(output, `${JSON.stringify(seal({ version: 1, environment, graceHours, createdAt: markedAt.toISOString(), candidates }), null, 2)}\n`, {
		flag: 'wx'
	})
	console.log(JSON.stringify({ action, output, marked: candidates.length }, null, 2))
} else if (action === 'delete') {
	const environment = assertMutationEnvironment()
	if (!manifestArgument || !archiveArgument) throw new Error('--action=delete 需要 --manifest=<file> 和 --archive=<new-directory>')
	const manifestPath = outsideRepository(manifestArgument, '候选清单')
	const archiveRoot = outsideRepository(archiveArgument, '恢复归档')
	const payload = verifySeal(JSON.parse(await readFile(manifestPath, 'utf8')) as Record<string, unknown> & { sha256: string }) as {
		version: number
		environment: string
		graceHours: number
		createdAt: string
		candidates: Candidate[]
	}
	if (payload.version !== 1 || payload.environment !== environment) throw new Error('候选清单环境或版本不匹配')
	if (!Number.isSafeInteger(payload.graceHours) || payload.graceHours < 24) throw new Error('候选清单宽限期无效')
	if (graceHoursArgument && graceHours !== payload.graceHours) throw new Error('--grace-hours 必须与候选清单一致')
	const deletionGraceMs = payload.graceHours * 60 * 60 * 1000
	await mkdir(archiveRoot)
	const recoveryFile = path.join(archiveRoot, 'recovery.json')
	const recovery: { version: number; environment: string; createdAt: string; items: RecoveryItem[] } = {
		version: 1,
		environment,
		createdAt: new Date().toISOString(),
		items: []
	}
	await atomicJson(recoveryFile, seal(recovery))
	for (const candidate of payload.candidates) {
		await db.transaction(async tx => {
			await lockMediaReferenceMutation(tx)
			const currentReferences = await loadCurrentReferences(tx)
			if (currentReferences.has(candidate.pathname)) throw new Error(`对象重新被引用，拒绝删除: ${candidate.pathname}`)
			const [row] = await tx.select().from(schema.media).where(eq(schema.media.pathname, candidate.pathname)).for('update').limit(1)
			if (!row || row.state !== 'orphaned' || row.deletedAt || row.orphanedAt?.toISOString() !== candidate.orphanedAt)
				throw new Error(`数据库候选状态已变化: ${candidate.pathname}`)
			if (Date.now() - row.orphanedAt.getTime() < deletionGraceMs) throw new Error(`候选仍在宽限期: ${candidate.pathname}`)
			const metadata = await head(candidate.pathname)
			if (metadata.etag !== candidate.etag || metadata.size !== candidate.size) throw new Error(`Blob 元数据已变化: ${candidate.pathname}`)
			const result = await get(candidate.pathname, { access: 'private', useCache: false })
			if (!result || result.statusCode !== 200) throw new Error(`无法归档候选: ${candidate.pathname}`)
			const bytes = Buffer.from(await new Response(result.stream).arrayBuffer())
			const digest = createHash('sha256').update(bytes).digest('hex')
			if (digest !== candidate.sha256 || bytes.length !== candidate.size) throw new Error(`候选内容校验失败: ${candidate.pathname}`)
			const file = `${createHash('sha256').update(candidate.pathname).digest('hex')}.bin`
			await writeFile(path.join(archiveRoot, file), bytes, { flag: 'wx' })
			const item: RecoveryItem = { ...candidate, file, archiveSha256: digest, status: 'archived' }
			recovery.items.push(item)
			await atomicJson(recoveryFile, seal(recovery))
			item.status = 'deleting'
			await atomicJson(recoveryFile, seal(recovery))
			await del(candidate.pathname)
			item.status = 'deleted'
			await atomicJson(recoveryFile, seal(recovery))
			const [updated] = await tx
				.update(schema.media)
				.set({ deletedAt: new Date() })
				.where(and(eq(schema.media.pathname, candidate.pathname), eq(schema.media.state, 'orphaned'), isNull(schema.media.deletedAt)))
				.returning({ pathname: schema.media.pathname })
			if (!updated) throw new Error(`删除后数据库状态写入失败，请立即 recover: ${candidate.pathname}`)
		})
	}
	console.log(JSON.stringify({ action, recoveryFile, deleted: recovery.items.filter(item => item.status === 'deleted').length }, null, 2))
} else if (action === 'recover') {
	const environment = assertMutationEnvironment()
	if (!archiveArgument) throw new Error('--action=recover 需要 --archive=<directory>')
	const archiveRoot = outsideRepository(archiveArgument, '恢复归档')
	const recoveryFile = path.join(archiveRoot, 'recovery.json')
	const recovery = verifySeal(JSON.parse(await readFile(recoveryFile, 'utf8')) as Record<string, unknown> & { sha256: string }) as {
		version: number
		environment: string
		createdAt: string
		items: RecoveryItem[]
	}
	if (recovery.version !== 1 || recovery.environment !== environment) throw new Error('恢复归档环境或版本不匹配')
	for (const item of recovery.items.filter(item => item.status === 'deleting' || item.status === 'deleted')) {
		const bytes = await readFile(path.join(archiveRoot, item.file))
		if (bytes.length !== item.size || createHash('sha256').update(bytes).digest('hex') !== item.archiveSha256)
			throw new Error(`恢复文件校验失败: ${item.pathname}`)
		const existing = await get(item.pathname, { access: 'private', useCache: false })
		if (existing?.statusCode === 200) {
			const existingBytes = Buffer.from(await new Response(existing.stream).arrayBuffer())
			if (existingBytes.length !== item.size || createHash('sha256').update(existingBytes).digest('hex') !== item.archiveSha256)
				throw new Error(`线上对象与恢复归档冲突: ${item.pathname}`)
		} else {
			await put(item.pathname, bytes, { access: 'private', addRandomSuffix: false, allowOverwrite: false, contentType: item.mimeType })
		}
		await db.transaction(async tx => {
			await lockMediaReferenceMutation(tx)
			const [updated] = await tx
				.update(schema.media)
				.set({ state: 'committed', deletedAt: null, orphanedAt: null, committedAt: new Date(), lastSeenAt: new Date() })
				.where(eq(schema.media.pathname, item.pathname))
				.returning({ pathname: schema.media.pathname })
			if (!updated) throw new Error(`恢复后缺少媒体索引: ${item.pathname}`)
		})
		item.status = 'recovered'
		await atomicJson(recoveryFile, seal(recovery))
	}
	console.log(JSON.stringify({ action, recovered: recovery.items.filter(item => item.status === 'recovered').length }, null, 2))
}
await close()
