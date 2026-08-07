import { sql } from 'drizzle-orm'
import { bigint, bigserial, check, index, jsonb, pgEnum, pgTable, primaryKey, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core'

export const postStatus = pgEnum('post_status', ['draft', 'published', 'archived'])

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

export const media = pgTable(
	'media',
	{
		id: bigserial('id', { mode: 'number' }).primaryKey(),
		blobUrl: text('blob_url').notNull(),
		pathname: text('pathname').notNull(),
		sha256: text('sha256').notNull(),
		mimeType: text('mime_type').notNull(),
		size: bigint('size', { mode: 'number' }).notNull(),
		createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow()
	},
	table => [
		uniqueIndex('media_pathname_unique').on(table.pathname),
		index('media_sha256_idx').on(table.sha256),
		check('media_size_nonnegative', sql`${table.size} >= 0`)
	]
)

export type PostRow = typeof posts.$inferSelect
export type NewPostRow = typeof posts.$inferInsert
