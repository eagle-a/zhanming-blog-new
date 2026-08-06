import type { BlogIndexItem } from '@/app/blog/types'

export function filterPublicBlogs(items: BlogIndexItem[]): BlogIndexItem[] {
	return items.filter(item => !item.hidden)
}
