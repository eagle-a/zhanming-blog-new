import { createHash } from 'node:crypto'
import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { parseMarkdownImport } from '../src/lib/markdown-import.ts'
import { agentPostSubmissionSchema } from '../src/lib/agent-submission-validation.ts'
import { isSubmissionTicket } from '../src/lib/submission-ticket.ts'

const args = process.argv.slice(2)
let fileArgument: string | undefined
let apiUrlArgument: string | undefined
for (let index = 0; index < args.length; index += 1) {
	const argument = args[index]
	if (argument === '--api-url') {
		apiUrlArgument = args[index + 1]
		index += 1
		continue
	}
	if (argument.startsWith('--')) throw new Error(`Unknown option: ${argument}`)
	if (fileArgument) throw new Error('Only one Markdown file may be submitted at a time')
	fileArgument = argument
}

if (!fileArgument) throw new Error('Usage: pnpm agent:submit <article.md> [--api-url https://your-site.example]')
if (args.includes('--api-url') && (!apiUrlArgument || apiUrlArgument.startsWith('--'))) throw new Error('--api-url requires an origin')

function normalizeApiOrigin(value: string): string {
	const url = new URL(value)
	const isLoopback = url.hostname === '127.0.0.1' || url.hostname === 'localhost' || url.hostname === '[::1]'
	if (url.protocol !== 'https:' && !(url.protocol === 'http:' && isLoopback)) {
		throw new Error('Submission API must use HTTPS; HTTP is allowed only for loopback development')
	}
	if (url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
		throw new Error('Submission API URL must be an origin without credentials, path, query, or fragment')
	}
	return url.origin
}

async function readTicketFromTerminal(): Promise<string> {
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
					reject(new Error('Submission cancelled'))
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

		process.stdout.write('Paste the one-time submission code (input hidden): ')
		input.setRawMode(true)
		input.resume()
		input.on('data', onData)
	})
}

const apiOrigin = normalizeApiOrigin(apiUrlArgument || process.env.BLOG_SUBMISSION_API_URL?.trim() || 'https://zhanmingblog.cc.cd')
const filePath = path.resolve(fileArgument)
const fileStat = await stat(filePath)
if (!fileStat.isFile()) throw new Error('The submission path must be a Markdown file')
if (fileStat.size > 2_000_000) throw new Error('Markdown file exceeds the 2 MB submission limit')

const source = await readFile(filePath, 'utf8')
const imported = parseMarkdownImport(source, path.basename(filePath))
if (!imported.form.slug) throw new Error('Markdown must provide a safe slug in frontmatter or ASCII filename')
if (!imported.form.title) throw new Error('Markdown must provide a title in frontmatter or the first H1')

const payload = agentPostSubmissionSchema.parse({
	slug: imported.form.slug,
	title: imported.form.title,
	summary: imported.form.summary || '',
	contentMd: imported.form.md,
	coverUrl: null,
	category: imported.form.category || null,
	tags: imported.form.tags || [],
	publishedAt: new Date(imported.form.date || fileStat.mtime).toISOString(),
	source: {
		summary: `Submitted from ${path.basename(filePath)}`,
		evidenceIds: [],
		generator: 'submit-ai-post.ts'
	}
})
const body = JSON.stringify(payload)
const idempotencyKey = `post:${payload.slug}:${createHash('sha256').update(body).digest('hex').slice(0, 24)}`
const ticket = await readTicketFromTerminal()
if (!isSubmissionTicket(ticket)) throw new Error('Invalid one-time submission code')

const endpoint = new URL('/api/agent/v1/submissions/posts', apiOrigin)
const response = await fetch(endpoint, {
	method: 'POST',
	headers: {
		Authorization: `Bearer ${ticket}`,
		'Content-Type': 'application/json',
		'Idempotency-Key': idempotencyKey
	},
	body,
	signal: AbortSignal.timeout(35_000)
})
const responseBody = (await response.json().catch(() => ({}))) as { id?: string; status?: string; error?: string }
if (!response.ok) throw new Error(responseBody.error || `Submission failed with HTTP ${response.status}`)

console.log(
	JSON.stringify(
		{
			submissionId: responseBody.id,
			status: responseBody.status,
			reviewUrl: new URL('/admin/review', apiOrigin).toString()
		},
		null,
		2
	)
)
