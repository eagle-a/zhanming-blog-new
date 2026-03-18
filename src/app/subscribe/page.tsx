'use client'

import { motion } from 'motion/react'
import { Rss, Copy, Check, ExternalLink, BookOpen, Globe, Smartphone } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import siteContent from '@/config/site-content.json'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://eagle-a.github.io'
const RSS_URL = `${SITE_URL}/rss.xml`

const rssReaders = [
	{
		name: 'Feedly',
		description: '最受欢迎的 RSS 阅读器，支持 Web、iOS、Android',
		url: 'https://feedly.com',
		icon: Globe,
		color: 'bg-green-500'
	},
	{
		name: 'Inoreader',
		description: '功能强大的 RSS 阅读器，免费版即可满足大部分需求',
		url: 'https://www.inoreader.com',
		icon: BookOpen,
		color: 'bg-blue-500'
	},
	{
		name: 'Reeder',
		description: 'iOS/macOS 上最受欢迎的 RSS 阅读器',
		url: 'https://reederapp.com',
		icon: Smartphone,
		color: 'bg-purple-500'
	},
	{
		name: 'NetNewsWire',
		description: '免费开源的 RSS 阅读器，支持 macOS 和 iOS',
		url: 'https://netnewswire.com',
		icon: Rss,
		color: 'bg-orange-500'
	}
]

const subscribeMethods = [
	{
		step: 1,
		title: '复制 RSS 链接',
		description: '点击下方的复制按钮，将 RSS 链接复制到剪贴板'
	},
	{
		step: 2,
		title: '选择 RSS 阅读器',
		description: '从右侧推荐的阅读器中选择一个，或使用你喜欢的阅读器'
	},
	{
		step: 3,
		title: '添加订阅',
		description: '在阅读器中添加新的订阅，粘贴刚才复制的 RSS 链接'
	}
]

export default function SubscribePage() {
	const [copied, setCopied] = useState(false)
	const siteTitle = siteContent.meta?.title || '博客'

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(RSS_URL)
			setCopied(true)
			toast.success('RSS 链接已复制到剪贴板')
			setTimeout(() => setCopied(false), 2000)
		} catch {
			// 降级方案
			const textArea = document.createElement('textarea')
			textArea.value = RSS_URL
			textArea.style.position = 'fixed'
			textArea.style.left = '-9999px'
			document.body.appendChild(textArea)
			textArea.select()
			try {
				document.execCommand('copy')
				setCopied(true)
				toast.success('RSS 链接已复制到剪贴板')
				setTimeout(() => setCopied(false), 2000)
			} catch {
				toast.error('复制失败，请手动复制')
			}
			document.body.removeChild(textArea)
		}
	}

	return (
		<div className='flex min-h-screen flex-col items-center px-6 py-24'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className='mb-12 text-center'>
				<div className='mb-6 inline-flex items-center justify-center rounded-2xl bg-orange-500 p-4'>
					<Rss className='h-12 w-12 text-white' />
				</div>
				<h1 className='mb-4 text-3xl font-bold text-primary'>订阅 {siteTitle}</h1>
				<p className='max-w-md text-secondary'>
					通过 RSS 订阅，你可以第一时间获取博客更新。选择你喜欢的 RSS 阅读器，开始订阅吧！
				</p>
			</motion.div>

			{/* RSS 链接卡片 */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1 }}
				className='card mb-12 w-full max-w-2xl p-6'>
				<div className='mb-4 flex items-center gap-3'>
					<Rss className='h-5 w-5 text-orange-500' />
					<span className='font-medium text-primary'>RSS 订阅链接</span>
				</div>
				<div className='flex items-center gap-3 rounded-xl bg-gray-50 p-4 dark:bg-gray-800'>
					<code className='flex-1 truncate text-sm text-secondary'>{RSS_URL}</code>
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={handleCopy}
						className='flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand/90'>
						{copied ? <Check className='h-4 w-4' /> : <Copy className='h-4 w-4' />}
						{copied ? '已复制' : '复制'}
					</motion.button>
					<motion.a
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						href={RSS_URL}
						target='_blank'
						rel='noopener noreferrer'
						className='flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'>
						<ExternalLink className='h-4 w-4' />
						查看
					</motion.a>
				</div>
			</motion.div>

			{/* 订阅步骤和推荐阅读器 */}
			<div className='grid w-full max-w-4xl gap-8 md:grid-cols-2'>
				{/* 订阅步骤 */}
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.2 }}
					className='card p-6'>
					<h2 className='mb-6 text-xl font-bold text-primary'>如何订阅</h2>
					<div className='space-y-6'>
						{subscribeMethods.map((method, index) => (
							<div key={method.step} className='flex gap-4'>
								<div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white'>
									{method.step}
								</div>
								<div>
									<h3 className='mb-1 font-medium text-primary'>{method.title}</h3>
									<p className='text-sm text-secondary'>{method.description}</p>
								</div>
							</div>
						))}
					</div>
				</motion.div>

				{/* 推荐阅读器 */}
				<motion.div
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.3 }}
					className='card p-6'>
					<h2 className='mb-6 text-xl font-bold text-primary'>推荐 RSS 阅读器</h2>
					<div className='space-y-4'>
						{rssReaders.map((reader) => (
							<motion.a
								key={reader.name}
								href={reader.url}
								target='_blank'
								rel='noopener noreferrer'
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								className='flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 transition-all hover:border-gray-200 hover:shadow-sm dark:border-gray-800 dark:bg-gray-800/50'>
								<div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${reader.color}`}>
									<reader.icon className='h-6 w-6 text-white' />
								</div>
								<div className='flex-1'>
									<h3 className='font-medium text-primary'>{reader.name}</h3>
									<p className='text-sm text-secondary'>{reader.description}</p>
								</div>
								<ExternalLink className='h-4 w-4 text-gray-400' />
							</motion.a>
						))}
					</div>
				</motion.div>
			</div>

			{/* 底部提示 */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.4 }}
				className='mt-12 text-center text-sm text-secondary'>
				<p>RSS（Really Simple Syndication）是一种内容聚合格式，让你可以方便地跟踪多个网站的更新。</p>
				<p className='mt-2'>订阅后，新文章会自动推送到你的阅读器中。</p>
			</motion.div>
		</div>
	)
}
