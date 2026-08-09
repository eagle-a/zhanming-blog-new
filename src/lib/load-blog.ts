import { assertValidSlug } from '@/lib/config-validation'

type BlogConfig = {
	title?: string
	tags?: string[]
	date?: string
	summary?: string
	cover?: string
	hidden?: boolean
	category?: string
}

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
	version?: number
}

export function calculateBlogStats(text: string): BlogStats {
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
 * Load blog data from the server article API.
 */
export async function loadBlog(slug: string): Promise<LoadedBlog> {
	const safeSlug = assertValidSlug(slug)

	const response = await fetch(`/api/posts/${encodeURIComponent(safeSlug)}`, { cache: 'no-store', credentials: 'same-origin' })
	if (!response.ok) {
		throw new Error('Blog not found')
	}
	const post = (await response.json()) as {
		title: string
		tags: string[]
		date: string
		summary?: string
		cover?: string
		hidden?: boolean
		category?: string
		contentMd: string
		version?: number
	}
	const markdown = post.contentMd
	const config: BlogConfig = {
		title: post.title,
		tags: post.tags,
		date: post.date,
		summary: post.summary,
		cover: post.cover,
		hidden: post.hidden,
		category: post.category
	}

	const stats = calculateBlogStats(markdown)

	return {
		slug: safeSlug,
		config,
		markdown,
		cover: config.cover,
		stats,
		version: post.version
	}
}
