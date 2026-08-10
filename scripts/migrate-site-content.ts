import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { isDeepStrictEqual } from 'node:util'
import { BlobNotFoundError, del, head, put } from '@vercel/blob'
import { and, eq, inArray } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/neon-serverless'
import * as schema from '../src/db/schema.ts'
import { mediaProxyUrl } from '../src/lib/media-url.ts'
import { CONTENT_DOCUMENT_KEYS, parseContentDocument, type ContentDocumentKey } from '../src/lib/content-validation.ts'
import { assertApplyConfirmation } from './lib/script-safety.ts'

const root = process.cwd()
const publicRoot = path.resolve(root, 'public')
const apply = process.argv.includes('--apply')
const repairAbout = process.argv.includes('--repair-about')
const databaseUrl = process.env.DATABASE_URL?.trim()
const blobToken = process.env.BLOB_READ_WRITE_TOKEN?.trim()

assertApplyConfirmation({ apply, argv: process.argv.slice(2), environment: process.env })
if (!databaseUrl) throw new Error('DATABASE_URL is required. Run vercel env pull .env.local after linking the project.')
if (!blobToken) throw new Error('BLOB_READ_WRITE_TOKEN is required. Run vercel env pull .env.local after linking the project.')

const db = drizzle(databaseUrl, { schema })
const sourceFiles: Record<ContentDocumentKey, string> = {
	site: 'src/config/site-content.json',
	'card-styles': 'src/config/card-styles.json',
	about: 'src/app/about/list.json',
	bloggers: 'src/app/bloggers/list.json',
	projects: 'src/app/projects/list.json',
	shares: 'src/app/share/list.json',
	pictures: 'src/app/pictures/list.json',
	snippets: 'src/app/snippets/list.json'
}

const imageExtensionPattern = /\.(png|jpe?g|webp|gif|svg|avif)$/i
const embeddedLocalImagePattern = /(^|[\s("'=])(\/(?!\/)[^\s"'()<>\]]+\.(?:png|jpe?g|webp|gif|svg|avif)(?:[?#][^\s"'()<>\]]*)?)/gim
const maxImageSize = 25 * 1024 * 1024

type LocalImage = {
	url: string
	filePath: string
	body: Buffer
	extension: string
	mimeType: string
	sha256: string
	pathname: string
}

type BlobLocation = {
	url: string
	pathname: string
	existed: boolean
}

function extensionForUrl(url: string): string {
	const pathname = url.split(/[?#]/, 1)[0]
	const extension = path.posix.extname(pathname).toLowerCase()
	if (!imageExtensionPattern.test(extension)) throw new Error(`Unsupported local image extension: ${url}`)
	return extension === '.jpeg' ? '.jpg' : extension
}

function mimeTypeForExtension(extension: string): string {
	const mimeTypes: Record<string, string> = {
		'.png': 'image/png',
		'.jpg': 'image/jpeg',
		'.webp': 'image/webp',
		'.gif': 'image/gif',
		'.svg': 'image/svg+xml',
		'.avif': 'image/avif'
	}
	const mimeType = mimeTypes[extension]
	if (!mimeType) throw new Error(`Unsupported image extension: ${extension}`)
	return mimeType
}

function localImageUrls(value: unknown): string[] {
	const urls: string[] = []
	const visit = (current: unknown) => {
		if (typeof current === 'string') {
			for (const match of current.matchAll(embeddedLocalImagePattern)) {
				if (match[2]) urls.push(match[2])
			}
			return
		}
		if (Array.isArray(current)) {
			for (const item of current) visit(item)
			return
		}
		if (current && typeof current === 'object') {
			for (const item of Object.values(current)) visit(item)
		}
	}
	visit(value)
	return urls
}

function rewriteLocalImageUrls(value: unknown, replacements: Map<string, string>): unknown {
	if (typeof value === 'string') {
		return value.replace(embeddedLocalImagePattern, (match, prefix: string, url: string) => {
			return url && replacements.has(url) ? `${prefix}${replacements.get(url)}` : match
		})
	}
	if (Array.isArray(value)) return value.map(item => rewriteLocalImageUrls(item, replacements))
	if (value && typeof value === 'object') {
		return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, rewriteLocalImageUrls(item, replacements)]))
	}
	return value
}

