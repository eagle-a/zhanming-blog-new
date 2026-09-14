import { defineConfig } from '@playwright/test'
import { tmpdir } from 'node:os'
import path from 'node:path'

const runId = process.env.PRODUCTION_QA_RUN_ID || `${Date.now()}-${process.pid}`
process.env.PRODUCTION_QA_RUN_ID = runId

export default defineConfig({
	testDir: './tests/production',
	timeout: 60_000,
	workers: 1,
	reporter: 'list',
	outputDir: path.join(tmpdir(), `blog-production-playwright-${runId}`),
	use: {
		baseURL: 'http://127.0.0.1:32026',
		viewport: { width: 1280, height: 900 },
		launchOptions: process.env.REVIEW_BROWSER_EXECUTABLE ? { executablePath: process.env.REVIEW_BROWSER_EXECUTABLE } : {},
		trace: 'retain-on-failure'
	},
	webServer: {
		command: 'node node_modules/next/dist/bin/next start -H 127.0.0.1 -p 32026',
		url: 'http://127.0.0.1:32026/admin/review',
		reuseExistingServer: false,
		env: {
			DATABASE_URL: 'legacy://read-only',
			BLOB_READ_WRITE_TOKEN: '',
			BLOG_ADMIN_PASSWORD_HASH: 'fixture-no-real-login',
			BLOG_SESSION_SECRET: 'fixture-no-real-login',
			VERCEL: '0',
			NEXT_TELEMETRY_DISABLED: '1'
		}
	}
})
