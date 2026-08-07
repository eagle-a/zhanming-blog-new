import { saveContentDocument, uploadContentImage } from '@/lib/content-client'
import type { Blogger } from '../grid-view'
import type { AvatarItem } from '../components/avatar-upload-dialog'

export type PushBloggersParams = {
	bloggers: Blogger[]
	avatarItems?: Map<string, AvatarItem>
	expectedVersion: number
}

export async function pushBloggers({ bloggers, avatarItems, expectedVersion }: PushBloggersParams) {
	let updated = [...bloggers]
	for (const [url, item] of avatarItems || []) {
		if (item.type !== 'file') continue
		const avatar = await uploadContentImage('bloggers', item.file)
		updated = updated.map(blogger => (blogger.url === url ? { ...blogger, avatar } : blogger))
	}
	return saveContentDocument('bloggers', updated, expectedVersion)
}
