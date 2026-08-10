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

	const [faviconUrl, avatarUrl] = await Promise.all([
		faviconItem?.type === 'file' ? uploadContentImage('site', faviconItem.file) : Promise.resolve(null),
		avatarItem?.type === 'file' ? uploadContentImage('site', avatarItem.file) : Promise.resolve(null)
	])
	if (faviconUrl) updatedSite.faviconUrl = faviconUrl
	if (avatarUrl) updatedSite.avatarUrl = avatarUrl

	const uploadEntries = (entries: Array<[string, FileItem]>) =>
		Promise.all(entries.map(async ([id, item]) => (item.type === 'file' ? ([id, await uploadContentImage('site', item.file)] as const) : null))).then(results =>
			results.filter((result): result is readonly [string, string] => result !== null)
		)

	const [artUploads, backgroundUploads, socialUploads] = await Promise.all([
		uploadEntries(Object.entries(artImageUploads || {})),
		uploadEntries(Object.entries(backgroundImageUploads || {})),
		uploadEntries(Object.entries(socialButtonImageUploads || {}))
	])

	for (const [id, url] of artUploads) updatedSite.artImages = updatedSite.artImages.map(image => (image.id === id ? { ...image, url } : image))
	for (const [id, url] of backgroundUploads)
		updatedSite.backgroundImages = updatedSite.backgroundImages.map(image => (image.id === id ? { ...image, url } : image))
	for (const [id, value] of socialUploads)
		updatedSite.socialButtons = updatedSite.socialButtons.map(button => (button.id === id ? { ...button, value } : button))

	const documents = await saveContentDocuments([
		{ key: 'site', data: updatedSite, expectedVersion: expectedVersions.site },
		{ key: 'card-styles', data: cardStyles, expectedVersion: expectedVersions.cardStyles }
	])
	return { updatedSite, documents }
}
