import { assertAdminMutationRequest } from '@/lib/admin-auth'
import { MediaStoreError, storeAdminMedia, type StoreAdminMediaTarget } from '@/lib/media-store'
import { routeErrorResponse } from '@/lib/route-errors'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Administrator image upload. Accepts multipart/form-data with `kind`
 * (`blog` or `content`), the matching `slug`/`namespace`, `file`, `sha256`, and
 * the `bytes` part, then stores the image through the server-side Blob path.
 */
export async function POST(request: Request): Promise<Response> {
	try {
		assertAdminMutationRequest(request)
		if (!(request.headers.get('content-type') || '').includes('multipart/form-data')) {
			return Response.json({ error: '需要使用 multipart/form-data 上传' }, { status: 415 })
		}

		const form = await request.formData()
		const kind = String(form.get('kind') || '')
		const upload = form.get('bytes')
		if (kind !== 'blog' && kind !== 'content') return Response.json({ error: '上传类型无效' }, { status: 400 })
		if (!(upload instanceof Blob)) return Response.json({ error: '缺少图片内容' }, { status: 400 })

		const target: StoreAdminMediaTarget =
			kind === 'blog' ? { kind: 'blog', slug: String(form.get('slug') || '') } : { kind: 'content', namespace: String(form.get('namespace') || '') }

		const result = await storeAdminMedia(target, {
			file: String(form.get('file') || ''),
			sha256: String(form.get('sha256') || '').toLowerCase(),
			bytes: Buffer.from(await upload.arrayBuffer())
		})
		return Response.json(result)
	} catch (error) {
		if (error instanceof MediaStoreError) return Response.json({ error: error.message }, { status: 400 })
		return routeErrorResponse(error)
	}
}
