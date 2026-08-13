import { z } from 'zod'

const metadataSchema = z
	.object({
		title: z.string().trim().min(1).max(200),
		description: z.string().trim().min(1).max(2000)
	})
	.strict()

export type AboutContent = z.infer<typeof metadataSchema> & { content: string }

function parseQuotedValue(value: string): string {
	if (value.startsWith('"') && value.endsWith('"')) {
		const parsed: unknown = JSON.parse(value)
		if (typeof parsed !== 'string') throw new Error('About frontmatter values must be strings')
		return parsed
	}
	if (value.startsWith("'") && value.endsWith("'")) return value.slice(1, -1).replace(/''/g, "'")
	return value
}

export function parseAboutContent(source: string): AboutContent {
	const normalized = source.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n')
	const match = /^---\n([\s\S]*?)\n---\n+([\s\S]*)$/.exec(normalized)
	if (!match) throw new Error('public/about/content.md must start with YAML frontmatter')

	const attributes: Record<string, string> = {}
	for (const line of match[1].split('\n')) {
		if (!line.trim() || line.trimStart().startsWith('#')) continue
		const attribute = /^([a-z][a-z0-9_-]*):\s*(.*)$/i.exec(line)
		if (!attribute) throw new Error(`Invalid About frontmatter line: ${line}`)
		attributes[attribute[1].toLowerCase()] = parseQuotedValue(attribute[2].trim())
	}

	const metadata = metadataSchema.parse(attributes)
	const content = match[2].trim()
	if (!content) throw new Error('public/about/content.md must contain Markdown content')
	return { ...metadata, content }
}
