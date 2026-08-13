'use client'

import { motion } from 'motion/react'
import LikeButton from '@/components/like-button'
import GithubSVG from '@/svgs/github.svg'

type AboutClientProps = {
	title: string
	description: string
	serverHtml: string
}

export function AboutClient({ title, description, serverHtml }: AboutClientProps) {
	return (
		<div className='flex flex-col items-center justify-center px-6 pt-32 pb-12 max-sm:px-0'>
			<div className='w-full max-w-[800px]'>
				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='mb-12 text-center'>
					<h1 className='mb-4 text-4xl font-bold'>{title}</h1>
					<p className='text-secondary text-lg'>{description}</p>
				</motion.div>

				<motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className='card relative p-6'>
					<div className='prose prose-sm max-w-none' dangerouslySetInnerHTML={{ __html: serverHtml }} />
				</motion.div>

				<div className='mt-8 flex items-center justify-center gap-6'>
					<motion.a
						href='https://github.com/eagle-a/zhanming-blog-new'
						target='_blank'
						rel='noreferrer'
						aria-label='在 GitHub 查看项目源码'
						initial={{ opacity: 0, scale: 0.6 }}
						animate={{ opacity: 1, scale: 1 }}
						className='bg-card flex h-[53px] w-[53px] items-center justify-center rounded-full border'>
						<GithubSVG />
					</motion.a>

					<LikeButton slug='open-source' delay={0} />
				</div>
			</div>
		</div>
	)
}
