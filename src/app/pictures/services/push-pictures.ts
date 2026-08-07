import { saveContentDocument, uploadContentImage } from '@/lib/content-client'
import type { ImageItem } from '../../projects/components/image-upload-dialog'
import type { Picture } from '../page'

export type PushPicturesParams = {
	pictures: Picture[]
	imageItems?: Map<string, ImageItem>
	expectedVersion: number
}

export async function pushPictures({ pictures, imageItems, expectedVersion }: PushPicturesParams) {
	let updated = [...pictures]
	for (const [key, item] of imageItems || []) {
		if (item.type !== 'file') continue
		const url = await uploadContentImage('pictures', item.file)
		const [groupId, indexRaw] = key.split('::')
		const imageIndex = Number(indexRaw) || 0
		updated = updated.map(picture => {
			if (picture.id !== groupId) return picture
			const currentImages = picture.images?.length ? picture.images : picture.image ? [picture.image] : []
			return { ...picture, image: undefined, images: currentImages.map((image, index) => (index === imageIndex ? url : image)) }
		})
	}
	return saveContentDocument('pictures', updated, expectedVersion)
}
