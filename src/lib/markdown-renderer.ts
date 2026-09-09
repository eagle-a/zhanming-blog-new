import { Marked, Renderer } from 'marked'
import type { Tokens } from 'marked'
import { sanitizeHtml } from './sanitize-html.ts'
import { RESPONSIVE_MEDIA_WIDTHS } from './responsive-media.ts'

export type TocItem = { id: string; text: string; level: number }

export interface MarkdownRenderResult {
	html: string
	toc: TocItem[]
}

export type ImageDimensionMap = Map<string, { width: number; height: number }>

// Preserve images from the first local report submission after its assets were
// promoted to public static files. New submissions should use public URLs.
const LEGACY_IMAGE_PATHS = [['assets/half-week-report-2026-09-09/', '/images/half-week-report-2026-09-09/']] as const

function normalizeImageHref(href: string): string {
	const normalized = href.trim().replace(/^\.\//, '')
	for (const [legacyPrefix, publicPrefix] of LEGACY_IMAGE_PATHS) {
		if (normalized.startsWith(legacyPrefix)) return `${publicPrefix}${normalized.slice(legacyPrefix.length)}`
	}
	return href
}

function normalizeHeadingText(value: string): string {
	return value
		.replace(/!\[[^\]]*\]\([^)]*\)/g, '')
		.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
		.replace(/[*_`~]/g, '')
		.replace(/\s+/g, ' ')
		.trim()
}

export function stripLeadingDuplicateHeading(markdown: string, title: string): string {
	const match = markdown.match(/^(?:\uFEFF)?(\s*)(#{1,6})\s+(.+?)(?:\s+#+)?\s*(?:\r?\n|$)/)
	if (!match || normalizeHeadingText(match[3]) !== normalizeHeadingText(title)) return markdown

	return markdown.slice(match[0].length).replace(/^\s*\r?\n/, '')
}

function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9\u4e00-\u9fa5\s-]/g, '')
		.trim()
		.replace(/\s+/g, '-')
}

function escapeHtmlText(value: string): string {
	return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function escapeHtmlAttribute(value: string): string {
	return escapeHtmlText(value).replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

// Lazy load shiki/katex, caching the in-flight Promise so concurrent renders
// share a single load attempt instead of racing on a boolean flag.
let shikiPromise: Promise<typeof import('shiki') | null> | null = null

function loadShiki(): Promise<typeof import('shiki') | null> {
	if (shikiPromise) return shikiPromise
	shikiPromise = (async () => {
		try {
			return await import('shiki')
		} catch (error) {
			console.warn('Failed to load shiki module:', error)
			return null
		}
	})()
	return shikiPromise
}

let katexModule: typeof import('katex') | null = null
let katexPromise: Promise<typeof import('katex') | null> | null = null

function loadKatex(): Promise<typeof import('katex') | null> {
	if (katexPromise) return katexPromise
	katexPromise = (async () => {
		try {
			// katex is published as CJS; depending on bundler/runtime the dynamic import
			// may return either the exports object directly or as `default`.
			const mod: any = await import('katex')
			katexModule = (mod?.default ?? mod) as any
			return katexModule
		} catch (error) {
			console.warn('Failed to load katex module:', error)
			return null
		}
	})()
	return katexPromise
}

export async function renderMarkdown(markdown: string, imageDimensions?: ImageDimensionMap): Promise<MarkdownRenderResult> {
	// Load optional renderers first so they apply on the FIRST lex/parse pass.
	// (If we lex before registering extensions, math tokens won't ever be produced on a cold refresh.)
	const codeBlockMap = new Map<string, { html: string; original: string }>()
	const [shiki, katex] = await Promise.all([loadShiki(), loadKatex()])
	const parser = new Marked()
	const headingCounts = new Map<string, number>()
	const uniqueHeadingId = (text: string) => {
		const base = slugify(text) || 'section'
		const count = (headingCounts.get(base) || 0) + 1
		headingCounts.set(base, count)
		return count === 1 ? base : `${base}-${count}`
	}

	// Render HTML with heading ids
	const renderer = new Renderer()

	renderer.heading = (token: Tokens.Heading) => {
		const id = (token as Tokens.Heading & { headingId?: string }).headingId || uniqueHeadingId(token.text || '')
		const semanticDepth = Math.min(6, token.depth + 1)
		return `<h${semanticDepth} id="${id}">${token.text}</h${semanticDepth}>`
	}

	renderer.code = (token: Tokens.Code) => {
		// Check if this code block was pre-processed
		const codeData = codeBlockMap.get(token.text)
		if (codeData) {
			const escapedCode = escapeHtmlAttribute(codeData.original)
			if (codeData.html) {
				const highlighted = codeData.html.replace('<pre', `<pre data-code="${escapedCode}"`)
				return `<div class="code-block-wrapper">${highlighted}</div>`
			}
			return `<div class="code-block-wrapper"><pre data-code="${escapedCode}"><code>${escapeHtmlText(codeData.original)}</code></pre></div>`
		}
		return `<pre><code>${escapeHtmlText(token.text)}</code></pre>`
	}

	renderer.listitem = (token: Tokens.ListItem) => {
		// Render inline markdown inside list items (e.g. links, emphasis)
		let inner = token.text
		let tokens = token.tokens

		if (token.task) tokens = tokens.slice(1)
		inner = parser.parser(tokens) as string

		if (token.task) {
			const checkbox = token.checked ? '<input type="checkbox" checked disabled />' : '<input type="checkbox" disabled />'
			return `<li class="task-list-item">${checkbox} ${inner}</li>\n`
		}

		return `<li>${inner}</li>\n`
	}

	renderer.image = (token: Tokens.Image) => {
		const href = normalizeImageHref(token.href || '')
		const alt = escapeHtmlAttribute(token.text || '')
		const title = token.title ? ` title="${escapeHtmlAttribute(token.title)}"` : ''
		const baseAttrs = `loading="lazy" decoding="async"`

		// For same-origin media proxy URLs, try to add width/height and srcset.
		const marker = '/api/media/'
		const mediaIndex = href.indexOf(marker)
		if (mediaIndex !== -1) {
			let pathname: string | null = null
			try {
				pathname = decodeURIComponent(href.slice(mediaIndex + marker.length).split(/[?#]/, 1)[0])
			} catch {
				pathname = null
			}
			const dims = pathname ? imageDimensions?.get(pathname) : undefined
			if (dims) {
				const widths = RESPONSIVE_MEDIA_WIDTHS.filter(w => w <= dims.width)
				if (widths.length > 0) {
					const srcset = widths.map(w => `${href}${href.includes('?') ? '&' : '?'}w=${w} ${w}w`).join(', ')
					return `<img src="${escapeHtmlAttribute(href)}" alt="${alt}"${title} width="${dims.width}" height="${dims.height}" ${baseAttrs} srcset="${escapeHtmlAttribute(srcset)}" sizes="(max-width: 640px) 100vw, 800px" />`
				}
				return `<img src="${escapeHtmlAttribute(href)}" alt="${alt}"${title} width="${dims.width}" height="${dims.height}" ${baseAttrs} />`
			}
		}
		return `<img src="${escapeHtmlAttribute(href)}" alt="${alt}"${title} ${baseAttrs} />`
	}

	const renderMath = (content: string, displayMode: boolean) => {
		if (!katex) {
			// Keep original delimiters if katex is not available
			return displayMode ? `$$${content}$$` : `$${content}$`
		}

		try {
			return katex.renderToString(content, {
				displayMode,
				throwOnError: false,
				output: 'html',
				strict: 'ignore'
			})
		} catch {
			return displayMode ? `$$${content}$$` : `$${content}$`
		}
	}

	// Register extensions BEFORE lexing so math gets tokenized on cold refresh.
	parser.use({
		renderer,
		extensions: [
			// Block math: $$ ... $$
			{
				name: 'mathBlock',
				level: 'block',
				start(src: string) {
					return src.indexOf('$$')
				},
				tokenizer(src: string) {
					const match = src.match(/^\$\$([\s\S]+?)\$\$(?:\n+|$)/)
					if (!match) return
					return {
						type: 'mathBlock',
						raw: match[0],
						text: match[1].trim()
					} as any
				},
				renderer(token: any) {
					return `${renderMath(token.text || '', true)}\n`
				}
			},
			// Inline math: $ ... $
			{
				name: 'mathInline',
				level: 'inline',
				start(src: string) {
					const idx = src.indexOf('$')
					return idx === -1 ? undefined : idx
				},
				tokenizer(src: string) {
					// Avoid $$ (block) and escaped dollars
					if (src.startsWith('$$')) return
					if (src.startsWith('\\$')) return

					const match = src.match(/^\$([^\n$]+?)\$/)
					if (!match) return

					const inner = match[1]
					// Heuristic: require some non-space content
					if (!inner || !inner.trim()) return

					return {
						type: 'mathInline',
						raw: match[0],
						text: inner.trim()
					} as any
				},
				renderer(token: any) {
					return renderMath(token.text || '', false)
				}
			}
		]
	})

	// Pre-process with marked lexer first (after extensions are registered)
	const tokens = parser.lexer(markdown)

	// Extract TOC from parsed tokens (this correctly skips code blocks)
	const toc: TocItem[] = []
	function extractHeadings(tokenList: typeof tokens) {
		for (const token of tokenList) {
			if (token.type === 'heading' && token.depth <= 3) {
				// Use the parsed text (markdown syntax like links/code already stripped)
				const text = token.text
				const id = uniqueHeadingId(text)
				;(token as Tokens.Heading & { headingId?: string }).headingId = id
				toc.push({ id, text, level: token.depth })
			}
			// Recursively check nested tokens (e.g., in blockquotes, lists)
			if ('tokens' in token && token.tokens) {
				extractHeadings(token.tokens as typeof tokens)
			}
		}
	}
	extractHeadings(tokens)

	// Highlight independent code blocks in parallel; long technical articles can contain many.
	const codeTokens = tokens.filter((token): token is Tokens.Code => token.type === 'code')
	await Promise.all(
		codeTokens.map(async (codeToken, index) => {
			const originalCode = codeToken.text
			const key = `__SHIKI_CODE_${index}__`
			let html = ''

			if (shiki) {
				try {
					html = await shiki.codeToHtml(originalCode, {
						lang: codeToken.lang || 'text',
						theme: 'one-light'
					})
				} catch {
					// Keep original if highlighting fails
				}
			}

			codeBlockMap.set(key, { html, original: originalCode })
			codeToken.text = key
		})
	)
	const html = sanitizeHtml((parser.parser(tokens) as string) || '')

	return { html, toc }
}
