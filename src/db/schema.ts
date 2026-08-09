import { sql } from 'drizzle-orm'
import { bigint, bigserial, check, index, jsonb, pgEnum, pgTable, primaryKey, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core'

export const postStatus = pgEnum('post_status', ['draft', 'published', 'archived'])
export const submissionType = pgEnum('submission_type', ['post'])
export const submissionStatus = pgEnum('submission_status', ['staging', 'pending', 'approved', 'rejected'])

export const posts = pgTable(
	'posts',
	{
		id: bigserial('id', { mode: 'number' }).primaryKey(),
		slug: text('slug').notNull(),
		title: text('title').notNull(),
		summary: text('summary').notNull().default(''),
		contentMd: text('content_md').notNull(),
		coverUrl: text('cover_url'),
		category: text('category'),
		status: postStatus('status').notNull().default('draft'),
		publishedAt: timestamp('published_at', { withTimezone: true, mode: 'date' }),
		createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
		updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
		version: bigint('version', { mode: 'number' }).notNull().default(1),
		deletedAt: timestamp('deleted_at', { withTimezone: true, mode: 'date' })
	},
	table => [
		uniqueIndex('posts_slug_unique').on(table.slug),
		index('posts_status_published_id_idx').on(table.status, table.publishedAt, table.id),
		index('posts_public_published_idx')
			.on(table.publishedAt.desc(), table.id.desc())
			.where(sql`${table.status} = 'published' AND ${table.deletedAt} IS NULL`),
		index('posts_category_idx').on(table.category),
		check('posts_version_positive', sql`${table.version} > 0`)
	]
)

export const postRevisions = pgTable(
	'post_revisions',
	{
		id: bigserial('id', { mode: 'number' }).primaryKey(),
		postId: bigint('post_id', { mode: 'number' })
			.notNull()
			.references(() => posts.id, { onDelete: 'cascade' }),
		version: bigint('version', { mode: 'number' }).notNull(),
		contentMd: text('content_md').notNull(),
		metadataSnapshot: jsonb('metadata_snapshot').notNull(),
		createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
		createdBy: text('created_by').notNull().default('admin')
	},
	table => [uniqueIndex('post_revisions_post_version_unique').on(table.postId, table.version), index('post_revisions_post_id_idx').on(table.postId)]
)

export const tags = pgTable('tags', {
	id: bigserial('id', { mode: 'number' }).primaryKey(),
	name: text('name').notNull().unique()
})

export const postTags = pgTable(
	'post_tags',
	{
		postId: bigint('post_id', { mode: 'number' })
			.notNull()
			.references(() => posts.id, { onDelete: 'cascade' }),
		tagId: bigint('tag_id', { mode: 'number' })
			.notNull()
			.references(() => tags.id, { onDelete: 'cascade' })
	},
	table => [primaryKey({ columns: [table.postId, table.tagId] }), index('post_tags_tag_id_idx').on(table.tagId)]
)

export const categories = pgTable('categories', {
	id: bigserial('id', { mode: 'number' }).primaryKey(),
	name: text('name').notNull().unique(),
	sortOrder: bigint('sort_order', { mode: 'number' }).notNull().default(0),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow()
})

export const adminLoginAttempts = pgTable(
	'admin_login_attempts',
	{
		keyHash: text('key_hash').primaryKey(),
		attemptCount: bigint('attempt_count', { mode: 'number' }).notNull().default(0),
		windowStartedAt: timestamp('window_started_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
		blockedUntil: timestamp('blocked_until', { withTimezone: true, mode: 'date' }),
		updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow()
	},
	table => [index('admin_login_attempts_updated_at_idx').on(table.updatedAt), check('admin_login_attempts_count_nonnegative', sql`${table.attemptCount} >= 0`)]
)

export const submissionTickets = pgTable(
	'submission_tickets',
	{
		id: bigserial('id', { mode: 'number' }).primaryKey(),
		label: text('label').notNull(),
		tokenHash: text('token_hash').notNull(),
		scope: text('scope').notNull().default('posts:submit'),
		createdBy: text('created_by').notNull().default('admin'),
		createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
		expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull(),
		usedAt: timestamp('used_at', { withTimezone: true, mode: 'date' }),
		revokedAt: timestamp('revoked_at', { withTimezone: true, mode: 'date' })
	},
	table => [
		uniqueIndex('submission_tickets_token_hash_unique').on(table.tokenHash),
		index('submission_tickets_created_at_idx').on(table.createdAt),
		index('submission_tickets_active_expires_idx')
			.on(table.expiresAt)
			.where(sql`${table.usedAt} IS NULL AND ${table.revokedAt} IS NULL`),
		check('submission_tickets_scope_valid', sql`${table.scope} = 'posts:submit'`),
		check('submission_tickets_expiry_after_creation', sql`${table.expiresAt} > ${table.createdAt}`)
	]
)

export const contentSubmissions = pgTable(
	'content_submissions',
	{
		id: text('id').primaryKey(),
		submissionTicketId: bigint('submission_ticket_id', { mode: 'number' }).references(() => submissionTickets.id, { onDelete: 'restrict' }),
		idempotencyKey: text('idempotency_key').notNull(),
		type: submissionType('type').notNull(),
		status: submissionStatus('status').notNull().default('pending'),
		contentHash: text('content_hash').notNull(),
		payload: jsonb('payload').notNull(),
		validationResult: jsonb('validation_result').notNull(),
		createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
		updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
		reviewedAt: timestamp('reviewed_at', { withTimezone: true, mode: 'date' }),
		reviewedBy: text('reviewed_by'),
		rejectionReason: text('rejection_reason')
	},
	table => [
		uniqueIndex('content_submissions_idempotency_unique').on(table.idempotencyKey),
		uniqueIndex('content_submissions_ticket_unique').on(table.submissionTicketId),
		index('content_submissions_status_created_idx').on(table.status, table.createdAt),
		index('content_submissions_ticket_created_idx').on(table.submissionTicketId, table.createdAt)
	]
)

export const auditEvents = pgTable(
	'audit_events',
	{
		id: bigserial('id', { mode: 'number' }).primaryKey(),
		actorType: text('actor_type').notNull(),
		actorId: text('actor_id').notNull(),
		action: text('action').notNull(),
		targetType: text('target_type').notNull(),
		targetId: text('target_id').notNull(),
		metadata: jsonb('metadata').notNull().default({}),
		createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow()
	},
	table => [index('audit_events_target_created_idx').on(table.targetType, table.targetId, table.createdAt)]
)

export const media = pgTable(
	'media',
	{
		id: bigserial('id', { mode: 'number' }).primaryKey(),
		blobUrl: text('blob_url').notNull(),
		pathname: text('pathname').notNull(),
		sha256: text('sha256').notNull(),
		mimeType: text('mime_type').notNull(),
		size: bigint('size', { mode: 'number' }).notNull(),
		state: text('state').notNull().default('committed'),
		pendingAt: timestamp('pending_at', { withTimezone: true, mode: 'date' }),
		committedAt: timestamp('committed_at', { withTimezone: true, mode: 'date' }).defaultNow(),
		lastSeenAt: timestamp('last_seen_at', { withTimezone: true, mode: 'date' }),
		orphanedAt: timestamp('orphaned_at', { withTimezone: true, mode: 'date' }),
		deletedAt: timestamp('deleted_at', { withTimezone: true, mode: 'date' }),
		createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow()
	},
	table => [
		uniqueIndex('media_pathname_unique').on(table.pathname),
		index('media_sha256_idx').on(table.sha256),
		index('media_state_pending_idx').on(table.state, table.pendingAt),
		check('media_size_nonnegative', sql`${table.size} >= 0`),
		check('media_state_valid', sql`${table.state} IN ('pending', 'committed', 'orphaned')`)
	]
)

export const contentDocuments = pgTable(
	'content_documents',
	{
		key: text('key').primaryKey(),
		data: jsonb('data').notNull(),
		version: bigint('version', { mode: 'number' }).notNull().default(1),
		createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
		updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow()
	},
	table => [check('content_documents_version_positive', sql`${table.version} > 0`)]
)

export const contentDocumentRevisions = pgTable(
	'content_document_revisions',
	{
		id: bigserial('id', { mode: 'number' }).primaryKey(),
		documentKey: text('document_key')
			.notNull()
			.references(() => contentDocuments.key, { onDelete: 'cascade' }),
		version: bigint('version', { mode: 'number' }).notNull(),
		data: jsonb('data').notNull(),
		createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
		createdBy: text('created_by').notNull().default('admin')
	},
	table => [
		uniqueIndex('content_document_revisions_key_version_unique').on(table.documentKey, table.version),
		index('content_document_revisions_key_idx').on(table.documentKey)
	]
)

export type PostRow = typeof posts.$inferSelect
export type NewPostRow = typeof posts.$inferInsert
