import { z } from 'zod'
import { agentPostSubmissionSchema } from './agent-submission-validation.ts'

export const reviewVersionSchema = z
	.object({
		expectedContentHash: z.string().regex(/^[a-f0-9]{64}$/, '请刷新投稿后重新审核')
	})
	.strict()

export const reviewUpdateSchema = reviewVersionSchema.extend({ payload: agentPostSubmissionSchema })
export const reviewRejectSchema = reviewVersionSchema.extend({ reason: z.string().trim().min(1).max(2000) })

export const reviewCursorSchema = z.object({ createdAt: z.iso.datetime(), id: z.string().min(1).max(100) }).strict()
export type ReviewCursor = z.infer<typeof reviewCursorSchema>

export const reviewListQuerySchema = z
	.object({
		status: z.enum(['pending', 'approved', 'rejected']).default('pending'),
		limit: z.coerce.number().int().min(1).max(50).default(20),
		cursor: z
			.string()
			.max(250)
			.transform((value, ctx) => {
				try {
					return reviewCursorSchema.parse(JSON.parse(value))
				} catch {
					ctx.addIssue({ code: 'custom', message: '无效的分页游标' })
					return z.NEVER
				}
			})
			.optional()
	})
	.strict()
