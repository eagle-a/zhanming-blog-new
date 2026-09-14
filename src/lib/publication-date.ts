import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'

dayjs.extend(utc)

// Publication dates are editorial metadata, not the viewer's local clock.
// Preserve the existing UTC server display in every browser timezone so SSR,
// hydration, grouping and article headers agree. This never changes stored data.
export function publicationDate(value: string) {
	return dayjs.utc(value)
}
