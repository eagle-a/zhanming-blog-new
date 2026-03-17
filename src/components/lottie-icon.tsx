'use client'

import { useEffect, useRef } from 'react'
import lottie from 'lottie-web'

interface LottieIconProps {
	animationData: unknown
	className?: string
}

export default function LottieIcon({ animationData, className }: LottieIconProps) {
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!containerRef.current) return

		const animation = lottie.loadAnimation({
			container: containerRef.current,
			renderer: 'svg',
			loop: true,
			autoplay: true,
			animationData: animationData
		})

		return () => {
			animation.destroy()
		}
	}, [animationData])

	return <div ref={containerRef} className={className} />
}
