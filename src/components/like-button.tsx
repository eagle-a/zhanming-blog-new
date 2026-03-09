import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Heart } from 'lucide-react'
import clsx from 'clsx'
import { cn } from '@/lib/utils'
import { toast } from 'sonner' // 推荐用toast提示，无依赖可换alert

type LikeButtonProps = {
	slug?: string
	className?: string
	delay?: number
	initialCount?: number
}

// 补充2次、3次点赞提示，覆盖更多节点
const LIKE_TIPS = {
	1: "感谢你的第一次点赞 ❤️",
	2: "第二次心动！谢谢你的喜欢 💓",
	3: "三连赞啦！太给力了 ✨",
	5: "太棒了！第5次点赞，你是真爱粉～",
	10: "哇！第10次点赞，太感谢你的支持啦 🎉",
	20: "天呐！20次点赞，你就是我的超级粉丝 💖",
	50: "50次点赞达成！这份心意我收下啦 🥰"
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

	// 获取当前点赞数对应的提示文案
	const getLikeTip = (currentCount: number) => {
		// 精准匹配当前次数的提示
		return LIKE_TIPS[currentCount as keyof typeof LIKE_TIPS] || null
	}

	const handleLike = useCallback(() => {
		// 1. 计算新的点赞数
		const newCount = count + 1
		
		// 2. 更新状态
		setLiked(true)
		setJustLiked(true)
		setCount(newCount)

		// 3. 创建粒子效果
		const newParticles = Array.from({ length: 6 }, (_, i) => ({
			id: Date.now() + i,
			x: Math.random() * 60 - 30,
			y: Math.random() * 60 - 30
		}))
		setParticles(newParticles)

		// 4. 清除粒子
		setTimeout(() => setParticles([]), 1000)
		
		// 5. 显示对应次数的提示（包含2、3次）
		const tip = getLikeTip(newCount)
		if (tip) {
			// 方式1：使用toast轻提示（推荐）
			toast.success(tip)
			// 方式2：无toast库时用alert
			// alert(tip)
		}

		console.log(`[LocalLike] 点赞成功，当前计数: ${newCount}`);
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