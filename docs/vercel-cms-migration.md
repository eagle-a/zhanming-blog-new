# Vercel CMS 迁移与运维

## 目标架构

生产写入链路是：管理员密码登录 → Private Blob 上传 → Neon 事务写入 → Next.js 缓存失效。Git 仓库只承载代码和只读备份，内容更新不再触发 Vercel 构建。

Neon 中的主要表：

- `posts`、`post_revisions`、`tags`、`categories`、`post_tags`
- `content_documents`、`content_document_revisions`
- `media`

运行时配置文档固定为：`site`、`card-styles`、`about`、`bloggers`、`projects`、`shares`、`pictures`、`snippets`。

## 上线前检查

1. Vercel 项目已连接正式 Neon 数据库和 Private Blob Store。
2. Production 与 Preview 已配置 `BLOG_ADMIN_PASSWORD_HASH`、`BLOG_SESSION_SECRET`。
3. `NEXT_PUBLIC_SITE_URL` 在 Production 为 `https://zhanmingblog.cc.cd`。
4. 当前 CLI 项目必须由 `.vercel/project.json` 指向 `zhanming-blog-new`。
5. 不允许删除或改写 `public/blogs/`、旧 JSON、旧图片。

Vercel 的 Sensitive 变量不能用于普通 Development 拉取是平台限制，不是配置故障。本地验证可以使用一次性的本地管理员密钥，但不得写入仓库。

## 数据库与内容迁移

拉取资源变量后执行：

```powershell
vercel env pull .env.local --environment=production
pnpm db:migrate
pnpm migrate:legacy
pnpm migrate:legacy -- --apply
pnpm migrate:content
pnpm migrate:content -- --apply
```

`migrate:content` 会：

1. 严格验证八份仓库 JSON；
2. 递归查找其中的站内图片引用；
3. 在任何外部写入前确认引用文件存在、未越出 `public/` 且不超过 25 MB；
4. 按完整 SHA-256 复制到 `content/migrated/`；
5. 把文档中的本地 URL 改成 `/api/media/...` 同源代理地址；
6. 仅在文档不存在时插入版本 1 和修订 1；
7. 校验八份文档及首版修订都可读取。

重复执行不会覆盖已经在后台编辑的文档。旧文件与旧 Blob 都不会被脚本删除。

## 部署顺序

```powershell
pnpm test
pnpm typecheck
pnpm build
pnpm audit --prod --registry https://registry.npmjs.org
git diff --check
```

检查通过后，先部署 Preview 并验证，再提升为 Production。禁止在 Build Command 中自动运行数据库迁移。

## 验证清单

公开接口应返回 `200` 和数据库版本：

```text
/api/content/site
/api/content/card-styles
/api/content/about
/api/content/bloggers
/api/content/projects
/api/content/shares
/api/content/pictures
/api/content/snippets
```

页面与元数据：

```text
/
/about
/bloggers
/projects
/share
/pictures
/snippets
/rss.xml
/sitemap.xml
```

管理链路至少验证：

1. 错误密码被拒绝；
2. 正确密码获得 HttpOnly、SameSite Cookie；
3. 文档保存后版本加一且公开读取立即反映；
4. 旧版本保存返回 `409`；
5. 图片上传后只能通过允许的 `/api/media/` 路径读取；
6. 测试数据恢复，临时文章、媒体索引和 Blob 被清理。

## 回滚与恢复

- 代码问题：在 Vercel 回滚部署，不回滚数据库迁移。
- 内容误改：从 `content_document_revisions` 或 `post_revisions` 取上一版本，通过正常写入流程恢复为新版本。
- 数据库不可用：站点配置和开发文章有仓库只读回退；生产写入不可用，不能伪装成成功。
- Blob 引用误删：先从修订历史恢复引用。不要直接批量删除 Blob。

生产与开发共用数据库会让本地写入直接影响生产数据。除受控烟雾测试外，不要用开发页面修改真实内容。长期应建立独立 Neon 开发分支和独立 Blob Store。
