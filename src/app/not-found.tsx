import Link from 'next/link'

export default function NotFound() {
	return (
		<section className='flex min-h-[80vh] flex-col items-center justify-center gap-6 px-6 text-center'>
			<div className='card bg-article static rounded-2xl p-12'>
				<h1 className='font-averia text-brand text-7xl font-bold'>404</h1>
				<p className='text-secondary mt-4 text-sm'>页面走丢了，或者从未存在过。</p>
				<div className='mt-6 flex items-center justify-center gap-3'>
					<Link href='/' className='brand-btn px-5 py-2'>
						返回首页
					</Link>
					<Link href='/blog' className='bg-card rounded-xl border px-5 py-2 text-sm transition-colors hover:bg-white/80'>
						浏览文章
					</Link>
				</div>
			</div>
		</section>
	)
}
