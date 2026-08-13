import 'server-only'

import { readFile } from 'node:fs/promises'
import path from 'node:path'

const localAboutPath = path.join(process.cwd(), 'public', 'about', 'content.md')

export function usesLocalAboutContent(): boolean {
	return process.env.NODE_ENV !== 'production'
}

export async function readLocalAboutContent(): Promise<string> {
	return readFile(localAboutPath, 'utf8')
}
