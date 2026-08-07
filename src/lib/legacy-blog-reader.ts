import fs from 'node:fs'
import path from 'node:path'
import legacyIndex from '@/../public/blogs/index.json'
import legacyCategories from '@/../public/blogs/categories.json'
import type { BlogIndexItem } from '@/app/blog/types'
import { assertValidSlug } from './config-validation'
import { filterPublicBlogs } from './blog-visibility'

const publicDir = path.join(process.cwd(), 'public')

export function readLegacyPosts(includeDrafts = false): BlogIndexItem[] {
	const items = legacyIndex as BlogIndexItem[]
	return includeDrafts ? items : filterPublicBlogs(items)
}

export function readLegacyCategories(): string[] {
	return Array.isArray((legacyCategories as { categories?: unknown }).categories)
		? ((legacyCategories as { categories: unknown[] }).categories.filter((value): value is string => typeof value === 'string'))
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
	return Boolean(process.env.DATABASE_URL?.trim())
}

export function allowDevelopmentLegacyFallback(): boolean {
	return process.env.NODE_ENV !== 'production' && !hasDatabaseConfiguration()
}
