'use client'

import { useEffect, useId, useRef, type ReactNode } from 'react'

// Native top-layer dialog supplies focus containment and makes background UI inert.
// Keep this separate from animated site dialogs to avoid changing every public page.
export function ReviewDialog({ title, busy, onClose, children }: { title: string; busy: boolean; onClose: () => void; children: ReactNode }) {
	const ref = useRef<HTMLDialogElement>(null)
	const titleId = useId()
	useEffect(() => {
		const dialog = ref.current!
		const previousFocus = document.activeElement as HTMLElement | null
		const previousOverflow = document.body.style.overflow
		dialog.showModal()
		document.body.style.overflow = 'hidden'
		return () => {
			dialog.close()
			document.body.style.overflow = previousOverflow
			if (previousFocus?.isConnected) previousFocus.focus()
		}
	}, [])
	return (
		<dialog
			ref={ref}
			tabIndex={-1}
			aria-labelledby={titleId}
			aria-busy={busy}
			onKeyDown={event => {
				if (event.key !== 'Tab') return
				const dialog = event.currentTarget
				const controls = Array.from(dialog.querySelectorAll<HTMLElement>('button, input, textarea, select, a[href], [tabindex]')).filter(
					element => element.tabIndex >= 0 && !element.matches(':disabled') && element.getClientRects().length > 0
				)
				const first = controls[0]
				const last = controls[controls.length - 1]
				if (!first) {
					event.preventDefault()
					dialog.focus()
					return
				}
				if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
					event.preventDefault()
					last.focus()
				} else if (!event.shiftKey && (document.activeElement === last || document.activeElement === dialog)) {
					event.preventDefault()
					first.focus()
				}
			}}
			className='bg-article fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-2xl border p-6 text-inherit shadow-xl backdrop:bg-black/40'
			onCancel={event => {
				event.preventDefault()
				if (!busy) onClose()
			}}
			onClick={event => {
				if (event.target !== event.currentTarget || busy) return
				const rect = event.currentTarget.getBoundingClientRect()
				if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose()
			}}>
			<h2 id={titleId} className='text-lg font-semibold'>
				{title}
			</h2>
			{children}
		</dialog>
	)
}
