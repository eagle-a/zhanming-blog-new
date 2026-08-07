import { saveContentDocument } from '@/lib/content-client'

export type AboutData = { title: string; description: string; content: string }

export function pushAbout(data: AboutData, expectedVersion: number) {
	return saveContentDocument('about', data, expectedVersion)
}
