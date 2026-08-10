import 'server-only'

import { createHmac } from 'node:crypto'
import { eq } from 'drizzle-orm'
import { getDb } from '@/db/client'
import { adminLoginAttempts } from '@/db/schema'
import { evaluateLoginAttempt, type LoginAttemptState } from '@/lib/login-rate-limit-policy'
import { hasDatabaseConfiguration } from '@/lib/legacy-blog-reader'

function sessionSecret(): string {
	const secret = process.env.BLOG_SESSION_SECRET?.trim()
	if (!secret || secret.length < 32) throw new Error('BLOG_SESSION_SECRET must contain at least 32 characters')
	return secret
}

function clientAddress(request: Request): string {
	const vercelAddress = request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim()
	if (vercelAddress) return vercelAddress
	const forwardedAddress = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
	return forwardedAddress || 'unknown-client'
}

function keyForRequest(request: Request): string {
	return createHmac('sha256', sessionSecret())
		.update(`admin-login:${clientAddress(request)}`)
		.digest('hex')
}

// In-memory rate limit store for environments without a database (e.g. local dev
// with read-only Git content fallback). Keyed by the same HMAC as the DB store.
const globalForRateLimit = globalThis as typeof globalThis & { zhanmingBlogInMemoryLoginAttempts?: Map<string, LoginAttemptState> }
const inMemoryStore: Map<string, LoginAttemptState> = globalForRateLimit.zhanmingBlogInMemoryLoginAttempts || new Map()
if (process.env.NODE_ENV !== 'production' && !globalForRateLimit.zhanmingBlogInMemoryLoginAttempts) {
	globalForRateLimit.zhanmingBlogInMemoryLoginAttempts = inMemoryStore
}

export async function consumeAdminLoginAttempt(request: Request): Promise<{ allowed: boolean; retryAfterSeconds: number }> {
	const keyHash = keyForRequest(request)
	const now = new Date()

	if (!hasDatabaseConfiguration()) {
		const current = inMemoryStore.get(keyHash) ?? null
		const decision = evaluateLoginAttempt(current, now)
		inMemoryStore.set(keyHash, {
			attemptCount: decision.attemptCount,
			windowStartedAt: decision.windowStartedAt,
			blockedUntil: decision.blockedUntil
		})
		return { allowed: decision.allowed, retryAfterSeconds: decision.retryAfterSeconds }
	}

	return getDb().transaction(async tx => {
		await tx.insert(adminLoginAttempts).values({ keyHash, attemptCount: 0, windowStartedAt: now, updatedAt: now }).onConflictDoNothing()

		const [current] = await tx.select().from(adminLoginAttempts).where(eq(adminLoginAttempts.keyHash, keyHash)).for('update').limit(1)
		if (!current) throw new Error('Unable to initialize admin login rate limit')

		const decision = evaluateLoginAttempt(current, now)
		await tx
			.update(adminLoginAttempts)
			.set({
				attemptCount: decision.attemptCount,
				windowStartedAt: decision.windowStartedAt,
				blockedUntil: decision.blockedUntil,
				updatedAt: now
			})
			.where(eq(adminLoginAttempts.keyHash, keyHash))

		return { allowed: decision.allowed, retryAfterSeconds: decision.retryAfterSeconds }
	})
}

export async function clearAdminLoginAttempts(request: Request): Promise<void> {
	const keyHash = keyForRequest(request)
	if (!hasDatabaseConfiguration()) {
		inMemoryStore.delete(keyHash)
		return
	}
	await getDb().delete(adminLoginAttempts).where(eq(adminLoginAttempts.keyHash, keyHash))
}
