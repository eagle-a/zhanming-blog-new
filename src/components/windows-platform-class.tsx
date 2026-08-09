'use client'

import { useEffect } from 'react'

export function WindowsPlatformClass() {
	useEffect(() => {
		if (/windows|win32/i.test(navigator.userAgent)) document.documentElement.classList.add('windows')
	}, [])

	return null
}
