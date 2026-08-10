import type { Metadata } from 'next'
import { DailyClient } from './daily-client'
import { JUYA_AI_RSS_URL, parseJuyaAIFeed, type JuyaAIFeed } from '@/lib/juya-ai-feed'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 300

async function loadFeed(): Promise<JuyaAIFeed | null> {
	try {
		const response = await fetch(JUYA_AI_RSS_URL, {
			headers: {
				Accept: 'application/rss+xml, application/xml, text/xml;q=0.9',
				'User-Agent': 'zhanming-blog-ai-daily/1.0'
			},
			signal: AbortSignal.timeout(12_000),
			next: { revalidate: 300, tags: ['ai-daily'] }
		})
		if (!response.ok) throw new Error(`Upstream RSS returned ${response.status}`)
		const xml = await response.text()
		return parseJuyaAIFeed(xml)
	} catch (error) {
		console.error('AI daily feed failed on SSR:', error)
		return null
	}
}

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'AI 日报',
		description: '同步橘鸦 AI 早报，阅读最近 10 期内容',
		alternates: { canonical: '/juya-ai-daily' },
		openGraph: { title: 'AI 日报', description: '同步橘鸦 AI 早报，阅读最近 10 期内容', url: '/juya-ai-daily' },
		twitter: { title: 'AI 日报', description: '同步橘鸦 AI 早报，阅读最近 10 期内容' }
	}
}

export default async function JuyaAIDailyPage() {
	const initialFeed = await loadFeed()
	return <DailyClient initialFeed={initialFeed} />
}
