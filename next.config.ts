import { NextConfig } from 'next'
import { codeInspectorPlugin } from 'code-inspector-plugin'
import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev'

const nextConfig: NextConfig = {
	output: 'export',
	distDir: 'dist',
	images: {
		unoptimized: true
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

if (process.env.NODE_ENV === 'development') {
	await setupDevPlatform()
}

export default nextConfig
