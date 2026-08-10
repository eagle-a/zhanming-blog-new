import test from 'node:test'
import assert from 'node:assert/strict'
import { parseMarkdownImport } from '../src/lib/markdown-import.ts'

test('imports frontmatter into publish fields and removes a duplicate H1', () => {
	const result = parseMarkdownImport(
		`---
title: "测试文章"
slug: test-post
summary: "一段摘要"
tags: ["Next.js", "Vercel"]
category: 总结
date: 2026-08-07T13:21
hidden: false
---

# 测试文章

正文内容
`,
		'article.md'
	)

	assert.deepEqual(result.form, {
		title: '测试文章',
		slug: 'test-post',
		summary: '一段摘要',
		tags: ['Next.js', 'Vercel'],
		category: '总结',
		date: '2026-08-07T13:21',
		hidden: false,
		md: '正文内容\n'
	})
})

test('accepts standard YAML single-quoted flow tags', () => {
	const result = parseMarkdownImport("---\ntitle: 'Flow tags'\nslug: flow-tags\ntags: ['标签一', '标签, 二']\n---\n\n# Flow tags\n\nBody", 'flow-tags.md')
	assert.deepEqual(result.form.tags, ['标签一', '标签, 二'])
})

test('uses the first H1 and a safe filename when frontmatter is absent', () => {
	const result = parseMarkdownImport('# 文件标题\n\n正文', 'my-post.md')
	assert.equal(result.form.title, '文件标题')
	assert.equal(result.form.slug, 'my-post')
	assert.equal(result.form.md, '正文')
})

test('does not infer an unsafe slug from a non-ASCII filename', () => {
	const result = parseMarkdownImport('普通正文', '中文文章.md')
	assert.equal(result.form.slug, undefined)
	assert.equal(result.form.md, '普通正文')
})

test('rejects invalid frontmatter values instead of silently importing them', () => {
	assert.throws(() => parseMarkdownImport('---\nslug: ../bad\n---\n正文'), /slug 不合法/)
	assert.throws(() => parseMarkdownImport('---\nhidden: yes\n---\n正文'), /hidden/)
	assert.throws(() => parseMarkdownImport('---\ntags: [bad yaml]\n---\n正文'), /tags/)
})
