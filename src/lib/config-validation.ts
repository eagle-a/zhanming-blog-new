const SAFE_SLUG = /^[a-z0-9][a-z0-9_-]{0,99}$/i

export function validateSlug(slug: string): boolean {
	return SAFE_SLUG.test(slug.trim())
}

export function assertValidSlug(slug: string): string {
	const normalized = slug.trim()
	if (!validateSlug(normalized)) {
		throw new Error('slug 只能包含字母、数字、短横线和下划线，长度 1-100')
	}
	return normalized
}

export function resolveSiteUrl(rawUrl?: string): string {
	const value = String(rawUrl || '')
		.trim()
		.replace(/\/+$/, '')
	if (!value) {
		throw new Error('NEXT_PUBLIC_SITE_URL is required')
	}

	let parsed: URL
	try {
		parsed = new URL(value)
	} catch {
		throw new Error('NEXT_PUBLIC_SITE_URL must be an absolute URL')
	}

	if (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1' || parsed.hostname === '::1') {
		throw new Error('NEXT_PUBLIC_SITE_URL must not be localhost')
	}
	if (parsed.protocol !== 'https:') {
		throw new Error('NEXT_PUBLIC_SITE_URL must use https')
	}

	return parsed.toString().replace(/\/+$/, '')
}
