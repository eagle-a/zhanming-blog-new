const REMOVED_PROJECT_NAMES = new Set(['juya-news-card', 'vue3-vite-express'])

export function filterVisibleProjects<T extends { name: string }>(projects: T[]): T[] {
	return projects.filter(project => !REMOVED_PROJECT_NAMES.has(project.name))
}
