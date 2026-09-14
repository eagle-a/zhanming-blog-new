import type { AgentPostSubmission, SubmissionFinding } from '@/lib/agent-submission-validation'
import type { ReviewCursor } from '@/lib/review-validation'

export type SubmissionSummary = Omit<Submission, 'payload' | 'validationResult'> & { title: string; slug: string }
export type SubmissionPage = { items: SubmissionSummary[]; nextCursor: ReviewCursor | null }

export type Submission = {
	id: string
	type: 'post'
	status: 'staging' | 'pending' | 'approved' | 'rejected'
	payload: AgentPostSubmission
	contentHash: string
	validationResult: SubmissionFinding[]
	createdAt: string
	updatedAt: string
	agentName: string | null
}

export type ReviewDraft = { source: Submission; payload: AgentPostSubmission; tagsText: string }

export function createReviewDraft(source: Submission): ReviewDraft {
	return { source, payload: source.payload, tagsText: source.payload.tags.join(', ') }
}

export function isReviewDirty(draft: ReviewDraft | null): boolean {
	return !!draft && (JSON.stringify(draft.payload) !== JSON.stringify(draft.source.payload) || draft.tagsText !== draft.source.payload.tags.join(', '))
}

// Polling must never replace locally edited text, including an unfinished tag.
export function receiveReviewDraft(current: ReviewDraft | null, incoming: Submission, busy: boolean): ReviewDraft {
	if (!current || current.source.id !== incoming.id) return createReviewDraft(incoming)
	if (busy || isReviewDirty(current) || current.source.contentHash === incoming.contentHash) return current
	return createReviewDraft(incoming)
}

export function reviewPayload(draft: ReviewDraft): AgentPostSubmission {
	return {
		...draft.payload,
		tags: draft.tagsText
			.split(/[,，]/)
			.map(value => value.trim())
			.filter(Boolean)
	}
}
