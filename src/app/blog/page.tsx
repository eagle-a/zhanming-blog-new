import type { Metadata } from 'next'
import BlogListClient from './blog-list-client'
import { allowDevelopmentLegacyFallback, readLegacyCategories, readLegacyPosts } from '@/lib/legacy-blog-reader'
import { getCachedCategories, getCachedPublishedPosts } from '@/lib/posts-repository'

export const metadata: Metadata = {
	title: '文章',
	description: '按时间与分类浏览站内文章。',
	alternates: { canonical: '/blog' },
	openGraph: { title: '文章', description: '按时间与分类浏览站内文章。', url: '/blog' }
}

export default async function BlogPage() {
	const [items, categories] = allowDevelopmentLegacyFallback()
		? [readLegacyPosts(false), readLegacyCategories()]
		: await Promise.all([getCachedPublishedPosts(), getCachedCategories()])

	return <BlogListClient initialItems={items} initialCategories={categories} />
}
