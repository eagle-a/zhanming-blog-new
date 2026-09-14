import assert from 'node:assert/strict'
import test from 'node:test'
import { execFileSync } from 'node:child_process'
import { publicationDate } from '../src/lib/publication-date.ts'

test('publication dates preserve UTC editorial dates, including date-only and offset inputs', () => {
	assert.equal(publicationDate('2026-04-27T00:00:00Z').format('YYYY-MM-DD'), '2026-04-27')
	assert.equal(publicationDate('2026-01-01').format('YYYY-MM-DD'), '2026-01-01')
	assert.equal(publicationDate('2026-01-01T00:30:00+08:00').format('YYYY-MM-DD'), '2025-12-31')
})

test('publication dates and year grouping are independent of the process timezone', () => {
	for (const timezone of ['UTC', 'America/Los_Angeles', 'Asia/Shanghai']) {
		const result = execFileSync(
			process.execPath,
			[
				'--no-warnings',
				'--experimental-strip-types',
				'--input-type=module',
				'-e',
				"import {publicationDate} from './src/lib/publication-date.ts'; console.log(publicationDate('2026-01-01T00:30:00Z').format('YYYY-MM-DD'))"
			],
			{ cwd: process.cwd(), env: { ...process.env, TZ: timezone }, encoding: 'utf8', windowsHide: true }
		)
		assert.equal(result.trim(), '2026-01-01', timezone)
	}
})
