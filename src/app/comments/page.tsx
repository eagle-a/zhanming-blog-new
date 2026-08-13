'use client'

import { motion } from 'motion/react'
import { useConfigStore } from '@/app/(home)/stores/config-store'
import TwikooComments from '@/components/TwikooComments'
import { useLanguage } from '@/i18n/context'

export default function Page() {
	const { siteContent } = useConfigStore()
	const { t } = useLanguage()
	return (
		<div className='flex flex-col items-center justify-center px-6 pt-32 pb-12 max-sm:px-0'>
			<div className='w-full max-w-[800px]'>
				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='mb-12 text-center'>
					<h1 className='mb-4 text-4xl font-bold'>{t('nav.comments') || '留言板'}</h1>
				</motion.div>

				<motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className='card relative p-6'>
					{siteContent.twikoo?.envId && <TwikooComments path='/' />}
				</motion.div>
			</div>
		</div>
	)
}
