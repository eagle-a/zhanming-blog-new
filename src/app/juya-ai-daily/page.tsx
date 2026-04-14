'use client'

import { motion } from 'motion/react'
import { Rss, ExternalLink, Github, Globe, BookOpen, AlertCircle, Calendar, ChevronRight, Loader2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { marked } from 'marked'
import parse from 'html-react-parser'

const RSS_URL = 'https://imjuya.github.io/juya-ai-daily/rss.xml'

// 文章数据类型
interface Article {
  id: number
  date: string
  title: string
  link: string
  summary: string
}

// RSS 数据类型
interface RSSItem {
  title: string
  link: string
  pubDate: string
  description: string
}

interface RSSChannel {
  title: string
  link: string
  description: string
  items: RSSItem[]
}

// 缓存相关
const CACHE_KEY = 'juya-ai-daily-cache'
const CACHE_DURATION = 5 * 60 * 1000 // 5分钟缓存

// 获取缓存数据
function getCachedData(): Article[] | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY)
    if (!cached) return null
    
    const { data, timestamp } = JSON.parse(cached)
    const now = Date.now()
    
    if (now - timestamp > CACHE_DURATION) {
      localStorage.removeItem(CACHE_KEY)
      return null
    }
    
    return data
  } catch {
    return null
  }
}

// 设置缓存数据
function setCachedData(data: Article[]): void {
  try {
    const cacheData = {
      data,
      timestamp: Date.now()
    }
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))
  } catch {
    // 忽略缓存错误
  }
}

// 解析 RSS 数据的函数
async function fetchRSSData(): Promise<Article[]> {
  // 先检查缓存
  const cachedData = getCachedData()
  if (cachedData) {
    return cachedData
  }

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
      const description = item.querySelector('description')?.textContent || ''
      
      items.push({ title, link, pubDate, description })
    })

    // 转换为 Article 格式并只取前10条
    const articles = items.slice(0, 10).map((item, index) => {
      // 从标题中提取日期
      const dateMatch = item.title.match(/(\d{4}-\d{2}-\d{2})/)
      const date = dateMatch ? dateMatch[1] : new Date(item.pubDate).toISOString().split('T')[0]
      
      // 从链接中提取 issue ID
      const idMatch = item.link.match(/\/issues\/(\d+)/)
      const id = idMatch ? parseInt(idMatch[1]) : index + 1
      
      return {
        id,
        date,
        title: item.title,
        link: item.link,
        summary: item.description.replace(/<[^>]*>/g, '') // 移除 HTML 标签
      }
    })
    
    // 设置缓存
    setCachedData(articles)
    
    return articles
  } catch (error) {
    console.error('Failed to fetch RSS data:', error)
    return []
  }
}

