import { revalidatePath, revalidateTag } from 'next/cache'
import { assertAdminRequest, assertSameOrigin } from '@/lib/admin-auth'
import { upsertContentDocument } from '@/lib/content-repository'
import { contentDocumentWriteSchema, isContentDocumentKey, parseContentDocument } from '@/lib/content-validation'
import { routeErrorResponse } from '@/lib/route-errors'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const pathsByKey: Record<string, string[]> = {
	site: ['/'],
	'card-styles': ['/'],
	about: ['/about'],
	bloggers: ['/bloggers'],
	projects: ['/projects'],
	shares: ['/', '/share'],
	pictures: ['/pictures'],
	snippets: ['/snippets']
}

export async function PUT(request: Request, { params }: { params: Promise<{ key: string }> }): Promise<Response> {
	try {
		assertSameOrigin(request)
		assertAdminRequest(request)
		const { key } = await params
		if (!isContentDocumentKey(key)) return Response.json({ error: '配置不存在' }, { status: 404 })

		const body = contentDocumentWriteSchema.parse(await request.json())
		const data = parseContentDocument(key, body.data)
		const document = await upsertContentDocument(key, data, body.expectedVersion)
		revalidateTag(`content:${key}`, { expire: 0 })
		for (const path of pathsByKey[key] || []) revalidatePath(path)
		if (key === 'site') {
			revalidatePath('/', 'layout')
			revalidatePath('/rss.xml')
		}
		return Response.json(document)
	} catch (error) {
		return routeErrorResponse(error)
	}
}
