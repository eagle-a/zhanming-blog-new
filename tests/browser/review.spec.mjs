import { test, expect } from '@playwright/test'
import assert from 'node:assert/strict'
import { startReviewFixture } from './review-fixture.mjs'
let fixture

test.beforeAll(async () => {
	fixture = await startReviewFixture()
})
test.afterAll(async () => {
	await fixture?.close()
})

test('missing detail and ticket API failures have recoverable states', async ({ page, context }) => {
	let ticketRequests = 0
	await context.route('**/api/admin/**', async route => {
		const path = new URL(route.request().url()).pathname
		if (path === '/api/admin/review')
			return route.fulfill({
				json: {
					items: [{ id: 'gone', title: 'Removed article', slug: 'gone', status: 'pending', contentHash: 'a'.repeat(64), createdAt: '2026-09-14T00:00:00Z' }],
					nextCursor: null
				}
			})
		if (path === '/api/admin/submission-tickets') {
			ticketRequests++
			return route.fulfill({ status: 503, json: { error: 'Ticket service unavailable' } })
		}
		return route.fulfill({ status: 404, json: { error: 'Missing' } })
	})
	await page.goto(fixture.url)
	await expect(page.getByRole('alert')).toContainText('投稿不存在')
	assert.equal(ticketRequests, 0, 'review loading does not depend on the ticket service')
	await page.getByRole('button', { name: '一次性投稿码', exact: true }).click()
	await expect(page.getByText(/投稿码加载失败/)).toBeVisible()
	await page.getByRole('button', { name: '重试', exact: true }).click()
	await expect.poll(() => ticketRequests).toBeGreaterThan(1)
	await page.getByRole('button', { name: /待审批/ }).click()
	await expect(page.getByRole('button', { name: /Removed article/ })).toBeVisible()
})

test('ticket creation and revocation use an isolated modal with busy protection', async ({ page, context }) => {
	let tickets = []
	let writes = 0
	await context.route('**/api/admin/**', async route => {
		const request = route.request(),
			path = new URL(request.url()).pathname
		if (path === '/api/admin/review') return route.fulfill({ json: { items: [], nextCursor: null } })
		if (request.method() === 'POST') {
			writes++
			const ticket = {
				id: 1,
				label: 'Test ticket',
				scope: 'posts:submit',
				createdAt: new Date().toISOString(),
				expiresAt: new Date(Date.now() + 30 * 60_000).toISOString()
			}
			tickets = [ticket]
			return route.fulfill({ json: { ...ticket, token: 'fixture-not-a-real-submission-ticket' } })
		}
		if (request.method() === 'DELETE') {
			writes++
			await new Promise(resolve => setTimeout(resolve, 500))
			tickets = [{ ...tickets[0], revokedAt: new Date().toISOString() }]
			return route.fulfill({ json: { id: 1 } })
		}
		return route.fulfill({ json: tickets })
	})
	await page.goto(fixture.url)
	await page.getByRole('button', { name: '一次性投稿码', exact: true }).click()
	await page.getByRole('button', { name: '生成并复制投稿码' }).click()
	await expect(page.locator('code')).toHaveText('fixture-not-a-real-submission-ticket')
	await page.getByRole('button', { name: '撤销', exact: true }).click()
	await page.getByRole('button', { name: '确认撤销' }).click()
	await page.keyboard.press('Escape')
	await expect(page.getByRole('dialog')).toBeVisible()
	await expect(page.getByRole('button', { name: /待审批/ })).toBeDisabled()
	await expect(page.getByRole('dialog')).toHaveCount(0)
	await expect(page.locator('code')).toHaveCount(0)
	assert.equal(writes, 2)
})

