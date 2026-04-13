'use client'

import { useCallback, useState } from 'react'

// 卡池类型定义
const POOL_TYPES: Record<number, string> = {
	1: '角色活动唤取',
	2: '武器活动唤取',
	3: '新手唤取',
	4: '感恩自选唤取',
	5: '常驻唤取',
	6: '角色活动唤取（2）',
	7: '武器活动唤取（2）',
}

// 各卡池 5 星保底抽数
const PITY_LIMIT: Record<number, number> = {
	1: 80,
	2: 80,
	3: 50,
	4: 80,
	5: 80,
	6: 80,
	7: 80,
}

interface GachaRecord {
	cardPoolType: number
	resourceId: number
	qualityLevel: number
	resourceType: string
	name: string
	count: number
	time: string
}

interface PitySegment {
	pulls: number
	name: string | null
	time: string | null
	qualityLevel: number
}

interface PoolResult {
	poolType: number
	poolName: string
	records: GachaRecord[]
	segments: PitySegment[]
	totalPulls: number
	fiveStarCount: number
	currentPity: number
	pityLimit: number
}

function buildPitySegments(records: GachaRecord[]): PitySegment[] {
	const segments: PitySegment[] = []
	let pulls = 0

	for (const rec of records) {
		pulls++
		if (rec.qualityLevel >= 5) {
			segments.push({ pulls, name: rec.name, time: rec.time, qualityLevel: rec.qualityLevel })
			pulls = 0
		}
	}

	// 当前未出 5 星的进度
	if (pulls > 0) {
		segments.push({ pulls, name: null, time: null, qualityLevel: 0 })
	}

	return segments
}

function parseUrlParams(urlStr: string): Record<string, string> | null {
	try {
		const hashPart = urlStr.includes('#') ? urlStr.split('#')[1] : urlStr
		const queryPart = hashPart.includes('?') ? hashPart.split('?')[1] : hashPart
		const params: Record<string, string> = {}
		for (const part of queryPart.split('&')) {
			const [k, v] = part.split('=')
			if (k && v) params[k] = decodeURIComponent(v)
		}
		return Object.keys(params).length > 0 ? params : null
	} catch {
		return null
	}
}

async function fetchPoolRecords(
	params: Record<string, string>,
	cardPoolType: number,
): Promise<GachaRecord[]> {
	const body = {
		cardPoolId: params.gacha_id || '',
		cardPoolType,
		languageCode: params.lang || 'zh-Hans',
		playerId: params.player_id || '',
		recordId: params.record_id || '',
		resourcesId: params.resources_id || '',
		serverId: params.svr_id || '',
		serverArea: params.svr_area || 'cn',
	}

	// B服使用 aki-game2.com
	const apiUrl = 'https://gmserver-api.aki-game2.com/gacha/record/query'

	const res = await fetch(apiUrl, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	})

	if (!res.ok) throw new Error(`请求失败: ${res.status}`)

	const json = await res.json()
	if (json.code !== 0) throw new Error(`API 错误: ${json.message || json.code}`)

	return (json.data || []) as GachaRecord[]
}

