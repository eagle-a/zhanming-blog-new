import { randomBytes, createHash } from 'node:crypto'
import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { put } from '@vercel/blob'
import { sql } from 'drizzle-orm'
import * as schema from '../src/db/schema.ts'
import { openScriptDatabase } from './lib/database.ts'

type BackupData = {
	formatVersion: number
	exportedAt: string
	tables: {
		posts: unknown[]
		postRevisions: unknown[]
		tags: unknown[]
		postTags: unknown[]
		categories: unknown[]
		contentDocuments: unknown[]
		contentDocumentRevisions: unknown[]
		media: unknown[]
		contentSubmissions: unknown[]
		auditEvents: unknown[]
		submissionTicketMetadata: unknown[]
	}
	archivedBlobs?: Array<{ pathname: string; file: string; size: number; sha256: string; etag: string; contentType: string }>
}

const backupArgument = process.argv.find(argument => argument.startsWith('--backup='))?.slice('--backup='.length)
const targetEnvironment = process.argv.find(argument => argument.startsWith('--target-environment='))?.slice('--target-environment='.length)
const confirmation = process.argv.find(argument => argument.startsWith('--confirm-environment='))?.slice('--confirm-environment='.length)
const root = path.resolve(process.cwd())
const databaseUrl = process.env.RESTORE_DATABASE_URL?.trim()
const archiveRoot = backupArgument ? path.resolve(backupArgument) : ''

if (!backupArgument) throw new Error('必须指定备份目录：--backup=<directory>')
if (!targetEnvironment || !['development', 'preview', 'restore-drill'].includes(targetEnvironment)) {
	throw new Error('--target-environment 必须是 development、preview 或 restore-drill')
}
if (confirmation !== targetEnvironment) throw new Error('--confirm-environment 必须与 --target-environment 完全一致')
if (!databaseUrl) throw new Error('RESTORE_DATABASE_URL is required; never reuse an implicit production DATABASE_URL')
if (targetEnvironment === 'production') throw new Error('恢复脚本拒绝 production 环境')

const relativeToRoot = path.relative(root, archiveRoot)
if (!relativeToRoot || (!relativeToRoot.startsWith(`..${path.sep}`) && relativeToRoot !== '..')) {
	throw new Error('备份目录必须位于项目仓库之外')
}
if (new URL(databaseUrl).hostname && !['localhost', '127.0.0.1', '[::1]'].includes(new URL(databaseUrl).hostname.toLowerCase())) {
	if (targetEnvironment !== 'restore-drill' || process.env.RESTORE_ALLOW_NON_LOOPBACK !== '1') {
		throw new Error('非 loopback 数据库只能在 restore-drill 且 RESTORE_ALLOW_NON_LOOPBACK=1 时使用')
	}
}

const manifest = JSON.parse(await readFile(path.join(archiveRoot, 'manifest.json'), 'utf8')) as {
	formatVersion: number
	dataFile: string
	sha256: string
	includesBlobArchive?: boolean
}
if (manifest.formatVersion !== 2 || manifest.dataFile !== 'cms-data.json') throw new Error('不支持的备份格式')
const body = await readFile(path.join(archiveRoot, manifest.dataFile))
const actualHash = createHash('sha256').update(body).digest('hex')
if (actualHash !== manifest.sha256) throw new Error('备份 manifest SHA-256 校验失败')
const data = JSON.parse(body.toString('utf8')) as BackupData

const { db, close } = openScriptDatabase(databaseUrl)
const tableChecks = [
	['posts', schema.posts],
	['postRevisions', schema.postRevisions],
	['tags', schema.tags],
	['postTags', schema.postTags],
	['categories', schema.categories],
	['contentDocuments', schema.contentDocuments],
	['contentDocumentRevisions', schema.contentDocumentRevisions],
	['media', schema.media],
	['contentSubmissions', schema.contentSubmissions],
	['auditEvents', schema.auditEvents],
	['submissionTickets', schema.submissionTickets]
] as const
for (const [name, table] of tableChecks) {
	const [{ count }] = await db.select({ count: sql<number>`count(*)::int` }).from(table)
	if (count > 0) throw new Error(`目标数据库表 ${name} 非空；恢复只允许写入空目标库`)
}

const asDate = (value: unknown): Date | null => (value ? new Date(String(value)) : null)
const mapDates = <T extends Record<string, unknown>>(row: T, fields: string[]): T => {
	const result = { ...row } as Record<string, unknown>
	for (const field of fields) result[field] = asDate(row[field])
	return result as T
}

