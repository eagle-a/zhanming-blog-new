import { z } from 'zod'
import { agentPostSubmissionSchema } from '@/lib/agent-submission-validation'
import { createPostSubmissionWithTicket } from '@/lib/submissions-repository'
import { routeErrorResponse } from '@/lib/route-errors'
import { readSubmissionTicketAuthorization } from '@/lib/submission-ticket'
import { assertWritableEnvironment } from '@/lib/admin-auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const idempotencyKeySchema = z
	.string()
	.trim()
	.min(8)
	.max(200)
	.regex(/^[A-Za-z0-9._:-]+$/, 'Idempotency-Key 格式无效')
const MAX_BODY_BYTES = 2_100_000

async function readLimitedBody(request: Request): Promise<Buffer> {
	if (!request.body) return Buffer.alloc(0)
	const reader = request.body.getReader()
	const chunks: Buffer[] = []
	let total = 0
	try {
		while (true) {
			const { done, value } = await reader.read()
			if (done) break
			total += value.byteLength
			if (total > MAX_BODY_BYTES) {
				await reader.cancel('request body too large')
				throw Response.json({ error: '请求体过大' }, { status: 413 })
			}
			chunks.push(Buffer.from(value))
		}
	} finally {
		reader.releaseLock()
	}
	return Buffer.concat(chunks, total)
}

export async function POST(request: Request): Promise<Response> {
	try {
		assertWritableEnvironment()
		const mediaType = request.headers.get('content-type')?.split(';', 1)[0]?.trim().toLowerCase()
		if (mediaType !== 'application/json') return Response.json({ error: 'Content-Type 必须是 application/json' }, { status: 415 })
		const contentLength = Number(request.headers.get('content-length') || '0')
		if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) return Response.json({ error: '请求体过大' }, { status: 413 })
		const ticket = readSubmissionTicketAuthorization(request)
		const idempotencyKey = idempotencyKeySchema.parse(request.headers.get('idempotency-key'))
		const rawBody = await readLimitedBody(request)
		let bodyText: string
		try {
			bodyText = new TextDecoder('utf-8', { fatal: true }).decode(rawBody)
		} catch {
			return Response.json({ error: '请求正文必须是有效 UTF-8' }, { status: 400 })
		}
		const input = agentPostSubmissionSchema.parse(JSON.parse(bodyText))
		const result = await createPostSubmissionWithTicket(ticket, input, idempotencyKey)
		return Response.json(result, { status: 202, headers: { 'Cache-Control': 'no-store' } })
	} catch (error) {
		return routeErrorResponse(error)
	}
}
