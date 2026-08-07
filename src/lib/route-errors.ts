import { ZodError } from 'zod'
import { PostConflictError } from './posts-repository'
import { ContentDocumentConflictError } from './content-repository'

export function routeErrorResponse(error: unknown): Response {
	if (error instanceof Response) return error
	if (error instanceof ZodError) {
		return Response.json({ error: error.issues[0]?.message || '请求数据无效' }, { status: 400 })
	}
	if (error instanceof PostConflictError) {
		return Response.json({ error: error.message }, { status: 409 })
	}
	if (error instanceof ContentDocumentConflictError) {
		return Response.json({ error: error.message }, { status: 409 })
	}
	console.error(error)
	return Response.json({ error: '服务器处理失败' }, { status: 500 })
}
