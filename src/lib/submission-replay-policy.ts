export type SubmissionReplayRecord = {
	id: string
	status: 'staging' | 'pending' | 'approved' | 'rejected'
	contentHash: string
	ticketHash: string
	validationResult: unknown
}

export type SubmissionReplayDecision =
	{ kind: 'new' } | { kind: 'unauthorized' } | { kind: 'conflict'; reason: string } | { kind: 'replay'; record: SubmissionReplayRecord }

export function evaluateSubmissionReplay(
	record: SubmissionReplayRecord | undefined,
	expected: { ticketHash: string; contentHash: string }
): SubmissionReplayDecision {
	if (!record) return { kind: 'new' }
	if (record.ticketHash !== expected.ticketHash) return { kind: 'unauthorized' }
	if (record.contentHash !== expected.contentHash) return { kind: 'conflict', reason: '该幂等键已用于不同的投稿内容' }
	if (record.status !== 'pending') return { kind: 'conflict', reason: '该幂等键对应的投稿已处理' }
	return { kind: 'replay', record }
}
