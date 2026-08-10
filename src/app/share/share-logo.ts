export const FALLBACK_SHARE_LOGO = '/images/avatar.png'

const LEGACY_LOGO_ALIASES: Record<string, string> = {
	'https://tinypng.com/static/images/george-anim/large_george_x2.webp': '/images/share/tinypng.png'
}

export function resolveShareLogo(logo: string): string {
	return LEGACY_LOGO_ALIASES[logo] || logo || FALLBACK_SHARE_LOGO
}
