import type { Metadata } from 'next'
import { AboutClient } from './about-client'
import { readAboutContent } from '@/lib/about-content'
import { renderMarkdown } from '@/lib/markdown-renderer'

export async function generateMetadata(): Promise<Metadata> {
	const { title, description } = await readAboutContent()
	return {
		title,
		description,
		alternates: { canonical: '/about' },
		openGraph: { title, description, url: '/about' },
		twitter: { title, description }
	}
}

export default async function AboutPage() {
	const { title, description, content } = await readAboutContent()
	const { html } = await renderMarkdown(content)
	return <AboutClient title={title} description={description} serverHtml={html} />
}
