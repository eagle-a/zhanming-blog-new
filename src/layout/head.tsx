import Script from 'next/script'

export default function Head() {
	return (
		<head>
			<meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' />
			<link rel='manifest' href='/manifest.json' />

			<link rel='icon' href='/favicon.png' />

			{/* RSS 自动发现链接 */}
			<link rel='alternate' type='application/rss+xml' title='RSS 订阅' href='/rss.xml' />

			<link rel='preconnect' href='https://fonts.googleapis.cn' />
			<link rel='preconnect' href='https://fonts.gstatic.cn' crossOrigin='anonymous' />

			<link href='https://fonts.googleapis.cn/css2?family=Averia+Gruesa+Libre&display=swap' rel='stylesheet' />

			{/* Umami Analytics */}
			<Script
				src='https://umami-sigma-lovat.vercel.app/script.js'
				strategy='lazyOnload'
				data-website-id='c3602057-5d3b-4e78-86f1-a1a0869c22a3'
			/>
		</head>
	)
}
