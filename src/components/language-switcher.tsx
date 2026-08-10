'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useLanguage } from '@/i18n/context'
import { Language } from '@/i18n/types'
import { Globe } from 'lucide-react'

const languages: { code: Language; label: string; flag: string }[] = [
	{ code: 'zh-CN', label: '简体中文', flag: '🇨🇳' },
	{ code: 'en', label: 'English', flag: '🇺🇸' },
	{ code: 'zh-TW', label: '繁體中文', flag: '🇹🇼' },
	{ code: 'ja', label: '日本語', flag: '🇯🇵' },
	{ code: 'ko', label: '한국어', flag: '🇰🇷' }
]

export default function LanguageSwitcher() {
	const { language, setLanguage, t } = useLanguage()
	const [isOpen, setIsOpen] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)

	// 点击外部关闭下拉菜单
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				setIsOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	const currentLanguage = languages.find(lang => lang.code === language)

	const handleLanguageChange = (lang: Language) => {
		setLanguage(lang)
		setIsOpen(false)
	}

	return (
		<div ref={containerRef} className='relative'>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className='text-primary/80 hover:bg-primary/5 hover:text-primary flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors'
				title='切换语言'>
				<Globe className='h-4 w-4' />
				<span>language</span>
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: -8, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -8, scale: 0.95 }}
						transition={{ duration: 0.15 }}
						className='border-border/50 bg-card/95 absolute top-full right-0 z-50 mt-2 min-w-[140px] overflow-hidden rounded-xl border p-1 shadow-lg backdrop-blur-md'>
						{languages.map(lang => (
							<button
								key={lang.code}
								onClick={() => handleLanguageChange(lang.code)}
								className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
									language === lang.code ? 'bg-brand/10 text-brand font-medium' : 'text-primary/80 hover:bg-primary/5 hover:text-primary'
								}`}>
								<span>{lang.flag}</span>
								<span>{lang.label}</span>
								{language === lang.code && <motion.div layoutId='activeLanguage' className='bg-brand ml-auto h-1.5 w-1.5 rounded-full' />}
							</button>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
