import { readFile } from 'node:fs/promises'
import { test, expect } from '@playwright/test'

test('mobile home defers settings data and code until the settings shortcut is used', async ({ page }, testInfo) => {
	await page.setViewportSize({ width: 390, height: 844 })
	const requests = [],
		errors = []
	page.on('pageerror', error => errors.push(error.message))
	await page.route('**/api/**', async route => {
		const pathname = new URL(route.request().url()).pathname
		requests.push(pathname)
		expect(route.request().method()).toBe('GET')
		if (pathname === '/api/admin/session') return route.fulfill({ json: { authenticated: false } })
		if (pathname === '/api/posts') return route.fulfill({ json: [] })
		if (pathname === '/api/like') return route.fulfill({ json: { count: 0 } })
		if (pathname.startsWith('/api/content/')) {
			const key = pathname.split('/').pop()
			const file = key === 'site' ? 'site-content' : 'card-styles'
			return route.fulfill({ json: { data: JSON.parse(await readFile(`src/config/${file}.json`, 'utf8')), version: 1 } })
		}
		throw new Error(`Unexpected API request ${pathname}`)
	})
	const response = await page.goto('/')
	expect(response.status()).toBe(200)
	await expect(page.getByRole('heading', { name: '最新文章' })).toBeVisible()
	await expect(page.getByText('暂无文章', { exact: true })).toBeVisible()
	expect(requests).not.toContain('/api/content/site')
	expect(requests).not.toContain('/api/content/card-styles')
	const before = await page.evaluate(() =>
		performance
			.getEntriesByType('resource')
			.filter(entry => entry.name.endsWith('.js'))
			.map(entry => entry.name)
	)
	await page.keyboard.press('Control+,')
	await expect(page.getByRole('button', { name: '色彩配置', exact: true })).toBeVisible()
	const panel = page.locator('.card').filter({ has: page.getByRole('button', { name: '色彩配置', exact: true }) })
	await expect
		.poll(async () => {
			const box = await panel.boundingBox()
			return box && box.x >= 0 && box.x + box.width <= 390 && box.y >= 0 && box.y + box.height <= 844
		})
		.toBe(true)
	await expect.poll(() => requests.includes('/api/content/site') && requests.includes('/api/content/card-styles')).toBe(true)
	const after = await page.evaluate(() =>
		performance
			.getEntriesByType('resource')
			.filter(entry => entry.name.endsWith('.js'))
			.map(entry => entry.name)
	)
	expect(after.length).toBeGreaterThan(before.length)
	await page.screenshot({ path: testInfo.outputPath('settings-mobile.png') })
	expect(errors).toEqual([])
})
