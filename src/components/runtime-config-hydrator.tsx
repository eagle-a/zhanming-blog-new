'use client'

import { useEffect } from 'react'
import { useConfigStore, type CardStyles, type SiteContent } from '@/app/(home)/stores/config-store'

export function RuntimeConfigHydrator({ siteContent, cardStyles }: { siteContent: SiteContent; cardStyles: CardStyles }) {
	useEffect(() => {
		useConfigStore.getState().setSiteContent(siteContent)
		useConfigStore.getState().setCardStyles(cardStyles)
	}, [siteContent, cardStyles])
	return null
}
