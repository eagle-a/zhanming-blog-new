const ALLOWED_TAGS = new Set([
	'a',
	'abbr',
	'b',
	'blockquote',
	'br',
	'code',
	'dd',
	'del',
	'details',
	'div',
	'dl',
	'dt',
	'em',
	'h1',
	'h2',
	'h3',
	'h4',
	'h5',
	'h6',
	'hr',
	'i',
	'img',
	'input',
	'kbd',
	'li',
	'mark',
	'ol',
	'p',
	'pre',
	's',
	'samp',
	'small',
	'span',
	'strong',
	'sub',
	'summary',
	'sup',
	'table',
	'tbody',
	'td',
	'tfoot',
	'th',
	'thead',
	'tr',
	'tt',
	'ul',
	'var'
])

const SAFE_PROTOCOLS = /^(?:https?:|mailto:|tel:|\/|#|data:image\/(?:gif|jpe?g|png|webp);base64,)/i

function isSafeUrl(value: string): boolean {
	return SAFE_PROTOCOLS.test(value.trim())
}

function sanitizeAttribute(tag: string, name: string, value: string): string {
	const normalizedName = name.toLowerCase()
	if (normalizedName === 'class' || normalizedName === 'id' || normalizedName === 'title') {
		return value
	}
	if (normalizedName === 'aria-hidden' && (value === 'true' || value === 'false')) return value
	if (tag === 'a' && normalizedName === 'href' && isSafeUrl(value)) return value
	if (tag === 'a' && normalizedName === 'target' && value === '_blank') return value
	if (tag === 'a' && normalizedName === 'rel') return 'noopener noreferrer'
	if (tag === 'img' && normalizedName === 'src' && isSafeUrl(value)) return value
	if (tag === 'img' && (normalizedName === 'alt' || normalizedName === 'width' || normalizedName === 'height')) return value
	if (tag === 'pre' && normalizedName === 'data-code') return value
	if (tag === 'input' && normalizedName === 'type' && value.toLowerCase() === 'checkbox') return 'checkbox'
	if (tag === 'input' && (normalizedName === 'checked' || normalizedName === 'disabled')) return normalizedName
	if ((tag === 'td' || tag === 'th') && (normalizedName === 'colspan' || normalizedName === 'rowspan') && /^\d{1,3}$/.test(value)) return value
	return ''
}

function sanitizeAttributes(tag: string, attributes: string): string {
	let sanitized = attributes.replace(
		/\s+([:\w-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/gi,
		(match, name: string, doubleQuoted = '', singleQuoted = '', bare = '') => {
			const normalizedName = name.toLowerCase()
			const value = doubleQuoted || singleQuoted || bare
			const safeValue = sanitizeAttribute(tag, normalizedName, value)
			if (!safeValue) return ''
			if (tag === 'input' && (normalizedName === 'checked' || normalizedName === 'disabled')) return ` ${normalizedName}`
			return ` ${normalizedName}="${safeValue.replace(/&/g, '&amp;').replace(/"/g, '&quot;')}"`
		}
	)
	if (tag === 'a' && sanitized.includes(' target="_blank"') && !sanitized.includes(' rel=')) {
		sanitized += ' rel="noopener noreferrer"'
	}
	return sanitized
}

function sanitizeWithoutDom(html: string): string {
	let result = html
		.replace(/<!--[\s\S]*?-->/g, '')
		.replace(/<\s*(script|style|iframe|object|embed|form|base|meta|link|template|svg|math|textarea)[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, '')
		.replace(/<\s*\/?\s*(script|style|iframe|object|embed|form|base|meta|link|template|svg|math|textarea)[^>]*>/gi, '')

	result = result.replace(/<\/?\s*([a-z0-9:-]+)([^>]*)>/gi, (match, tagName: string, attributes: string) => {
		const tag = tagName.toLowerCase()
		if (!ALLOWED_TAGS.has(tag)) return ''
		if (match.startsWith('</')) return `</${tag}>`
		return `<${tag}${sanitizeAttributes(tag, attributes)}>`
	})

	return result
}

export function sanitizeHtml(html: string): string {
	if (typeof DOMParser === 'undefined') return sanitizeWithoutDom(html)

	const document = new DOMParser().parseFromString(`<body>${html}</body>`, 'text/html')
	for (const element of Array.from(document.body.querySelectorAll('*'))) {
		const tag = element.tagName.toLowerCase()
		if (!ALLOWED_TAGS.has(tag)) {
			element.remove()
			continue
		}

		for (const attribute of Array.from(element.attributes)) {
			const safeValue = sanitizeAttribute(tag, attribute.name, attribute.value)
			if (!safeValue) element.removeAttribute(attribute.name)
			else element.setAttribute(attribute.name.toLowerCase(), safeValue)
		}
		if (tag === 'a' && element.getAttribute('target') === '_blank') element.setAttribute('rel', 'noopener noreferrer')
	}

	return document.body.innerHTML
}
