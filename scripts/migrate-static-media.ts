export {}

const USAGE = `Usage: pnpm media:migrate-static --slug <slug>[,<slug>...] [options]

Options:
  --slug <slug>                 Article slug to migrate; repeatable, or comma separated.
  --api-url <origin>            Site origin. Defaults to BLOG_SUBMISSION_API_URL or the production site.
  --password-stdin              Read the admin password from stdin instead of the hidden prompt.
  --apply                       Perform the migration. Without it the command only reports the plan.
  --confirm-environment=production
                                Required with --apply for a non-loopback origin.

The static images under public/images/<slug>/ are copied to Vercel Blob and the
article body is rewritten to /api/media/blog/<slug>/<sha256>.<ext>. This command
authenticates as the site administrator; it never reads Blob or database
credentials directly.
`

type Options = {
	slugs: string[]
	apiUrlArgument?: string
	apply: boolean
	passwordFromStdin: boolean
	argv: string[]
}

function parseArguments(args: string[]): Options {
	const options: Options = { slugs: [], apply: false, passwordFromStdin: false, argv: args }

	for (let index = 0; index < args.length; index += 1) {
		const argument = args[index]
		if (argument === '--apply') {
			options.apply = true
			continue
		}
		if (argument === '--password-stdin') {
			options.passwordFromStdin = true
			continue
		}
		if (argument === '--slug') {
			const value = args[index + 1]
			if (!value || value.startsWith('--')) throw new Error('--slug requires a value')
			options.slugs.push(
				...value
					.split(',')
					.map(slug => slug.trim())
					.filter(Boolean)
			)
			index += 1
			continue
		}
		if (argument === '--api-url') {
			const value = args[index + 1]
			if (!value || value.startsWith('--')) throw new Error('--api-url requires an origin')
			options.apiUrlArgument = value
			index += 1
			continue
		}
		if (argument.startsWith('--confirm-environment=')) continue
		if (argument === '--help' || argument === '-h') {
			process.stdout.write(USAGE)
			process.exit(0)
		}
		throw new Error(`Unknown option: ${argument}`)
	}

	if (options.slugs.length === 0) throw new Error('At least one --slug is required')
	for (const slug of options.slugs) {
		if (!/^[a-z0-9_-]{1,100}$/i.test(slug)) throw new Error(`Invalid slug: ${slug}`)
	}
	return options
}

function normalizeApiOrigin(value: string): URL {
	const url = new URL(value)
	const isLoopback = url.hostname === '127.0.0.1' || url.hostname === 'localhost' || url.hostname === '[::1]'
	if (url.protocol !== 'https:' && !(url.protocol === 'http:' && isLoopback)) {
		throw new Error('Site origin must use HTTPS; HTTP is allowed only for loopback development')
	}
	if (url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
		throw new Error('Site origin must not contain credentials, path, query, or fragment')
	}
	return url
}

async function readHiddenLine(label: string): Promise<string> {
	if (!process.stdin.isTTY || !process.stdout.isTTY) {
		let value = ''
		for await (const chunk of process.stdin) value += chunk.toString()
		return value.trim()
	}

	return new Promise<string>((resolve, reject) => {
		let value = ''
		const input = process.stdin
		const cleanup = () => {
			input.off('data', onData)
			input.setRawMode(false)
			input.pause()
		}
		const finish = () => {
			cleanup()
			process.stdout.write('\n')
			resolve(value.trim())
		}
		const onData = (chunk: Buffer) => {
			for (const character of chunk.toString('utf8')) {
				if (character === '\u0003') {
					cleanup()
					process.stdout.write('\n')
					reject(new Error('Cancelled'))
					return
				}
				if (character === '\r' || character === '\n') {
					finish()
					return
				}
				if (character === '\u007f' || character === '\b') value = value.slice(0, -1)
				else value += character
			}
		}

		process.stdout.write(`${label} (input hidden): `)
		input.setRawMode(true)
		input.resume()
		input.on('data', onData)
	})
}

async function readPassword(passwordFromStdin: boolean): Promise<string> {
	if (passwordFromStdin) {
		const value = await readHiddenLine('')
		return value
	}
	const value = await readHiddenLine('Admin password')
	if (!value) throw new Error('Admin password is required')
	return value
}

async function login(origin: URL, password: string): Promise<string> {
	const response = await fetch(new URL('/api/admin/session', origin), {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', Origin: origin.origin },
		body: JSON.stringify({ password }),
		signal: AbortSignal.timeout(30_000)
	})

	const body = (await response.json().catch(() => ({}))) as { error?: string }
	if (!response.ok) throw new Error(body.error || `Login failed with HTTP ${response.status}`)

	const cookie = response.headers.getSetCookie().find(value => value.startsWith('blog_admin_session='))
	if (!cookie) throw new Error('Login succeeded but no admin session cookie was returned')
	return cookie.split(';', 1)[0]
}

