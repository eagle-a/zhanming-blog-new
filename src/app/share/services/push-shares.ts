import { saveContentDocument, uploadContentImage } from '@/lib/content-client'
import type { Share } from '../components/share-card'
import type { LogoItem } from '../components/logo-upload-dialog'

export type PushSharesParams = {
	shares: Share[]
	logoItems?: Map<string, LogoItem>
	expectedVersion: number
}

export async function pushShares({ shares, logoItems, expectedVersion }: PushSharesParams) {
	const missing = shares.filter(share => share.logo.startsWith('blob:') && !logoItems?.has(share.url))
	if (missing.length > 0) throw new Error(`图标未上传完成：${missing.map(share => share.name).join('、')}`)

	let updated = [...shares]
	for (const [url, item] of logoItems || []) {
		if (item.type !== 'file') continue
		const logo = await uploadContentImage('shares', item.file)
		updated = updated.map(share => (share.url === url ? { ...share, logo } : share))
	}
	return saveContentDocument('shares', updated, expectedVersion)
}
