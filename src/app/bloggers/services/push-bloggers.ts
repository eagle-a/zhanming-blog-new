import { saveContentDocument, uploadContentImage } from '@/lib/content-client'
import type { Blogger } from '../grid-view'
import type { AvatarItem } from '../components/avatar-upload-dialog'

export type PushBloggersParams = {
	bloggers: Blogger[]
	avatarItems?: Map<string, AvatarItem>
	expectedVersion: number
}

export async function pushBloggers({ bloggers, avatarItems, expectedVersion }: PushBloggersParams) {
	const uploaded = await Promise.all(
		Array.from(avatarItems || [], async ([url, item]) => (item.type === 'file' ? ([url, await uploadContentImage('bloggers', item.file)] as const) : null))
	)
	const avatarByUrl = new Map(uploaded.filter((item): item is readonly [string, string] => item !== null))
	const updated = bloggers.map(blogger => {
		const avatar = avatarByUrl.get(blogger.url)
		return avatar ? { ...blogger, avatar } : blogger
	})
	return saveContentDocument('bloggers', updated, expectedVersion)
}
