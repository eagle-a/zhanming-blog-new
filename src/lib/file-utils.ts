'use client'

export async function hashFileSHA256(file: File): Promise<string> {
	const buf = await file.arrayBuffer()
	const digest = await crypto.subtle.digest('SHA-256', buf)
	const bytes = new Uint8Array(digest)
	let hex = ''
	for (let i = 0; i < bytes.length; i++) {
		const h = bytes[i].toString(16).padStart(2, '0')
		hex += h
	}
	return hex
}
