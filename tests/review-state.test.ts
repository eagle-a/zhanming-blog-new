import assert from 'node:assert/strict'
import test from 'node:test'
import { createReviewDraft, isReviewDirty, receiveReviewDraft, reviewPayload, type Submission } from '../src/app/admin/review/review-state.ts'
import { reviewRejectSchema, reviewUpdateSchema, reviewVersionSchema, reviewListQuerySchema } from '../src/lib/review-validation.ts'

const source: Submission = {
	id: 'submission-a',
	type: 'post',
	status: 'pending',
	contentHash: 'a'.repeat(64),
	payload: {
		title: 'Test',
		slug: 'test',
		summary: '',
		contentMd: 'Original',
		tags: ['one'],
		category: null,
		coverUrl: '',
		publishedAt: '2026-09-14T00:00:00Z'
	},
	validationResult: [],
	createdAt: '2026-09-14T00:00:00Z',
	updatedAt: '2026-09-14T00:00:00Z',
	agentName: null
}

test('repeated polls preserve unchanged draft identity', () => {
	const draft = createReviewDraft(source)
	assert.equal(receiveReviewDraft(draft, structuredClone(source), false), draft)
})

test('polling never replaces unsaved edits even when the server version changes', () => {
	const draft = { ...createReviewDraft(source), payload: { ...source.payload, contentMd: 'Unsaved work' } }
	assert.equal(isReviewDirty(draft), true)
	const newer = { ...source, contentHash: 'b'.repeat(64), payload: { ...source.payload, contentMd: 'Other window' } }
	assert.equal(receiveReviewDraft(draft, newer, false), draft)
	assert.equal(draft.source.contentHash, source.contentHash)
})

test('clean drafts adopt server edits, but never during a mutation', () => {
	const draft = createReviewDraft(source)
	const newer = { ...source, contentHash: 'b'.repeat(64), payload: { ...source.payload, title: 'New title' } }
	assert.equal(receiveReviewDraft(draft, newer, true), draft)
	assert.equal(receiveReviewDraft(draft, newer, false).payload.title, 'New title')
})

test('unfinished tag separators remain editable and are normalized only on save', () => {
	const draft = { ...createReviewDraft(source), tagsText: 'one, ' }
	assert.equal(isReviewDirty(draft), true)
	assert.equal(receiveReviewDraft(draft, structuredClone(source), false).tagsText, 'one, ')
	assert.deepEqual(reviewPayload({ ...draft, tagsText: 'one, two， 三, ' }).tags, ['one', 'two', '三'])
})

test('explicit selection initializes a different submission and saved drafts become clean', () => {
	const dirty = { ...createReviewDraft(source), tagsText: 'unsaved,' }
	const next = { ...source, id: 'submission-b' }
	const draft = receiveReviewDraft(dirty, next, false)
	assert.equal(draft.source.id, next.id)
	assert.equal(isReviewDirty(draft), false)
})

test('review mutations require an exact server content hash', () => {
	assert.equal(reviewVersionSchema.safeParse({}).success, false)
	assert.equal(reviewVersionSchema.safeParse({ expectedContentHash: 'old-version' }).success, false)
	assert.equal(reviewVersionSchema.safeParse({ expectedContentHash: source.contentHash }).success, true)
	assert.equal(reviewUpdateSchema.safeParse(source.payload).success, false)
	assert.equal(reviewUpdateSchema.safeParse({ expectedContentHash: source.contentHash, payload: source.payload }).success, true)
})

test('rejection validates nonblank reason, upper bound, and version', () => {
	const version = { expectedContentHash: source.contentHash }
	assert.equal(reviewRejectSchema.safeParse({ ...version, reason: ' ' }).success, false)
	assert.equal(reviewRejectSchema.safeParse({ ...version, reason: 'x'.repeat(2001) }).success, false)
	assert.equal(reviewRejectSchema.parse({ ...version, reason: ' Please add sources ' }).reason, 'Please add sources')
})

test('review pagination bounds page size and validates precise compound cursors', () => {
	assert.equal(reviewListQuerySchema.parse({}).limit, 20)
	for (const limit of ['0', '51', '1.5', 'oops']) assert.equal(reviewListQuerySchema.safeParse({ limit }).success, false)
	for (const cursor of ['bad-json', '{}', JSON.stringify({ createdAt: 'invalid', id: 'a' })])
		assert.equal(reviewListQuerySchema.safeParse({ cursor }).success, false)
	const cursor = { createdAt: '2026-09-14T00:00:00.000001Z', id: 'a' }
	assert.deepEqual(reviewListQuerySchema.parse({ cursor: JSON.stringify(cursor) }).cursor, cursor)
})
