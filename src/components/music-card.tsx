'use client'

import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import Card from '@/components/card'
import { useCenterStore } from '@/hooks/use-center'
import { useConfigStore } from '../app/(home)/stores/config-store'
import { CARD_SPACING } from '@/consts'
import MusicSVG from '@/svgs/music.svg'
import PlaySVG from '@/svgs/play.svg'
import { HomeDraggableLayer } from '../app/(home)/home-draggable-layer'
import { Pause, ChevronLeft, ChevronRight } from 'lucide-react'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { MUSIC_LIST } from '@/config/music-list'

export default function MusicCard() {
	const pathname = usePathname()
	const center = useCenterStore()
	const { cardStyles, siteContent } = useConfigStore()
	const styles = cardStyles.musicCard
	const hiCardStyles = cardStyles.hiCard
	const clockCardStyles = cardStyles.clockCard
	const calendarCardStyles = cardStyles.calendarCard

	const [isPlaying, setIsPlaying] = useState(false)
	const [hasStarted, setHasStarted] = useState(false)
	const [currentIndex, setCurrentIndex] = useState(0)
	const [progress, setProgress] = useState(0)
	const audioRef = useRef<HTMLAudioElement | null>(null)
	const currentIndexRef = useRef(0)
	const isPlayingRef = useRef(false)

	const isHomePage = pathname === '/'

	// 当前歌曲
	const currentMusic = MUSIC_LIST[currentIndex]

	const position = useMemo(() => {
		// If not on home page, always position at bottom-right corner when playing
		if (!isHomePage) {
			return {
				x: center.width - styles.width - 16,
				y: center.height - styles.height - 16
			}
		}

		// Default position on home page
		return {
			x: styles.offsetX !== null ? center.x + styles.offsetX : center.x + CARD_SPACING + hiCardStyles.width / 2 - styles.offset,
			y: styles.offsetY !== null ? center.y + styles.offsetY : center.y - clockCardStyles.offset + CARD_SPACING + calendarCardStyles.height + CARD_SPACING
		}
	}, [isHomePage, center, styles, hiCardStyles, clockCardStyles, calendarCardStyles])

	const { x, y } = position

	// Create the media element only after an explicit user action. Merely visiting
	// a route must not start fetching the first multi-megabyte track.
	useEffect(() => {
		if (!hasStarted) return
		const audio = new Audio()
		audio.preload = 'none'
		audio.loop = false
		audio.src = `/music/${MUSIC_LIST[currentIndexRef.current].id}.mp3`
		audioRef.current = audio

		const updateProgress = () => {
			if (audio.duration) {
				setProgress((audio.currentTime / audio.duration) * 100)
			}
		}

		const handleEnded = () => {
			// 歌曲结束自动播放下一首
			setCurrentIndex(prev => {
				const newIndex = (prev + 1) % MUSIC_LIST.length
				currentIndexRef.current = newIndex
				return newIndex
			})
		}

		const handleTimeUpdate = () => {
			updateProgress()
		}

		const handleLoadedMetadata = () => {
			updateProgress()
		}

		audio.addEventListener('timeupdate', handleTimeUpdate)
		audio.addEventListener('ended', handleEnded)
		audio.addEventListener('loadedmetadata', handleLoadedMetadata)

		return () => {
			audio.removeEventListener('timeupdate', handleTimeUpdate)
			audio.removeEventListener('ended', handleEnded)
			audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
			audio.pause()
			audio.removeAttribute('src')
			audio.load()
			audioRef.current = null
		}
	}, [hasStarted])

	// Handle currentIndex change - load new audio
	useEffect(() => {
		currentIndexRef.current = currentIndex
		const audio = audioRef.current
		if (!audio) return
		audio.pause()
		audio.src = `/music/${currentMusic.id}.mp3`
		audio.loop = false
		setProgress(0)

		if (isPlayingRef.current) {
			audio.play().catch(console.error)
		}
	}, [currentIndex, currentMusic])

	// Handle play/pause state change
	useEffect(() => {
		isPlayingRef.current = isPlaying
		if (!audioRef.current) return

		if (isPlaying) {
			audioRef.current.play().catch(console.error)
		} else {
			audioRef.current.pause()
		}
	}, [hasStarted, isPlaying])

	const togglePlayPause = () => {
		setHasStarted(true)
		setIsPlaying(previous => !previous)
	}

	// 上一首
	const handlePrev = useCallback(() => {
		setCurrentIndex(prev => {
			const newIndex = prev === 0 ? MUSIC_LIST.length - 1 : prev - 1
			currentIndexRef.current = newIndex
			return newIndex
		})
	}, [])

	// 下一首
	const handleNext = useCallback(() => {
		setCurrentIndex(prev => {
			const newIndex = (prev + 1) % MUSIC_LIST.length
			currentIndexRef.current = newIndex
			return newIndex
		})
	}, [])

	// Hide component if not on home page and not playing
	if (!isHomePage && !isPlaying) {
		return null
	}

	return (
		<HomeDraggableLayer cardKey='musicCard' x={x} y={y} width={styles.width} height={styles.height}>
			<Card order={styles.order} width={styles.width} height={styles.height} x={x} y={y} className={clsx('flex items-center gap-3', !isHomePage && 'fixed')}>
				{siteContent.enableChristmas && (
					<>
						<img
							src='/images/christmas/snow-10.webp'
							alt='Christmas decoration'
							className='pointer-events-none absolute'
							style={{ width: 120, left: -8, top: -12, opacity: 0.8 }}
						/>
						<img
							src='/images/christmas/snow-11.webp'
							alt='Christmas decoration'
							className='pointer-events-none absolute'
							style={{ width: 80, right: -10, top: -12, opacity: 0.8 }}
						/>
					</>
				)}

				<MusicSVG className='h-8 w-8 shrink-0' />

				<div className='min-w-0 flex-1'>
					<div className='text-secondary truncate text-sm' title={currentMusic.name}>
						{currentMusic.name}
					</div>

					<div className='mt-1 h-2 rounded-full bg-white/60'>
						<div className='bg-linear h-full rounded-full transition-all duration-300' style={{ width: `${progress}%` }} />
					</div>
				</div>

				{/* 切换按钮组 */}
				<div className='flex items-center gap-1'>
					<button
						onClick={handlePrev}
						aria-label='上一首'
						className='flex h-7 w-7 items-center justify-center rounded-full bg-white/80 transition-opacity hover:opacity-80'
						title='上一首'>
						<ChevronLeft className='text-brand h-4 w-4' />
					</button>

					<button
						onClick={togglePlayPause}
						aria-label={isPlaying ? '暂停' : '播放'}
						title={isPlaying ? '暂停' : '播放'}
						className='flex h-10 w-10 items-center justify-center rounded-full bg-white transition-opacity hover:opacity-80'>
						{isPlaying ? <Pause className='text-brand h-4 w-4' /> : <PlaySVG className='text-brand ml-1 h-4 w-4' />}
					</button>

					<button
						onClick={handleNext}
						aria-label='下一首'
						className='flex h-7 w-7 items-center justify-center rounded-full bg-white/80 transition-opacity hover:opacity-80'
						title='下一首'>
						<ChevronRight className='text-brand h-4 w-4' />
					</button>
				</div>
			</Card>
		</HomeDraggableLayer>
	)
}
