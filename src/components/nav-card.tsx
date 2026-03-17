'use client'

import Card from '@/components/card'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { useCenterStore } from '@/hooks/use-center'
import { CARD_SPACING } from '@/consts'
import ScrollOutlineSVG from '@/svgs/scroll-outline.svg'
import ScrollFilledSVG from '@/svgs/scroll-filled.svg'
import ProjectsFilledSVG from '@/svgs/projects-filled.svg'
import ProjectsOutlineSVG from '@/svgs/projects-outline.svg'
import AboutFilledSVG from '@/svgs/about-filled.svg'
import AboutOutlineSVG from '@/svgs/about-outline.svg'
import ShareFilledSVG from '@/svgs/share-filled.svg'
import ShareOutlineSVG from '@/svgs/share-outline.svg'
import WebsiteFilledSVG from '@/svgs/website-filled.svg'
import WebsiteOutlineSVG from '@/svgs/website-outline.svg'
import CommentsOutlineSVG from '@/svgs/comments-outline.svg'
import CommentsFilledSVG from '@/svgs/comments-filled.svg'
import NewspaperOutlineSVG from '@/svgs/newspaper-outline.svg'
import NewspaperFilledSVG from '@/svgs/newspaper-filled.svg'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { cn } from '@/lib/utils'
import { useSize } from '@/hooks/use-size'
import { useConfigStore } from '@/app/(home)/stores/config-store'
import { HomeDraggableLayer } from '@/app/(home)/home-draggable-layer'
import { useLanguage } from '@/i18n/context'

const extraSize = 8

