import { NextConfig } from 'next'
import { codeInspectorPlugin } from 'code-inspector-plugin'

const nextConfig: NextConfig = {
	output: 'export',
	distDir: 'dist',
	images: {
		domains: ['mylike.zhanmingblog.workers.dev'],
		formats: ['image/webp', 'image/avif'],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
	},
	devIndicators: false,
	reactStrictMode: false,
	reactCompiler: true,
	pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
	typescript: {
		ignoreBuildErrors: true
	},
	experimental: {
		scrollRestoration: false
	},
	async headers() {
		return [{
			source: '/:path*',
			headers: [{
				key: 'Content-Security-Policy',
				value: [
					"default-src 'self'",
					"script-src 'self' 'unsafe-inline' 'unsafe-eval'",
					"style-src 'self' 'unsafe-inline'",
					"img-src 'self' data: https:",
					"connect-src 'self' https://api.github.com https://mylike.zhanmingblog.workers.dev https://mytwikoo-ashen.vercel.app",
					"font-src 'self' https://fonts.gstatic.cn",
					"frame-src 'none'",
					"object-src 'none'"
				].join('; ')
			}]
		}]
	},
	turbopack: {
		root: __dirname,
		rules: {
			'*.svg': {
				loaders: ['@svgr/webpack'],
				as: '*.js'
			}
			// ...codeInspectorPlugin({
			// 	bundler: 'turbopack'
			// })
		},

		resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json', 'css']
	},
	webpack: config => {
		config.module.rules.push({
			test: /\.svg$/i,
			use: [{ loader: '@svgr/webpack', options: { svgo: false } }]
		})

		return config
	}
}

export default nextConfig
