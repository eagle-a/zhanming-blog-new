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

// Local wall-clock form of a publish time, without a timezone suffix. Used for
// datetime-local inputs and for messages that must match what the submitter
// typed in frontmatter (Node parses a bare "2026-09-24T21:00" as local time).
export function toLocalDateTimeInput(value: string | Date): string {
	const date = value instanceof Date ? value : new Date(value)
	if (Number.isNaN(date.getTime())) return ''
	const pad = (part: number) => String(part).padStart(2, '0')
	return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

export function fromLocalDateTimeInput(value: string): string | null {
	if (!value) return null
	const date = new Date(value)
	return Number.isNaN(date.getTime()) ? null : date.toISOString()
}

export function formatLocalDateTime(value: string | Date): string {
	return toLocalDateTimeInput(value).replace('T', ' ') || String(value)
}

// Refusing by default is the point: a future frontmatter date used to produce an
// approved post that stayed 404 until the clock caught up, which reads exactly
// like a broken publish. Scheduled publishing now has to be asked for.
export function scheduledSubmissionError(schedule: PublicationSchedule, publishedAt: string, allowScheduled: boolean): string | null {
	if (!schedule.scheduled || allowScheduled) return null
	return [
		`发布时间 ${publishedAt}（本机 ${formatLocalDateTime(publishedAt)}）还在未来，约 ${describeRemaining(schedule.remainingMs)}后才公开。`,
		'默认不接受未来时间：批准之后文章仍然是 404，看起来就像发布失败。',
		'  · 想立刻发布：把 Markdown frontmatter 的 date 删掉或改成当前时间，再投一次。',
		'  · 确实要排期：加 --schedule 再投一次，例如 pnpm agent:submit <article.md> -- --schedule'
	].join('\n')
}
