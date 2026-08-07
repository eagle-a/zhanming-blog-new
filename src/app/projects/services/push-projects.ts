import { saveContentDocument, uploadContentImage } from '@/lib/content-client'
import type { Project } from '../components/project-card'
import type { ImageItem } from '../components/image-upload-dialog'

export type PushProjectsParams = {
	projects: Project[]
	imageItems?: Map<string, ImageItem>
	expectedVersion: number
}

export async function pushProjects({ projects, imageItems, expectedVersion }: PushProjectsParams) {
	let updated = [...projects]
	for (const [url, item] of imageItems || []) {
		if (item.type !== 'file') continue
		const image = await uploadContentImage('projects', item.file)
		updated = updated.map(project => (project.url === url ? { ...project, image } : project))
	}
	return saveContentDocument('projects', updated, expectedVersion)
}
