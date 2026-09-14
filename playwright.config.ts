import { defineConfig } from '@playwright/test'
import { tmpdir } from 'node:os'
import path from 'node:path'

const runId = process.env.REVIEW_QA_RUN_ID || `${Date.now()}-${process.pid}`
process.env.REVIEW_QA_RUN_ID = runId

export default defineConfig({
	testDir: './tests/browser',
	timeout: 90_000,
	workers: 1,
	reporter: 'list',
	outputDir: path.join(tmpdir(), `blog-review-playwright-${runId}`),
	use: {
		browserName: 'chromium',
		viewport: { width: 1280, height: 900 },
		launchOptions: process.env.REVIEW_BROWSER_EXECUTABLE ? { executablePath: process.env.REVIEW_BROWSER_EXECUTABLE } : {},
		trace: 'retain-on-failure'
	}
})
