import { saveContentDocuments, uploadContentImage } from '@/lib/content-client'
import type { SiteContent, CardStyles } from '../stores/config-store'
import type { FileItem, ArtImageUploads, SocialButtonImageUploads, BackgroundImageUploads } from '../config-dialog/site-settings'

type ArtImageConfig = SiteContent['artImages'][number]
type BackgroundImageConfig = SiteContent['backgroundImages'][number]

export async function pushSiteContent(
	siteContent: SiteContent,
	cardStyles: CardStyles,
	faviconItem?: FileItem | null,
	avatarItem?: FileItem | null,
	artImageUploads?: ArtImageUploads,
	_removedArtImages?: ArtImageConfig[],
	backgroundImageUploads?: BackgroundImageUploads,
	_removedBackgroundImages?: BackgroundImageConfig[],
	socialButtonImageUploads?: SocialButtonImageUploads,
	expectedVersions: { site: number; cardStyles: number } = { site: 0, cardStyles: 0 }
) {
	let updatedSite = structuredClone(siteContent)

	if (faviconItem?.type === 'file') updatedSite.faviconUrl = await uploadContentImage('site', faviconItem.file)
	if (avatarItem?.type === 'file') updatedSite.avatarUrl = await uploadContentImage('site', avatarItem.file)

	for (const [id, item] of Object.entries(artImageUploads || {})) {
		if (item.type !== 'file') continue
		const url = await uploadContentImage('site', item.file)
		updatedSite.artImages = updatedSite.artImages.map(image => (image.id === id ? { ...image, url } : image))
	}

	for (const [id, item] of Object.entries(backgroundImageUploads || {})) {
		if (item.type !== 'file') continue
		const url = await uploadContentImage('site', item.file)
		updatedSite.backgroundImages = updatedSite.backgroundImages.map(image => (image.id === id ? { ...image, url } : image))
	}

	for (const [id, item] of Object.entries(socialButtonImageUploads || {})) {
		if (item.type !== 'file') continue
		const value = await uploadContentImage('site', item.file)
		updatedSite.socialButtons = updatedSite.socialButtons.map(button => (button.id === id ? { ...button, value } : button))
	}

	const documents = await saveContentDocuments([
		{ key: 'site', data: updatedSite, expectedVersion: expectedVersions.site },
		{ key: 'card-styles', data: cardStyles, expectedVersion: expectedVersions.cardStyles }
	])
	return { updatedSite, documents }
}
