'use client'

import { CircleCheckIcon, InfoIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon } from 'lucide-react'
import { Toaster } from 'sonner'

export function SiteToaster() {
	return (
		<Toaster
			position='bottom-center'
			richColors
			offset={{ bottom: 28 }}
			mobileOffset={{ bottom: 92, left: 16, right: 16 }}
			icons={{
				success: <CircleCheckIcon className='size-4' />,
				info: <InfoIcon className='size-4' />,
				warning: <TriangleAlertIcon className='size-4' />,
				error: <OctagonXIcon className='size-4' />,
				loading: <Loader2Icon className='size-4 animate-spin' />
			}}
			style={
				{
					'--border-radius': '16px',
					'--width': 'min(360px, calc(100vw - 32px))'
				} as React.CSSProperties
			}
		/>
	)
}