export default function JuyaAIDailyPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [expandedArticle, setExpandedArticle] = useState<number | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const data = await fetchRSSData()
        setArticles(data)
        if (data.length === 0) {
          setError('暂无数据，请稍后重试')
        }
      } catch (err) {
        console.error('Failed to load RSS data:', err)
        setError('加载失败，请稍后重试')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return (
    <div className='flex flex-col items-center px-6 pt-32 pb-12 max-sm:px-0 min-h-screen'>
      <div className='w-full max-w-[900px]'>
        {/* 标题区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='mb-8 text-center'
        >
          <div className='mb-4 inline-flex items-center justify-center rounded-full bg-brand/10 p-4'>
            <Rss className='h-8 w-8 text-brand' />
          </div>
          <h1 className='mb-4 text-4xl font-bold'>AI早报</h1>
          <p className='text-secondary text-lg'>
            每天精选AI领域最新资讯，助你紧跟AI发展前沿
          </p>
        </motion.div>

        {/* 上线公告 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className='relative mb-8 rounded-[40px] border bg-card p-6 backdrop-blur-sm'
          style={{
            boxShadow: '0 40px 50px -32px rgba(0, 0, 0, 0.05), inset 0 0 20px rgba(255, 255, 255, 0.25)'
          }}
        >
          <div className='flex items-start gap-4'>
            <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500/10'>
              <span className='h-3 w-3 rounded-full bg-green-500'></span>
            </div>
            <div>
              <h2 className='mb-2 text-xl font-semibold'>正式上线</h2>
              <p className='text-secondary leading-relaxed'>
                今天，AI早报文字版正式上线 RSS 订阅。同时，早报视频版卡片画面的生成工具也开源了。
              </p>
            </div>
          </div>
        </motion.div>

        {/* 文章列表 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className='mb-8'
        >
          <div className='mb-6 flex items-center justify-between'>
            <h2 className='text-2xl font-bold flex items-center gap-2'>
              <Calendar className='h-6 w-6 text-brand' />
              最新早报
            </h2>
            <Link
              href='/juya-ai-daily/preview'
              className='text-sm text-brand hover:underline'
            >
              查看全部 →
            </Link>
          </div>

          {/* 加载状态 */}
          {loading && (
            <div className='flex items-center justify-center py-12'>
              <Loader2 className='h-8 w-8 animate-spin text-brand' />
              <span className='ml-2 text-secondary'>正在加载最新早报...</span>
            </div>
          )}

          {/* 错误状态 */}
          {error && !loading && (
            <div className='rounded-xl bg-red-500/10 p-6 text-center'>
              <AlertCircle className='mx-auto h-8 w-8 text-red-500 mb-2' />
              <p className='text-red-700'>{error}</p>
            </div>
          )}

          {/* 文章列表 */}
          {!loading && !error && articles.length > 0 && (
            <div className='space-y-4'>
              {articles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className='relative overflow-hidden rounded-[40px] border bg-card p-0 backdrop-blur-sm'
                style={{
                  boxShadow: '0 40px 50px -32px rgba(0, 0, 0, 0.05), inset 0 0 20px rgba(255, 255, 255, 0.25)'
                }}
              >
                <div className='p-6'>
                  <div className='mb-3 flex items-center gap-3 text-sm text-secondary'>
                    <span className='flex items-center gap-1'>
                      <Calendar className='h-4 w-4' />
                      {article.date}
                    </span>
                    <span className='rounded-full bg-brand/10 px-2 py-0.5 text-xs text-brand'>
                      Issue #{article.id}
                    </span>
                  </div>
                  
                  <h3 className='mb-3 text-lg font-semibold'>
                    <a
                      href={article.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='hover:text-brand transition-colors'
                    >
                      {article.title}
                    </a>
                  </h3>
                  
                  <div className='text-secondary text-sm leading-relaxed prose prose-sm max-w-none'>
                    {parse(marked(article.summary))}
                  </div>
                  
                  <div className='mt-4 flex items-center justify-between'>
                    <a
                      href={article.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-flex items-center gap-1 text-sm text-brand hover:underline'
                    >
                      阅读全文
                      <ChevronRight className='h-4 w-4' />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
            </div>
          )}
        </motion.div>

        {/* 相关链接 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className='relative mb-8 rounded-[40px] border bg-card p-6 backdrop-blur-sm'
          style={{
            boxShadow: '0 40px 50px -32px rgba(0, 0, 0, 0.05), inset 0 0 20px rgba(255, 255, 255, 0.25)'
          }}
        >
          <h2 className='mb-4 text-xl font-semibold flex items-center gap-2'>
            <ExternalLink className='h-5 w-5 text-brand' />
            相关链接
          </h2>
          <div className='grid gap-4 sm:grid-cols-2'>
            <a
              href='https://imjuya.github.io/juya-ai-daily'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-3 rounded-xl border bg-white/60 p-4 backdrop-blur-sm transition-all hover:bg-white/80 dark:bg-gray-800/60 dark:hover:bg-gray-800/80'
            >
              <Globe className='h-5 w-5 text-brand' />
              <div>
                <div className='font-medium'>GitHub Pages</div>
                <div className='text-sm text-secondary'>在线浏览早报</div>
              </div>
            </a>
            <a
              href='https://github.com/imjuya/juya-ai-daily/tree/master/BACKUP'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-3 rounded-xl border bg-white/60 p-4 backdrop-blur-sm transition-all hover:bg-white/80 dark:bg-gray-800/60 dark:hover:bg-gray-800/80'
            >
              <BookOpen className='h-5 w-5 text-brand' />
              <div>
                <div className='font-medium'>文字版存档</div>
                <div className='text-sm text-secondary'>GitHub BACKUP</div>
              </div>
            </a>
            <a
              href='https://github.com/imjuya/juya-ai-daily'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-3 rounded-xl border bg-white/60 p-4 backdrop-blur-sm transition-all hover:bg-white/80 dark:bg-gray-800/60 dark:hover:bg-gray-800/80'
            >
              <Github className='h-5 w-5 text-brand' />
              <div>
                <div className='font-medium'>开源仓库</div>
                <div className='text-sm text-secondary'>查看源码 & 工具</div>
              </div>
            </a>
            <a
              href={RSS_URL}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-3 rounded-xl border bg-white/60 p-4 backdrop-blur-sm transition-all hover:bg-white/80 dark:bg-gray-800/60 dark:hover:bg-gray-800/80'
            >
              <Rss className='h-5 w-5 text-brand' />
              <div>
                <div className='font-medium'>RSS 源</div>
                <div className='text-sm text-secondary'>查看原始数据</div>
              </div>
            </a>
          </div>
        </motion.div>

        {/* 注意事项 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className='rounded-xl bg-yellow-500/10 p-6'
        >
          <h3 className='mb-3 flex items-center gap-2 font-medium text-yellow-700'>
            <AlertCircle className='h-5 w-5' />
            注意事项
          </h3>
          <ul className='list-inside list-disc space-y-2 text-sm text-secondary'>
            <li>RSS 订阅会自动更新每日早报内容</li>
            <li>建议使用 RSS 阅读器订阅，如 Feedly、Inoreader 等</li>
            <li>视频版卡片生成工具已开源，可在 GitHub 仓库查看</li>
            <li>文字版存档位于 BACKUP 目录下</li>
          </ul>
        </motion.div>

        {/* 页脚提示 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className='mt-12 text-center text-sm text-secondary'
        >
          <p>AI早报 - 让AI资讯触手可及</p>
        </motion.div>
      </div>
    </div>
  )
}
