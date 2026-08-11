import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
	title: '写作后台',
	alternates: { canonical: '/write' },
	robots: {
		index: false,
		follow: false,
		nocache: true,
		googleBot: { index: false, follow: false, noimageindex: true }
	}
}

export default function WriteLayout({ children }: Readonly<{ children: ReactNode }>) {
	return children
}
