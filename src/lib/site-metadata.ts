export const DEFAULT_SITE_DESCRIPTION = 'eagle-a 的个人博客，记录自动化、嵌入式、电机控制、项目实践与学习探索。'
export const DEFAULT_ABOUT_DESCRIPTION = '孙召顺的个人简介、教育经历、专业技能、项目与竞赛经历。'

function isLegacyStudentDescription(value: string): boolean {
	return value.includes('在校大学生') || value.includes('本科在读')
}

export function resolveSiteDescription(value?: string): string {
	const description = value?.trim() || ''
	return !description || isLegacyStudentDescription(description) ? DEFAULT_SITE_DESCRIPTION : description
}

export function resolveAboutDescription(value?: string): string {
	const description = value?.trim() || ''
	return !description || isLegacyStudentDescription(description) ? DEFAULT_ABOUT_DESCRIPTION : description
}