test('cursor navigation preserves drafts and ignores stale detail responses', async ({ page, context }) => {
	const rows = ['a', 'b', 'c'].map(id => ({
		id,
		type: 'post',
		status: 'pending',
		contentHash: 'a'.repeat(64),
		createdAt: '2026-09-14T00:00:00Z',
		updatedAt: '2026-09-14T00:00:00Z',
		agentName: 'Fixture',
		validationResult: [],
		payload: {
			title: `Article ${id}`,
			slug: id,
			contentMd: `Body ${id}`,
			summary: '',
			tags: [],
			category: null,
			coverUrl: '',
			publishedAt: '2026-09-14T00:00:00Z'
		}
	}))
	const details = []
	await context.route('**/api/admin/**', async route => {
		const url = new URL(route.request().url())
		if (url.pathname.endsWith('/submission-tickets')) return route.fulfill({ json: [] })
		if (url.pathname === '/api/admin/review') {
			const first = !url.searchParams.has('cursor')
			const items = (first ? rows.slice(0, 2) : rows.slice(2)).map(({ payload, validationResult, ...item }) => ({
				...item,
				title: payload.title,
				slug: payload.slug
			}))
			return route.fulfill({ json: { items, nextCursor: first ? { id: 'b', createdAt: rows[1].createdAt } : null } })
		}
		const id = url.pathname.split('/').pop()
		details.push(id)
		if (id === 'a') await new Promise(resolve => setTimeout(resolve, 600))
		return route.fulfill({ json: rows.find(row => row.id === id) })
	})
	await page.goto(fixture.url)
	await page.getByRole('button', { name: /Article b/ }).click()
	await expect(page.getByLabel('标题', { exact: true })).toHaveValue('Article b')
	await page.waitForTimeout(800)
	await expect(page.getByLabel('标题', { exact: true })).toHaveValue('Article b')
	await page.getByLabel('Markdown', { exact: true }).fill('Keep this draft')
	await page.getByRole('button', { name: '下一页' }).click()
	await page.getByRole('button', { name: '继续编辑' }).click()
	await expect(page.getByLabel('Markdown', { exact: true })).toHaveValue('Keep this draft')
	await page.getByRole('button', { name: '下一页' }).click()
	await page.getByRole('button', { name: '放弃并继续' }).click()
	await expect(page.getByLabel('标题', { exact: true })).toHaveValue('Article c')
	await expect(page.getByRole('button', { name: '下一页' })).toBeDisabled()
	await page.getByRole('button', { name: '上一页' }).click()
	await expect(page.getByLabel('标题', { exact: true })).toHaveValue('Article a')
	assert.equal(details.filter(id => id === 'c').length, 1)
})
test('review preserves drafts and enforces modal and version boundaries', async ({ page, context }, testInfo) => {
	const url = fixture.url
	const errors = []
	page.on('pageerror', e => errors.push(e.message))
	page.on('console', m => {
		if (['error', 'warning'].includes(m.type())) errors.push(m.text())
	})
	const make = (id, title) => ({
		id,
		type: 'post',
		status: 'pending',
		payload: {
			title,
			slug: id,
			summary: 'Test summary',
			contentMd: '# Preview\n\nOriginal text.',
			tags: ['one'],
			category: null,
			coverUrl: '',
			publishedAt: '2026-09-14T00:00:00Z'
		},
		contentHash: 'a'.repeat(64),
		validationResult: [],
		createdAt: '2026-09-14T00:00:00Z',
		updatedAt: '2026-09-14T00:00:00Z',
		agentName: 'Fixture'
	})
	let details = 0
	let rows = [make('a', 'First submission'), make('b', 'Second submission')],
		polls = 0,
		rejects = 0
	await context.route('**/api/admin/**', async route => {
		const req = route.request(),
			path = new URL(req.url()).pathname
		if (path === '/api/admin/review') {
			polls++
			const items = rows
				.filter(x => x.status === 'pending')
				.map(({ payload, validationResult, ...rest }) => ({ ...rest, title: payload.title, slug: payload.slug }))
			return route.fulfill({ json: { items, nextCursor: null } })
		}
		if (path === '/api/admin/submission-tickets') return route.fulfill({ json: [] })
		const id = path.split('/')[4],
			row = rows.find(x => x.id === id)
		if (req.method() === 'GET') {
			details++
			return route.fulfill({ json: structuredClone(row) })
		}
		const body = req.postDataJSON()
		if (path.endsWith('/reject')) {
			rejects++
			await new Promise(r => setTimeout(r, 500))
			return route.fulfill({ status: 503, json: { error: 'Simulated rejection failure' } })
		}
		if (req.method() === 'PATCH') {
			if (body.expectedContentHash !== row.contentHash) return route.fulfill({ status: 409, json: { error: 'Version conflict' } })
			row.payload = body.payload
			row.contentHash = 'c'.repeat(64)
			return route.fulfill({ json: structuredClone(row) })
		}
		return route.fulfill({ status: 500, json: { error: 'Unexpected request' } })
	})
	await page.goto(url)
	await page.getByLabel('标题', { exact: true }).waitFor()
	assert.equal(await page.title(), 'Review QA')
	await page.getByLabel('Markdown', { exact: true }).fill('Unsaved work survives polling')
	await page.getByLabel('标签（逗号分隔）').fill('one, two, ')
	await page.getByRole('button', { name: '刷新', exact: true }).click()
	await page.waitForTimeout(16000)
	assert(polls >= 3, 'poll actually executed')
	assert.equal(details, 1, 'unchanged polls must not fetch all article bodies')
	assert.equal(await page.getByLabel('Markdown', { exact: true }).inputValue(), 'Unsaved work survives polling')
	assert.equal(await page.getByLabel('标签（逗号分隔）').inputValue(), 'one, two, ')
	await page.getByRole('button', { name: /Second submission/ }).click()
	await page.getByRole('dialog').waitFor()
	await page.getByRole('button', { name: '继续编辑' }).click()
	assert.equal(await page.getByLabel('标题', { exact: true }).inputValue(), 'First submission')
	await page.getByRole('button', { name: '保存草稿', exact: true }).click()
	await page.getByText('草稿已与服务器同步。').waitFor()
	assert.deepEqual(rows[0].payload.tags, ['one', 'two'])
	await page.getByRole('button', { name: '拒绝', exact: true }).click()
	await page.getByLabel('拒绝原因', { exact: true }).fill('Needs reliable sources')
	await page.getByRole('button', { name: '确认拒绝' }).click()
	await page.keyboard.press('Escape')
	assert.equal(await page.getByRole('dialog').count(), 1)
	assert.equal(await page.getByRole('button', { name: '取消', exact: true }).isDisabled(), true)
	await page.getByText('Simulated rejection failure').waitFor()
	assert.equal(await page.getByLabel('拒绝原因', { exact: true }).inputValue(), 'Needs reliable sources')
	await page.screenshot({ path: testInfo.outputPath('desktop.png') })
	await page.keyboard.press('Escape')
	assert.equal(await page.getByRole('dialog').count(), 0)
	assert.equal(await page.getByRole('button', { name: '拒绝', exact: true }).evaluate(e => e === document.activeElement), true)
	// Server changes while local work exists: retain draft and disable stale publication.
	await page.getByLabel('标题', { exact: true }).fill('Local title')
	rows[0] = { ...rows[0], contentHash: 'd'.repeat(64), payload: { ...rows[0].payload, title: 'Other window' } }
	await page.getByRole('button', { name: '刷新', exact: true }).click()
	await page.getByText(/投稿已被其他窗口修改或处理/).waitFor()
	assert.equal(await page.getByLabel('标题', { exact: true }).inputValue(), 'Local title')
	assert.equal(await page.getByRole('button', { name: '保存并批准发布' }).isDisabled(), true)
	await page.getByRole('button', { name: '重新加载', exact: true }).click()
	await page.getByRole('button', { name: '放弃并继续' }).click()
	await expect(page.getByLabel('标题', { exact: true })).toHaveValue('Other window')
	await page.setViewportSize({ width: 390, height: 700 })
	await page.getByRole('button', { name: '拒绝', exact: true }).click()
	const box = await page.getByRole('dialog').boundingBox()
	assert(box.x >= 0 && box.x + box.width <= 390 && box.y >= 0 && box.y + box.height <= 700)
	await page.screenshot({ path: testInfo.outputPath('mobile.png') })
	for (let i = 0; i < 8; i++) {
		await page.keyboard.press('Tab')
		assert(await page.getByRole('dialog').evaluate(e => e.contains(document.activeElement)))
	}
	console.log(
		JSON.stringify({
			url,
			polls,
			rejects,
			checks: 'polling, tags, save, switch warning, busy modal, retry draft, focus restore, conflict, mobile, focus containment',
			errors
		})
	)
	// The deliberately simulated HTTP 503 is expected; other console failures are not.
	assert.equal(errors.filter(e => !e.includes('503')).length, 0)
})
