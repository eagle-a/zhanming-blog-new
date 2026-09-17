import { test, expect } from '@playwright/test'

for (const route of ['/admin/review', '/write']) {
	test(`${route}: production CSP, login error toast and mobile layout`, async ({ page }, testInfo) => {
		const violations = [],
			errors = []
		// External font availability is not part of the CSP regression contract.
		await page.route('https://fonts.googleapis.cn/**', route => route.fulfill({ contentType: 'text/css', body: '' }))
		await page.exposeFunction('recordCspViolation', value => violations.push(value))
		await page.addInitScript(() => document.addEventListener('securitypolicyviolation', event => window.recordCspViolation(event.effectiveDirective)))
		page.on('pageerror', error => errors.push(error.message))
		page.on('console', message => {
			if (['error', 'warning'].includes(message.type()) && !message.text().includes('401')) errors.push(message.text())
		})
		// Even the login request is intercepted. No actual authentication or admin
		// endpoint is invoked; production React/Next/CSS and the login UI are real.
		await page.route('**/api/admin/**', request =>
			request.fulfill(request.request().method() === 'GET' ? { json: { authenticated: false } } : { status: 401, json: { error: 'Fixture login denied' } })
		)
		const response = await page.goto(route)
		expect(response.status()).toBe(200)
		expect(await page.title()).not.toBe('')
		const csp = response.headers()['content-security-policy']
		expect(csp).toMatch(/script-src[^;]*'nonce-/)
		expect(csp.split(';').find(part => part.trim().startsWith('style-src '))).not.toContain('unsafe-inline')
		await expect(page.getByLabel('管理员密码', { exact: true })).toBeVisible()
		await expect(page.locator('[data-minimal-shell]')).toHaveCount(1)
		await expect(page.locator('[data-public-shell], [data-static-bubble-background], canvas')).toHaveCount(0)
		await page.getByLabel('管理员密码', { exact: true }).fill('fixture-only')
		await page.getByRole('button', { name: '登录', exact: true }).click()
		const toast = page.locator('[data-sonner-toast]').filter({ hasText: 'Fixture login denied' })
		await expect(toast).toBeVisible()
		await expect(toast).toHaveCSS('position', 'absolute')
		await expect(page.locator('[data-sonner-toaster]')).toHaveCSS('position', 'fixed')
		expect(await page.locator('style').count()).toBe(0)
		await page.screenshot({ path: testInfo.outputPath('desktop.png') })
		await page.setViewportSize({ width: 390, height: 844 })
		const box = await page.getByLabel('管理员密码', { exact: true }).boundingBox()
		expect(box.x).toBeGreaterThanOrEqual(0)
		expect(box.x + box.width).toBeLessThanOrEqual(390)
		await page.screenshot({ path: testInfo.outputPath('mobile.png') })
		expect(violations).toEqual([])
		expect(errors).toEqual([])
	})
}
