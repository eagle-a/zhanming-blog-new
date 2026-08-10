import { motion } from 'motion/react'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useWriteStore, formatDateTimeLocal } from '../stores/write-store'
import { usePreviewStore } from '../stores/preview-store'
import { usePublish } from '../hooks/use-publish'
import { parseMarkdownImport } from '@/lib/markdown-import'
import { RevisionHistory } from './revision-history'

export function WriteActions() {
	const { loading, mode, form, originalSlug, updateForm } = useWriteStore()
	const { openPreview } = usePreviewStore()
	const { isAuth, login, onPublish, onDelete } = usePublish()
	const [saving, setSaving] = useState(false)
	const mdInputRef = useRef<HTMLInputElement>(null)
	const router = useRouter()

	const handleImportOrPublish = async () => {
		if (!isAuth) {
			const password = window.prompt('请输入文章后台密码')
			if (!password) return
			try {
				setSaving(true)
				await login(password)
				toast.success('登录成功')
				await onPublish()
			} catch (error) {
				toast.error(error instanceof Error ? error.message : '登录失败')
			} finally {
				setSaving(false)
			}
			return
		}
		await onPublish()
	}

	const handleCancel = () => {
		if (!window.confirm('放弃本次修改吗？')) {
			return
		}
		if (mode === 'edit' && originalSlug) {
			router.push(`/blog/${originalSlug}`)
		} else {
			router.push('/')
		}
	}

	const buttonText = isAuth ? (mode === 'edit' ? '更新' : '发布') : mode === 'edit' ? '登录并更新' : '登录并发布'

	const handleDelete = () => {
		if (!isAuth) {
			toast.info('请先登录文章后台')
			return
		}
		const confirmMsg = form?.title ? `确定删除《${form.title}》吗？该操作不可恢复。` : '确定删除当前文章吗？该操作不可恢复。'
		if (window.confirm(confirmMsg)) {
			onDelete()
		}
	}

	const handleImportMd = () => {
		mdInputRef.current?.click()
	}

	const handleMdFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return

		try {
			const text = await file.text()
			const imported = parseMarkdownImport(text, file.name)
			const updates = mode === 'edit' ? { ...imported.form, slug: form.slug } : imported.form
			updateForm(updates)
			const detail = imported.importedFields.length > 0 ? `，已识别${imported.importedFields.join('、')}` : ''
			toast.success(`已导入 Markdown 正文${detail}`)
		} catch (error) {
			toast.error(error instanceof Error ? error.message : '导入失败，请重试')
		} finally {
			if (e.currentTarget) e.currentTarget.value = ''
		}
	}

	return (
		<>
			<input ref={mdInputRef} type='file' accept='.md' className='hidden' onChange={handleMdFileChange} />

			<ul className='absolute top-4 right-6 flex items-center gap-2'>
				{mode === 'edit' && originalSlug && (
					<RevisionHistory
						slug={originalSlug}
						currentVersion={form.version}
						onRestore={payload => {
							updateForm({
								...form,
								md: payload.contentMd,
								version: payload.version,
								title: payload.title,
								summary: payload.summary,
								tags: payload.tags,
								category: payload.category ?? '',
								date: payload.date ? formatDateTimeLocal(new Date(payload.date)) : form.date,
								hidden: payload.status !== 'published'
							})
							toast.success(`已恢复到版本 ${payload.version}，请检查后点击更新`)
						}}
					/>
				)}
				{mode === 'edit' && (
					<>
						<motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} className='flex items-center gap-2'>
							<div className='rounded-lg border bg-blue-50 px-4 py-2 text-sm text-blue-700'>编辑模式</div>
						</motion.div>

						<motion.button
							initial={{ opacity: 0, scale: 0.6 }}
							animate={{ opacity: 1, scale: 1 }}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className='rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600 transition-colors hover:bg-red-100'
							disabled={loading}
							onClick={handleDelete}>
							删除
						</motion.button>

						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={handleCancel}
							disabled={saving}
							className='bg-card rounded-xl border px-4 py-2 text-sm'>
							取消
						</motion.button>
					</>
				)}

				<motion.button
					initial={{ opacity: 0, scale: 0.6 }}
					animate={{ opacity: 1, scale: 1 }}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className='bg-card rounded-xl border px-4 py-2 text-sm'
					disabled={loading || saving}
					onClick={handleImportMd}>
					导入 MD
				</motion.button>
				<motion.button
					initial={{ opacity: 0, scale: 0.6 }}
					animate={{ opacity: 1, scale: 1 }}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className='bg-card rounded-xl border px-6 py-2 text-sm'
					disabled={loading}
					onClick={openPreview}>
					预览
				</motion.button>
				<motion.button
					initial={{ opacity: 0, scale: 0.6 }}
					animate={{ opacity: 1, scale: 1 }}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className='brand-btn px-6'
					disabled={loading}
					onClick={handleImportOrPublish}>
					{buttonText}
				</motion.button>
			</ul>
		</>
	)
}
