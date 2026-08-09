import type { Metadata } from 'next'
import { AdminLoginGate } from '@/components/admin-login-gate'
import { hasAdminPageSession } from '@/lib/admin-page-auth'
import ReviewClient from './review-client'

export const metadata: Metadata = {
	title: 'AI 投稿审批',
	robots: { index: false, follow: false }
}

export default async function ReviewPage() {
	return (await hasAdminPageSession()) ? <ReviewClient /> : <AdminLoginGate title='AI 投稿审批' />
}
