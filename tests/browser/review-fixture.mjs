import { createRequire } from 'node:module'
import { readFile } from 'node:fs/promises'
import { createServer } from 'node:http'
const root = process.cwd()
const require = createRequire(root + '/package.json')
const { build } = require('esbuild')
const postcssRequire = createRequire(require.resolve('@tailwindcss/postcss'))
const postcss = postcssRequire('postcss')
const tailwind = require('@tailwindcss/postcss')
export async function startReviewFixture() {
	const cssFile = root + '/src/styles/globals.css'
	const css = await postcss([tailwind({ base: root })]).process(await readFile(cssFile, 'utf8'), { from: cssFile })
	const bundle = await build({
		stdin: {
			contents: `import React from 'react'; import {createRoot} from 'react-dom/client'; import {Toaster} from 'sonner'; import ReviewClient from './src/app/admin/review/review-client'; createRoot(document.getElementById('root')).render(<React.StrictMode><ReviewClient/><Toaster/></React.StrictMode>);`,
			resolveDir: root,
			loader: 'tsx'
		},
		bundle: true,
		write: false,
		platform: 'browser',
		format: 'iife',
		jsx: 'automatic',
		tsconfig: root + '/tsconfig.json',
		define: { 'process.env.NODE_ENV': '"development"' },
		plugins: [
			{
				name: 'fake-session-only',
				setup(b) {
					b.onResolve({ filter: /^@\/hooks\/use-admin-session$/ }, () => ({ path: 'session', namespace: 'fake' }))
					b.onLoad({ filter: /.*/, namespace: 'fake' }, () => ({
						contents: 'export function useAdminSession(){return {isAuth:true,loading:false,login:async()=>{}}}',
						loader: 'js'
					}))
				}
			}
		]
	})
	const server = createServer((req, res) => {
		if (req.url === '/bundle.js') {
			res.setHeader('content-type', 'application/javascript')
			res.end(bundle.outputFiles[0].text)
		} else if (req.url === '/styles.css') {
			res.setHeader('content-type', 'text/css')
			res.end(css.css)
		} else if (req.url?.startsWith('/api/')) {
			res.writeHead(500)
			res.end('Unmocked API request')
		} else {
			res.setHeader('content-type', 'text/html')
			res.end(
				'<!doctype html><html lang="zh-CN"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Review QA</title><link rel="stylesheet" href="/styles.css"><body><div id="root"></div><script src="/bundle.js"></script></body></html>'
			)
		}
	})
	await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
	const url = `http://127.0.0.1:${server.address().port}/admin/review`

	return { url, close: () => new Promise(resolve => server.close(resolve)) }
}
