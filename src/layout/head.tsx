import Script from 'next/script'

export default function Head() {
	// 只在生产环境加载 Plausible Analytics
	const isProduction = process.env.NODE_ENV === 'production'

	return (
		<head>
			<meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' />
			<link rel='manifest' href='/manifest.json' />

			<link rel='icon' href='/favicon.png' />

			<link rel='preconnect' href='https://fonts.googleapis.cn' />
			<link rel='preconnect' href='https://fonts.gstatic.cn' crossOrigin='anonymous' />

			<link href='https://fonts.googleapis.cn/css2?family=Averia+Gruesa+Libre&display=swap' rel='stylesheet' />

			{/* Plausible Analytics - 只在生产环境加载 */}
			{isProduction && (
				<>
					{/* Privacy-friendly analytics by Plausible */}
					<Script
						src='https://plausible.io/js/pa-O6zWmNeHq85ObmIKiKCxO.js'
						strategy='lazyOnload'
						data-domain='yourdomain.com'
					/>
				</>
			)}
		</head>
	)
}