await db.transaction(async tx => {
	if (data.tables.tags.length) await tx.insert(schema.tags).values(data.tables.tags as any)
	if (data.tables.categories.length)
		await tx.insert(schema.categories).values(data.tables.categories.map(row => mapDates(row as Record<string, unknown>, ['createdAt', 'updatedAt'])) as any)
	if (data.tables.posts.length)
		await tx
			.insert(schema.posts)
			.values(data.tables.posts.map(row => mapDates(row as Record<string, unknown>, ['publishedAt', 'createdAt', 'updatedAt', 'deletedAt'])) as any)
	if (data.tables.postTags.length) await tx.insert(schema.postTags).values(data.tables.postTags as any)
	if (data.tables.postRevisions.length)
		await tx.insert(schema.postRevisions).values(data.tables.postRevisions.map(row => mapDates(row as Record<string, unknown>, ['createdAt'])) as any)
	if (data.tables.contentDocuments.length)
		await tx
			.insert(schema.contentDocuments)
			.values(data.tables.contentDocuments.map(row => mapDates(row as Record<string, unknown>, ['createdAt', 'updatedAt'])) as any)
	if (data.tables.contentDocumentRevisions.length)
		await tx
			.insert(schema.contentDocumentRevisions)
			.values(data.tables.contentDocumentRevisions.map(row => mapDates(row as Record<string, unknown>, ['createdAt'])) as any)
	if (data.tables.media.length)
		await tx
			.insert(schema.media)
			.values(
				data.tables.media.map(row =>
					mapDates(row as Record<string, unknown>, ['pendingAt', 'committedAt', 'lastSeenAt', 'orphanedAt', 'deletedAt', 'createdAt'])
				) as any
			)

	const ticketIds = new Set<number>()
	for (const row of data.tables.submissionTicketMetadata as Array<Record<string, unknown>>) {
		const id = Number(row.id)
		ticketIds.add(id)
		await tx.insert(schema.submissionTickets).values({
			id,
			label: String(row.label),
			tokenHash: createHash('sha256').update(randomBytes(32)).digest('hex'),
			scope: 'posts:submit',
			createdBy: String(row.createdBy || 'restored-backup'),
			createdAt: asDate(row.createdAt) || new Date(),
			expiresAt: asDate(row.expiresAt) || new Date(),
			usedAt: asDate(row.usedAt),
			revokedAt: new Date()
		})
	}
	if (data.tables.contentSubmissions.length) {
		const submissions = data.tables.contentSubmissions.map(row => mapDates(row as Record<string, unknown>, ['createdAt', 'updatedAt', 'reviewedAt']))
		for (const row of submissions) {
			const value = row as Record<string, unknown>
			if (value.submissionTicketId && !ticketIds.has(Number(value.submissionTicketId))) throw new Error(`投稿 ${String(value.id)} 缺少关联票据元数据`)
		}
		await tx.insert(schema.contentSubmissions).values(submissions as any)
	}
	if (data.tables.auditEvents.length)
		await tx.insert(schema.auditEvents).values(data.tables.auditEvents.map(row => mapDates(row as Record<string, unknown>, ['createdAt'])) as any)

	for (const tableName of ['tags', 'categories', 'posts', 'post_revisions', 'content_document_revisions', 'media', 'audit_events', 'submission_tickets']) {
		await tx.execute(sql.raw(`select setval(pg_get_serial_sequence('${tableName}', 'id'), coalesce((select max(id) from "${tableName}"), 1), true)`))
	}
})

const archivedBlobs = data.archivedBlobs || []
if (archivedBlobs.length > 0) {
	const restoreToken = process.env.RESTORE_BLOB_READ_WRITE_TOKEN?.trim()
	if (!restoreToken) throw new Error('恢复 Blob 需要 RESTORE_BLOB_READ_WRITE_TOKEN')
	for (const archived of archivedBlobs) {
		const filePath = path.resolve(archiveRoot, archived.file)
		const relative = path.relative(archiveRoot, filePath)
		if (!relative || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) throw new Error(`归档文件路径越界: ${archived.file}`)
		const bytes = await readFile(filePath)
		if (bytes.length !== archived.size || createHash('sha256').update(bytes).digest('hex') !== archived.sha256)
			throw new Error(`Blob 归档校验失败: ${archived.pathname}`)
		await put(archived.pathname, bytes, {
			access: 'private',
			addRandomSuffix: false,
			allowOverwrite: false,
			token: restoreToken,
			contentType: archived.contentType
		})
	}
}

console.log(
	JSON.stringify(
		{
			restored: true,
			targetEnvironment,
			databaseRows: Object.fromEntries(Object.entries(data.tables).map(([name, rows]) => [name, rows.length])),
			archivedBlobs: archivedBlobs.length
		},
		null,
		2
	)
)
await close()
