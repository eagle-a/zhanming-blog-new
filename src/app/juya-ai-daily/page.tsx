'use client'

import { motion } from 'motion/react'
import { Rss, ExternalLink, Github, Globe, BookOpen, AlertCircle, Calendar, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'

const RSS_URL = 'https://imjuya.github.io/juya-ai-daily/rss.xml'

// 文章数据类型
interface Article {
  id: number
  date: string
  title: string
  link: string
  summary: string
}

// 模拟文章数据（实际应从RSS获取）
const articles: Article[] = [
  {
    id: 30,
    date: '2026-03-18',
    title: 'AI 早报 2026-03-18',
    link: 'https://github.com/imjuya/juya-ai-daily/issues/30',
    summary: 'OpenAI发布GPT-5.4 mini与GPT-5.4 nano模型；H Company联合NVIDIA发布Holotron-12B模型；英伟达推出120亿参数Nemotron 3 VoiceChat语音模型；Meta发布OMT系统支持1600多种语言；乐天发布Rakuten AI 3.0；Hermes Agent发布v0.3.0；Mistral AI推出Forge；Ollama发布0.18.1版本'
  },
  {
    id: 29,
    date: '2026-03-17',
    title: 'AI 早报 2026-03-17',
    link: 'https://github.com/imjuya/juya-ai-daily/issues/29',
    summary: 'Google逐步向香港用户开放Gemini应用；Mistral AI发布Mistral Small 4开源混合专家模型；Mistral AI发布首个Lean 4开源代码Agent Leanstral；腾讯开源Covo-Audio-Chat语音模型；IBM开源Granite-4.0-1b-speech语音模型；阿里通义开源Fun-CineForge多模态配音模型；OpenAI Codex支持Subagent机制'
  },
  {
    id: 28,
    date: '2026-03-16',
    title: 'AI 早报 2026-03-16',
    link: 'https://github.com/imjuya/juya-ai-daily/issues/28',
    summary: '智谱发布GLM-5-Turbo；智谱开启GLM Coding Plan限时服务窗口；智谱AI发布龙虾套餐；NotebookLM向Pro用户开放电影级视频概览；央视3·15曝光GEO业务投毒AI大模型；微软首家上线验证NVIDIA Vera Rubin NVL72系统；传月之暗面拟融资10亿美元'
  },
  {
    id: 27,
    date: '2026-03-15',
    title: 'AI 早报 2026-03-15',
    link: 'https://github.com/imjuya/juya-ai-daily/issues/27',
    summary: 'Claude推出限时促销非高峰及周末使用额度翻倍；智谱推迟GLM Coding Plan续订；StepFun发布Step 3.5 Flash模型训练数据；Z Code发布V0.22.1；传字节跳动暂停Seedance 2.0全球发布；OpenClaw支持接入实时Chrome会话；腾讯云启动"龙虾"全国免费安装'
  },
  {
    id: 25,
    date: '2026-03-14',
    title: 'AI 早报 2026-03-14',
    link: 'https://github.com/imjuya/juya-ai-daily/issues/25',
    summary: 'Claude正式开放100万token上下文；上海人工智能实验室发布InternVL-U统一多模态模型；智谱调整GLM Coding Plan折扣；Codex应用上线自动化功能；Chrome 146正式发布支持MCP；CopilotKit开源OpenGenerativeUI；Vue作者尤雨溪推出Vite原生部署平台Void；Qoder支持BYOK接入多家大模型'
  },
  {
    id: 24,
    date: '2026-03-13',
    title: 'AI 早报 2026-03-13',
    link: 'https://github.com/imjuya/juya-ai-daily/issues/24',
    summary: 'GitHub调整Copilot学生计划；Claude支持生成式UI；OpenAI视频API上线新功能；NVIDIA发布NVILA-8B-HD-Video模型；Claude Code推出语音模式；Google调整Antigravity计费；Google Gemini API可设置消费上限；OpenRouter上线Auto Exacto'
  },
  {
    id: 23,
    date: '2026-03-12',
    title: 'AI 早报 2026-03-12',
    link: 'https://github.com/imjuya/juya-ai-daily/issues/23',
    summary: '英伟达发布并开源混合架构大模型Nemotron 3 Super；xAI在API中上线Grok 4.20系列；OpenRouter上线两款Stealth模型；龙猫在API中上线LongCat-Flash-Omni；MiroMind发布MiroThinker系列Agent；Reka发布70亿参数Reka Edge模型；Antigravity调整AI订阅计划权益'
  },
  {
    id: 22,
    date: '2026-03-11',
    title: 'AI 早报 2026-03-11',
    link: 'https://github.com/imjuya/juya-ai-daily/issues/22',
    summary: '谷歌发布Gemini Embedding 2原生多模态嵌入模型；Google升级Workspace Gemini功能；Tencent AI Lab开源LeVo 2音乐模型；Fish Audio开源S2文本转语音模型；Hume AI开源TADA；OpenAI调整Codex服务；Claude Code引入/btw命令；JetBrains上线Air'
  },
  {
    id: 21,
    date: '2026-03-10',
    title: 'AI 早报 2026-03-10',
    link: 'https://github.com/imjuya/juya-ai-daily/issues/21',
    summary: 'Anthropic为Claude Code推出Code Review自动化审查功能；小红书开源FireRed-Image-Edit-1.1图像编辑模型；小红书REDtech发布REDSearcher开源深度搜索框架；JetBrains宣布Junie CLI编码助手进入Beta；吴恩达发布Context Hub；OpenRouter推出应用与智能体排名；Gemini CLI推出极简模式'
  },
  {
    id: 20,
    date: '2026-03-09',
    title: 'AI 早报 2026-03-09',
    link: 'https://github.com/imjuya/juya-ai-daily/issues/20',
    summary: '深圳龙岗拟扶持OpenClaw；工信部预警其安全风险；Codex重置Plus与Pro订阅限额；OpenClaw发布v2026.3.7；Karpathy开源autoresearch；Kilo发布PinchBench榜单；传腾讯内测QClaw本地部署包'
  }
]

export default function JuyaAIDailyPage() {
  const [expandedArticle, setExpandedArticle] = useState<number | null>(null)

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
            <a
              href={RSS_URL}
              target='_blank'
              rel='noopener noreferrer'
              className='text-sm text-brand hover:underline'
            >
              查看全部 →
            </a>
          </div>

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
                  
                  <p className='text-secondary text-sm leading-relaxed'>
                    {article.summary}
                  </p>
                  
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
