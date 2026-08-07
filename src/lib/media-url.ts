export function mediaProxyUrl(pathname: string): string {
	return `/api/media/${pathname
		.split('/')
		.filter(Boolean)
		.map(segment => encodeURIComponent(segment))
		.join('/')}`
}
