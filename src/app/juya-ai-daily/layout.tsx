import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'AI 日报 | eagle-a',
	description: '同步橘鸦 AI 早报，在线阅读最近 10 期 AI 行业动态。',
	openGraph: {
		title: 'AI 日报 | eagle-a',
		description: '同步橘鸦 AI 早报，在线阅读最近 10 期 AI 行业动态。'
	},
	twitter: {
		title: 'AI 日报 | eagle-a',
		description: '同步橘鸦 AI 早报，在线阅读最近 10 期 AI 行业动态。'
	}
}

export default function JuyaAIDailyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return children
}
