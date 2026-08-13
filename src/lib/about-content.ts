import 'server-only'

import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { cache } from 'react'
import { parseAboutContent, type AboutContent } from './about-content-parser'

const aboutPath = path.join(process.cwd(), 'public', 'about', 'content.md')

export const readAboutContent = cache(async (): Promise<AboutContent> => {
	return parseAboutContent(await readFile(aboutPath, 'utf8'))
})
