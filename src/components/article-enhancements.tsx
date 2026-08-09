'use client'

import { useEffect, useState } from 'react'
import { DialogModal } from '@/components/dialog-modal'
import { useReadArticles } from '@/hooks/use-read-articles'

export function ArticleEnhancements({ slug }: { slug: string }) {
	const { markAsRead } = useReadArticles()
	const [progress, setProgress] = useState(0)
	const [preview, setPreview] = useState<{ src: string; alt: string } | null>(null)

	useEffect(() => {
		markAsRead(slug)
	}, [markAsRead, slug])

	useEffect(() => {
		const handleScroll = () => {
			const height = document.documentElement.scrollHeight - window.innerHeight
			setProgress(height > 0 ? Math.min(100, Math.max(0, (window.scrollY / height) * 100)) : 0)
		}
		handleScroll()
		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	useEffect(() => {
		const article = document.querySelector<HTMLElement>('[data-published-article]')
		if (!article) return
		const cleanups: Array<() => void> = []

		for (const image of article.querySelectorAll<HTMLImageElement>('.prose img')) {
			image.loading = 'lazy'
			image.classList.add('cursor-pointer', 'transition-opacity', 'hover:opacity-80')
			const show = () => setPreview({ src: image.currentSrc || image.src, alt: image.alt || image.title || '' })
			image.addEventListener('click', show)
			cleanups.push(() => image.removeEventListener('click', show))
		}

		for (const wrapper of article.querySelectorAll<HTMLElement>('.code-block-wrapper')) {
			if (wrapper.querySelector('.code-block-copy-btn')) continue
			const pre = wrapper.querySelector<HTMLPreElement>('pre[data-code]')
			if (!pre) continue
			const button = document.createElement('button')
			button.type = 'button'
			button.className = 'code-block-copy-btn'
			button.setAttribute('aria-label', '复制代码')
			const renderIcon = (copied: boolean) => {
				button.innerHTML = copied
					? '<svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16"><path d="M20 6 9 17l-5-5" fill="none" stroke="currentColor" stroke-width="2"/></svg>'
					: '<svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16"><rect x="9" y="9" width="10" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" fill="none" stroke="currentColor" stroke-width="2"/></svg>'
			}
			const copy = async () => {
				await navigator.clipboard.writeText(pre.dataset.code || '')
				renderIcon(true)
				setTimeout(() => renderIcon(false), 2000)
			}
			renderIcon(false)
			button.addEventListener('click', copy)
			wrapper.append(button)
			cleanups.push(() => {
				button.removeEventListener('click', copy)
				button.remove()
			})
		}

		return () => cleanups.forEach(cleanup => cleanup())
	}, [])

	return (
		<>
			<div
				className='fixed top-0 left-0 z-50 h-[3px] bg-brand shadow-[0_1px_6px_rgba(0,0,0,0.18)] transition-[width] duration-150 ease-out'
				style={{ width: `${progress}%` }}
			/>
			<DialogModal open={Boolean(preview)} onClose={() => setPreview(null)} className='max-w-none bg-transparent p-0'>
				{preview && (
					<div className='flex flex-col items-center gap-3'>
						<img src={preview.src} alt={preview.alt} className='max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl' />
						{preview.alt && <span className='text-secondary text-sm'>{preview.alt}</span>}
					</div>
				)}
			</DialogModal>
		</>
	)
}
