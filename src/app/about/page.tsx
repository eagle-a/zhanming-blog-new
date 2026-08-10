import type { Metadata } from 'next'
import { AboutClient } from './about-client'
import { getCachedContentDocument, getFallbackContentDocument } from '@/lib/content-repository'
import { hasDatabaseConfiguration } from '@/lib/legacy-blog-reader'
import { renderMarkdown } from '@/lib/markdown-renderer'
import type { AboutData } from './services/push-about'
import initialData from './list.json'

export const dynamic = 'force-dynamic'

async function loadAbout(): Promise<{ data: AboutData; version: number }> {
	if (!hasDatabaseConfiguration()) {
		return { data: getFallbackContentDocument<AboutData>('about').data, version: 0 }
	}
	try {
		const doc = await getCachedContentDocument<AboutData>('about')
		return { data: doc.data, version: doc.version }
	} catch {
		return { data: getFallbackContentDocument<AboutData>('about').data, version: 0 }
	}
}

export async function generateMetadata(): Promise<Metadata> {
	const { data } = await loadAbout()
	return {
		title: data.title || '关于',
		description: data.description || '',
		alternates: { canonical: '/about' },
		openGraph: { title: data.title, description: data.description, url: '/about' },
		twitter: { title: data.title, description: data.description }
	}
}

export default async function AboutPage() {
	const { data, version } = await loadAbout()
	const { html } = await renderMarkdown(data.content || (initialData as AboutData).content)
	return <AboutClient serverHtml={html} initialAbout={data} initialVersion={version} />
}
