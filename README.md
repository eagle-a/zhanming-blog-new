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

删除页面中的图片引用不会立即删除 Blob 对象，避免历史修订或旧链接失效。需要清理 Blob 时必须先做引用审计。

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
pnpm dev
```

本地地址：<http://localhost:2025>。没有 `DATABASE_URL` 时，开发环境只读回退到仓库中的旧文章和 JSON；写入功能需要 Neon、Blob 和本地管理员密钥。

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

## 部署

只支持 Vercel。代码推送到已连接的 Git 仓库后由 Vercel 构建；日常文章和站点内容更新不需要推送代码。

Cloudflare/OpenNext 执行链路已经移除。仓库中的 `.open-next`、`.wrangler`、Cloudflare Worker 配置或部署脚本都不应恢复。

详细上线和回滚流程见 [`docs/vercel-cms-migration.md`](docs/vercel-cms-migration.md)。
