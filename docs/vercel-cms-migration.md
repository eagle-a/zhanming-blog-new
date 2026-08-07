# Vercel CMS 上线步骤

文章发布链路现在是：浏览器登录文章后台 → Blob 直传图片 → Neon 写入文章和修订历史 → Next.js 按标签失效缓存。发布不再写 GitHub，也不会触发 Vercel 部署。

## 需要的环境变量

已在 Vercel 连接的资源会提供：

- `DATABASE_URL`
- `BLOB_STORE_ID`
- `BLOB_READ_WRITE_TOKEN`
- `BLOB_WEBHOOK_PUBLIC_KEY`

还必须手动添加两个服务端变量，三个环境都要配置：

- `BLOG_ADMIN_PASSWORD_HASH`
- `BLOG_SESSION_SECRET`

生成它们时在项目根目录执行：

```powershell
pnpm admin:secrets
```

脚本只在终端显示一次结果。不要把密码、哈希、session secret 提交到 Git，也不要发到聊天里。

## 首次数据库迁移

先在本机重新登录 Vercel CLI 并关联项目：

```powershell
vercel login
vercel link
```

只把生产数据库拉到一个临时、被 `.gitignore` 忽略的文件：

```powershell
vercel env pull .env.production.local production
pnpm db:migrate
pnpm migrate:legacy -- --apply
Remove-Item .env.production.local
```

迁移脚本会：

1. 读取 `public/blogs/index.json` 和每篇文章的 Markdown；
2. 用 SHA-256 命名把旧图片复制到 Blob，并改写 Markdown/封面 URL；
3. 在 Neon 写入文章、第一版修订、标签、分类和媒体索引；
4. 校验文章数量和正文内容；
5. 保留 `public/blogs` 原文件，不删除任何旧数据。

脚本默认是 dry-run；只有显式加入 `--apply` 才会写入外部服务。重复运行时已存在的 slug 会跳过，不会覆盖已经在后台编辑过的文章。

## 后续部署

数据库迁移完成后再部署代码。以后更新文章只走后台发布按钮；代码改动才会触发 Vercel 构建。

不要在部署构建命令里执行 `db:migrate`。数据库迁移必须由人工在明确的 Neon 分支上执行，避免 Preview 分支或回滚部署意外改生产结构。
