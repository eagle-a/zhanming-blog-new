export function isSameOriginRequest(request: Request): boolean {
	const origin = request.headers.get('origin')
	if (!origin) return false

	const forwardedHost = request.headers.get('x-forwarded-host') || request.headers.get('host')
	const forwardedProto = request.headers.get('x-forwarded-proto') || new URL(request.url).protocol.replace(':', '')
	if (!forwardedHost || forwardedHost.includes(',') || forwardedProto.includes(',')) return false

	try {
		return new URL(origin).origin === new URL(`${forwardedProto}://${forwardedHost}`).origin
	} catch {
		return false
	}
}
