import { revalidatePath, revalidateTag } from 'next/cache'
import { assertAdminRequest, assertSameOrigin } from '@/lib/admin-auth'
import { upsertContentDocuments } from '@/lib/content-repository'
import { contentDocumentBatchWriteSchema, isContentDocumentKey, parseContentDocument } from '@/lib/content-validation'
import { routeErrorResponse } from '@/lib/route-errors'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function PUT(request: Request): Promise<Response> {
	try {
		assertSameOrigin(request)
		assertAdminRequest(request)
		const body = contentDocumentBatchWriteSchema.parse(await request.json())
		const unknownKey = body.items.find(item => !isContentDocumentKey(item.key))?.key
		if (unknownKey) return Response.json({ error: `未知配置: ${unknownKey}` }, { status: 400 })
		if (new Set(body.items.map(item => item.key)).size !== body.items.length) {
			return Response.json({ error: '同一配置不能在批量请求中重复' }, { status: 400 })
		}
		const items = body.items.map(item => {
			if (!isContentDocumentKey(item.key)) throw new Error('配置键验证状态不一致')
			return { key: item.key, data: parseContentDocument(item.key, item.data), expectedVersion: item.expectedVersion }
		})
		const documents = await upsertContentDocuments(items)
		for (const item of items) revalidateTag(`content:${item.key}`, { expire: 0 })
		revalidatePath('/', 'layout')
		return Response.json({ documents })
	} catch (error) {
		return routeErrorResponse(error)
	}
}
