'use client'

import Live2DViewer from './live2d-viewer'

export default function Live2DPage() {
	return (
		<div className='flex h-full items-center justify-center py-8'>
			<h1 className='sr-only'>Live2D 展示</h1>
			<Live2DViewer />
		</div>
	)
}
