import 'server-only'

import { createHmac, scrypt, timingSafeEqual } from 'node:crypto'
import { evaluateWriteEnvironment } from '@/lib/write-environment-policy'
import { isSameOriginRequest } from '@/lib/same-origin-policy'

export const ADMIN_SESSION_COOKIE = 'blog_admin_session'
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 12

type SessionPayload = {
	v: 1
	exp: number
}

function getSessionSecret(): string {
	const secret = process.env.BLOG_SESSION_SECRET?.trim()
	if (!secret || secret.length < 32) {
		throw new Error('BLOG_SESSION_SECRET must contain at least 32 characters')
	}
	return secret
}

function sign(value: string): string {
	return createHmac('sha256', getSessionSecret()).update(value).digest('base64url')
}

export function createAdminSessionToken(now = Date.now()): string {
	const payload: SessionPayload = { v: 1, exp: Math.floor(now / 1000) + ADMIN_SESSION_MAX_AGE }
	const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url')
	return `${encoded}.${sign(encoded)}`
}

export function verifyAdminSessionToken(token?: string | null, now = Date.now()): boolean {
	if (!token) return false
	const [encoded, signature, extra] = token.split('.')
	if (!encoded || !signature || extra) return false

	const expected = sign(encoded)
	const actualBuffer = Buffer.from(signature)
	const expectedBuffer = Buffer.from(expected)
	if (actualBuffer.length !== expectedBuffer.length || !timingSafeEqual(actualBuffer, expectedBuffer)) return false

	try {
		const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8')) as Partial<SessionPayload>
		return payload.v === 1 && typeof payload.exp === 'number' && payload.exp > Math.floor(now / 1000)
	} catch {
		return false
	}
}

function deriveScrypt(password: string, salt: Buffer, length: number, options: { N: number; r: number; p: number }): Promise<Buffer> {
	return new Promise((resolve, reject) => {
		scrypt(password, salt, length, options, (error, derivedKey) => {
			if (error) reject(error)
			else resolve(derivedKey)
		})
	})
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
	const encodedHash = process.env.BLOG_ADMIN_PASSWORD_HASH?.trim()
	if (!encodedHash) throw new Error('BLOG_ADMIN_PASSWORD_HASH is not configured')

	const [algorithm, nRaw, rRaw, pRaw, saltRaw, hashRaw, extra] = encodedHash.split('$')
	if (algorithm !== 'scrypt' || !nRaw || !rRaw || !pRaw || !saltRaw || !hashRaw || extra) {
		throw new Error('BLOG_ADMIN_PASSWORD_HASH has an invalid format')
	}

	const N = Number(nRaw)
	const r = Number(rRaw)
	const p = Number(pRaw)
	if (N !== 16384 || r !== 8 || p !== 1) throw new Error('BLOG_ADMIN_PASSWORD_HASH uses unsupported scrypt parameters')

	const expected = Buffer.from(hashRaw, 'base64url')
	const actual = await deriveScrypt(password, Buffer.from(saltRaw, 'base64url'), expected.length, { N, r, p })
	return actual.length === expected.length && timingSafeEqual(actual, expected)
}

function getCookieValue(request: Request, name: string): string | null {
	const cookies = request.headers.get('cookie')
	if (!cookies) return null
	for (const item of cookies.split(';')) {
		const separator = item.indexOf('=')
		if (separator < 0) continue
		if (item.slice(0, separator).trim() === name) return decodeURIComponent(item.slice(separator + 1).trim())
	}
	return null
}

export function isAdminRequest(request: Request): boolean {
	return verifyAdminSessionToken(getCookieValue(request, ADMIN_SESSION_COOKIE))
}

export function assertAdminRequest(request: Request): void {
	if (!isAdminRequest(request)) throw new Response('Unauthorized', { status: 401 })
}

export function assertSameOrigin(request: Request): void {
	if (!isSameOriginRequest(request)) throw new Response('Invalid or missing origin', { status: 403 })
}

export function assertWritableEnvironment(): void {
	const decision = evaluateWriteEnvironment(process.env)
	if (!decision.allowed) {
		console.error('Write environment rejected:', decision.reason)
		throw new Response('Writes are disabled for this environment', { status: 503 })
	}
}

export function assertAdminMutationRequest(request: Request): void {
	assertSameOrigin(request)
	assertAdminRequest(request)
	assertWritableEnvironment()
}
