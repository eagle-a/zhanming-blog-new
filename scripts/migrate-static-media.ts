import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { mediaProxyUrl } from '../src/lib/media-url.ts'
import {
	buildMigratedPathname,
	extensionFromFileName,
	findStaticMediaReferences,
	migratedPathnameFromUrl,
	mimeTypeForExtension,
	type StaticMediaMigration,
	type StaticMediaReference
} from '../src/lib/static-media-migration.ts'

/**
 * Move an article's images from `public/images/<slug>/` to Vercel Blob.
 *
 * Everything goes through endpoints the running site already serves, so this
 * needs no deployment: log in as administrator, read the article body from its
 * latest revision, hand each local file to the server-side migration route,
 * then ask that route to rewrite the article body to the `/api/media/...` URLs.
 * The command never reads Blob or database credentials.
 *
 * The upload goes through `/api/admin/media/migrate-static` instead of the
 * client-token flow in `/api/admin/media/upload`, because the latter requires
 * `BLOB_READ_WRITE_TOKEN`, which production does not define; the migration route
 * stores images with `put()`, which uses the store id plus the runtime OIDC
 * token.
 */

const DEFAULT_ORIGIN = 'https://zhanmingblog.cc.cd'
const MAX_IMAGE_BYTES = 25 * 1024 * 1024
const RETRY_ATTEMPTS = 5
const RETRY_DELAY_MS = 2000

function delay(ms: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Campus and mobile networks drop connections to the site often enough that a
 * single transient timeout used to abort the whole migration. Retry network
 * failures and server-side 5xx/429 responses; never retry a 4xx decision.
 */
async function fetchWithRetry(url: URL, init: RequestInit, attempts = RETRY_ATTEMPTS): Promise<Response> {
	let lastError: unknown
	for (let attempt = 1; attempt <= attempts; attempt += 1) {
		try {
			const response = await fetch(url, init)
			if (response.status < 500 && response.status !== 429) return response
			lastError = new Error(`HTTP ${response.status}`)
		} catch (error) {
			lastError = error
		}
		if (attempt < attempts) await delay(RETRY_DELAY_MS * attempt)
	}
	throw lastError instanceof Error ? lastError : new Error(String(lastError))
}

const USAGE = `Usage: pnpm media:migrate-static --slug <slug>[,<slug>...] [options]

Options:
  --slug <slug>                 Article slug to migrate. Repeatable, or comma separated.
  --api-url <origin>            Site origin. Defaults to BLOG_SUBMISSION_API_URL or ${DEFAULT_ORIGIN}.
  --password-stdin              Read the admin password from stdin instead of the hidden prompt.
  --apply                       Perform the migration. Without it the command only reports the plan.
  --confirm-environment=production
                                Required with --apply for a non-loopback origin.

Without --apply the command only reads the article body and checks which local
files would be uploaded, so the plan can be reviewed before anything changes.
`

type Options = {
	slugs: string[]
	apiUrlArgument?: string
	apply: boolean
	passwordFromStdin: boolean
	argv: string[]
}

type RevisionSnapshot = {
	slug?: string
	title?: string
	summary?: string
	coverUrl?: string | null
	category?: string | null
	tags?: string[]
	status?: string
	publishedAt?: string | null
}

type RevisionDetail = {
	version: number
	contentMd: string
	metadataSnapshot: RevisionSnapshot
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
		if (argument === '--help' || argument === '-h') {
			process.stdout.write(USAGE)
			process.exit(0)
		}
		if (argument.startsWith('--confirm-environment=')) continue
		if (argument === '--slug' || argument === '--api-url') {
			const value = args[index + 1]
			if (!value || value.startsWith('--')) throw new Error(`${argument} requires a value`)
			if (argument === '--slug')
				options.slugs.push(
					...value
						.split(',')
						.map(slug => slug.trim())
						.filter(Boolean)
				)
			else options.apiUrlArgument = value
			index += 1
			continue
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

		if (label) process.stdout.write(`${label} (input hidden): `)
		input.setRawMode(true)
		input.resume()
		input.on('data', onData)
	})
}

async function readPassword(passwordFromStdin: boolean): Promise<string> {
	const value = passwordFromStdin ? await readHiddenLine('') : await readHiddenLine('Admin password')
	if (!value) throw new Error('Admin password is required')
	return value
}

async function login(origin: URL, password: string): Promise<string> {
	const response = await fetchWithRetry(new URL('/api/admin/session', origin), {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', Origin: origin.origin },
		body: JSON.stringify({ password }),
		signal: AbortSignal.timeout(30_000)
	})
	const body = (await response.json().catch(() => ({}))) as { error?: string }
	if (!response.ok) throw new Error(body.error || `登录失败（HTTP ${response.status}）`)

	const cookie = response.headers.getSetCookie().find(value => value.startsWith('blog_admin_session='))
	if (!cookie) throw new Error('登录成功但没有收到管理员会话 Cookie')
	return cookie.split(';', 1)[0]
}

