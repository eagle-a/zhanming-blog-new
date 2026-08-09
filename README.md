# eagle-a Blog

部署在 Vercel 的 Next.js 个人博客。文章和站点配置在运行时写入 Neon PostgreSQL，上传图片写入私有 Vercel Blob；发布内容不会提交 GitHub，也不会触发重新构建。

- 正式站点：<https://zhanmingblog.cc.cd>
- 部署平台：Vercel
- 数据库：Neon PostgreSQL
- 媒体：Private Vercel Blob

## 数据存储

| 内容                                         | 主存储              | 保护方式                     |
| -------------------------------------------- | ------------------- | ---------------------------- |
| 文章、分类、标签                             | Neon PostgreSQL     | 修订历史、乐观锁、软删除     |
| 首页、关于、友链、项目、分享、图片、语录配置 | Neon PostgreSQL     | 每份文档独立版本和修订历史   |
| 文章与配置图片                               | Private Vercel Blob | SHA-256 文件名、同源只读代理 |
| `public/` 旧内容                             | Git 仓库            | 只读备份和本地无数据库回退   |

删除页面中的图片引用不会立即删除 Blob 对象。媒体清理必须经过引用审计、孤儿标记、宽限期、删除前归档和可恢复清单，不能直接批量删除。

## 必需环境变量

连接 Neon 和 Blob 后，Vercel 会提供：

```text
DATABASE_URL
BLOB_READ_WRITE_TOKEN
```

还需在 Vercel 手动添加：

```text
BLOG_ADMIN_PASSWORD_HASH
BLOG_SESSION_SECRET
NEXT_PUBLIC_SITE_URL=https://zhanmingblog.cc.cd
```

`BLOG_ADMIN_PASSWORD_HASH` 和 `BLOG_SESSION_SECRET` 必须只用于服务端，不要添加 `NEXT_PUBLIC_` 前缀。生成命令：

```powershell
pnpm admin:secrets
```

不要把明文密码、密码哈希、Session Secret、数据库 URL 或 Blob Token 提交到 Git。

## 首次迁移

先登录并关联正确的 Vercel 项目，再把资源变量拉到被 Git 忽略的 `.env.local`：

```powershell
vercel login
vercel link
vercel env pull .env.local --environment=production
```

迁移顺序不能颠倒：

```powershell
pnpm db:migrate
pnpm migrate:legacy
pnpm migrate:legacy -- --apply
pnpm migrate:content
pnpm migrate:content -- --apply
```

两个迁移脚本默认都是 dry-run，只有 `--apply` 才写 Neon/Blob。它们按现有主键或文档键跳过已迁移数据，不覆盖后台已经修改过的内容，并保留所有 `public/` 原文件。

不要把 `db:migrate` 放进 Vercel Build Command。数据库结构变更必须先针对明确的 Neon 数据库人工执行，避免 Preview 或回滚部署意外修改生产库。

## 本地开发与检查

```powershell
pnpm install
pnpm db:migrate
pnpm migrate:legacy:local
pnpm dev
```

本地地址：<http://localhost:2025>。`migrate:legacy:local` 只允许连接 loopback PostgreSQL，把旧文章增量写入本地数据库，并继续使用 `public/blogs` 图片；它不会连接 Neon 或写 Vercel Blob。重复运行时不会覆盖已修改的同 slug 文章。

提交前执行：

```powershell
pnpm test
pnpm typecheck
pnpm build
pnpm audit --prod --registry https://registry.npmjs.org
```

## 内容管理

页面上的编辑按钮使用统一管理员密码登录。登录成功后，服务端签发 12 小时有效的签名 HttpOnly Cookie；浏览器不会接触数据库凭据、Blob Token 或密码哈希。

保存流程：

1. 图片以 SHA-256 文件名直传 Private Blob；
2. 服务端验证内容结构、URL、大小和当前版本；
3. Neon 事务同时更新当前文档和修订历史；
4. Next.js 失效对应缓存，公开页面直接读取新内容。

版本不一致时服务端返回 `409`，防止两个编辑会话互相覆盖。此时刷新页面后重新应用修改，不要强行覆盖。

### AI 投稿审批

本地 AI 可以读取并生成 Markdown，但不能直接公开发布。管理员在 `/admin/review` 生成一张 30 分钟有效、只能成功使用一次的投稿码；CLI 把一篇文章送入 `pending` 队列，管理员预览、修改并批准后才写入正式文章表。

```powershell
pnpm agent:submit C:\path\to\article.md
```

投稿码通过 CLI 隐藏输入粘贴，不放进环境变量、命令行参数或 Git。数据库只保存投稿码哈希。详细操作与安全边界见 [`docs/AI_SUBMISSION_GUIDE.md`](docs/AI_SUBMISSION_GUIDE.md)。

当前 AI 范围只有“文章投稿 → 后台审批 → 批准发布”。早期 Agent key、nonce 和报告枚举已由带数据保护检查的迁移清理。

## 备份、恢复与媒体维护

```powershell
pnpm backup:cms -- --output=C:\Backups\blog --include-blobs --archive-blobs
pnpm media:reconcile -- --include-blobs
pnpm media:maintain -- --action=plan
```

备份和任何媒体写操作必须使用仓库外目录。恢复只允许空目标库，媒体删除必须先生成候选清单和恢复归档；完整命令及环境保护见 [`docs/PROJECT_OVERVIEW.md`](docs/PROJECT_OVERVIEW.md)。

## 文档导航

- [项目整体说明](docs/PROJECT_OVERVIEW.md)：当前架构、页面、数据、API、安全、迁移、部署和已知限制；
- [本地 AI 一次性投稿指南](docs/AI_SUBMISSION_GUIDE.md)：当前可用的文章投稿操作；
- [Vercel CMS 迁移与回滚](docs/vercel-cms-migration.md)：数据库、Blob、上线和回滚流程。

## 部署

只支持 Vercel。代码推送到已连接的 Git 仓库后由 Vercel 构建；日常文章和站点内容更新不需要推送代码。

Cloudflare/OpenNext 执行链路已经移除。仓库中的 `.open-next`、`.wrangler`、Cloudflare Worker 配置或部署脚本都不应恢复。

详细上线和回滚流程见 [`docs/vercel-cms-migration.md`](docs/vercel-cms-migration.md)。
