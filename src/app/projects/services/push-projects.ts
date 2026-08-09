import { saveContentDocument, uploadContentImage } from '@/lib/content-client'
import type { Project } from '../components/project-card'
import type { ImageItem } from '../components/image-upload-dialog'

export type PushProjectsParams = {
	projects: Project[]
	imageItems?: Map<string, ImageItem>
	expectedVersion: number
}

export async function pushProjects({ projects, imageItems, expectedVersion }: PushProjectsParams) {
	const uploaded = await Promise.all(
		Array.from(imageItems || [], async ([url, item]) => (item.type === 'file' ? ([url, await uploadContentImage('projects', item.file)] as const) : null))
	)
	const imageByUrl = new Map(uploaded.filter((item): item is readonly [string, string] => item !== null))
	const updated = projects.map(project => {
		const image = imageByUrl.get(project.url)
		return image ? { ...project, image } : project
	})
	return saveContentDocument('projects', updated, expectedVersion)
}
