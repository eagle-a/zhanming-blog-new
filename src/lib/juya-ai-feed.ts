import { XMLParser } from 'fast-xml-parser'
import { sanitizeHtml } from './sanitize-html.ts'

const JUYA_AI_HOME_URL = 'https://daily.juya.uk/'
export const JUYA_AI_RSS_URL = 'https://daily.juya.uk/rss.xml'

export type JuyaAIIssue = {
	id: string
	title: string
	link: string
	publishedAt: string
	summary: string
	contentHtml: string
}

export type JuyaAIFeed = {
	title: string
	description: string
	homeUrl: string
	rssUrl: string
	updatedAt: string
	issues: JuyaAIIssue[]
}

type UnknownRecord = Record<string, unknown>

function asRecord(value: unknown): UnknownRecord {
	return value && typeof value === 'object' && !Array.isArray(value) ? (value as UnknownRecord) : {}
}

function asArray(value: unknown): unknown[] {
	if (Array.isArray(value)) return value
	return value === undefined || value === null ? [] : [value]
}

function textValue(value: unknown): string {
	if (value === undefined || value === null) return ''
	if (typeof value === 'string' || typeof value === 'number') return String(value).trim()
	const record = asRecord(value)
	const nested = record['#text'] ?? record['#cdata']
	return nested === undefined ? '' : textValue(nested)
}

function decodeCommonEntities(value: string): string {
	return value
		.replace(/&nbsp;/gi, ' ')
		.replace(/&amp;/gi, '&')
		.replace(/&lt;/gi, '<')
		.replace(/&gt;/gi, '>')
		.replace(/&quot;/gi, '"')
		.replace(/&#39;/gi, "'")
}

function plainText(value: string): string {
	return decodeCommonEntities(sanitizeHtml(value).replace(/<[^>]+>/g, ' '))
		.replace(/\s+/g, ' ')
		.trim()
}

function safeIssueUrl(value: string): string | null {
	try {
		const url = new URL(value)
		if (url.protocol !== 'https:' || url.hostname !== 'daily.juya.uk' || !/^\/issues\/\d{4}-\d{2}-\d{2}\/?$/.test(url.pathname)) return null
		return url.toString()
	} catch {
		return null
	}
}

function publishedAt(value: string, title: string): string | null {
	const parsed = new Date(value)
	if (!Number.isNaN(parsed.getTime())) return parsed.toISOString()
	if (/^\d{4}-\d{2}-\d{2}$/.test(title)) {
		const titleDate = new Date(`${title}T00:00:00+08:00`)
		if (!Number.isNaN(titleDate.getTime())) return titleDate.toISOString()
	}
	return null
}

export function parseJuyaAIFeed(xml: string): JuyaAIFeed {
	const parser = new XMLParser({
		ignoreAttributes: false,
		attributeNamePrefix: '@_',
		cdataPropName: '#cdata',
		trimValues: true,
		parseTagValue: false,
		processEntities: true
	})
	const parsed = asRecord(parser.parse(xml))
	const channel = asRecord(asRecord(parsed.rss).channel)
	if (!Object.keys(channel).length) throw new Error('RSS channel is missing')

	const seen = new Set<string>()
	const issues: JuyaAIIssue[] = []
	for (const rawItem of asArray(channel.item).slice(0, 20)) {
		const item = asRecord(rawItem)
		const title = textValue(item.title)
		const link = safeIssueUrl(textValue(item.link))
		const date = publishedAt(textValue(item.pubDate), title)
		if (!title || !link || !date || seen.has(link)) continue

		const rawContent = textValue(item['content:encoded']) || textValue(item.description)
		const contentHtml = sanitizeHtml(rawContent).replace(/<h1\b[^>]*>[\s\S]*?<\/h1>/i, '')
		if (!contentHtml.trim()) continue

		seen.add(link)
		issues.push({
			id: link,
			title,
			link,
			publishedAt: date,
			summary: plainText(textValue(item.description)).slice(0, 360),
			contentHtml
		})
	}

	issues.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
	if (issues.length === 0) throw new Error('RSS contains no valid issues')

	const rawUpdatedAt = publishedAt(textValue(channel.lastBuildDate), issues[0].title)
	return {
		title: textValue(channel.title) || '橘鸦 AI 早报',
		description: textValue(channel.description),
		homeUrl: JUYA_AI_HOME_URL,
		rssUrl: JUYA_AI_RSS_URL,
		updatedAt: rawUpdatedAt || issues[0].publishedAt,
		issues: issues.slice(0, 10)
	}
}
