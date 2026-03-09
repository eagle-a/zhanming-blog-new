import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Heart } from 'lucide-react'
import clsx from 'clsx'
import { cn } from '@/lib/utils'

type LikeButtonProps = {
	slug?: string // 保留参数以兼容调用，但实际不再使用
	className?: string
	delay?: number
	initialCount?: number // 可选：初始显示的数字，默认 0
}

export default function LikeButton({ 
	slug, 
	delay, 
	className, 
	initialCount = 0 
}: LikeButtonProps) {
	
	const [count, setCount] = useState(initialCount)
	const [liked, setLiked] = useState(false)
	const [show, setShow] = useState(false)
	const [justLiked, setJustLiked] = useState(false)
	const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])

	// 延迟显示组件
	useEffect(() => {
		const timer = setTimeout(() => {
			setShow(true)
		}, delay || 1000)
		return () => clearTimeout(timer)
	}, [delay])

	// 点赞动画计时器
	useEffect(() => {
		if (justLiked) {
			const timer = setTimeout(() => setJustLiked(false), 600)
			return () => clearTimeout(timer)
		}
	}, [justLiked])

	const handleLike = useCallback(() => {
		// 1. 更新状态
		setLiked(true)
		setJustLiked(true)
		setCount(prev => prev + 1)

		// 2. 创建粒子效果
		const newParticles = Array.from({ length: 6 }, (_, i) => ({
			id: Date.now() + i,
			x: Math.random() * 60 - 30,
			y: Math.random() * 60 - 30
		}))
		setParticles(newParticles)

		// 3. 清除粒子
		setTimeout(() => setParticles([]), 1000)
		
		// 这里不再有网络请求，所以不需要 try-catch fetch
		// console.log(`[LocalLike] 点赞成功，当前计数: ${count + 1}`);
	}, [count])

	if (!show) return null;

	return (
		<motion.button
			initial={{ opacity: 0, scale: 0.6 }}
			animate={{ opacity: 1, scale: 1 }}
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			aria-label='Like this post'
			onClick={handleLike}
			className={clsx('card heartbeat-container relative overflow-visible rounded-full p-3', className)}>
			
			<AnimatePresence>
				{particles.map(particle => (
					<motion.div
						key={particle.id}
						className='pointer-events-none absolute inset-0 flex items-center justify-center'
						initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
						animate={{
							opacity: [1, 1, 0],
							scale: [0, 1.2, 0.8],
							x: particle.x,
							y: particle.y
						}}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.8, ease: 'easeOut' }}>
						<Heart className='fill-rose-400 text-rose-400' size={12} />
					</motion.div>
				))}
			</AnimatePresence>

			{/* 数字徽章 */}
			<motion.span
				initial={{ scale: 0.4 }}
				animate={{ scale: 1 }}
				className={cn(
					'absolute -top-2 left-9 min-w-6 rounded-full px-1.5 py-1 text-center text-xs text-white tabular-nums',
					liked ? 'bg-rose-400' : 'bg-gray-300'
				)}>
				{count}
			</motion.span>

			{/* 爱心图标 */}
			<motion.div animate={justLiked ? { scale: [1, 1.4, 1], rotate: [0, -10, 10, 0] } : {}} transition={{ duration: 0.6, ease: 'easeOut' }}>
				<Heart className={clsx('heartbeat', liked ? 'fill-rose-400 text-rose-400' : 'fill-rose-200 text-rose-200')} size={28} />
			</motion.div>
		</motion.button>
	)
}