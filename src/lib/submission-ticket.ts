import { createHash, randomBytes } from 'node:crypto'

const SUBMISSION_TICKET_PREFIX = 'zbt_'
const SUBMISSION_TICKET_PATTERN = /^zbt_[A-Za-z0-9_-]{43}$/

export function createSubmissionTicketToken(): string {
	return `${SUBMISSION_TICKET_PREFIX}${randomBytes(32).toString('base64url')}`
}

export function hashSubmissionTicket(token: string): string {
	return createHash('sha256').update(token, 'utf8').digest('hex')
}

export function isSubmissionTicket(token: string): boolean {
	return SUBMISSION_TICKET_PATTERN.test(token)
}

export function readSubmissionTicketAuthorization(request: Request): string {
	const authorization = request.headers.get('authorization') || ''
	const match = /^Bearer ([^\s]+)$/.exec(authorization)
	if (!match || !isSubmissionTicket(match[1])) throw new Response('Unauthorized', { status: 401 })
	return match[1]
}
