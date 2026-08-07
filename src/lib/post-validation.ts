import { z } from 'zod'
import { validateSlug } from './config-validation.ts'

const validDate = z
	.string()
	.trim()
	.min(1)
	.refine(value => !Number.isNaN(new Date(value).getTime()), '日期无效')
const optionalUrl = z
	.string()
	.trim()
	.max(2048)
	.refine(value => {
		if (value === '') return true
		if (value.startsWith('/') && !value.startsWith('//') && !/[\\\u0000-\u001f\u007f]/.test(value)) return true
		try {
			const url = new URL(value)
			return url.protocol === 'https:' && !url.username && !url.password
		} catch {
			return false
		}
	}, '图片地址必须是安全站内路径或无凭据的 HTTPS URL')
	.optional()
	.nullable()

export const postInputSchema = z
	.object({
		slug: z.string().trim().refine(validateSlug, 'slug 格式无效'),
		title: z.string().trim().min(1, '标题不能为空').max(200),
		summary: z.string().trim().max(4000).optional().default(''),
		contentMd: z.string().max(2_000_000),
		coverUrl: optionalUrl,
		category: z.string().trim().max(100).optional().nullable(),
		tags: z.array(z.string().trim().min(1).max(50)).max(30).default([]),
		status: z.enum(['draft', 'published']).default('published'),
		publishedAt: validDate,
		expectedVersion: z.number().int().positive().optional()
	})
	.strict()

export const batchPostEditSchema = z
	.object({
		removedSlugs: z.array(z.string().trim().refine(validateSlug)).max(100),
		assignments: z
			.array(
				z
					.object({
						slug: z.string().trim().refine(validateSlug),
						category: z.string().trim().max(100).optional().nullable()
					})
					.strict()
			)
			.max(500),
		categories: z.array(z.string().trim().min(1).max(100)).max(100)
	})
	.strict()

export const mediaPayloadSchema = z
	.object({
		slug: z.string().trim().refine(validateSlug),
		sha256: z.string().regex(/^[a-f0-9]{64}$/i),
		mimeType: z.enum(['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/avif', 'image/svg+xml']),
		size: z
			.number()
			.int()
			.nonnegative()
			.max(25 * 1024 * 1024)
	})
	.strict()
