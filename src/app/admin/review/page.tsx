import type { Metadata } from 'next'
import ReviewClient from './review-client'

export const metadata: Metadata = {
	title: 'AI 投稿审批',
	robots: { index: false, follow: false }
}

export default function ReviewPage() {
	return <ReviewClient />
}
