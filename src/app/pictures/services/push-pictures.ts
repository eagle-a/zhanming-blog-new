import { saveContentDocument, uploadContentImage } from '@/lib/content-client'
import type { ImageItem } from '../../projects/components/image-upload-dialog'
import type { Picture } from '../page'

export type PushPicturesParams = {
	pictures: Picture[]
	imageItems?: Map<string, ImageItem>
	expectedVersion: number
}

export async function pushPictures({ pictures, imageItems, expectedVersion }: PushPicturesParams) {
	const uploaded = await Promise.all(
		Array.from(imageItems || [], async ([key, item]) => (item.type === 'file' ? ([key, await uploadContentImage('pictures', item.file)] as const) : null))
	)
	const uploadedByKey = new Map(uploaded.filter((item): item is readonly [string, string] => item !== null))
	const updated = pictures.map(picture => {
		const currentImages = picture.images?.length ? picture.images : picture.image ? [picture.image] : []
		const nextImages = currentImages.map((image, index) => uploadedByKey.get(`${picture.id}::${index}`) || image)
		return nextImages.some((image, index) => image !== currentImages[index]) ? { ...picture, image: undefined, images: nextImages } : picture
	})
	return saveContentDocument('pictures', updated, expectedVersion)
}
