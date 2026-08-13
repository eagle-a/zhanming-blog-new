import { cn } from '@/lib/utils'

export function isLocalMediaSource(value: string): boolean {
	return value.startsWith('/') && !value.startsWith('//')
}

export function LocalMediaMark({ name, className }: { name: string; className?: string }) {
	const mark = Array.from(name.trim())[0]?.toUpperCase() || '?'
	return (
		<span
			aria-hidden='true'
			className={cn('from-brand/20 to-brand-secondary/20 text-primary flex shrink-0 items-center justify-center bg-linear-to-br font-bold', className)}>
			{mark}
		</span>
	)
}
