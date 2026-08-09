import assert from 'node:assert/strict'
import test from 'node:test'
import { agentPostSubmissionSchema, scanAgentSubmission } from '../src/lib/agent-submission-validation.ts'

test('agent post submissions are strict and cannot choose publication status', () => {
	const valid = {
		slug: 'weekly-progress',
		title: '本周进展',
		summary: '完成了基础验证。',
		contentMd: '# 内容',
		category: '工作记录',
		tags: ['进展'],
		publishedAt: '2026-08-08T00:00:00.000Z'
	}
	assert.equal(agentPostSubmissionSchema.safeParse(valid).success, true)
	assert.equal(agentPostSubmissionSchema.safeParse({ ...valid, status: 'published' }).success, false)
})

test('submission scanner blocks secrets and flags local absolute paths', () => {
	const secret = scanAgentSubmission('token = sk-abcdefghijklmnopqrstuvwxyz123456')
	assert.equal(secret.accepted, false)
	assert.ok(secret.findings.some(finding => finding.severity === 'blocked'))

	const localPath = scanAgentSubmission('文件位于 C:\\Users\\zm\\Desktop\\result.txt')
	assert.equal(localPath.accepted, true)
	assert.ok(localPath.findings.some(finding => finding.code === 'absolute-path'))
})
