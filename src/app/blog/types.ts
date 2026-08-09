export type BlogIndexItem = {
	slug: string
	title: string
	tags: string[]
	date: string
	updatedAt?: string
	summary?: string
	cover?: string
	hidden?: boolean
	category?: string
}