export default function NavCard() {
	const pathname = usePathname()
	const center = useCenterStore()
	const [show, setShow] = useState(false)
	const { maxSM } = useSize()
	const [hoveredIndex, setHoveredIndex] = useState<number>(0)
	const { siteContent, cardStyles } = useConfigStore()
	const { t } = useLanguage()
	const styles = cardStyles.navCard
	const hiCardStyles = cardStyles.hiCard

	const list = useMemo(() => [
		{
			icon: ScrollOutlineSVG,
			iconActive: ScrollFilledSVG,
			label: t('nav.blog') || '近期文章',
			href: '/blog'
		},
		{
			icon: ProjectsOutlineSVG,
			iconActive: ProjectsFilledSVG,
			label: t('nav.projects') || '我的项目',
			href: '/projects'
		},
		{
			icon: AboutOutlineSVG,
			iconActive: AboutFilledSVG,
			label: t('nav.links') || '关于',
			href: '/about'
		},
		{
			icon: CommentsOutlineSVG,
			iconActive: CommentsFilledSVG,
			label: t('nav.comments') || '留言评论',
			href: '/comments'
		},
		{
			icon: ShareOutlineSVG,
			iconActive: ShareFilledSVG,
			label: t('nav.share') || '推荐分享',
			href: '/share'
		},
		{
			icon: NewspaperOutlineSVG,
			iconActive: NewspaperFilledSVG,
			label: t('nav.juya') || 'AI日报',
			href: '/juya-ai-daily'
		}
	], [t])

	const activeIndex = useMemo(() => {
		const index = list.findIndex(item => pathname === item.href)
		return index >= 0 ? index : undefined
	}, [pathname, list])

	useEffect(() => {
		setShow(true)
	}, [])

	let form = useMemo(() => {
		if (pathname == '/') return 'full'
		else if (pathname == '/write') return 'mini'
		else return 'icons'
	}, [pathname])
	if (maxSM) form = 'icons'

	const itemHeight = form === 'full' ? 52 : 28

	let position = useMemo(() => {
		if (form === 'full') {
			const x = styles.offsetX !== null ? center.x + styles.offsetX : center.x - hiCardStyles.width / 2 - styles.width - CARD_SPACING
			const y = styles.offsetY !== null ? center.y + styles.offsetY : center.y + hiCardStyles.height / 2 - styles.height
			return { x, y }
		}

		return {
			x: 24,
			y: 16
		}
	}, [form, center, styles, hiCardStyles])

	const size = useMemo(() => {
		if (form === 'mini') return { width: 64, height: 64 }
		else if (form === 'icons') return { width: 380, height: 64 }
		else return { width: styles.width, height: styles.height }
	}, [form, styles])

	useEffect(() => {
		if (form === 'icons' && activeIndex !== undefined && hoveredIndex !== activeIndex) {
			const timer = setTimeout(() => {
				setHoveredIndex(activeIndex)
			}, 1500)
			return () => clearTimeout(timer)
		}
	}, [hoveredIndex, activeIndex, form])

	if (maxSM) position = { x: center.x - size.width / 2, y: 16 }

	// 渲染图标
	const renderIcon = (item: any, isHovered: boolean) => {
		// 检查是否是 Lucide 图标（函数组件）
		if (typeof item.icon === 'function') {
			const IconComponent = isHovered ? item.iconActive : item.icon
			return (
				<IconComponent
					className={cn('h-6 w-6', isHovered ? 'text-brand' : 'text-secondary')}
				/>
			)
		}

		// SVG 组件
		const IconComponent = isHovered ? item.iconActive : item.icon
		return <IconComponent className={cn('absolute h-7 w-7', isHovered ? 'text-brand' : '')} />
	}

	if (show)
		return (
			<HomeDraggableLayer cardKey='navCard' x={position.x} y={position.y} width={styles.width} height={styles.height}>
				<Card
					order={styles.order}
					width={size.width}
					height={size.height}
					x={position.x}
					y={position.y}
					className={clsx(form != 'full' && 'overflow-hidden', form === 'mini' && 'p-3', form === 'icons' && 'flex items-center gap-6 p-3')}>
					{form === 'full' && siteContent.enableChristmas && (
						<>
							<img
								src='/images/christmas/snow-4.webp'
								alt='Christmas decoration'
								className='pointer-events-none absolute'
								style={{ width: 160, left: -18, top: -20, opacity: 0.9 }}
							/>
						</>
					)}

					<Link className='flex items-center gap-3' href='/'>
						<Image
							src='/images/avatar.png'
							alt='avatar'
							width={40}
							height={40}
							loading='eager'
							priority
							style={{ boxShadow: ' 0 12px 20px -5px #E2D9CE' }}
							className='rounded-full'
						/>
						{form === 'full' && <span className='font-averia mt-1 text-2xl leading-none font-medium'>{siteContent.meta.title}</span>}
						{form === 'full' && <span className='text-brand mt-2 text-xs font-medium'>(开发中)</span>}
					</Link>

					{(form === 'full' || form === 'icons') && (
						<>
							{form !== 'icons' && <div className='text-secondary mt-6 text-sm uppercase'>General</div>}

							<div className={cn('relative mt-2 space-y-2', form === 'icons' && 'mt-0 flex items-center gap-6 space-y-0')}>
								<motion.div
									className='absolute max-w-[230px] rounded-full border'
									layoutId='nav-hover'
									initial={false}
									animate={
										form === 'icons'
											? {
													left: hoveredIndex * (itemHeight + 24) - extraSize,
													top: -extraSize,
													width: itemHeight + extraSize * 2,
													height: itemHeight + extraSize * 2
												}
											: { top: hoveredIndex * (itemHeight + 8), left: 0, width: '100%', height: itemHeight }
									}
									transition={{
										type: 'spring',
										stiffness: 400,
										damping: 30
									}}
									style={{ backgroundImage: 'linear-gradient(to right bottom, var(--color-border) 60%, var(--color-card) 100%)' }}
								/>

								{list.map((item, index) => (
									<Link
										key={item.href}
										href={item.href}
										className={cn('text-secondary text-md relative z-10 flex items-center gap-3 rounded-full px-5 py-3', form === 'icons' && 'p-0')}
										onMouseEnter={() => setHoveredIndex(index)}>
										<div className='flex h-7 w-7 items-center justify-center'>
											{renderIcon(item, hoveredIndex === index)}
										</div>
										{form !== 'icons' && (
											<span className={clsx('flex items-center gap-2', index === hoveredIndex && 'text-primary font-medium')}>
												{item.label}
												{item.isNew && (
													<span className='rounded-full bg-brand px-1.5 py-0.5 text-[10px] font-bold text-white'>
														NEW
													</span>
												)}
											</span>
										)}
									</Link>
								))}
							</div>
						</>
					)}
				</Card>
			</HomeDraggableLayer>
		)
}
