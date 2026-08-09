import { z } from 'zod'

const text = (max: number) => z.string().max(max)
const nonEmptyText = (max: number) => z.string().trim().min(1).max(max)
const httpsUrl = text(2048).refine(value => {
	try {
		const url = new URL(value)
		return url.protocol === 'https:' && !url.username && !url.password
	} catch {
		return false
	}
}, 'URL 必须是无凭据的有效 HTTPS 地址')
const sameOriginPath = text(2048).refine(
	value => value.startsWith('/') && !value.startsWith('//') && !/[\\\u0000-\u001f\u007f]/.test(value),
	'站内路径格式无效'
)
const publicUrl = z.union([sameOriginPath, httpsUrl])
const imageUrl = publicUrl
const color = text(32).regex(/^#[0-9a-f]{3,8}$/i, '颜色格式无效')
const tags = z.array(nonEmptyText(50)).max(50)

const aboutSchema = z
	.object({
		title: nonEmptyText(200),
		description: text(2000),
		content: text(500_000)
	})
	.strict()

const bloggersSchema = z
	.array(
		z
			.object({
				name: nonEmptyText(200),
				avatar: imageUrl,
				url: httpsUrl,
				description: text(4000),
				stars: z.number().int().min(0).max(5),
				status: z.enum(['recent', 'disconnected']).optional()
			})
			.strict()
	)
	.max(500)

const projectsSchema = z
	.array(
		z
			.object({
				name: nonEmptyText(200),
				year: z.number().int().min(1900).max(3000),
				description: text(4000),
				image: imageUrl,
				url: httpsUrl,
				tags,
				github: httpsUrl.optional(),
				npm: httpsUrl.optional()
			})
			.strict()
	)
	.max(500)

const sharesSchema = z
	.array(
		z
			.object({
				name: nonEmptyText(200),
				logo: imageUrl,
				url: httpsUrl,
				description: text(4000),
				tags,
				stars: z.number().int().min(0).max(5)
			})
			.strict()
	)
	.max(1000)

const picturesSchema = z
	.array(
		z
			.object({
				id: nonEmptyText(200),
				uploadedAt: text(100).optional(),
				description: text(4000).optional(),
				image: imageUrl.optional(),
				images: z.array(imageUrl).max(100).optional()
			})
			.strict()
	)
	.max(500)

const snippetsSchema = z.array(text(2000)).max(1000)

const socialButtonType = z.enum([
	'github',
	'juejin',
	'email',
	'link',
	'x',
	'tg',
	'wechat',
	'facebook',
	'tiktok',
	'instagram',
	'weibo',
	'xiaohongshu',
	'zhihu',
	'bilibili',
	'qq',
	'rss'
])

const socialButtonSchema = z
	.object({
		id: nonEmptyText(100),
		type: socialButtonType,
		value: text(2048),
		label: text(200),
		order: z.number().int().min(0).max(1000)
	})
	.strict()
	.superRefine((button, context) => {
		if (button.type === 'email' || button.type === 'wechat' || button.type === 'qq') return
		if (!publicUrl.safeParse(button.value).success) {
			context.addIssue({ code: 'custom', path: ['value'], message: '社交链接必须是站内路径或 HTTPS URL' })
		}
	})

const siteContentSchema = z
	.object({
		meta: z
			.object({
				title: nonEmptyText(200),
				description: text(2000),
				username: nonEmptyText(100)
			})
			.strict(),
		theme: z
			.object({
				colorBrand: color,
				colorPrimary: color,
				colorSecondary: color,
				colorBrandSecondary: color,
				colorBg: color,
				colorBorder: color,
				colorCard: color,
				colorArticle: color
			})
			.strict(),
		faviconUrl: imageUrl,
		avatarUrl: imageUrl,
		backgroundColors: z.array(color).min(1).max(20),
		artImages: z.array(z.object({ id: nonEmptyText(100), url: imageUrl }).strict()).max(100),
		currentArtImageId: text(100),
		backgroundImages: z.array(z.object({ id: text(100), url: z.union([z.literal(''), imageUrl]) }).strict()).max(100),
		currentBackgroundImageId: text(100),
		socialButtons: z.array(socialButtonSchema).max(100),
		clockShowSeconds: z.boolean(),
		summaryInContent: z.boolean(),
		hideEditButton: z.boolean(),
		enableCategories: z.boolean(),
		currentHatIndex: z.number().int().min(0).max(1000),
		hatFlipped: z.boolean(),
		enableChristmas: z.boolean(),
		beian: z.object({ text: text(500), link: z.union([z.literal(''), publicUrl]) }).strict(),
		twikoo: z.object({ envId: z.union([z.literal(''), httpsUrl]), region: text(100) }).strict()
	})
	.strict()
	.superRefine((site, context) => {
		const uniqueIds = (items: Array<{ id: string }>, path: string) => {
			const seen = new Set<string>()
			for (let index = 0; index < items.length; index++) {
				const id = items[index].id
				if (seen.has(id)) context.addIssue({ code: 'custom', path: [path, index, 'id'], message: 'ID 不能重复' })
				seen.add(id)
			}
		}
		uniqueIds(site.artImages, 'artImages')
		uniqueIds(site.backgroundImages, 'backgroundImages')
		uniqueIds(site.socialButtons, 'socialButtons')
		if (site.currentArtImageId && !site.artImages.some(image => image.id === site.currentArtImageId)) {
			context.addIssue({ code: 'custom', path: ['currentArtImageId'], message: '当前插画不存在' })
		}
		if (site.currentBackgroundImageId && !site.backgroundImages.some(image => image.id === site.currentBackgroundImageId)) {
			context.addIssue({ code: 'custom', path: ['currentBackgroundImageId'], message: '当前背景图不存在' })
		}
	})

const cardStyle = z
	.object({
		width: z.number().min(0).max(5000),
		height: z.number().min(0).max(5000),
		order: z.number().int().min(0).max(1000),
		offsetX: z.number().min(-10_000).max(10_000).nullable(),
		offsetY: z.number().min(-10_000).max(10_000).nullable(),
		enabled: z.boolean(),
		offset: z.number().min(-10_000).max(10_000).optional()
	})
	.strict()

const cardStylesSchema = z
	.object({
		artCard: cardStyle,
		hiCard: cardStyle,
		clockCard: cardStyle,
		calendarCard: cardStyle,
		musicCard: cardStyle,
		socialButtons: cardStyle,
		shareCard: cardStyle,
		articleCard: cardStyle,
		writeButtons: cardStyle,
		navCard: cardStyle,
		likePosition: cardStyle,
		hatCard: cardStyle,
		beianCard: cardStyle
	})
	.strict()

const contentDocumentSchemas = {
	site: siteContentSchema,
	'card-styles': cardStylesSchema,
	about: aboutSchema,
	bloggers: bloggersSchema,
	projects: projectsSchema,
	shares: sharesSchema,
	pictures: picturesSchema,
	snippets: snippetsSchema
} as const

export type ContentDocumentKey = keyof typeof contentDocumentSchemas
export const CONTENT_DOCUMENT_KEYS = Object.freeze(Object.keys(contentDocumentSchemas) as ContentDocumentKey[])

export function isContentDocumentKey(value: string): value is ContentDocumentKey {
	return Object.hasOwn(contentDocumentSchemas, value)
}

export function parseContentDocument(key: ContentDocumentKey, value: unknown): unknown {
	const serialized = JSON.stringify(value)
	if (serialized && new TextEncoder().encode(serialized).byteLength > 2_000_000) throw new Error('配置数据超过 2 MB 限制')
	return contentDocumentSchemas[key].parse(value)
}

export const contentDocumentWriteSchema = z
	.object({
		data: z.unknown(),
		expectedVersion: z.number().int().nonnegative()
	})
	.strict()

export const contentDocumentBatchWriteSchema = z
	.object({
		items: z
			.array(
				z
					.object({
						key: z.string(),
						data: z.unknown(),
						expectedVersion: z.number().int().nonnegative()
					})
					.strict()
			)
			.min(1)
			.max(10)
	})
	.strict()

export const contentMediaPayloadSchema = z
	.object({
		namespace: z.enum(['site', 'bloggers', 'projects', 'shares', 'pictures']),
		sha256: z.string().regex(/^[a-f0-9]{64}$/i),
		mimeType: z.enum(['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/avif', 'image/svg+xml']),
		size: z
			.number()
			.int()
			.nonnegative()
			.max(25 * 1024 * 1024)
	})
	.strict()
