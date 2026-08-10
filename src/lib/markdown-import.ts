import { validateSlug } from './config-validation.ts'

type ImportableForm = {
	slug: string
	title: string
	md: string
	tags: string[]
	date: string
	summary: string
	hidden: boolean
	category: string
}

export type MarkdownImportResult = {
	form: Partial<ImportableForm> & Pick<ImportableForm, 'md'>
	importedFields: string[]
}

type Frontmatter = Record<string, string>

function parseFrontmatter(source: string): { attributes: Frontmatter; body: string } {
	const normalized = source.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n')
	const lines = normalized.split('\n')
	if (lines[0]?.trim() !== '---') return { attributes: {}, body: normalized }

	const end = lines.findIndex((line, index) => index > 0 && line.trim() === '---')
	if (end === -1) return { attributes: {}, body: normalized }

	const attributes: Frontmatter = {}
	for (const line of lines.slice(1, end)) {
		if (!line.trim() || line.trimStart().startsWith('#')) continue
		const match = /^([a-z][a-z0-9_-]*):\s*(.*)$/i.exec(line)
		if (match) attributes[match[1].toLowerCase()] = match[2].trim()
	}

	return {
		attributes,
		body: lines
			.slice(end + 1)
			.join('\n')
			.replace(/^\n+/, '')
	}
}

function parseString(value: string): string {
	if (value.startsWith('"') && value.endsWith('"')) {
		try {
			const parsed = JSON.parse(value)
			if (typeof parsed === 'string') return parsed
		} catch {
			throw new Error('Markdown 元信息包含无效的双引号字符串')
		}
	}
	if (value.startsWith("'") && value.endsWith("'")) return value.slice(1, -1).replace(/''/g, "'")
	return value
}

function parseTags(value: string): string[] {
	if (!value) return []
	if (value.startsWith('[')) {
		if (!value.endsWith(']')) throw new Error('Markdown 元信息中的 tags 必须是字符串数组')
		try {
			const parsed = JSON.parse(value)
			if (Array.isArray(parsed) && parsed.every(tag => typeof tag === 'string')) {
				return parsed.map(tag => tag.trim()).filter(Boolean)
			}
		} catch {
			// YAML flow sequences commonly use single-quoted strings, which are not JSON.
		}

		const inner = value.slice(1, -1).trim()
		if (!inner) return []
		const parts: string[] = []
		let current = ''
		let quote: '"' | "'" | null = null
		for (let index = 0; index < inner.length; index += 1) {
			const character = inner[index]
			if (quote) {
				current += character
				if (quote === '"' && character === '\\') {
					index += 1
					if (index < inner.length) current += inner[index]
				} else if (character === quote) {
					if (quote === "'" && inner[index + 1] === "'") {
						current += inner[index + 1]
						index += 1
					} else quote = null
				}
			} else if (character === '"' || character === "'") {
				quote = character
				current += character
			} else if (character === ',') {
				parts.push(current.trim())
				current = ''
			} else current += character
		}
		if (quote) throw new Error('Markdown 元信息中的 tags 必须是字符串数组')
		parts.push(current.trim())
		if (parts.some(part => !((part.startsWith("'") && part.endsWith("'")) || (part.startsWith('"') && part.endsWith('"'))))) {
			throw new Error('Markdown 元信息中的 tags 必须是字符串数组')
		}
		return parts
			.map(parseString)
			.map(tag => tag.trim())
			.filter(Boolean)
	}
	return value
		.split(/[,，]/)
		.map(tag => parseString(tag.trim()))
		.filter(Boolean)
}

function parseBoolean(value: string): boolean {
	if (value === 'true') return true
	if (value === 'false') return false
	throw new Error('Markdown 元信息中的 hidden 只能是 true 或 false')
}

function parseDate(value: string): string {
	const date = parseString(value)
	if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return `${date}T00:00`
	if (/^\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}/.test(date)) return date.slice(0, 16).replace(' ', 'T')
	throw new Error('Markdown 元信息中的 date 必须使用 YYYY-MM-DD 或 YYYY-MM-DDTHH:mm')
}

function inferSlug(filename: string): string | undefined {
	const basename = filename.replace(/\.md$/i, '').trim().toLowerCase()
	return validateSlug(basename) ? basename : undefined
}

export function parseMarkdownImport(source: string, filename = ''): MarkdownImportResult {
	const { attributes, body: rawBody } = parseFrontmatter(source)
	const form: MarkdownImportResult['form'] = { md: rawBody }
	const importedFields: string[] = []

	if (attributes.title !== undefined) {
		form.title = parseString(attributes.title).trim()
		importedFields.push('标题')
	}
	if (attributes.slug !== undefined) {
		const slug = parseString(attributes.slug).trim()
		if (!validateSlug(slug)) throw new Error('Markdown 元信息中的 slug 不合法')
		form.slug = slug
		importedFields.push('slug')
	} else {
		const inferredSlug = inferSlug(filename)
		if (inferredSlug) {
			form.slug = inferredSlug
			importedFields.push('slug')
		}
	}
	if (attributes.summary !== undefined) {
		form.summary = parseString(attributes.summary).trim()
		importedFields.push('摘要')
	}
	if (attributes.tags !== undefined) {
		form.tags = parseTags(attributes.tags)
		importedFields.push('标签')
	}
	if (attributes.category !== undefined) {
		form.category = parseString(attributes.category).trim()
		importedFields.push('分类')
	}
	if (attributes.date !== undefined) {
		form.date = parseDate(attributes.date)
		importedFields.push('日期')
	}
	if (attributes.hidden !== undefined) {
		form.hidden = parseBoolean(attributes.hidden)
		importedFields.push('可见性')
	}

	const heading = /^#\s+(.+?)\s*(?:\n+|$)/.exec(form.md)
	if (heading) {
		const headingTitle = heading[1].trim()
		if (!form.title) {
			form.title = headingTitle
			importedFields.push('标题')
		}
		if (form.title === headingTitle) form.md = form.md.slice(heading[0].length)
	}

	return { form, importedFields }
}
