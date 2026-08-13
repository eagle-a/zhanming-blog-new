// src/components/TwikooComments.jsx
'use client'
import { useEffect, useRef } from 'react'
import { preconnect } from 'react-dom'
import { useConfigStore } from '@/app/(home)/stores/config-store'
import { useLanguage } from '@/i18n/context'

export default function TwikooComments({ path }) {
	const containerRef = useRef(null)
	const { siteContent } = useConfigStore()
	const { language } = useLanguage()
	const envId = siteContent.twikoo?.envId || ''
	const region = siteContent.twikoo?.region || 'ap-guangzhou'

	if (envId) preconnect(envId, { crossOrigin: 'anonymous' })

	useEffect(() => {
		if (!envId || !containerRef.current) return

		// 动态加载 Twikoo
		const loadTwikoo = async () => {
			try {
				const twikoo = await import('twikoo')
				// Twikoo 导出方式为默认导出，直接调用即可
				const init = twikoo.default || twikoo

				if (typeof init === 'function') {
					await init({
						el: containerRef.current,
						envId,
						path: path || window.location.pathname,
						lang: language === 'zh-CN' ? 'zh-CN' : language,
						region
					})
				} else {
					console.error('Twikoo init 函数未找到', twikoo)
				}
			} catch (error) {
				console.error('Twikoo 加载失败:', error)
			}
		}

		loadTwikoo()

		return () => {
			if (containerRef.current) {
				containerRef.current.innerHTML = ''
			}
		}
	}, [envId, language, path, region])

	return (
		<div className='twikoo-comments relative'>
			<div className='comment-loading text-secondary flex min-h-32 items-center justify-center text-sm' role='status'>
				正在连接评论服务…
			</div>
			<div ref={containerRef} />
		</div>
	)
}
