'use client'
import { useMarkdownRender } from '@/hooks/use-markdown-render'
import type { AgentPostSubmission } from '@/lib/agent-submission-validation'
export default function MarkdownPreview({ payload }: { payload: AgentPostSubmission }) {
	const { content, loading } = useMarkdownRender(payload.contentMd)
	return (
		<article className='bg-article min-h-[360px] rounded-xl border p-6'>
			<h1 className='text-2xl font-semibold'>{payload.title}</h1>
			<p className='text-secondary mt-2 text-sm'>{payload.summary}</p>
			{loading ? <p className='text-secondary mt-8 text-sm'>渲染中...</p> : <div className='prose mt-6'>{content}</div>}
		</article>
	)
}