type MigrationPlan = {
	slug: string
	dryRun: true
	references: number
	version: number
	plan: { file: string; from: string; staticPath: string; staticStatus: number | string }[]
}

type MigrationResult = {
	slug: string
	dryRun: false
	references: number
	replaced?: number
	version?: number
	migrated: { file: string; url: string }[]
	skipped: { file: string; reason: string }[]
}

async function callMigrationEndpoint(origin: URL, cookie: string, slug: string, apply: boolean): Promise<MigrationPlan | MigrationResult> {
	const response = await fetch(new URL('/api/admin/media/migrate-static', origin), {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', Origin: origin.origin, Cookie: cookie },
		body: JSON.stringify({ slug, apply }),
		signal: AbortSignal.timeout(280_000)
	})

	const body = (await response.json().catch(() => ({}))) as { error?: string } & Record<string, unknown>
	if (!response.ok) throw new Error(body.error || `Migration failed with HTTP ${response.status}`)
	return body as unknown as MigrationPlan | MigrationResult
}

async function verifyMigratedImages(origin: URL, migrated: { file: string; url: string }[]): Promise<string[]> {
	const failures: string[] = []
	for (const item of migrated) {
		try {
			const response = await fetch(new URL(item.url, origin), { signal: AbortSignal.timeout(30_000) })
			const contentType = response.headers.get('content-type') || ''
			if (!response.ok) failures.push(`${item.file}: HTTP ${response.status}`)
			else if (!contentType.startsWith('image/')) failures.push(`${item.file}: Content-Type ${contentType}`)
		} catch (error) {
			failures.push(`${item.file}: ${error instanceof Error ? error.message : 'request failed'}`)
		}
	}
	return failures
}

async function main(): Promise<void> {
	const options = parseArguments(process.argv.slice(2))
	const origin = normalizeApiOrigin(options.apiUrlArgument || process.env.BLOG_SUBMISSION_API_URL?.trim() || 'https://zhanmingblog.cc.cd')
	const isLoopback = origin.hostname === '127.0.0.1' || origin.hostname === 'localhost' || origin.hostname === '[::1]'

	if (options.apply && !isLoopback && !options.argv.includes('--confirm-environment=production')) {
		throw new Error('Apply refused: add --confirm-environment=production after verifying the target site')
	}

	console.log(`Target: ${origin.origin}${options.apply ? ' (apply)' : ' (dry run)'}`)
	const password = await readPassword(options.passwordFromStdin)
	const cookie = await login(origin, password)

	let failures = 0

	for (const slug of options.slugs) {
		const result = await callMigrationEndpoint(origin, cookie, slug, options.apply)

		if (result.dryRun) {
			console.log(`\n[${slug}] ${result.references} 处静态图片引用，文章版本 ${result.version}`)
			for (const item of result.plan) {
				console.log(`  ${item.staticStatus === 200 ? 'ok  ' : 'MISS'} ${item.file} -> ${item.from} (HTTP ${item.staticStatus})`)
				if (item.staticStatus !== 200) failures += 1
			}
			continue
		}

		console.log(`\n[${slug}] 已迁移 ${result.migrated.length}/${result.references} 张，正文替换 ${result.replaced ?? 0} 处，新版本 ${result.version ?? '-'}`)
		for (const item of result.migrated) console.log(`  ok   ${item.file} -> ${item.url}`)
		for (const item of result.skipped) {
			failures += 1
			console.log(`  skip ${item.file}: ${item.reason}`)
		}

		const verificationFailures = await verifyMigratedImages(origin, result.migrated)
		for (const failure of verificationFailures) {
			failures += 1
			console.log(`  FAIL ${failure}`)
		}
		if (result.migrated.length > 0 && verificationFailures.length === 0) console.log('  线上校验：全部图片返回 200')
	}

	if (!options.apply) {
		console.log('\n这是预演。确认清单无误后，加上 --apply --confirm-environment=production 再次执行。')
	} else if (failures > 0) {
		console.log(`\n有 ${failures} 项需要人工处理。`)
		process.exitCode = 1
	} else {
		console.log('\n迁移完成。静态副本可以稍后删除，但必须先确认线上页面图片全部显示。')
	}
}

try {
	await main()
} catch (error) {
	console.error(error instanceof Error ? error.message : String(error))
	process.exitCode = 1
}