async function requestJson<T>(origin: URL, pathname: string, init: { method?: string; cookie: string; body?: unknown }): Promise<T> {
	const response = await fetchWithRetry(new URL(pathname, origin), {
		method: init.method || 'GET',
		headers: {
			Cookie: init.cookie,
			Origin: origin.origin,
			...(init.body === undefined ? {} : { 'Content-Type': 'application/json' })
		},
		body: init.body === undefined ? undefined : JSON.stringify(init.body),
		signal: AbortSignal.timeout(60_000)
	})
	const text = await response.text()
	const payload = (text ? JSON.parse(text) : {}) as { error?: string }
	if (!response.ok) throw new Error(payload.error || `${pathname} 返回 HTTP ${response.status}`)
	return payload as T
}

async function latestRevision(origin: URL, cookie: string, slug: string): Promise<RevisionDetail> {
	const list = await requestJson<{ revisions: { version: number }[] }>(origin, `/api/admin/posts/${encodeURIComponent(slug)}/revisions`, { cookie })
	const versions = (list.revisions || []).map(revision => revision.version).filter(version => Number.isInteger(version))
	if (versions.length === 0) throw new Error(`${slug} 没有可读的修订版本，无法安全改写正文`)
	const version = Math.max(...versions)
	const detail = await requestJson<{ revision: RevisionDetail }>(origin, `/api/admin/posts/${encodeURIComponent(slug)}/revisions/${version}`, { cookie })
	if (!detail.revision?.contentMd) throw new Error(`${slug} 的修订 ${version} 没有正文`)
	return detail.revision
}

function dedupeReferences(references: StaticMediaReference[]): StaticMediaReference[] {
	const seen = new Map<string, StaticMediaReference>()
	for (const reference of references) if (!seen.has(reference.href)) seen.set(reference.href, reference)
	return [...seen.values()]
}

function localFilePath(slug: string, file: string): string {
	const root = path.join(process.cwd(), 'public', 'images', slug)
	const resolved = path.resolve(root, file)
	if (resolved !== root && !resolved.startsWith(`${root}${path.sep}`)) throw new Error(`图片文件名越界：${file}`)
	return resolved
}

type MigrationOutcome = {
	migrations: StaticMediaMigration[]
	skipped: { file: string; reason: string }[]
}

/** A readable blob at this pathname proves the bytes are already published. */
async function isPublished(origin: URL, pathname: string): Promise<boolean> {
	const response = await fetchWithRetry(new URL(mediaProxyUrl(pathname), origin), { signal: AbortSignal.timeout(30_000) }, 2).catch(() => null)
	return Boolean(response?.ok)
}

async function uploadImage(origin: URL, cookie: string, slug: string, file: string, bytes: Buffer, mimeType: string, sha256: string): Promise<void> {
	const pathname = buildMigratedPathname(slug, sha256, extensionFromFileName(file) || '')
	let lastError: unknown
	for (let attempt = 1; attempt <= RETRY_ATTEMPTS; attempt += 1) {
		try {
			const form = new FormData()
			form.append('slug', slug)
			form.append('file', file)
			form.append('sha256', sha256)
			form.append('bytes', new Blob([new Uint8Array(bytes)], { type: mimeType }), file)

			const response = await fetchWithRetry(new URL('/api/admin/media/migrate-static', origin), {
				method: 'POST',
				headers: { Cookie: cookie, Origin: origin.origin },
				body: form,
				signal: AbortSignal.timeout(120_000)
			})
			if (response.ok) return

			const payload = (await response.json().catch(() => ({}))) as { error?: string }
			const reason = new Error(payload.error || `HTTP ${response.status}`)
			if (response.status < 500 && response.status !== 429) throw reason
			lastError = reason
		} catch (error) {
			lastError = error
			// Both a rerun and a retry after a lost response leave readable bytes
			// behind, because the pathname is content-addressed.
			if (await isPublished(origin, pathname)) return
		}
		if (attempt < RETRY_ATTEMPTS) await delay(RETRY_DELAY_MS * attempt)
	}
	throw new Error(`上传 ${file} 失败：${lastError instanceof Error ? lastError.message : String(lastError)}`)
}

async function uploadImages(origin: URL, cookie: string, slug: string, references: StaticMediaReference[]): Promise<MigrationOutcome> {
	const migrations: StaticMediaMigration[] = []
	const skipped: { file: string; reason: string }[] = []

	for (const reference of references) {
		const extension = extensionFromFileName(reference.file)
		const mimeType = extension ? mimeTypeForExtension(extension) : null
		if (!extension || !mimeType) {
			skipped.push({ file: reference.file, reason: '不是支持的图片扩展名' })
			continue
		}

		let bytes: Buffer
		try {
			bytes = await readFile(localFilePath(slug, reference.file))
		} catch {
			skipped.push({ file: reference.file, reason: '工作区里找不到这个文件' })
			continue
		}
		if (bytes.length === 0 || bytes.length > MAX_IMAGE_BYTES) {
			skipped.push({ file: reference.file, reason: `文件大小异常：${bytes.length} 字节` })
			continue
		}

		const sha256 = createHash('sha256').update(bytes).digest('hex')
		await uploadImage(origin, cookie, slug, reference.file, bytes, mimeType, sha256)
		migrations.push({ file: reference.file, href: reference.href, target: mediaProxyUrl(buildMigratedPathname(slug, sha256, extension)) })
	}

	return { migrations, skipped }
}

