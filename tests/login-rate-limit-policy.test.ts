import assert from 'node:assert/strict'
import test from 'node:test'
import { evaluateLoginAttempt, LOGIN_RATE_LIMIT } from '../src/lib/login-rate-limit-policy.ts'

test('allows attempts inside a fresh rate-limit window', () => {
	const now = new Date('2026-08-08T00:00:00.000Z')
	const decision = evaluateLoginAttempt(null, now)

	assert.deepEqual(decision, {
		allowed: true,
		attemptCount: 1,
		windowStartedAt: now,
		blockedUntil: null,
		retryAfterSeconds: 0
	})
})

test('blocks before another password hash after the attempt budget is exhausted', () => {
	const now = new Date('2026-08-08T00:05:00.000Z')
	const decision = evaluateLoginAttempt(
		{
			attemptCount: LOGIN_RATE_LIMIT.maxAttempts,
			windowStartedAt: new Date('2026-08-08T00:00:00.000Z'),
			blockedUntil: null
		},
		now
	)

	assert.equal(decision.allowed, false)
	assert.equal(decision.attemptCount, LOGIN_RATE_LIMIT.maxAttempts)
	assert.equal(decision.blockedUntil?.toISOString(), '2026-08-08T00:35:00.000Z')
	assert.equal(decision.retryAfterSeconds, 30 * 60)
})

test('keeps an active block and resets an expired window', () => {
	const blocked = evaluateLoginAttempt(
		{
			attemptCount: LOGIN_RATE_LIMIT.maxAttempts,
			windowStartedAt: new Date('2026-08-08T00:00:00.000Z'),
			blockedUntil: new Date('2026-08-08T00:10:30.000Z')
		},
		new Date('2026-08-08T00:10:00.000Z')
	)
	assert.equal(blocked.allowed, false)
	assert.equal(blocked.retryAfterSeconds, 30)

	const resetAt = new Date('2026-08-08T00:20:00.000Z')
	const reset = evaluateLoginAttempt(
		{
			attemptCount: LOGIN_RATE_LIMIT.maxAttempts,
			windowStartedAt: new Date('2026-08-08T00:00:00.000Z'),
			blockedUntil: new Date('2026-08-08T00:10:30.000Z')
		},
		resetAt
	)
	assert.equal(reset.allowed, true)
	assert.equal(reset.attemptCount, 1)
	assert.equal(reset.windowStartedAt, resetAt)
	assert.equal(reset.blockedUntil, null)
})