export default function Page() {
	const [urlInput, setUrlInput] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [results, setResults] = useState<PoolResult[]>([])
	const [activeTab, setActiveTab] = useState(0)

	const analyze = useCallback(async () => {
		setError(null)
		setResults([])
		const trimmed = urlInput.trim()
		if (!trimmed) return

		const params = parseUrlParams(trimmed)
		if (!params || !params.player_id || !params.record_id) {
			setError('无法解析 URL 参数，请确认粘贴了完整的抽卡记录链接')
			return
		}

		setLoading(true)
		try {
			const poolTypes = [1, 2, 3, 5, 6, 7]
			const poolResults: PoolResult[] = []

			for (const poolType of poolTypes) {
				try {
					const records = await fetchPoolRecords(params, poolType)
					if (records.length === 0) continue

					const segments = buildPitySegments(records)
					const fiveStarCount = records.filter(r => r.qualityLevel >= 5).length
					const lastFiveStarIdx = [...records].reverse().findIndex(r => r.qualityLevel >= 5)
					const currentPity = lastFiveStarIdx === -1 ? records.length : lastFiveStarIdx

					poolResults.push({
						poolType,
						poolName: POOL_TYPES[poolType] || `卡池 ${poolType}`,
						records,
						segments,
						totalPulls: records.length,
						fiveStarCount,
						currentPity,
						pityLimit: PITY_LIMIT[poolType] || 80,
					})
				} catch {
					// 某个卡池失败时跳过
				}
			}

			if (poolResults.length === 0) {
				setError('未获取到任何抽卡记录，请确认账号和 record_id 是否有效')
			} else {
				setResults(poolResults)
				setActiveTab(0)
			}
		} catch (e) {
			setError(e instanceof Error ? e.message : '获取失败，请检查网络或重试')
		} finally {
			setLoading(false)
		}
	}, [urlInput])

	const current = results[activeTab]

	const pityColor = (pulls: number, limit: number) => {
		const ratio = pulls / limit
		if (ratio >= 0.9) return 'bg-red-400'
		if (ratio >= 0.7) return 'bg-amber-400'
		return 'bg-brand-secondary'
	}

	return (
		<div className='mx-auto max-w-3xl space-y-6 px-4 py-24'>
			<h1 className='text-xl font-semibold tracking-tight'>鸣潮 · 抽卡记录分析</h1>

			<div className='space-y-2'>
				<p className='text-secondary text-sm'>使用方法（B服 PC 端）：</p>
				<ol className='text-secondary list-inside list-decimal space-y-1 text-sm'>
					<li>启动鸣潮，进入游戏，打开任意卡池的「召唤历史」</li>
					<li>
						等记录加载完成后，打开游戏日志文件：
						<code className='bg-card mx-1 rounded px-1 py-0.5 text-xs'>
							Wuthering Waves Game\Client\Saved\Logs\Client.log
						</code>
					</li>
					<li>
						搜索 <code className='bg-card mx-1 rounded px-1 py-0.5 text-xs'>aki-gm-resources.aki-game.com/aki/gacha</code>，复制整个 URL
					</li>
					<li>粘贴到下方，点击分析</li>
				</ol>
			</div>

			<div className='space-y-3'>
				<textarea
					value={urlInput}
					onChange={e => setUrlInput(e.target.value)}
					rows={3}
					spellCheck={false}
					className='bg-card text-foreground focus-visible:ring-ring w-full resize-none rounded-xl border px-3 py-2 font-mono text-xs focus-visible:ring-2 focus-visible:outline-none'
					placeholder='粘贴抽卡记录 URL：https://aki-gm-resources.aki-game.com/aki/gacha/index.html#/record?svr_id=...'
				/>
				<button
					type='button'
					onClick={analyze}
					disabled={loading}
					className='bg-brand rounded-xl px-5 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50'>
					{loading ? '获取中…' : '分析'}
				</button>
			</div>

			{error && (
				<p className='text-destructive rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm'>
					{error}
				</p>
			)}

			{results.length > 0 && (
				<div className='space-y-4'>
					{/* 卡池 Tab */}
					<div className='flex flex-wrap gap-2'>
						{results.map((r, i) => (
							<button
								key={r.poolType}
								onClick={() => setActiveTab(i)}
								className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
									activeTab === i ? 'bg-brand text-white' : 'bg-card border hover:border-brand/50'
								}`}>
								{r.poolName}
							</button>
						))}
					</div>

					{current && (
						<div className='space-y-4'>
							{/* 统计概览 */}
							<div className='grid grid-cols-3 gap-3'>
								<div className='bg-card rounded-xl border p-4 text-center'>
									<div className='text-2xl font-bold'>{current.totalPulls}</div>
									<div className='text-secondary mt-1 text-xs'>总抽数</div>
								</div>
								<div className='bg-card rounded-xl border p-4 text-center'>
									<div className='text-2xl font-bold text-amber-500'>{current.fiveStarCount}</div>
									<div className='text-secondary mt-1 text-xs'>5星数量</div>
								</div>
								<div className={`rounded-xl border p-4 text-center ${current.currentPity >= current.pityLimit * 0.8 ? 'border-red-200 bg-red-50' : 'bg-card'}`}>
									<div className={`text-2xl font-bold ${current.currentPity >= current.pityLimit * 0.8 ? 'text-red-500' : ''}`}>
										{current.currentPity}
									</div>
									<div className='text-secondary mt-1 text-xs'>当前垫抽（保底 {current.pityLimit}）</div>
								</div>
							</div>

							{/* 5 星记录列表 */}
							<div className='space-y-2'>
								<h3 className='text-sm font-medium'>5 星出货记录</h3>
								<ul className='space-y-2'>
									{current.segments.map((seg, i) => (
										<li key={i} className='group flex items-center gap-3'>
											<div
												className={`flex h-7 shrink-0 items-center overflow-hidden rounded-lg pl-2 text-xs leading-none font-bold text-white tabular-nums ${pityColor(seg.pulls, current.pityLimit)}`}
												style={{ width: Math.min(seg.pulls * 3 + 24, 240) }}
												title={`${seg.pulls} 抽`}>
												{seg.pulls}
											</div>
											<span className='text-foreground min-w-0 flex-1 truncate text-sm'>
												{seg.name ? (
													<span className='flex items-center gap-2'>
														<span className='font-medium'>{seg.name}</span>
														<span className='text-secondary hidden text-xs group-hover:inline'>
															{seg.time?.slice(0, 10)}
														</span>
													</span>
												) : (
													<span className='text-secondary'>（未出 5 星，已垫 {seg.pulls} 抽）</span>
												)}
											</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	)
}
