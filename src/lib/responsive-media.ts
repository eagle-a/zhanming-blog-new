export const RESPONSIVE_MEDIA_WIDTHS = [480, 800, 1200, 1920] as const

const responsiveMediaWidthSet = new Set<number>(RESPONSIVE_MEDIA_WIDTHS)

export function parseResponsiveMediaWidth(value: string | null): number | null {
	if (value === null || !/^\d+$/.test(value)) return null
	const width = Number(value)
	return String(width) === value && responsiveMediaWidthSet.has(width) ? width : null
}
