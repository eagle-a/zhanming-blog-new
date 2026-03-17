'use client'

import { motion } from 'motion/react'
import { useLanguage } from '@/i18n/context'
import { Rss, ExternalLink, Github, Globe, BookOpen, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

export default function JuyaAIDailyPage() {
  const { t } = useLanguage()

  const handleCopyRss = () => {
    navigator.clipboard.writeText('https://imjuya.github.io/juya-ai-daily/rss.xml')
    toast.success(t('toast.rssUrlCopied') || 'RSS 链接已复制')
  }

  return (
    <div className='flex flex-col items-center justify-center px-6 pt-32 pb-12 max-sm:px-0'>
      <div className='w-full max-w-[800px]'>
        {/* 标题区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='mb-12 text-center'
        >
          <div className='mb-4 inline-flex items-center justify-center rounded-full bg-brand/10 p-4'>
            <Rss className='h-8 w-8 text-brand' />
          </div>
          <h1 className='mb-4 text-4xl font-bold'>橘鸦AI早报</h1>
          <p className='text-secondary text-lg'>
            每天精选AI领域最新资讯，助你紧跟AI发展前沿
          </p>
        </motion.div>

        {/* 主要内容卡片 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className='card relative mb-8 p-8'
        >
          {/* 上线公告 */}
          <div className='mb-8 border-b border-border/30 pb-6'>
            <h2 className='mb-4 text-2xl font-semibold flex items-center gap-2'>
              <span className='inline-block h-2 w-2 rounded-full bg-green-500'></span>
              正式上线
            </h2>
            <p className='text-secondary leading-relaxed'>
              今天，橘鸦AI早报文字版正式上线 RSS 订阅。同时，早报视频版卡片画面的生成工具也开源了。
            </p>
          </div>

          {/* RSS订阅链接 */}
          <div className='mb-8'>
            <h3 className='mb-4 text-lg font-medium flex items-center gap-2'>
              <Rss className='h-5 w-5 text-brand' />
              RSS 订阅链接
            </h3>
            <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
              <code className='flex-1 rounded-lg bg-primary/5 px-4 py-3 text-sm break-all font-mono'>
                https://imjuya.github.io/juya-ai-daily/rss.xml
              </code>
              <button
                onClick={handleCopyRss}
                className='brand-btn whitespace-nowrap flex items-center gap-2'
              >
                <Rss className='h-4 w-4' />
                复制链接
              </button>
            </div>
          </div>

          {/* 相关链接 */}
          <div className='mb-8'>
            <h3 className='mb-4 text-lg font-medium flex items-center gap-2'>
              <ExternalLink className='h-5 w-5 text-brand' />
              相关链接
            </h3>
            <div className='grid gap-4 sm:grid-cols-2'>
              <a
                href='https://imjuya.github.io/juya-ai-daily/rss.xml'
                target='_blank'
                rel='noopener noreferrer'
                className='card flex items-center gap-3 p-4 transition-all hover:bg-primary/5'
              >
                <Rss className='h-5 w-5 text-brand' />
                <div>
                  <div className='font-medium'>RSS 订阅</div>
                  <div className='text-sm text-secondary'>imjuya.github.io</div>
                </div>
              </a>
              <a
                href='https://github.com/imjuya/juya-ai-daily/tree/master/BACKUP'
                target='_blank'
                rel='noopener noreferrer'
                className='card flex items-center gap-3 p-4 transition-all hover:bg-primary/5'
              >
                <BookOpen className='h-5 w-5 text-brand' />
                <div>
                  <div className='font-medium'>文字版存档</div>
                  <div className='text-sm text-secondary'>GitHub BACKUP</div>
                </div>
              </a>
              <a
                href='https://imjuya.github.io/juya-ai-daily'
                target='_blank'
                rel='noopener noreferrer'
                className='card flex items-center gap-3 p-4 transition-all hover:bg-primary/5'
              >
                <Globe className='h-5 w-5 text-brand' />
                <div>
                  <div className='font-medium'>GitHub Pages</div>
                  <div className='text-sm text-secondary'>在线浏览</div>
                </div>
              </a>
              <a
                href='https://github.com/imjuya/juya-ai-daily'
                target='_blank'
                rel='noopener noreferrer'
                className='card flex items-center gap-3 p-4 transition-all hover:bg-primary/5'
              >
                <Github className='h-5 w-5 text-brand' />
                <div>
                  <div className='font-medium'>开源仓库</div>
                  <div className='text-sm text-secondary'>GitHub Repo</div>
                </div>
              </a>
            </div>
          </div>

          {/* 注意事项 */}
          <div className='rounded-lg bg-yellow-500/10 p-4'>
            <h3 className='mb-2 flex items-center gap-2 font-medium text-yellow-700'>
              <AlertCircle className='h-5 w-5' />
              注意事项
            </h3>
            <ul className='list-inside list-disc space-y-1 text-sm text-secondary'>
              <li>RSS 订阅会自动更新每日早报内容</li>
              <li>建议使用 RSS 阅读器订阅，如 Feedly、Inoreader 等</li>
              <li>视频版卡片生成工具已开源，可在 GitHub 仓库查看</li>
              <li>文字版存档位于 BACKUP 目录下</li>
            </ul>
          </div>
        </motion.div>

        {/* 页脚提示 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className='text-center text-sm text-secondary'
        >
          <p>橘鸦AI早报 - 让AI资讯触手可及</p>
        </motion.div>
      </div>
    </div>
  )
}
