// Require a local delimiter before `/api/media/`; this excludes embedded paths
// such as `https://cdn.example/api/media/file.png`.
const mediaReferencePattern = /(?:^|[\s"'`()\[\],:])\/api\/media\/([^\s"'()<>{}\]]+)/g

// Content writes and Blob GC use the same transaction-scoped advisory lock so
// an object cannot become referenced between GC's final scan and deletion.
export const MEDIA_REFERENCE_MUTATION_LOCK = 'zhanming-blog:media-reference-mutation:v1'

/** Extract same-origin media pathnames from nested content without touching external URLs. */
export function extractMediaPathnames(value: unknown): string[] {
	const references = new Set<string>()

	const visit = (item: unknown) => {
		if (typeof item === 'string') {
			for (const match of item.matchAll(mediaReferencePattern)) {
				try {
					const pathname = match[1]
						.split('/')
						.map(segment => decodeURIComponent(segment))
						.join('/')
					references.add(pathname.split(/[?#]/, 1)[0])
				} catch {
					// Ignore malformed references; reconciliation still compares valid paths.
				}
			}
			return
		}
		if (Array.isArray(item)) {
			for (const child of item) visit(child)
			return
		}
		if (item && typeof item === 'object') {
			for (const child of Object.values(item)) visit(child)
		}
	}

	visit(value)
	return [...references]
}
