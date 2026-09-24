// A submission may carry a publish time in the future. Approval writes the post
// with status "published" but the visibility filter in posts-repository still
// requires published_at <= now(), so a future date means the article stays
// hidden (404 on its own URL) until the clock catches up. "Approved" and
// "visible" are therefore not the same thing, and both the CLI and the review
// console have to say so before someone hits the confusing 404.
export type PublicationSchedule = {
	scheduled: boolean
	remainingMs: number
}

export function publicationSchedule(publishedAt: string | Date, now: Date = new Date()): PublicationSchedule {
	const time = publishedAt instanceof Date ? publishedAt.getTime() : new Date(publishedAt).getTime()
	const remainingMs = Number.isNaN(time) ? 0 : Math.max(0, time - now.getTime())
	return { scheduled: remainingMs > 0, remainingMs }
}

// Coarse Chinese duration for countdown labels. Deliberately not Intl-based so
// the CLI and the browser render the same string.
export function describeRemaining(remainingMs: number): string {
	const minutes = Math.round(remainingMs / 60_000)
	if (minutes < 1) return '不到 1 分钟'
	if (minutes < 60) return `${minutes} 分钟`
	const hours = Math.floor(minutes / 60)
	const restMinutes = minutes % 60
	if (hours < 24) return restMinutes === 0 ? `${hours} 小时` : `${hours} 小时 ${restMinutes} 分钟`
	const days = Math.floor(hours / 24)
	const restHours = hours % 24
	return restHours === 0 ? `${days} 天` : `${days} 天 ${restHours} 小时`
}
