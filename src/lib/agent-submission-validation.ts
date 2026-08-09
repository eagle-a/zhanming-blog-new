import { z } from 'zod'
import { postInputSchema } from './post-validation.ts'

export const agentPostSubmissionSchema = postInputSchema
	.omit({ status: true, expectedVersion: true })
	.extend({
		source: z
			.object({
				summary: z.string().trim().max(2000).optional(),
				evidenceIds: z.array(z.string().trim().min(1).max(200)).max(100).default([]),
				generator: z.string().trim().max(200).optional()
			})
			.strict()
			.optional()
	})
	.strict()

export type AgentPostSubmission = z.infer<typeof agentPostSubmissionSchema>

export type SubmissionFinding = {
	code: 'secret' | 'private-key' | 'absolute-path' | 'environment-file'
	severity: 'blocked' | 'warning'
	message: string
}

const scanners: Array<{ code: SubmissionFinding['code']; severity: SubmissionFinding['severity']; pattern: RegExp; message: string }> = [
	{
		code: 'private-key',
		severity: 'blocked',
		pattern: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/i,
		message: '内容疑似包含私钥'
	},
	{
		code: 'secret',
		severity: 'blocked',
		pattern: /\b(?:sk-[A-Za-z0-9_-]{24,}|ghp_[A-Za-z0-9]{24,}|vercel_blob_rw_[A-Za-z0-9_-]{20,}|postgres(?:ql)?:\/\/[^\s]+:[^\s]+@)/i,
		message: '内容疑似包含访问密钥或带凭据的数据库地址'
	},
	{
		code: 'absolute-path',
		severity: 'warning',
		pattern: /(?:[A-Za-z]:\\(?:Users|Documents and Settings)\\|\/(?:home|Users)\/)[^\s)\]"']+/i,
		message: '内容包含本机绝对路径，审批前应脱敏'
	},
	{
		code: 'environment-file',
		severity: 'warning',
		pattern: /(?:^|[\\/])\.env(?:\.[A-Za-z0-9_-]+)?\b/im,
		message: '内容提到了环境变量文件，审批前应确认没有泄密'
	}
]

export function scanAgentSubmission(content: string): { accepted: boolean; findings: SubmissionFinding[] } {
	const findings = scanners.filter(scanner => scanner.pattern.test(content)).map(({ code, severity, message }) => ({ code, severity, message }))
	return { accepted: !findings.some(finding => finding.severity === 'blocked'), findings }
}
