import 'server-only'

import { inArray } from 'drizzle-orm'
import { getDb } from '@/db/client'
import { media } from '@/db/schema'

export type MediaDimensions = { width: number; height: number }

/**
 * Look up stored pixel dimensions for the given media pathnames.
 * Returns a Map keyed by pathname (without query string).
 * Entries without dimensions are omitted so callers can treat presence as "known".
 */
export async function getMediaDimensions(pathnames: string[]): Promise<Map<string, MediaDimensions>> {
	const unique = Array.from(new Set(pathnames.filter(Boolean)))
	if (unique.length === 0) return new Map()
	const db = getDb()
	const rows = await db.select({ pathname: media.pathname, width: media.width, height: media.height }).from(media).where(inArray(media.pathname, unique))
	const result = new Map<string, MediaDimensions>()
	for (const row of rows) {
		if (row.width && row.height) result.set(row.pathname, { width: row.width, height: row.height })
	}
	return result
}

/** Extract the media pathname from a same-origin `/api/media/...` URL. Returns null for external URLs. */
export function extractMediaPathnameFromUrl(url: string): string | null {
	const marker = '/api/media/'
	const index = url.indexOf(marker)
	if (index === -1) return null
	const tail = url.slice(index + marker.length)
	try {
		return decodeURIComponent(tail.split(/[?#]/, 1)[0])
	} catch {
		return null
	}
}
