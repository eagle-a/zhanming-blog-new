import assert from 'node:assert/strict'
import { randomBytes } from 'node:crypto'
import { Pool } from 'pg'
import { createSubmissionTicketToken, hashSubmissionTicket } from '../src/lib/submission-ticket.ts'

const databaseUrl = 'postgresql://postgres@127.0.0.1:54329/zhanming_blog_dev'
const apiOrigin = 'http://127.0.0.1:2025'
const endpointPath = '/api/agent/v1/submissions/posts'
const pool = new Pool({ connectionString: databaseUrl, max: 4 })
const ticketIds = []
const submissionIds = []

async function issueTicket({ expiresAt = new Date(Date.now() + 30 * 60 * 1000), revokedAt = null } = {}) {
	const token = createSubmissionTicketToken()
	const createdAt = new Date(expiresAt.getTime() - 30 * 60 * 1000)
	const inserted = await pool.query(
		`insert into submission_tickets (label, token_hash, scope, created_at, expires_at, revoked_at)
		 values ($1, $2, 'posts:submit', $3, $4, $5) returning id`,
		['local-ticket-smoke-test', hashSubmissionTicket(token), createdAt, expiresAt, revokedAt]
	)
	ticketIds.push(inserted.rows[0].id)
	return token
}

function requestFor(ticket, body, idempotencyKey = `post:local-smoke:${randomBytes(12).toString('hex')}`) {
	return fetch(`${apiOrigin}${endpointPath}`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${ticket}`,
			'Content-Type': 'application/json',
			'Idempotency-Key': idempotencyKey
		},
		body
	})
}

const body = JSON.stringify({
	slug: 'local-ticket-smoke-test',
	title: 'Local ticket smoke test',
	summary: 'Ephemeral local-only submission',
	contentMd: '# Local ticket smoke test\n\nThis record is deleted by the smoke test.',
	coverUrl: null,
	category: 'test',
	tags: ['smoke-test'],
	publishedAt: new Date().toISOString(),
	source: { summary: 'Local isolated database smoke test', evidenceIds: [], generator: 'smoke-test-local-agent.mjs' }
})

try {
	const ticket = await issueTicket()
	const first = await requestFor(ticket, body)
	assert.equal(first.status, 202)
	const firstBody = await first.json()
	assert.equal(firstBody.status, 'pending')
	submissionIds.push(firstBody.id)

	const repeated = await requestFor(ticket, body)
	assert.equal(repeated.status, 401)

	const concurrentTicket = await issueTicket()
	const concurrent = await Promise.all([requestFor(concurrentTicket, body), requestFor(concurrentTicket, body)])
	assert.deepEqual(
		concurrent.map(response => response.status).sort((left, right) => left - right),
		[202, 401]
	)
	const concurrentSuccess = concurrent.find(response => response.status === 202)
	const concurrentBody = await concurrentSuccess.json()
	submissionIds.push(concurrentBody.id)

	const expiredTicket = await issueTicket({ expiresAt: new Date(Date.now() - 1000) })
	assert.equal((await requestFor(expiredTicket, body)).status, 401)

	const revokedTicket = await issueTicket({ revokedAt: new Date() })
	assert.equal((await requestFor(revokedTicket, body)).status, 401)

	const missing = await fetch(`${apiOrigin}${endpointPath}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', 'Idempotency-Key': `post:missing:${randomBytes(12).toString('hex')}` },
		body
	})
	assert.equal(missing.status, 401)

	const queued = await pool.query('select status, agent_key_id, submission_ticket_id from content_submissions where id = any($1::text[])', [submissionIds])
	assert.equal(queued.rowCount, 2)
	for (const row of queued.rows) {
		assert.equal(row.status, 'pending')
		assert.equal(row.agent_key_id, null)
		assert.ok(row.submission_ticket_id)
	}

	const stored = await pool.query('select token_hash from submission_tickets where id = $1', [ticketIds[0]])
	assert.notEqual(stored.rows[0].token_hash, ticket)
	assert.equal(stored.rows[0].token_hash, hashSubmissionTicket(ticket))

	const unauthorizedApproval = await fetch(`${apiOrigin}/api/admin/review/${submissionIds[0]}/approve`, {
		method: 'POST',
		headers: { Origin: apiOrigin }
	})
	assert.equal(unauthorizedApproval.status, 401)

	console.log('Local one-time-ticket smoke test passed: single use, expiry, revocation, concurrency, pending queue, and admin boundary verified.')
} finally {
	if (submissionIds.length > 0) {
		await pool.query("delete from audit_events where target_type = 'content-submission' and target_id = any($1::text[])", [submissionIds])
		await pool.query('delete from content_submissions where id = any($1::text[])', [submissionIds])
	}
	if (ticketIds.length > 0) {
		await pool.query("delete from audit_events where target_type = 'submission-ticket' and target_id = any($1::text[])", [ticketIds.map(String)])
		await pool.query('delete from submission_tickets where id = any($1::bigint[])', [ticketIds])
	}
	await pool.end()
}
