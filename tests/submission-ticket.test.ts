import assert from 'node:assert/strict'
import test from 'node:test'
import { createSubmissionTicketToken, hashSubmissionTicket, isSubmissionTicket, readSubmissionTicketAuthorization } from '../src/lib/submission-ticket.ts'

test('submission tickets have 256 bits of random material and only their hash needs storage', () => {
	const first = createSubmissionTicketToken()
	const second = createSubmissionTicketToken()
	assert.match(first, /^zbt_[A-Za-z0-9_-]{43}$/)
	assert.notEqual(first, second)
	assert.equal(isSubmissionTicket(first), true)
	assert.match(hashSubmissionTicket(first), /^[a-f0-9]{64}$/)
	assert.notEqual(hashSubmissionTicket(first), first)
})

test('submission ticket authorization accepts one strict Bearer credential', () => {
	const token = createSubmissionTicketToken()
	const request = new Request('https://example.test/api/agent/v1/submissions/posts', {
		headers: { Authorization: `Bearer ${token}` }
	})
	assert.equal(readSubmissionTicketAuthorization(request), token)

	for (const authorization of ['', token, `Basic ${token}`, `Bearer ${token} extra`, 'Bearer zbt_short']) {
		assert.throws(
			() => readSubmissionTicketAuthorization(new Request('https://example.test', { headers: { Authorization: authorization } })),
			(error: unknown) => error instanceof Response && error.status === 401
		)
	}
})
