import type { Metadata } from 'next'
import { DailyClient } from './daily-client'
import { createJuyaAIFeedView, type JuyaAIFeedView } from '@/lib/juya-ai-feed'
import { fetchJuyaAIFeed } from '@/lib/juya-ai-feed-server'

export const runtime = 'nodejs'
export const revalidate = 300

async function loadFeed(): Promise<JuyaAIFeedView | null> {
	try {
		return createJuyaAIFeedView(await fetchJuyaAIFeed())
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
