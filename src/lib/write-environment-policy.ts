type WriteEnvironment = 'development' | 'preview' | 'production'

type Environment = Record<string, string | undefined>

export type WriteEnvironmentDecision = {
	allowed: boolean
	expected: WriteEnvironment
	configured?: WriteEnvironment
	reason?: string
}

const VALID_ENVIRONMENTS = new Set<WriteEnvironment>(['development', 'preview', 'production'])

function parseEnvironment(value?: string): WriteEnvironment | undefined {
	const normalized = value?.trim().toLowerCase() as WriteEnvironment | undefined
	return normalized && VALID_ENVIRONMENTS.has(normalized) ? normalized : undefined
}

export function isLoopbackDatabase(databaseUrl?: string): boolean {
	if (!databaseUrl) return false
	try {
		const hostname = new URL(databaseUrl).hostname.toLowerCase()
		return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]'
	} catch {
		return false
	}
}

export function evaluateWriteEnvironment(environment: Environment): WriteEnvironmentDecision {
	const vercelEnvironment = parseEnvironment(environment.VERCEL_ENV)
	const configured = parseEnvironment(environment.BLOG_RESOURCE_ENV)
	const expected: WriteEnvironment = vercelEnvironment || (environment.NODE_ENV === 'production' ? 'production' : 'development')

	if (environment.BLOG_RESOURCE_ENV?.trim() && !configured) {
		return { allowed: false, expected, reason: 'BLOG_RESOURCE_ENV must be development, preview, or production' }
	}

	if (!configured) {
		if (expected === 'development' && isLoopbackDatabase(environment.DATABASE_URL)) {
			return { allowed: true, expected }
		}
		return { allowed: false, expected, reason: `BLOG_RESOURCE_ENV=${expected} is required before writes are enabled` }
	}

	if (configured !== expected) {
		return {
			allowed: false,
			expected,
			configured,
			reason: `BLOG_RESOURCE_ENV=${configured} conflicts with runtime environment ${expected}`
		}
	}

	if (expected !== 'development' && isLoopbackDatabase(environment.DATABASE_URL)) {
		return { allowed: false, expected, configured, reason: `${expected} writes cannot target a loopback database` }
	}

	return { allowed: true, expected, configured }
}
