type Environment = Record<string, string | undefined>

const allowedDataEnvironments = new Set(['development', 'preview', 'production'])

export function assertApplyConfirmation(input: { apply: boolean; argv: string[]; environment: Environment }): void {
	if (!input.apply) return
	const target = input.environment.DATA_ENVIRONMENT?.trim().toLowerCase()
	if (!target || !allowedDataEnvironments.has(target)) {
		throw new Error('Apply refused: set DATA_ENVIRONMENT to development, preview, or production')
	}
	if (!input.argv.includes(`--confirm-environment=${target}`)) {
		throw new Error(`Apply refused: add --confirm-environment=${target} after verifying the target resources`)
	}
	const vercelEnvironment = input.environment.VERCEL_ENV?.trim().toLowerCase()
	if (vercelEnvironment && vercelEnvironment !== target) {
		throw new Error(`Apply refused: DATA_ENVIRONMENT=${target} conflicts with VERCEL_ENV=${vercelEnvironment}`)
	}
}

export function assertIsolatedCmsTestEnvironment(environment: Environment): void {
	if (environment.VERCEL_ENV?.trim().toLowerCase() === 'production') {
		throw new Error('CMS smoke tests are forbidden in the production Vercel environment')
	}
	if (!environment.CMS_TEST_DATABASE_URL?.trim()) {
		throw new Error('CMS_TEST_DATABASE_URL is required; DATABASE_URL is intentionally ignored')
	}
	if (!environment.CMS_TEST_BLOB_READ_WRITE_TOKEN?.trim()) {
		throw new Error('CMS_TEST_BLOB_READ_WRITE_TOKEN is required; BLOB_READ_WRITE_TOKEN is intentionally ignored')
	}
	if (environment.DATABASE_URL?.trim() !== environment.CMS_TEST_DATABASE_URL.trim()) {
		throw new Error('DATABASE_URL must equal CMS_TEST_DATABASE_URL while the isolated test server is running')
	}
	if (environment.BLOB_READ_WRITE_TOKEN?.trim() !== environment.CMS_TEST_BLOB_READ_WRITE_TOKEN.trim()) {
		throw new Error('BLOB_READ_WRITE_TOKEN must equal CMS_TEST_BLOB_READ_WRITE_TOKEN while the isolated test server is running')
	}
}

export function assertLocalAssetsDatabase(enabled: boolean, databaseUrl: string): void {
	if (!enabled) return
	let hostname: string
	try {
		hostname = new URL(databaseUrl).hostname.toLowerCase()
	} catch {
		throw new Error('Local-assets migration refused: DATABASE_URL is invalid')
	}
	if (hostname !== 'localhost' && hostname !== '127.0.0.1' && hostname !== '[::1]') {
		throw new Error('Local-assets migration refused: DATABASE_URL must target a loopback PostgreSQL server')
	}
}