async function readLocalImage(url: string): Promise<LocalImage> {
	const pathOnly = url.split(/[?#]/, 1)[0]
	let decodedPath: string
	try {
		decodedPath = decodeURIComponent(pathOnly)
	} catch {
		throw new Error(`Local image URL is not valid UTF-8: ${url}`)
	}
	const filePath = path.resolve(publicRoot, `.${decodedPath}`)
	if (filePath !== publicRoot && !filePath.startsWith(`${publicRoot}${path.sep}`)) {
		throw new Error(`Local image escapes public/: ${url}`)
	}

	let body: Buffer
	try {
		body = await readFile(filePath)
	} catch {
		throw new Error(`Referenced local image does not exist: ${url} (${filePath})`)
	}
	if (body.byteLength > maxImageSize) throw new Error(`Referenced local image exceeds 25 MB: ${url}`)

	const extension = extensionForUrl(url)
	const sha256 = createHash('sha256').update(body).digest('hex')
	return {
		url,
		filePath,
		body,
		extension,
		mimeType: mimeTypeForExtension(extension),
		sha256,
		pathname: `content/migrated/${sha256}${extension}`
	}
}

async function locateOrUpload(image: LocalImage): Promise<BlobLocation> {
	try {
		const existing = await head(image.pathname, { token: blobToken })
		return { url: existing.url, pathname: existing.pathname, existed: true }
	} catch (error) {
		if (!(error instanceof BlobNotFoundError)) throw error
		if (!apply) return { url: `[dry-run]${image.pathname}`, pathname: image.pathname, existed: false }
		const uploaded = await put(image.pathname, image.body, {
			access: 'private',
			addRandomSuffix: false,
			allowOverwrite: true,
			contentType: image.mimeType,
			cacheControlMaxAge: 31536000,
			token: blobToken
		})
		return { url: uploaded.url, pathname: uploaded.pathname, existed: false }
	}
}

const sourceDocuments = new Map<ContentDocumentKey, unknown>()
const aboutStub = JSON.parse(await readFile(path.join(root, sourceFiles.about), 'utf8')) as Record<string, unknown>
for (const key of CONTENT_DOCUMENT_KEYS) {
	const source =
		key === 'about'
			? { ...aboutStub, content: await readFile(path.join(publicRoot, 'about/content.md'), 'utf8') }
			: (JSON.parse(await readFile(path.join(root, sourceFiles[key]), 'utf8')) as unknown)
	parseContentDocument(key, source)
	sourceDocuments.set(key, source)
}

const references = CONTENT_DOCUMENT_KEYS.flatMap(key => localImageUrls(sourceDocuments.get(key)))
const uniqueUrls = Array.from(new Set(references))
const localImages = await Promise.all(uniqueUrls.map(readLocalImage))
const uniqueImages = Array.from(new Map(localImages.map(image => [image.pathname, image])).values())

const locations = new Map<string, BlobLocation>()
for (const image of uniqueImages) locations.set(image.pathname, await locateOrUpload(image))

const replacements = new Map<string, string>()
for (const image of localImages) {
	const location = locations.get(image.pathname)
	if (!location) throw new Error(`Blob location missing after upload: ${image.url}`)
	replacements.set(image.url, mediaProxyUrl(location.pathname))
}

const migratedDocuments = new Map<ContentDocumentKey, unknown>()
for (const key of CONTENT_DOCUMENT_KEYS) {
	const migrated = rewriteLocalImageUrls(sourceDocuments.get(key), replacements)
	parseContentDocument(key, migrated)
	migratedDocuments.set(key, migrated)
}

const existingDocuments = await db
	.select({ key: schema.contentDocuments.key, data: schema.contentDocuments.data, version: schema.contentDocuments.version })
	.from(schema.contentDocuments)
	.where(inArray(schema.contentDocuments.key, CONTENT_DOCUMENT_KEYS))
const existingKeys = new Set(existingDocuments.map(document => document.key))
const currentAbout = existingDocuments.find(document => document.key === 'about')
const aboutRepairEligible = currentAbout?.version === 1 && isDeepStrictEqual(currentAbout.data, aboutStub)
if (apply && repairAbout && !aboutRepairEligible) {
	throw new Error('About repair refused: the stored document is not the untouched version 1 migration stub')
}
let insertedDocuments = 0
let repairedAboutDocuments = 0

if (apply) {
	try {
		await db.transaction(async tx => {
			for (const image of uniqueImages) {
				const location = locations.get(image.pathname)
				if (!location) throw new Error(`Blob location missing during database write: ${image.pathname}`)
				await tx
					.insert(schema.media)
					.values({
						blobUrl: location.url,
						pathname: location.pathname,
						sha256: image.sha256,
						mimeType: image.mimeType,
						size: image.body.byteLength
					})
					.onConflictDoUpdate({
						target: schema.media.pathname,
						set: { blobUrl: location.url, sha256: image.sha256, mimeType: image.mimeType, size: image.body.byteLength }
					})
			}

			if (repairAbout && currentAbout) {
				const data = migratedDocuments.get('about')
				const nextVersion = currentAbout.version + 1
				const [updated] = await tx
					.update(schema.contentDocuments)
					.set({ data, version: nextVersion, updatedAt: new Date() })
					.where(and(eq(schema.contentDocuments.key, 'about'), eq(schema.contentDocuments.version, currentAbout.version)))
					.returning({ key: schema.contentDocuments.key })
				if (!updated) throw new Error('About repair conflict: the document changed during migration')
				await tx.insert(schema.contentDocumentRevisions).values({
					documentKey: 'about',
					version: nextVersion,
					data,
					createdBy: 'about-content-repair'
				})
				repairedAboutDocuments++
			} else {
				for (const key of CONTENT_DOCUMENT_KEYS) {
					const data = migratedDocuments.get(key)
					const [inserted] = await tx
						.insert(schema.contentDocuments)
						.values({ key, data, version: 1 })
						.onConflictDoNothing()
						.returning({ key: schema.contentDocuments.key })
					if (!inserted) continue
					await tx.insert(schema.contentDocumentRevisions).values({ documentKey: key, version: 1, data, createdBy: 'legacy-content-migration' })
					insertedDocuments++
				}
			}
		})
	} catch (error) {
		const newlyUploaded = Array.from(locations.values()).filter(location => !location.existed)
		for (const location of newlyUploaded) await del(location.url, { token: blobToken }).catch(() => undefined)
		throw error
	}

	const storedDocuments = await db
		.select({ key: schema.contentDocuments.key, data: schema.contentDocuments.data, version: schema.contentDocuments.version })
		.from(schema.contentDocuments)
		.where(inArray(schema.contentDocuments.key, CONTENT_DOCUMENT_KEYS))
	const revisions = await db
		.select({ key: schema.contentDocumentRevisions.documentKey })
		.from(schema.contentDocumentRevisions)
		.where(and(inArray(schema.contentDocumentRevisions.documentKey, CONTENT_DOCUMENT_KEYS), eq(schema.contentDocumentRevisions.version, 1)))
	const revisionKeys = new Set(revisions.map(revision => revision.key))
	if (storedDocuments.length !== CONTENT_DOCUMENT_KEYS.length) throw new Error('Verification failed: not all content documents exist')
	for (const document of storedDocuments) {
		const key = document.key as ContentDocumentKey
		if (!CONTENT_DOCUMENT_KEYS.includes(key)) throw new Error(`Verification failed: unexpected document ${document.key}`)
		parseContentDocument(key, document.data)
		if (!revisionKeys.has(key)) throw new Error(`Verification failed: revision 1 missing for ${key}`)
	}
	if (repairAbout) {
		const repaired = storedDocuments.find(document => document.key === 'about')
		if (!repaired || repaired.version !== 2 || !isDeepStrictEqual(repaired.data, migratedDocuments.get('about'))) {
			throw new Error('Verification failed: repaired About content does not match the complete legacy source')
		}
	}
}

const stats = {
	mode: apply ? 'apply' : 'dry-run',
	aboutRepairRequested: repairAbout,
	aboutRepairEligible,
	aboutRepaired: repairedAboutDocuments,
	documents: CONTENT_DOCUMENT_KEYS.length,
	documentsAlreadyPresent: existingKeys.size,
	documentsInserted: insertedDocuments,
	imageReferences: references.length,
	uniqueLocalPaths: uniqueUrls.length,
	uniqueBlobs: uniqueImages.length,
	blobsAlreadyPresent: Array.from(locations.values()).filter(location => location.existed).length,
	blobsUploaded: apply ? Array.from(locations.values()).filter(location => !location.existed).length : 0,
	unresolvedLocalReferences: 0
}

console.log(JSON.stringify(stats, null, 2))
