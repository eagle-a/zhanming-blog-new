/**
 * Pure helpers shared by the admin migration route and the CLI wrapper.
 *
 * Article images used to be committed to `public/images/<slug>/` and referenced
 * as `/images/<slug>/<file>`. Those references keep working only while the
 * deployment that contains the files is live, and every new image needs a full
 * release. This module plans the move to Vercel Blob: the same bytes are stored
 * under a content-addressed pathname and the Markdown body is rewritten to the
 * `/api/media/...` proxy URL.
 */

export type StaticMediaReference = {
	/** File name inside `public/images/<slug>/`, URL-decoded. */
	file: string
	/** Exact text that appears in the Markdown body, still URL-encoded. */
	href: string
	/** Path to fetch the same bytes from the live deployment. */
	staticPath: string
}

export type StaticMediaMigration = {
	file: string
	href: string
	/** Rewritten reference that replaces `href`. */
	target: string
}

const RASTER_EXTENSIONS = new Set(['png', 'jpg', 'jpeg', 'webp', 'avif', 'gif'])

const MIME_TYPE_BY_EXTENSION: Record<string, string> = {
	png: 'image/png',
	jpg: 'image/jpeg',
	jpeg: 'image/jpeg',
	webp: 'image/webp',
	avif: 'image/avif',
	gif: 'image/gif'
}

/** Characters that terminate an image reference inside Markdown or inline HTML. */
const REFERENCE_TERMINATORS = /[\s)"'?#<>\\]/

export function extensionFromFileName(file: string): string | null {
	const match = /\.([A-Za-z0-9]{1,10})$/.exec(file)
	if (!match) return null
	const extension = match[1].toLowerCase()
	return RASTER_EXTENSIONS.has(extension) ? extension : null
}

export function mimeTypeForExtension(extension: string): string | null {
	return MIME_TYPE_BY_EXTENSION[extension.toLowerCase()] || null
}

/** Content-addressed pathname inside the `blog/<slug>/` Blob namespace. */
export function buildMigratedPathname(slug: string, sha256: string, extension: string): string {
	return `blog/${slug}/${sha256}.${extension.toLowerCase()}`
}

export function staticMediaHref(slug: string, file: string): string {
	return `/images/${slug}/${file.split('/').map(encodeURIComponent).join('/')}`
}

/**
 * Bodies written before the assets were promoted to `public/` still reference
 * `assets/<slug>/<file>`. `src/lib/markdown-renderer.ts` maps that prefix to
 * `/images/<slug>/`, so the migration has to read the promoted path while
 * replacing the original text.
 */
export function staticMediaSourcePrefixes(slug: string): { hrefPrefix: string; staticPrefix: string }[] {
	return [
		{ hrefPrefix: `/images/${slug}/`, staticPrefix: `/images/${slug}/` },
		{ hrefPrefix: `assets/${slug}/`, staticPrefix: `/images/${slug}/` }
	]
}

/** Pathname extracted from a same-origin `/api/media/...` reference. */
export function migratedPathnameFromUrl(url: string): string | null {
	const marker = '/api/media/'
	const index = url.indexOf(marker)
	if (index === -1) return null
	try {
		return decodeURIComponent(url.slice(index + marker.length).split(/[?#]/, 1)[0])
	} catch {
		return null
	}
}

/**
 * Collect every raster image reference that points at `public/images/<slug>/`.
 * Duplicate references collapse into one entry because the rewrite is textual.
 */
export function findStaticMediaReferences(contentMd: string, slug: string): StaticMediaReference[] {
	const references = new Map<string, StaticMediaReference>()

	for (const { hrefPrefix, staticPrefix } of staticMediaSourcePrefixes(slug)) {
		let index = contentMd.indexOf(hrefPrefix)
		while (index !== -1) {
			const rest = contentMd.slice(index + hrefPrefix.length)
			const stop = rest.search(REFERENCE_TERMINATORS)
			const rawName = stop === -1 ? rest : rest.slice(0, stop)
			const end = stop === -1 ? contentMd.length : index + hrefPrefix.length + stop
			const href = contentMd.slice(index, end)

			if (rawName) {
				let file = rawName
				try {
					file = decodeURIComponent(rawName)
				} catch {
					// Keep the raw name; a malformed escape sequence cannot match a real file.
				}
				if (!references.has(href) && extensionFromFileName(file)) {
					references.set(href, { file, href, staticPath: `${staticPrefix}${rawName}` })
				}
			}

			index = contentMd.indexOf(hrefPrefix, end)
		}
	}

	return [...references.values()]
}

/** Replace each migrated reference with its Blob proxy URL. */
export function rewriteStaticMedia(contentMd: string, migrations: readonly StaticMediaMigration[]): { contentMd: string; replaced: number } {
	let result = contentMd
	let replaced = 0

	for (const migration of migrations) {
		const segments = result.split(migration.href)
		if (segments.length === 1) continue
		replaced += segments.length - 1
		result = segments.join(migration.target)
	}

	return { contentMd: result, replaced }
}
