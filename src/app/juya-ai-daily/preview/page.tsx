'use client'

import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Calendar, ExternalLink, Rss, ArrowLeft, Newspaper } from 'lucide-react'
import Link from 'next/link'

interface RSSItem {
  title: string
  link: string
  pubDate: string
  content: string
}

interface RSSChannel {
  title: string
  link: string
  description: string
  items: RSSItem[]
}

const RSS_URL = 'https://raw.githubusercontent.com/imjuya/juya-ai-daily/gh-pages/rss.xml'

export default function RSSPreviewPage() {
  const [channel, setChannel] = useState<RSSChannel | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchRSS = async () => {
      try {
        const response = await fetch(RSS_URL)
        const xmlText = await response.text()
        
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml')
        
        const channelEl = xmlDoc.querySelector('channel')
        if (!channelEl) {
          throw new Error('Invalid RSS format')
        }

        const items: RSSItem[] = []
        const itemElements = channelEl.querySelectorAll('item')
        
        itemElements.forEach((item) => {
          const title = item.querySelector('title')?.textContent || ''
          const link = item.querySelector('link')?.textContent || ''
          const pubDate = item.querySelector('pubDate')?.textContent || ''
          const content = item.querySelector('description')?.textContent || 
                         item.querySelector('content\\:encoded')?.textContent || ''
          
          items.push({ title, link, pubDate, content })
        })

        setChannel({
          title: channelEl.querySelector('title')?.textContent || 'AI早报',
          link: channelEl.querySelector('link')?.textContent || '',
          description: channelEl.querySelector('description')?.textContent || '',
          items
        })
      } catch (err) {
        setError('加载 RSS 失败，请稍后重试')
      } finally {
        setLoading(false)
      }
    }

    fetchRSS()
  }, [])

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr)
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'short'
      })
    } catch {
      return dateStr
    }
  }

  const parseContent = (content: string) => {
    // 简单的内容格式化
    return content
      .replace(/视频版：/g, '\n\n**视频版：**')
      .replace(/哔哩哔哩/g, '[哔哩哔哩]')
      .replace(/YouTube/g, '[YouTube]')
      .replace(/概览/g, '\n\n**概览**')
      .replace(/要闻/g, '\n\n**要闻**')
      .replace(/模型发布/g, '\n\n**模型发布**')
      .replace(/开发生态/g, '\n\n**开发生态**')
      .replace(/产品应用/g, '\n\n**产品应用**')
      .replace(/行业动态/g, '\n\n**行业动态**')
      .replace(/技术与洞察/g, '\n\n**技术与洞察**')
      .replace(/前瞻与传闻/g, '\n\n**前瞻与传闻**')
      .replace(/↗ #\d+/g, '')
      .trim()
  }

  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center pt-32'>
        <div className='text-center'>
          <div className='mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-brand border-t-transparent'></div>
          <p className='text-secondary'>加载中...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex min-h-screen items-center justify-center pt-32'>
        <div className='text-center'>
          <p className='text-red-500'>{error}</p>
          <Link href='/juya-ai-daily' className='mt-4 inline-block text-brand hover:underline'>
            返回 AI 早报
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen px-6 pt-32 pb-12 max-sm:px-0'>
      <div className='mx-auto max-w-[900px]'>
        {/* 返回按钮 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className='mb-6'
        >
          <Link
            href='/juya-ai-daily'
            className='inline-flex items-center gap-2 text-secondary hover:text-brand transition-colors'
          >
            <ArrowLeft className='h-4 w-4' />
            返回 AI 早报
          </Link>
        </motion.div>

        {/* 标题区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='mb-8 text-center'
        >
          <div className='mb-4 inline-flex items-center justify-center rounded-full bg-brand/10 p-4'>
            <Newspaper className='h-8 w-8 text-brand' />
          </div>
          <h1 className='mb-2 text-3xl font-bold'>{channel?.title}</h1>
          <p className='text-secondary'>{channel?.description}</p>
        </motion.div>

        {/* RSS 源链接 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className='relative mb-8 rounded-[40px] border bg-card p-6 backdrop-blur-sm'
          style={{
            boxShadow: '0 40px 50px -32px rgba(0, 0, 0, 0.05), inset 0 0 20px rgba(255, 255, 255, 0.25)'
          }}
        >
          <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
            <div className='flex items-center gap-3'>
              <Rss className='h-5 w-5 text-brand' />
              <span className='font-medium'>RSS 订阅源</span>
            </div>
            <div className='flex flex-col gap-2 sm:flex-row sm:items-center'>
              <code className='rounded-lg bg-primary/5 px-3 py-2 text-sm break-all font-mono'>
                {RSS_URL}
              </code>
              <a
                href={RSS_URL}
                target='_blank'
                rel='noopener noreferrer'
                className='brand-btn whitespace-nowrap flex items-center justify-center gap-2 text-sm'
              >
                <ExternalLink className='h-4 w-4' />
                订阅
              </a>
            </div>
          </div>
        </motion.div>

        {/* 文章列表 */}
        <div className='space-y-6'>
          {channel?.items.map((item, index) => (
            <motion.article
              key={item.link}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className='relative overflow-hidden rounded-[40px] border bg-card p-0 backdrop-blur-sm'
              style={{
                boxShadow: '0 40px 50px -32px rgba(0, 0, 0, 0.05), inset 0 0 20px rgba(255, 255, 255, 0.25)'
              }}
            >
              <div className='p-6'>
                {/* 日期和标题 */}
                <div className='mb-4 flex flex-wrap items-center gap-3'>
                  <span className='flex items-center gap-1 text-sm text-secondary'>
                    <Calendar className='h-4 w-4' />
                    {formatDate(item.pubDate)}
                  </span>
                </div>
                
                <h2 className='mb-4 text-xl font-semibold'>
                  <a
                    href={item.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='hover:text-brand transition-colors'
                  >
                    {item.title}
                  </a>
                </h2>
                
                {/* 内容 */}
                <div className='prose prose-sm max-w-none text-secondary whitespace-pre-line'>
                  {parseContent(item.content)}
                </div>
                
                {/* 查看原文链接 */}
                <div className='mt-6 pt-4 border-t border-border/30'>
                  <a
                    href={item.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center gap-2 text-sm text-brand hover:underline'
                  >
                    <ExternalLink className='h-4 w-4' />
                    在 GitHub 查看原文
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* 底部提示 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className='mt-12 text-center text-sm text-secondary'
        >
          <p>共 {channel?.items.length} 期早报</p>
        </motion.div>
      </div>
    </div>
  )
}
