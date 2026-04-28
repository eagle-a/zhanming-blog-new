import type { BlogConfig } from '@/app/blog/types'

export type { BlogConfig } from '@/app/blog/types'

export type BlogStats = {
	wordCount: number
	readingTime: number
}

export type LoadedBlog = {
	slug: string
	config: BlogConfig
	markdown: string
	cover?: string
	stats: BlogStats
}

function calculateStats(text: string): BlogStats {
	// 粗略清理 markdown 语法符号
	const cleanText = text
		.replace(/```[\s\S]*?```/g, '') // 代码块
		.replace(/`[^`]*`/g, '') // 行内代码
		.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // 链接保留文本
		.replace(/!\[([^\]]*)\]\([^)]*\)/g, '') // 图片
		.replace(/[#>*\-_!\[\]\(\)`|]/g, '') // 常见符号

	const chineseChars = (cleanText.match(/[\u4e00-\u9fa5]/g) || []).length
	const englishWords = (cleanText.match(/[a-zA-Z]+/g) || []).length
	const wordCount = chineseChars + englishWords
	const readingTime = Math.max(1, Math.ceil(wordCount / 300))

	return { wordCount, readingTime }
}

/**
 * Load blog data from public/blogs/{slug}
 * Used by both view page and edit page
 */
export async function loadBlog(slug: string): Promise<LoadedBlog> {
	if (!slug) {
		throw new Error('Slug is required')
	}

	// Load config.json
	let config: BlogConfig = {}
	const configRes = await fetch(`/blogs/${encodeURIComponent(slug)}/config.json`)
	if (configRes.ok) {
		try {
			config = await configRes.json()
		} catch {
			config = {}
		}
	}

	// Load index.md
	const mdRes = await fetch(`/blogs/${encodeURIComponent(slug)}/index.md`)
	if (!mdRes.ok) {
		throw new Error('Blog not found')
	}
	const markdown = await mdRes.text()

	const stats = calculateStats(markdown)

	return {
		slug,
		config,
		markdown,
		cover: config.cover,
		stats
	}
}
