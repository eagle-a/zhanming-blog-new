import type { Metadata } from 'next'
import { AboutClient } from './about-client'
import { readLocalAboutContent, usesLocalAboutContent } from '@/lib/about-content'
import { getCachedContentDocument, getFallbackContentDocument } from '@/lib/content-repository'
import { hasDatabaseConfiguration } from '@/lib/legacy-blog-reader'
import { renderMarkdown } from '@/lib/markdown-renderer'
import type { AboutData } from './services/push-about'
import initialData from './list.json'
import { resolveAboutDescription } from '@/lib/site-metadata'

export const dynamic = 'force-dynamic'

async function loadAbout(): Promise<{ data: AboutData; version: number }> {
	if (usesLocalAboutContent()) {
		const fallback = getFallbackContentDocument<AboutData>('about').data
		const content = await readLocalAboutContent()
		return {
			data: { ...fallback, description: resolveAboutDescription(fallback.description), content },
			version: 0
		}
	}

	if (!hasDatabaseConfiguration()) {
		const data = getFallbackContentDocument<AboutData>('about').data
		return { data: { ...data, description: resolveAboutDescription(data.description) }, version: 0 }
	}
	try {
		const doc = await getCachedContentDocument<AboutData>('about')
		return { data: { ...doc.data, description: resolveAboutDescription(doc.data.description) }, version: doc.version }
	} catch {
		const data = getFallbackContentDocument<AboutData>('about').data
		return { data: { ...data, description: resolveAboutDescription(data.description) }, version: 0 }
	}
}

export async function generateMetadata(): Promise<Metadata> {
	const { data } = await loadAbout()
	const description = resolveAboutDescription(data.description)
	return {
		title: data.title || '关于',
		description,
		alternates: { canonical: '/about' },
		openGraph: { title: data.title, description, url: '/about' },
		twitter: { title: data.title, description }
	}
}

export default async function AboutPage() {
	const { data, version } = await loadAbout()
	const { html } = await renderMarkdown(data.content || (initialData as AboutData).content)
	return <AboutClient serverHtml={html} initialAbout={data} initialVersion={version} editable={!usesLocalAboutContent()} />
}
