import { ZodError } from 'zod'
import { PostConflictError } from './posts-repository'
import { ContentDocumentConflictError } from './content-repository'
import { SubmissionConflictError } from './submissions-repository'
import { SubmissionTicketConflictError } from './submission-tickets-repository'

export function routeErrorResponse(error: unknown): Response {
	if (error instanceof Response) return error
	if (error instanceof SyntaxError) {
		return Response.json({ error: '请求正文不是有效的 JSON' }, { status: 400 })
	}
	if (error instanceof ZodError) {
		return Response.json({ error: error.issues[0]?.message || '请求数据无效' }, { status: 400 })
	}
	if (error instanceof PostConflictError) {
		return Response.json({ error: error.message }, { status: 409 })
	}
	if (error instanceof ContentDocumentConflictError) {
		return Response.json({ error: error.message }, { status: 409 })
	}
	if (error instanceof SubmissionConflictError) {
		return Response.json({ error: error.message }, { status: 409 })
	}
	if (error instanceof SubmissionTicketConflictError) {
		return Response.json({ error: error.message }, { status: 409 })
	}
	console.error(error)
	return Response.json({ error: '服务器处理失败' }, { status: 500 })
}
