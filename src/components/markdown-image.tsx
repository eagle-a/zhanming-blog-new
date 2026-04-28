'use client'

import { useState } from 'react'
import { DialogModal } from '@/components/dialog-modal'

type MarkdownImageProps = {
	src: string
	alt?: string
	title?: string
}

export function MarkdownImage({ src, alt = '', title = '' }: MarkdownImageProps) {
	const [display, setDisplay] = useState(false)

	return (
		<>
			<img src={src} alt={alt} title={title} loading='lazy' onClick={() => setDisplay(true)} className='cursor-pointer transition-opacity hover:opacity-80' />
			<DialogModal open={display} onClose={() => setDisplay(false)} className='max-w-none bg-transparent p-0'>
				<div className='flex flex-col items-center gap-3'>
					<img src={src} alt={alt} className='max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl' />
					{(title || alt) && <span className='text-secondary text-sm'>{title || alt}</span>}
				</div>
			</DialogModal>
		</>
	)
}
