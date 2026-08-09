export const LOGIN_RATE_LIMIT = {
	maxAttempts: 5,
	windowMs: 15 * 60 * 1000,
	blockMs: 30 * 60 * 1000
} as const

export type LoginAttemptState = {
	attemptCount: number
	windowStartedAt: Date
	blockedUntil: Date | null
}

export type LoginAttemptDecision = LoginAttemptState & {
	allowed: boolean
	retryAfterSeconds: number
}

function retryAfterSeconds(until: Date, now: Date): number {
	return Math.max(1, Math.ceil((until.getTime() - now.getTime()) / 1000))
}

export function evaluateLoginAttempt(state: LoginAttemptState | null, now: Date): LoginAttemptDecision {
	if (state?.blockedUntil && state.blockedUntil.getTime() > now.getTime()) {
		return {
			...state,
			allowed: false,
			retryAfterSeconds: retryAfterSeconds(state.blockedUntil, now)
		}
	}

	const windowExpired = !state || now.getTime() - state.windowStartedAt.getTime() >= LOGIN_RATE_LIMIT.windowMs
	if (windowExpired) {
		return {
			allowed: true,
			attemptCount: 1,
			windowStartedAt: now,
			blockedUntil: null,
			retryAfterSeconds: 0
		}
	}

	if (state.attemptCount >= LOGIN_RATE_LIMIT.maxAttempts) {
		const blockedUntil = new Date(now.getTime() + LOGIN_RATE_LIMIT.blockMs)
		return {
			allowed: false,
			attemptCount: state.attemptCount,
			windowStartedAt: state.windowStartedAt,
			blockedUntil,
			retryAfterSeconds: retryAfterSeconds(blockedUntil, now)
		}
	}

	return {
		allowed: true,
		attemptCount: state.attemptCount + 1,
		windowStartedAt: state.windowStartedAt,
		blockedUntil: null,
		retryAfterSeconds: 0
	}
}
