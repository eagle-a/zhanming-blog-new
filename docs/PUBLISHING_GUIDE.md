# 提交文章与图片

面向本仓库所有者：怎么发文章、怎么放图、发完之后怎么自检。

## 0. 先分清：改什么需要部署

| 你改的东西                                                        | 落在哪              | 要不要部署                                        |
| ----------------------------------------------------------------- | ------------------- | ------------------------------------------------- |
| 文章正文、标题、摘要、标签、分类、发布时间、封面                  | Neon PostgreSQL     | **不用**                                          |
| 文章插图、站点配图、友链头像、图集                                | Private Vercel Blob | **不用**                                          |
| 页面代码、样式、`public/` 外壳素材、背景音乐、`vercel.json`、依赖 | Git 仓库            | **要**，见 [Vercel 部署指南](DEPLOYMENT_GUIDE.md) |

发文章不碰 Git、不触发构建。保存后文章页最多 60 秒生效（`revalidate = 60`），列表页同样。反过来，改代码不部署就只在本地生效。

## 1. 路线 A：浏览器后台（有图的文章走这条）

1. 打开 `https://zhanmingblog.cc.cd/write/<slug>`，例如 `/write/weekly-report-2026-09-30`。用一个新 slug 打开就是新建。
2. 输入管理员密码。服务端签发 12 小时有效的签名 HttpOnly Cookie；浏览器全程拿不到数据库凭据、Blob Token 或密码哈希。
3. 左栏填元数据：slug、标题、摘要、标签、分类、发布时间。
4. 正文写 Markdown。文章标题已经在元数据里，正文不要重复写一遍大标题。
5. 右栏「图片管理」把本地图片拖进去（或点 `+`）。插入正文时先占位成 `(local-image:<id>)`，**保存时自动上传 Blob 并把占位替换成 `/api/media/...`**，路径不用你手写。
6. 点图片左上角的「封面」标记，把它设为封面。
7. 保存。线上最多 60 秒生效。

编辑已有文章走同一个地址，**编辑模式不允许改 slug**。如果两个会话同时改同一篇，服务端返回 `409`，刷新页面重做这次修改，不要强行覆盖。

修订历史：编辑模式点「修订历史」可以看到该文章的所有版本。恢复会在事务里新建一个版本（不覆盖当前版本），标题、摘要、标签、分类、发布时间和正文一起回滚。

## 2. 路线 B：命令行投稿（AI 或脚本准备 Markdown）

适合「AI 写 Markdown → 人审核发布」的场景。文章进的是 `pending` 队列，不直接公开。

### 2.1 文件格式

```markdown
---
title: '研一第 3 周：xxx'
slug: half-week-report-2026-09-30
summary: '一句话摘要，会出现在列表页。'
tags: ['学习汇报', 'ADC']
category: 工作记录
date: 2026-09-30T09:00
---

# 研一第 3 周：xxx

正文……
```

`slug` 和 `title` 必填；`title` 缺失时取正文第一个 H1，`slug` 缺失时取 ASCII 文件名。`date` 缺失时用文件修改时间。投稿内容会被扫一遍密钥、私钥、带凭据的连接串，命中就直接拒绝。

### 2.2 取投稿码

管理员登录 `/admin/review`，生成一次性投稿码。码 **30 分钟有效、只能成功使用一次**，数据库只保存它的哈希。

### 2.3 提交

```powershell
pnpm --dir C:\Users\zm\Desktop\project\zhanming-blog-new agent:submit C:\path\to\article.md
```

终端会提示 `Paste the one-time submission code (input hidden):`，把码粘进去（不回显）。成功返回 `"status": "pending"`。

要投到本地起的服务：加 `--api-url http://127.0.0.1:2025`。目标站点也可以用 `BLOG_SUBMISSION_API_URL` 指定，默认是 `https://zhanmingblog.cc.cd`。

### 2.4 审批

管理员在 `/admin/review` 预览、修改、批准。**批准之后才写入正式文章表并公开**，提交者不能自己批准。

### 2.5 这条路的限制：图片不跟着正文走

CLI 只提交正文 Markdown，封面固定为空。要插图只有两种做法：

1. 先在后台把图传好、复制 `/api/media/...` 路径，写进 Markdown 再提交；
2. 或者先提交纯文字，批准后在 `/write/<slug>` 里补图。

正文里写 `/images/<slug>/xxx.png` 这类仓库路径会 404 —— 该机制已于 2026-09-24 废除。

## 3. 图片存在哪、路径长什么样

- 存储：Private Vercel Blob，文件名是图片内容的 SHA-256。
- 页面引用：`/api/media/blog/<slug>/<sha256>.<ext>`，同源只读代理，浏览器拿不到 Blob 直链。
- 变体：加 `?w=480|800|1200|1920` 由服务端生成 WebP；如果重编码比原图还大，自动回退原始字节。
- 站点外壳素材（`public/images`、`src/svgs`、`public/live2d`）和背景音乐（`public/music`）仍在仓库里，走 `/_next/image` 或静态直出，不进 Blob。

不要手写 `/api/media/...`，从后台复制。

## 4. 图片上传的三个入口

| 入口                                 | 怎么用                                    | 走哪条 API                             |
| ------------------------------------ | ----------------------------------------- | -------------------------------------- |
| 编辑器「图片管理」                   | 拖入本地图片，保存时统一上传              | 客户端令牌流 `/api/admin/media/upload` |
| 其它配图（头像、项目图、图集、分享） | 同上                                      | 同上                                   |
| 维护脚本                             | `pnpm media:migrate-static --slug <slug>` | 服务端 `/api/admin/media/store`        |

图片进 Blob 和「登记进 `media` 表」是两件事。正文能显示只证明图片可读；`media` 表缺行时文章页拿不到 `width`/`height`，不会输出 `srcset`。批量的索引补齐用：

```powershell
pnpm media:maintain -- --action=plan
pnpm media:reconcile -- --include-blobs
```

## 5. 发布后自检

1. 打开文章页，从标题滚到底，确认没有裂图。
2. 抽查一张图：

   ```powershell
   curl.exe -I --noproxy '*' https://zhanmingblog.cc.cd/api/media/blog/<slug>/<sha256>.png
   ```

   应该是 `200`，`Content-Type` 是图片类型。

3. `/blog` 列表、`/rss.xml`、`/sitemap.xml` 能看到新文章。
4. 图文对不上时，回编辑器重新插图，不要手工改路径。

## 6. 禁止的做法

- **不要把图片复制进 `public/images/<slug>/`**。该目录和「先本地中转再迁移」的流程已于 2026-09-24 废除，仓库不再保留任何内容图片。
- 不要直接写 Neon 或 Blob 发文章：绕过审批、修订历史和媒体索引。
- 不要把投稿码写进命令行参数、环境变量、脚本或文件，只走隐藏输入。
- AI 不能自己生成投稿码，也不能批准投稿，只能把文章送进 `pending`。
