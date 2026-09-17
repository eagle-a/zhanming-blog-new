import { test, expect } from '@playwright/test'

test('mobile public shell has no continuous rendering loop', async ({ page, context }) => {
	await page.setViewportSize({ width: 390, height: 844 })
	await page.route('**/api/**', route => {
		const pathname = new URL(route.request().url()).pathname
		if (pathname === '/api/admin/session') return route.fulfill({ json: { authenticated: false } })
		if (pathname === '/api/posts') return route.fulfill({ json: [] })
		if (pathname === '/api/like') return route.fulfill({ json: { count: 0 } })
		return route.continue()
	})
	const cdp = await context.newCDPSession(page)
	await cdp.send('Performance.enable')
	await page.goto('/')
	await page.waitForTimeout(1500)
	const before = Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map(metric => [metric.name, metric.value]))
	await page.waitForTimeout(2000)
	const after = Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map(metric => [metric.name, metric.value]))
	const taskMilliseconds = (after.TaskDuration - before.TaskDuration) * 1000
	expect(taskMilliseconds).toBeLessThan(250)
})

test('responsive image optimizer serves a modern format', async ({ request }) => {
	const response = await request.get('/_next/image?url=%2Fimages%2Favatar.png&w=384&q=75', {
		headers: { accept: 'image/avif,image/webp,image/*,*/*;q=0.8' }
	})
	expect(response.status()).toBe(200)
	const contentType = response.headers()['content-type'] || ''
	expect(contentType).toMatch(/^image\/(?:avif|webp)$/)
})
