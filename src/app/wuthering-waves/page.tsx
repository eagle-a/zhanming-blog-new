'use client'

import { useCallback, useState } from 'react'

// 卡池类型定义（cardPoolType 字段）
const POOL_TYPES: Record<number, string> = {
	1: '角色活动唤取',
	2: '武器活动唤取',
	3: '新手唤取',
	4: '感恩自选唤取',
	5: '常驻唤取',
	6: '角色活动唤取（2）',
	7: '武器活动唤取（2）',
}

// 各卡池 5 星保底
const PITY_LIMIT: Record<number, number> = {
	1: 80, 2: 80, 3: 50, 4: 80, 5: 80, 6: 80, 7: 80,
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
}

interface PoolResult {
	poolType: number
	poolName: string
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
			segments.push({ pulls, name: rec.name, time: rec.time })
			pulls = 0
		}
	}
	if (pulls > 0) segments.push({ pulls, name: null, time: null })

	return segments
}

function groupByPool(records: GachaRecord[]): PoolResult[] {
	const pools = new Map<number, GachaRecord[]>()
	for (const rec of records) {
		const list = pools.get(rec.cardPoolType) ?? []
		list.push(rec)
		pools.set(rec.cardPoolType, list)
	}

	const results: PoolResult[] = []
	for (const [poolType, recs] of pools.entries()) {
		const segments = buildPitySegments(recs)
		const fiveStarCount = recs.filter(r => r.qualityLevel >= 5).length
		const lastFiveIdx = [...recs].reverse().findIndex(r => r.qualityLevel >= 5)
		const currentPity = lastFiveIdx === -1 ? recs.length : lastFiveIdx
		const pityLimit = PITY_LIMIT[poolType] ?? 80

		results.push({
			poolType,
			poolName: POOL_TYPES[poolType] ?? `卡池 ${poolType}`,
			segments,
			totalPulls: recs.length,
			fiveStarCount,
			currentPity,
			pityLimit,
		})
	}

	// 按卡池类型排序
	return results.sort((a, b) => a.poolType - b.poolType)
}

function parseRecords(raw: string): GachaRecord[] {
	const data = JSON.parse(raw) as unknown
	if (!Array.isArray(data)) throw new Error('根节点必须是数组')
	return data.map((item, i) => {
		if (typeof item !== 'object' || item === null) throw new Error(`第 ${i + 1} 项不是对象`)
		const r = item as Record<string, unknown>
		const qualityLevel = Number(r.qualityLevel)
		if (!Number.isFinite(qualityLevel)) throw new Error(`第 ${i + 1} 项缺少有效的 qualityLevel`)
		return {
			cardPoolType: Number(r.cardPoolType ?? 1),
			resourceId: Number(r.resourceId ?? 0),
			qualityLevel,
			resourceType: String(r.resourceType ?? ''),
			name: String(r.name ?? ''),
			count: Number(r.count ?? 1),
			time: String(r.time ?? ''),
		}
	})
}

const pityColor = (pulls: number, limit: number) => {
	const ratio = pulls / limit
	if (ratio >= 0.9) return 'bg-red-400'
	if (ratio >= 0.7) return 'bg-amber-400'
	return 'bg-brand-secondary'
}

export default function Page() {
	const [input, setInput] = useState('')
	const [error, setError] = useState<string | null>(null)
	const [results, setResults] = useState<PoolResult[]>([])
	const [activeTab, setActiveTab] = useState(0)

	const analyze = useCallback(() => {
		setError(null)
		const trimmed = input.trim()
		if (!trimmed) { setResults([]); return }
		try {
			const records = parseRecords(trimmed)
			const poolResults = groupByPool(records)
			if (poolResults.length === 0) throw new Error('未解析到任何记录')
			setResults(poolResults)
			setActiveTab(0)
		} catch (e) {
			setResults([])
			setError(e instanceof Error ? e.message : '解析失败')
		}
	}, [input])

	const current = results[activeTab]

	return (
		<div className='mx-auto max-w-3xl space-y-6 px-4 py-24'>
			<h1 className='text-xl font-semibold tracking-tight'>鸣潮 · 抽卡记录分析</h1>

			<div className='space-y-2'>
				<p className='text-secondary text-sm'>使用方法（B服 PC 端）：</p>
				<ol className='text-secondary list-inside list-decimal space-y-1 text-sm'>
					<li>进入游戏，打开任意卡池的「召唤历史」，等记录加载完成</li>
					<li>
						按 <span className='text-brand font-medium'>F12</span> 打开开发者工具，点击{' '}
						<span className='text-brand font-medium'>Network</span> 面板
					</li>
					<li>
						在请求列表中找到 <span className='text-brand font-medium'>query</span> 请求，点击后选{' '}
						<span className='text-brand font-medium'>Preview</span> 面板
					</li>
					<li>
						右键 <span className='text-brand font-medium'>data</span> 数组 →{' '}
						<span className='text-brand font-medium'>Copy Value</span>
					</li>
					<li>粘贴到下方输入框，点击分析（支持多卡池混合数据）</li>
				</ol>
			</div>

			<div className='space-y-3'>
				<textarea
					value={input}
					onChange={e => setInput(e.target.value)}
					rows={5}
					spellCheck={false}
					className='bg-card text-foreground focus-visible:ring-ring w-full resize-y rounded-xl border px-3 py-2 font-mono text-xs focus-visible:ring-2 focus-visible:outline-none'
					style={{ maxHeight: '8rem' }}
					placeholder='[{"cardPoolType":1,"qualityLevel":3,"name":"...","time":"..."}, ...]'
				/>
				<button
					type='button'
					onClick={analyze}
					className='bg-brand rounded-xl px-5 py-2 text-sm font-medium text-white hover:opacity-90'>
					分析
				</button>
			</div>

			{error && (
				<p className='text-destructive text-sm' role='alert'>
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

							{/* 5 星出货列表 */}
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
													<span>
														{seg.name}{' '}
														<span className='text-secondary hidden text-xs group-hover:inline'>
															({seg.time?.slice(0, 10)})
														</span>
													</span>
												) : (
													<span className='text-secondary'>（未到 5 星，已垫 {seg.pulls} 抽）</span>
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
