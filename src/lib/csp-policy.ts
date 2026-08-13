const scriptSources = [
	"'self'",
	'https://unpkg.com/pixi.js@6.2.0/dist/browser/pixi.min.js',
	'https://unpkg.com/@pixi/unsafe-eval@6.2.0/dist/browser/unsafe-eval.min.js',
	'https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js',
	'https://unpkg.com/pixi-live2d-display@0.4.0/dist/cubism4.min.js',
	'https://vercel.live'
]

type CspOptions = {
	nonce?: string
	allowInlineScripts?: boolean
	development?: boolean
}

export function buildCsp({ nonce, allowInlineScripts = false, development = process.env.NODE_ENV === 'development' }: CspOptions = {}): string {
	const scripts = nonce
		? [scriptSources[0], `'nonce-${nonce}'`, ...scriptSources.slice(1)]
		: allowInlineScripts
			? [scriptSources[0], "'unsafe-inline'", ...scriptSources.slice(1)]
			: scriptSources
	if (development) scripts.push("'unsafe-eval'")
	// In development, Next.js DevTools and HMR inject inline styles without a nonce.
	// Allow 'unsafe-inline' for style-src in dev so the dev overlay and styled-jsx work.
	const styleInline = allowInlineScripts || development
	return [
		"default-src 'self'",
		`script-src ${scripts.join(' ')}`,
		`style-src 'self'${styleInline ? " 'unsafe-inline'" : ''} https://fonts.googleapis.cn`,
		"style-src-attr 'unsafe-inline'",
		"img-src 'self' data: blob: https:",
		"connect-src 'self' https://mylike.zhanmingblog.workers.dev https://mytwikoo-ashen.vercel.app https://owo.imaegoo.com",
		"font-src 'self' data: https://fonts.gstatic.cn",
		"frame-src 'self' https://vercel.live",
		"object-src 'none'",
		"base-uri 'self'",
		"form-action 'self'",
		"frame-ancestors 'none'",
		'report-uri /api/csp-report'
	]
		.filter(Boolean)
		.join('; ')
}
