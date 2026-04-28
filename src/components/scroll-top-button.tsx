'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'motion/react'
import TopSVG from '@/svgs/top.svg'
import { cn } from '@/lib/utils'

type ScrollTopButtonProps = {
	className?: string
	delay?: number
}

export function ScrollTopButton({ className, delay }: ScrollTopButtonProps) {
	const [show, setShow] = useState(false)
	const [active, setActive] = useState(false)
	useEffect(() => {
		setTimeout(() => setShow(true), delay || 1000)
	}, [delay])

	useEffect(() => {
		const handleScroll = () => {
			setActive(window.scrollY > 200)
		}
		handleScroll()
		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	if (!show || !active) return null

	const handleClick = useCallback(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
		setTimeout(() => setActive(false), 1000)
	}, [])

	return (
		<motion.button
			initial={{ opacity: 0, scale: 0.4 }}
			animate={{ opacity: 1, scale: 1 }}
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			onClick={handleClick}
			aria-label='Scroll to top'
			className={cn('card text-secondary static flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm', className)}>
			<TopSVG className='w-5' />
			<span>顶部</span>
		</motion.button>
	)
}
