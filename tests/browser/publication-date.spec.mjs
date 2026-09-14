import { test, expect } from '@playwright/test'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { createServer } from 'node:http'
import { build } from 'esbuild'
import { publicationDate } from '../../src/lib/publication-date.ts'

let server, url
const dates = ['2026-01-01T00:30:00Z', '2026-04-27T00:00:00Z', '2026-09-09T20:00:00Z']

test.beforeAll(async () => {
	const markup = renderToString(
		React.createElement(
			'div',
			null,
			dates.map(date => React.createElement('time', { key: date, dateTime: date }, publicationDate(date).format('YYYY-MM-DD')))
		)
	)
	const bundle = await build({
		stdin: {
			contents: `import React, {useEffect} from 'react'; import {hydrateRoot} from 'react-dom/client'; import {publicationDate} from './src/lib/publication-date';
			window.hydrationErrors=[];
			function Dates(){useEffect(()=>{window.hydrated=true},[]);return <div>{${JSON.stringify(dates)}.map(date=><time key={date} dateTime={date}>{publicationDate(date).format('YYYY-MM-DD')}</time>)}</div>}
			hydrateRoot(document.getElementById('root'),<Dates/>,{onRecoverableError:error=>window.hydrationErrors.push(error.message)});`,
			loader: 'tsx',
			resolveDir: process.cwd()
		},
		bundle: true,
		write: false,
		platform: 'browser',
		format: 'iife',
		define: { 'process.env.NODE_ENV': '"production"' }
	})
	server = createServer((req, res) => {
		if (req.url === '/bundle.js') {
			res.setHeader('content-type', 'application/javascript')
			res.end(bundle.outputFiles[0].text)
		} else {
			res.setHeader('content-type', 'text/html; charset=utf-8')
			res.end(`<!doctype html><title>Publication date hydration</title><div id="root">${markup}</div><script src="/bundle.js"></script>`)
		}
	})
	await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
	url = `http://127.0.0.1:${server.address().port}`
})

test.afterAll(async () => {
	await new Promise(resolve => server?.close(resolve))
})

for (const timezoneId of ['UTC', 'America/Los_Angeles', 'Asia/Shanghai']) {
	test.describe(timezoneId, () => {
		test.use({ timezoneId })
		test('hydrates server publication dates without replacing their text', async ({ page }) => {
			const errors = []
			page.on('pageerror', error => errors.push(error.message))
			await page.goto(url)
			await expect.poll(() => page.evaluate(() => window.hydrated)).toBe(true)
			await expect(page.locator('time')).toHaveText(['2026-01-01', '2026-04-27', '2026-09-09'])
			expect(await page.evaluate(() => window.hydrationErrors)).toEqual([])
			expect(errors).toEqual([])
		})
	})
}
