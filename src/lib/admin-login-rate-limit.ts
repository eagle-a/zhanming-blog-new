import 'server-only'

import { createHmac } from 'node:crypto'
import { eq } from 'drizzle-orm'
import { getDb } from '@/db/client'
import { adminLoginAttempts } from '@/db/schema'
import { evaluateLoginAttempt } from '@/lib/login-rate-limit-policy'

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
	return createHmac('sha256', sessionSecret()).update(`admin-login:${clientAddress(request)}`).digest('hex')
}

export async function consumeAdminLoginAttempt(request: Request): Promise<{ allowed: boolean; retryAfterSeconds: number }> {
	const keyHash = keyForRequest(request)
	const now = new Date()
	return getDb().transaction(async tx => {
		await tx
			.insert(adminLoginAttempts)
			.values({ keyHash, attemptCount: 0, windowStartedAt: now, updatedAt: now })
			.onConflictDoNothing()

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
	await getDb().delete(adminLoginAttempts).where(eq(adminLoginAttempts.keyHash, keyForRequest(request)))
}
