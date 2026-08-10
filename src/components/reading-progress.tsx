'use client'

import { useEffect, useRef, useState } from 'react'

export function ReadingProgress() {
	const [progress, setProgress] = useState(0)
	const rafRef = useRef<number | null>(null)

	useEffect(() => {
		const article = document.querySelector('[data-published-article] article')
		if (!article) return

		const update = () => {
			rafRef.current = null
			const rect = article.getBoundingClientRect()
			const articleTop = rect.top + window.scrollY
			const articleHeight = rect.height
			const viewportHeight = window.innerHeight
			const scrolled = window.scrollY - articleTop + viewportHeight * 0.3
			const total = articleHeight - viewportHeight * 0.3
			// Short article fully visible: treat as 100% read
			const ratio = total <= 0 ? 1 : Math.min(1, Math.max(0, scrolled / total))
			setProgress(ratio * 100)
		}

		const onScroll = () => {
			if (rafRef.current !== null) return
			rafRef.current = requestAnimationFrame(update)
		}

		update()
		window.addEventListener('scroll', onScroll, { passive: true })
		window.addEventListener('resize', onScroll)
		return () => {
			window.removeEventListener('scroll', onScroll)
			window.removeEventListener('resize', onScroll)
			if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
		}
	}, [])

	return (
		<div className='fixed inset-x-0 top-0 z-50 h-[3px] bg-transparent'>
			<div className='bg-brand h-full transition-[width] duration-75 ease-out' style={{ width: `${progress}%` }} />
		</div>
	)
}
