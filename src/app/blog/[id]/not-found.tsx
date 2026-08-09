import Link from 'next/link'

export default function BlogNotFound() {
	return (
		<section className='flex min-h-[70vh] flex-col items-center justify-center gap-4 px-6 text-center'>
			<h1 className='text-2xl font-semibold'>文章不存在</h1>
			<p className='text-secondary text-sm'>链接可能已失效，或文章尚未公开。</p>
			<Link href='/blog' className='brand-btn px-5 py-2'>
				返回文章列表
			</Link>
		</section>
	)
}
