export default function Head({ faviconUrl = '/favicon.png' }: { faviconUrl?: string }) {
	return (
		<head>
			<link rel='manifest' href='/manifest.json' />

			<link rel='icon' href={faviconUrl} />

			{/* RSS 自动发现链接 */}
			<link rel='alternate' type='application/rss+xml' title='RSS 订阅' href='/rss.xml' />

			<link rel='preconnect' href='https://fonts.googleapis.cn' />
			<link rel='preconnect' href='https://fonts.gstatic.cn' crossOrigin='anonymous' />

			<link
				rel='preload'
				as='style'
				href='https://fonts.googleapis.cn/css2?family=Averia+Gruesa+Libre&display=swap'
				{...{ onload: "this.onload=null;this.rel='stylesheet'" }}
			/>
			<noscript>
				<link rel='stylesheet' href='https://fonts.googleapis.cn/css2?family=Averia+Gruesa+Libre&display=swap' />
			</noscript>
		</head>
	)
}
