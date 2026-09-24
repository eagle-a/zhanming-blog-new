# eagle-a Blog

部署在 Vercel 的 Next.js 个人博客。文章和站点配置在运行时写入 Neon PostgreSQL，上传图片写入私有 Vercel Blob；发布内容不会提交 GitHub，也不会触发重新构建。

- 正式站点：<https://zhanmingblog.cc.cd>
- 部署平台：Vercel
- 数据库：Neon PostgreSQL
- 媒体：Private Vercel Blob

## 数据存储

| 内容                                                         | 主存储              | 保护方式                                                                 |
| ------------------------------------------------------------ | ------------------- | ------------------------------------------------------------------------ |
| 文章、分类、标签                                             | Neon PostgreSQL     | 修订历史、乐观锁、软删除                                                 |
| 首页、关于、友链、项目、分享、图片、语录配置                 | Neon PostgreSQL     | 每份文档独立版本和修订历史                                               |
| 文章与配置图片                                               | Private Vercel Blob | SHA-256 文件名、同源只读代理                                             |
| 站点外壳素材（`public/images`、`src/svgs`、`public/live2d`） | Git 仓库            | 随代码部署，不进 Blob                                                    |
| 首页背景音乐（`public/music`）                               | Git 仓库            | 码率上限 96 kbps，由 `pnpm assets:optimize-music` 收敛                   |
| `public/blogs/` 旧文章树                                     | Git 仓库            | 仅开发回退（`BLOG_CONTENT_SOURCE=legacy`）时读取，线上 `/blogs/*` 已阻断 |

内容图片只在 Blob 里有一份，仓库不再保留副本；`public/` 剩下的都是站点外壳素材和背景音乐，搬进 Blob 会让基础渲染和音频播放依赖 Blob 可用性。

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

### 修订历史

编辑模式下点击“修订历史”按钮可查看该文章所有版本快照。选中历史版本后可以恢复：恢复操作会在事务中创建新版本（不覆盖当前版本），前端同步更新标题、摘要、标签、分类、发布时间和正文。

### AI 投稿审批

**自动代理投稿目前受阻：** `AGENTS.md` 要求命名管道，但当前 CLI 是 HTTP 实现。以下命令只能由人类用户手动执行；AI 可以准备文章，不能用现有 CLI 绕过管道限制。详情见投稿指南开头的限制说明。

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
- [周报与评审报告](reports/)：投稿源件（`reports/weekly-reports/`）与历次综合评审记录。`docs/` 只放项目文档，不放文章正文。

## 部署

只支持 Vercel。`vercel.json` 禁止 `main` 的 Git 自动部署，其他分支仍可生成 Preview；日常文章和站点内容更新不需要推送代码。

生产发布使用 `pnpm deploy:production`：先提交并推送 `main`，等待 GitHub CI 成功，再运行该命令。它检查干净工作区、实时远端 SHA、该 SHA 最新 CI 和关闭自动部署的配置，只上传 `git archive` 导出的提交快照，并写入 `releaseCommit` 元数据。本机忽略的 `.env`、未提交修改和本地资料不会被带入发布。认证、网络或 CI 状态无法核实会阻止发布。

注意：拥有 Vercel 发布权限的人仍可通过 Dashboard、直接 CLI 或修改配置绕过仓库流程；此门禁不是平台权限隔离。日常生产发布不要绕开包装脚本，紧急回滚由项目所有者在平台执行并记录部署 ID。

### 审稿回归测试

`pnpm test` 包含进程内 PostgreSQL 仓储测试（执行实际迁移，不读取业务数据库凭据）；`pnpm test:browser` 使用隔离页面中的真实审稿组件和模拟接口，不访问真实管理员 API。

首次运行浏览器测试：`pnpm exec playwright install chromium`。已有 Chromium 时可设置 `REVIEW_BROWSER_EXECUTABLE` 指向可执行文件。截图与 trace 写入系统临时目录，不进入仓库。CI 会安装 Chromium 并运行同一套测试。

`pnpm build` 后运行 `pnpm test:production`，以只读占位配置启动独立生产服务，验证审批/编辑登录页的真实 CSP、通知样式和移动端布局；登录请求被模拟，不使用真实凭据。CI 也执行该检查。

Sonner 2.0.8 使用 `patches/sonner@2.0.8.patch` 禁止运行时注入内联 CSS，统一从 `globals.css` 导入其公开静态样式。升级 Sonner 时必须重新评估补丁并通过生产 CSP 测试，不得用放宽 `style-src` 代替修复。

文章列表、时间分组、搜索结果和正文标题的发布日期统一按 UTC 显示，保持原有服务端日期，避免浏览器时区造成日期漂移和 hydration 错误；这不修改数据库时间。浏览器回归覆盖 UTC、洛杉矶和上海时区。

Cloudflare/OpenNext 执行链路已经移除。仓库中的 `.open-next`、`.wrangler`、Cloudflare Worker 配置或部署脚本都不应恢复。

详细上线和回滚流程见 [`docs/vercel-cms-migration.md`](docs/vercel-cms-migration.md)。
