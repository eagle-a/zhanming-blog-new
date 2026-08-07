export function mediaProxyUrl(pathname: string): string {
	return `/api/media/${pathname
		.split('/')
		.filter(Boolean)
		.map(segment => encodeURIComponent(segment))
		.join('/')}`
}

export function isAllowedMediaPathname(pathname: string): boolean {
	return /^(?:blog\/[a-z0-9_-]{1,100}|content\/(?:site|bloggers|projects|shares|pictures|migrated))\/[a-f0-9]{64}\.[a-z0-9]{1,10}$/i.test(pathname)
}
