const POSITIONS = [
	[12, 92],
	[34, 78],
	[58, 96],
	[79, 76],
	[94, 94],
	[51, 68]
] as const

function normalizeColors(colors: string[]): string[] {
	const values = colors.map(color => color.trim()).filter(Boolean)
	return values.length > 0 ? values : ['#35bfab', '#1fc9e7', '#eeeeee']
}

/**
 * Static equivalent of the former blurred Canvas animation.
 * Layered gradients preserve the soft colour field without animation frames,
 * high-DPI Canvas rasterization, or another full-screen blur pass.
 */
export default function BlurredBubblesBackground({ colors, regenerateKey = 0 }: { colors: string[]; regenerateKey?: number }) {
	const palette = normalizeColors(colors)
	const offset = Math.abs(regenerateKey) % POSITIONS.length
	const gradients = POSITIONS.map((_, index) => {
		const color = palette[index % palette.length]
		const [x, y] = POSITIONS[(index + offset) % POSITIONS.length]
		return `radial-gradient(circle at ${x}% ${y}%, color-mix(in srgb, ${color} 72%, transparent) 0%, color-mix(in srgb, ${color} 28%, transparent) 28%, transparent 58%)`
	})

	return (
		<div
			aria-hidden='true'
			data-static-bubble-background
			className='pointer-events-none fixed inset-0 z-0'
			style={{ backgroundImage: gradients.join(', '), backgroundColor: 'var(--color-bg)' }}
		/>
	)
}
