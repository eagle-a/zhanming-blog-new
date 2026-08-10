'use client'

import { useMarkdownRender } from '@/hooks/use-markdown-render'

export function AboutPreview({ title, description, content }: { title: string; description: string; content: string }) {
	const rendered = useMarkdownRender(content)

	return (
		<div className='space-y-6'>
			<div className='text-center'>
				<h1 className='mb-4 text-4xl font-bold'>{title || '标题预览'}</h1>
				<p className='text-secondary text-lg'>{description || '描述预览'}</p>
			</div>

			{rendered.loading ? (
				<div className='text-secondary text-center'>预览渲染中...</div>
			) : (
				<div className='card relative p-6'>
					<div className='prose prose-sm max-w-none'>{rendered.content}</div>
				</div>
			)}
		</div>
	)
}
