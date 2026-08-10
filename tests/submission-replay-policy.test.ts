import assert from 'node:assert/strict'
import test from 'node:test'
import { evaluateSubmissionReplay, type SubmissionReplayRecord } from '../src/lib/submission-replay-policy.ts'

const pending: SubmissionReplayRecord = {
	id: 'submission-1',
	status: 'pending',
	contentHash: 'content-a',
	ticketHash: 'ticket-a',
	validationResult: []
}

test('replays only when the original ticket and content both match', () => {
	assert.equal(evaluateSubmissionReplay(pending, { ticketHash: 'ticket-a', contentHash: 'content-a' }).kind, 'replay')
	assert.equal(evaluateSubmissionReplay(pending, { ticketHash: 'ticket-b', contentHash: 'content-a' }).kind, 'unauthorized')
	assert.equal(evaluateSubmissionReplay(pending, { ticketHash: 'ticket-a', contentHash: 'content-b' }).kind, 'conflict')
})

test('does not replay a submission that has already left the pending queue', () => {
	assert.equal(evaluateSubmissionReplay({ ...pending, status: 'approved' }, { ticketHash: 'ticket-a', contentHash: 'content-a' }).kind, 'conflict')
})
