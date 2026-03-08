import Script from 'next/script'

export default function Head() {
	// 只在生产环境加载 Google Analytics
	const isProduction = process.env.NODE_ENV === 'production'

	return (
		<head>
			<meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' />
			<link rel='manifest' href='/manifest.json' />

			<link rel='icon' href='/favicon.png' />

			<link rel='preconnect' href='https://fonts.googleapis.cn' />
			<link rel='preconnect' href='https://fonts.gstatic.cn' crossOrigin='anonymous' />

			<link href='https://fonts.googleapis.cn/css2?family=Averia+Gruesa+Libre&display=swap' rel='stylesheet' />

			{/* Google Analytics - 只在生产环境加载 */}
			{isProduction && (
				<>
					<Script src='https://www.googletagmanager.com/gtag/js?id=G-ZNSFR7C9PM' strategy='lazyOnload' />
					<Script id='google-analytics' strategy='lazyOnload'>
						{`
							window.dataLayer = window.dataLayer || [];
							function gtag(){dataLayer.push(arguments);}
							gtag('js', new Date());
							gtag('config', 'G-ZNSFR7C9PM');
						`}
					</Script>
				</>
			)}
		</head>
	)
}
