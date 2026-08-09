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

	const uploaded = await Promise.all(
		Array.from(logoItems || [], async ([url, item]) => (item.type === 'file' ? ([url, await uploadContentImage('shares', item.file)] as const) : null))
	)
	const logoByUrl = new Map(uploaded.filter((item): item is readonly [string, string] => item !== null))
	const updated = shares.map(share => {
		const logo = logoByUrl.get(share.url)
		return logo ? { ...share, logo } : share
	})
	return saveContentDocument('shares', updated, expectedVersion)
}