async function verifyTargets(origin: URL, migrations: readonly StaticMediaMigration[]): Promise<string[]> {
	const failures: string[] = []
	for (const migration of migrations) {
		try {
			const response = await fetchWithRetry(new URL(migration.target, origin), { signal: AbortSignal.timeout(30_000) })
			const contentType = response.headers.get('content-type') || ''
			if (!response.ok) failures.push(`${migration.file}: HTTP ${response.status}`)
			else if (!contentType.startsWith('image/')) failures.push(`${migration.file}: Content-Type ${contentType}`)
		} catch (error) {
			failures.push(`${migration.file}: ${error instanceof Error ? error.message : '请求失败'}`)
		}
	}
	return failures
}

async function migrateSlug(origin: URL, cookie: string, slug: string, apply: boolean): Promise<number> {
	const revision = await latestRevision(origin, cookie, slug)
	const snapshot = revision.metadataSnapshot || {}
	const references = dedupeReferences(findStaticMediaReferences(revision.contentMd, slug))

	if (snapshot.coverUrl?.startsWith(`/images/${slug}/`)) {
		console.log(`\n[${slug}] 警告：封面仍指向静态路径 ${snapshot.coverUrl}，本命令不迁移封面，需要在后台手动换掉`)
	}

	console.log(`\n[${slug}] 修订 ${revision.version}，正文引用 ${references.length} 张静态图片`)
	if (references.length === 0) return 0

	if (!apply) {
		for (const reference of references) {
			let status = 'ok  '
			try {
				await readFile(localFilePath(slug, reference.file))
			} catch {
				status = 'MISS'
			}
			console.log(`  ${status} ${reference.file}  (${reference.href})`)
		}
		return 0
	}

	const { migrations, skipped } = await uploadImages(origin, cookie, slug, references)
	if (migrations.length === 0) {
		console.log('  没有任何图片完成上传，未改动正文')
		for (const item of skipped) console.log(`  skip ${item.file}: ${item.reason}`)
		return skipped.length
	}

	// The route rewrites the body itself so the read-modify-write stays inside
	// one transaction and a concurrently edited article is rejected by version.
	const updated = await requestJson<{ version?: number; replaced?: number; remaining?: string[] }>(origin, '/api/admin/media/migrate-static', {
		method: 'POST',
		cookie,
		body: {
			slug,
			expectedVersion: revision.version,
			replacements: migrations.map(migration => ({ href: migration.href, pathname: migratedPathnameFromUrl(migration.target) || '' }))
		}
	})

	console.log(`  已上传 ${migrations.length} 张，正文替换 ${updated.replaced ?? 0} 处，新版本 ${updated.version ?? '-'}`)
	for (const migration of migrations) console.log(`  ok   ${migration.file} -> ${migration.target}`)
	for (const item of skipped) console.log(`  skip ${item.file}: ${item.reason}`)
	if (updated.remaining?.length) {
		console.log('  正文里仍有静态引用未处理：')
		for (const href of updated.remaining) console.log(`  LEFT ${href}`)
	}

	const verificationFailures = await verifyTargets(origin, migrations)
	for (const failure of verificationFailures) console.log(`  FAIL ${failure}`)
	if (verificationFailures.length === 0) console.log('  线上校验：全部图片返回 200')
	return skipped.length + verificationFailures.length
}

async function main(): Promise<void> {
	const options = parseArguments(process.argv.slice(2))
	const origin = normalizeApiOrigin(options.apiUrlArgument || process.env.BLOG_SUBMISSION_API_URL?.trim() || DEFAULT_ORIGIN)
	const isLoopback = origin.hostname === '127.0.0.1' || origin.hostname === 'localhost' || origin.hostname === '[::1]'
	if (options.apply && !isLoopback && !options.argv.includes('--confirm-environment=production')) {
		throw new Error('Apply refused: 确认目标站点后加上 --confirm-environment=production')
	}

	console.log(`目标站点：${origin.origin}${options.apply ? '（执行迁移）' : '（预演）'}`)
	const cookie = await login(origin, await readPassword(options.passwordFromStdin))

	let failures = 0
	for (const slug of options.slugs) failures += await migrateSlug(origin, cookie, slug, options.apply)

	if (!options.apply) {
		console.log('\n这是预演，没有改动任何数据。确认无误后再加上 --apply --confirm-environment=production。')
	} else if (failures > 0) {
		console.log(`\n有 ${failures} 项需要人工处理。`)
		process.exitCode = 1
	} else {
		console.log('\n迁移完成。线上页面确认无误后，再删除 public/images/<slug>/ 静态副本。')
	}
}

try {
	await main()
} catch (error) {
	console.error(error instanceof Error ? error.message : String(error))
	process.exitCode = 1
}
