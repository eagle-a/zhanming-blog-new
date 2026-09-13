import fs from 'node:fs'
import path from 'node:path'
import legacyIndex from '@/../public/blogs/index.json'
import legacyCategories from '@/../public/blogs/categories.json'
import type { BlogIndexItem } from '@/app/blog/types'
import { assertValidSlug } from './config-validation'
import { filterPublicBlogs } from './blog-visibility'

const publicDir = path.join(process.cwd(), 'public')
const LOCAL_LEGACY_DATABASE_SENTINEL = 'legacy://read-only'

export function readLegacyPosts(includeDrafts = false): BlogIndexItem[] {
	const items = legacyIndex as BlogIndexItem[]
	return includeDrafts ? items : filterPublicBlogs(items)
}

export function readLegacyCategories(): string[] {
	return Array.isArray((legacyCategories as { categories?: unknown }).categories)
		? (legacyCategories as { categories: unknown[] }).categories.filter((value): value is string => typeof value === 'string')
		: []
}

export function readLegacyPost(slug: string): (BlogIndexItem & { contentMd: string; version: number; createdAt: string; updatedAt: string }) | null {
	const safeSlug = assertValidSlug(slug)
	const item = (legacyIndex as BlogIndexItem[]).find(entry => entry.slug === safeSlug)
	if (!item || item.hidden) return null

	const markdownPath = path.join(publicDir, 'blogs', safeSlug, 'index.md')
	try {
		const contentMd = fs.readFileSync(markdownPath, 'utf8')
		const date = item.date || new Date().toISOString()
		return { ...item, contentMd, version: 0, createdAt: date, updatedAt: date }
	} catch {
		return null
	}
}

export function hasDatabaseConfiguration(): boolean {
	const databaseUrl = process.env.DATABASE_URL?.trim()
	return Boolean(databaseUrl && databaseUrl !== LOCAL_LEGACY_DATABASE_SENTINEL)
}

export function allowDevelopmentLegacyFallback(): boolean {
	// Legacy content is an explicit local compatibility mode. Do not infer it
	// from a missing/unusual database URL: that made stale public/blogs data
	// silently win over the CMS whenever local environment variables drifted.
	return process.env.NODE_ENV !== 'production' && process.env.BLOG_CONTENT_SOURCE === 'legacy'
}
