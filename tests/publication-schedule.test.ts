import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { describeRemaining, publicationSchedule } from '../src/lib/publication-schedule.ts'

const now = new Date('2026-09-24T11:40:00.000Z')

test('a publish time that has already arrived is visible as soon as it is approved', () => {
	assert.deepEqual(publicationSchedule('2026-09-24T11:39:00.000Z', now), { scheduled: false, remainingMs: 0 })
	assert.deepEqual(publicationSchedule(now, now), { scheduled: false, remainingMs: 0 })
})

test('a future publish time is scheduled, matching the visibility filter that hides it', () => {
	const schedule = publicationSchedule('2026-09-24T13:00:00.000Z', now)
	assert.equal(schedule.scheduled, true)
	assert.equal(schedule.remainingMs, 80 * 60_000)
	assert.equal(describeRemaining(schedule.remainingMs), '1 小时 20 分钟')
})

test('unparsable publish times never count as scheduled', () => {
	for (const value of ['', 'not-a-date', '2026-09-24T99:00']) {
		assert.deepEqual(publicationSchedule(value, now), { scheduled: false, remainingMs: 0 })
	}
})

test('remaining time is described in coarse Chinese units', () => {
	assert.equal(describeRemaining(0), '不到 1 分钟')
	assert.equal(describeRemaining(29_000), '不到 1 分钟')
	assert.equal(describeRemaining(60_000), '1 分钟')
	assert.equal(describeRemaining(59 * 60_000), '59 分钟')
	assert.equal(describeRemaining(60 * 60_000), '1 小时')
	assert.equal(describeRemaining(90 * 60_000), '1 小时 30 分钟')
	assert.equal(describeRemaining(24 * 60 * 60_000), '1 天')
	assert.equal(describeRemaining(50 * 60 * 60_000), '2 天 2 小时')
})

// The trap this guards: a future frontmatter date produces an approved but
// invisible post. Both entry points must keep announcing that.
test('the CLI and the review console both surface a scheduled publish time', async () => {
	const cli = await readFile(new URL('../scripts/submit-ai-post.ts', import.meta.url), 'utf8')
	const review = await readFile(new URL('../src/app/admin/review/review-client.tsx', import.meta.url), 'utf8')
	assert.match(cli, /publicationSchedule\(payload\.publishedAt\)/)
	assert.match(review, /publicationSchedule\(draft\.publishedAt\)/)
})
