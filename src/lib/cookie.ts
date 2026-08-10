export function readCookieValue(cookieHeader: string | null, name: string): string | null {
	if (!cookieHeader) return null
	for (const item of cookieHeader.split(';')) {
		const separator = item.indexOf('=')
		if (separator < 0 || item.slice(0, separator).trim() !== name) continue
		try {
			return decodeURIComponent(item.slice(separator + 1).trim())
		} catch {
			return null
		}
	}
	return null
}
