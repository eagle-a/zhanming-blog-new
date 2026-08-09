const scriptSources = [
	"'self'",
	'https://unpkg.com/pixi.js@6.2.0/dist/browser/pixi.min.js',
	'https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js',
	'https://unpkg.com/pixi-live2d-display@0.4.0/dist/cubism4.min.js',
	'https://vercel.live'
]

export function buildCsp(nonce?: string, reportOnly = false, allowLegacyInline = false, development = process.env.NODE_ENV === 'development'): string {
	const scripts = nonce
		? [scriptSources[0], `'nonce-${nonce}'`, ...scriptSources.slice(1)]
		: allowLegacyInline
			? [scriptSources[0], "'unsafe-inline'", ...scriptSources.slice(1)]
			: scriptSources
	if (development) scripts.push("'unsafe-eval'")
	return [
		"default-src 'self'",
		`script-src ${scripts.join(' ')}`,
		`style-src 'self'${allowLegacyInline ? " 'unsafe-inline'" : ''} https://fonts.googleapis.cn`,
		"style-src-attr 'unsafe-inline'",
		"img-src 'self' data: blob: https:",
		"connect-src 'self' https://mylike.zhanmingblog.workers.dev https://mytwikoo-ashen.vercel.app",
		"font-src 'self' data: https://fonts.gstatic.cn",
		"frame-src 'self' https://vercel.live",
		"object-src 'none'",
		"base-uri 'self'",
		"form-action 'self'",
		"frame-ancestors 'none'",
		reportOnly ? 'report-uri /api/csp-report' : ''
	]
		.filter(Boolean)
		.join('; ')
}
