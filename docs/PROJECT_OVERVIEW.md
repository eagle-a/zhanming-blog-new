# eagle-a 项目整体说明

> 核对日期：2026-08-10（修订历史 UI、文章搜索、阅读进度条、自定义 404 页面；暗色模式试点后已移除，见第 19 节）
> 本文只描述当前仓库已经存在的功能、数据流和限制，不收录未实现的产品规划。

## 1. 项目定位

这是一个部署在 Vercel 上的 Next.js 个人博客和轻量 CMS。它已经从“修改 Markdown 后重新构建静态站”转成了运行时内容系统：

- 公开文章和站点配置主要从 PostgreSQL 读取；
- 图片和媒体使用 Private Vercel Blob；
- 管理员通过密码会话修改内容；
- 本地 AI 可以生成 Markdown 并投稿，但不能直接公开发布；
- 文章日常更新不需要提交 Git 或重新构建；
- Git 仓库中的 `public/` 仍保留旧内容，作为迁移备份和本地开发回退。

当前最重要的事实：AI 投稿链路已经可用，但它只支持公开文章，不是通用自动化发布平台。

## 2. 技术栈与运行形态

| 项目       | 当前版本/方案                                                           |
| ---------- | ----------------------------------------------------------------------- |
| 框架       | Next.js 16.3 App Router                                                 |
| UI         | React 19.2、TypeScript 5.9、Tailwind CSS 4                              |
| 动画与交互 | Motion、Lucide、Zustand、SWR、Sonner                                    |
| 数据库     | PostgreSQL；Vercel 生产环境接 Neon Serverless，loopback 本地环境接 `pg` |
| ORM/迁移   | Drizzle ORM、Drizzle Kit                                                |
| 媒体       | Private Vercel Blob，同源代理读取                                       |
| Markdown   | marked、KaTeX、Shiki、自定义清洗与渲染                                  |
| 外部内容   | 服务端读取 `https://daily.juya.uk/rss.xml`，解析后交给 AI 日报页面展示  |
| 认证       | scrypt 管理员密码哈希 + HMAC 签名 HttpOnly Cookie                       |
| 部署       | 只支持 Vercel；Cloudflare/OpenNext 不属于当前方案                       |
| 包管理器   | pnpm 11.4.0                                                             |

Next 配置启用 React Strict Mode、React Compiler、Turbopack SVG loader、Next 图片优化、服务端动态 API 路由和按标签失效缓存。内容图片仍通过应用的同源代理读取；代理只接受 480/800/1200/1920 四档缩放宽度，并由 Vercel CDN 缓存内容寻址的不可变变体。

## 3. 目录职责

```text
src/app/       页面、App Router 路由和 API route handlers
src/components/通用 UI、文章渲染、媒体和交互组件
src/layout/    全局布局、导航、背景、音乐和响应式容器
src/hooks/     SWR、Zustand、管理员会话、配置和尺寸相关 hooks
src/lib/       服务端仓储、校验、认证、缓存、Markdown 和迁移辅助逻辑
src/db/        Drizzle schema 与数据库客户端
src/config/    站点配置和卡片布局的 Git 回退 JSON
public/        旧文章、图片、证书、音乐、Live2D 和静态资产
drizzle/       数据库迁移 SQL 与迁移快照
scripts/       本地开发、迁移、密钥生成、投稿和 smoke test
tests/         Node test runner 测试
docs/          项目操作和架构文档
```

`public/blogs/hardware-kb/` 是用户本地资料，禁止清理、改名或删除；该目录已从 Git 索引和 Vercel 部署输入中排除，本机文件仍完整保留。`.next/`、`.open-next/`、`dist/` 和 `.vercel/` 是本地构建/部署产物，不是内容源。

## 4. 页面与用户入口

### 4.1 公开页面

| 路由             | 作用                                                                       | 数据来源                                          |
| ---------------- | -------------------------------------------------------------------------- | ------------------------------------------------- |
| `/`              | 可拖拽卡片式首页：头像、问候、插画、时钟、日历、社交按钮、分享、文章入口等 | 运行时站点配置和卡片样式，失败时回退 JSON         |
| `/blog`          | 按日/周/月/年/分类浏览已发布文章，支持已读标记、全文搜索和管理员编辑入口   | PostgreSQL；本地无数据库开发时回退 `public/blogs` |
| `/blog/[slug]`   | 文章详情、Markdown、代码复制、图片预览、阅读进度条和 SEO metadata          | PostgreSQL；本地回退旧 Markdown                   |
| `/about`         | 关于页                                                                     | 构建时读取 `public/about/content.md`              |
| `/bloggers`      | 博主收藏                                                                   | `bloggers` 内容文档 + 回退 JSON                   |
| `/projects`      | 项目展示                                                                   | `projects` 内容文档 + 回退 JSON                   |
| `/share`         | 资源分享                                                                   | `shares` 内容文档 + 回退 JSON                     |
| `/pictures`      | 图片随机布局、查看和管理员上传                                             | `pictures` 内容文档 + Private Blob                |
| `/snippets`      | 语录/片段展示和编辑                                                        | `snippets` 内容文档 + 回退 JSON                   |
| `/comments`      | Twikoo 评论页面                                                            | 外部 Twikoo 服务配置                              |
| `/juya-ai-daily` | 橘鸦 AI 日报，拉取服务端代理后的 RSS 数据                                  | `daily.juya.uk` RSS，经服务端解析和清洗           |
| `/image-toolbox` | 浏览器端图片处理工具                                                       | 浏览器本地处理                                    |
| `/clock`         | 秒表/倒计时工具                                                            | 浏览器本地状态                                    |
| `/live2d`        | Live2D 展示                                                                | 浏览器加载外部 SDK 和本地模型                     |
| `/svgs`          | SVG 资产浏览与复制                                                         | 构建时生成的 SVG 索引                             |
| `/rss.xml`       | 站内 RSS                                                                   | 已发布文章和站点配置                              |
| `/sitemap.xml`   | 站点地图                                                                   | 已发布文章和静态路由                              |

### 4.2 管理入口

| 路由                      | 作用                                        | 权限事实                                                    |
| ------------------------- | ------------------------------------------- | ----------------------------------------------------------- |
| `/write`、`/write/[slug]` | 文章编辑器和预览                            | Server Component 先验证管理员 Cookie，未登录只显示登录 gate |
| `/admin/review`           | AI 文章审批、编辑、批准、拒绝、投稿票据管理 | 登录页外壳可访问；审批数据和操作 API 要求管理员会话         |
| `/api/admin/*`            | 配置、文章、媒体、审批和票据写接口          | Cookie 会话 + 对写操作做同源校验                            |

没有独立的用户注册、普通用户账号或 Agent 常驻服务。

## 5. 数据与存储设计

### 5.1 PostgreSQL 核心表

| 表                           | 用途                                                                                           |
| ---------------------------- | ---------------------------------------------------------------------------------------------- |
| `posts`                      | 文章当前版本、状态、发布时间、分类、封面和软删除时间                                           |
| `post_revisions`             | 每次文章保存/批准的正文和元数据快照                                                            |
| `tags`、`post_tags`          | 标签和文章多对多关系                                                                           |
| `categories`                 | 分类顺序和更新时间                                                                             |
| `content_documents`          | `site`、`card-styles`、`bloggers`、`projects`、`shares`、`pictures`、`snippets` 七类运行时配置 |
| `content_document_revisions` | 配置版本历史                                                                                   |
| `media`                      | Blob URL、pathname、SHA-256、MIME、大小和可恢复生命周期状态登记                                |
| `content_submissions`        | AI 投稿及审批状态、内容哈希、校验结果和拒绝原因                                                |
| `submission_tickets`         | 一次性文章投稿票据，只保存哈希和生命周期状态                                                   |
| `audit_events`               | 投稿票据、投稿、审批、拒绝、编辑等审计记录                                                     |
| `admin_login_attempts`       | 管理员登录限速状态                                                                             |

旧的 `agent_api_keys`、`agent_request_nonces` 和 `work_report`/`advisor_reply` submission 枚举已由 `drizzle/0009_fixed_firebird.sql` 清理；迁移前会拒绝仍存在的旧 Agent 数据、非 post 投稿和重复幂等键，避免静默丢数据。

### 5.2 文章状态

```text
draft      管理员编辑中的草稿
published  公开页面、RSS 和 sitemap 可读取
archived   软删除或归档，公开读取过滤
```

公开查询同时要求 `status = published`、`deleted_at IS NULL`，并且发布时间不晚于当前时间。文章 slug 有唯一索引；AI 批准使用 `create-only`，不能覆盖或复活同 slug 历史文章。

### 5.3 配置文档

配置写入携带 `expectedVersion`。服务端使用 PostgreSQL advisory lock、行锁和版本比较，冲突返回 `409`，并把新版本写入修订表。不存在数据库记录时，公开页面使用 `src/config/*.json` 或对应页面的 `list.json` 回退。

### 5.4 图片和媒体

- 管理员浏览器先计算文件 SHA-256；
- Blob pathname 使用 `blog/<sha>.<ext>` 或 `content/<namespace>/<sha>.<ext>`；
- Blob 设为 Private，公开页面不直接暴露 Blob Token；
- `/api/media/[...pathname]` 校验固定 pathname 规则后服务端读取；
- `media` 表登记对象信息并按 pathname 去重；
- 上传完成回调先登记为 `pending`；文章或运行时配置事务成功写入并确认引用后，才标记为 `committed`；
- `pending_at`、`committed_at`、`last_seen_at`、`orphaned_at` 和 `deleted_at` 支持可审计的两阶段生命周期；删除前必须先归档并生成恢复清单；
- 删除引用不会自动删除 Blob，避免旧修订和历史链接失效。

仓库中的 `public/` 图片仍是旧内容和本地回退资产，不会被迁移脚本删除。

## 6. 文章工作流

### 6.1 管理员手动编辑

1. 打开 `/write` 或文章编辑入口；
2. 管理员会话由密码登录获得；
3. 编辑器校验 slug、标题、摘要、日期、标签、分类、正文和封面；
4. 图片通过 Private Blob 上传；
5. 服务端事务更新 `posts`、`post_revisions`、`tags`、`post_tags` 和分类；
6. 成功后调用 `revalidateTag`，公开页面运行时读取新内容。

### 6.2 本地 AI 投稿

```text
AI 生成 article.md
→ 管理员在 /admin/review 生成一次性投稿码
→ 用户将投稿码粘贴到 CLI 隐藏输入
→ POST /api/agent/v1/submissions/posts
→ content_submissions.status = pending
→ 管理员预览、修改、批准或拒绝
→ 批准事务写入 posts + post_revisions
→ 刷新 posts、文章和分类缓存
```

CLI：

```powershell
pnpm agent:submit C:\path\to\article.md
```

支持标准 frontmatter：`title`、`slug`、`summary`、`tags`、`category`、`date`；第一个与 title 相同的 H1 会被去重。投稿正文限制约 2 MB，slug 只允许安全字符，Markdown 会做敏感信息扫描和结构校验。

### 6.3 修订历史

编辑模式下，管理员可以在 `/write/[slug]` 打开“修订历史”面板：

- 列表按版本号倒序展示该文章所有 `post_revisions` 记录，标记当前版本；
- 选中版本后服务端返回该版本正文与元数据快照（标题、状态、分类、标签）；
- 恢复操作在事务中执行 advisory lock + 行锁，将选中版本写入为新版本（不覆盖当前版本），同时刷新标签和分类；
- 恢复后前端同步更新表单的标题、摘要、标签、分类、发布时间和正文，避免后续“更新”丢失元数据；
- `GET /api/admin/posts/[slug]/revisions` 返回摘要列表；`GET /api/admin/posts/[slug]/revisions/[version]` 返回详情；`POST /api/admin/posts/[slug]/revisions/[version]` 触发恢复。

### 6.4 文章搜索

`/blog` 顶部搜索框输入关键词后：

- 客户端 300ms 防抖，调用 `GET /api/search?q=<keyword>`；
- 服务端使用 PostgreSQL `ILIKE` 在标题、摘要、正文和标签中匹配，返回最多 20 条结果（可通过 `limit` 调整，上限 50）；
- 结果包含内容片段（snippet），方便快速判断相关性；
- 文本搜索无结果时仍会查询标签匹配，多标签命中时使用 `DISTINCT` 去重；
- 搜索状态下隐藏日/周/月/年分组切换，只展示扁平结果列表；
- 本地开发无数据库时返回空结果，不报错。

## 7. 认证与安全边界

### 7.1 管理员会话

- 环境变量保存 scrypt 密码哈希和至少 32 字符的会话密钥；
- scrypt 参数固定为 `N=16384, r=8, p=1`；
- 会话 Cookie 为 HttpOnly、SameSite=Strict、生产环境 Secure，最长 12 小时；
- Cookie 内容是带过期时间的 HMAC 签名 payload，不是数据库密码；
- 登录失败按客户端地址记录，15 分钟最多 5 次，超限阻断 30 分钟；
- 所有管理员写 API 强制要求有效会话和 `Origin`，并要求 Origin 与转发后的协议和 Host 严格一致；缺失 Origin 直接返回 `403`；
- 写操作还验证 `BLOG_RESOURCE_ENV` 与当前 Vercel 环境一致，防止 Preview/Development 误写 Production 资源；
- 本地开发只有在数据库 hostname 为 loopback 时，才允许省略 `BLOG_RESOURCE_ENV`。

### 7.2 AI 投稿票据

- 票据由 `randomBytes(32)` 生成，实际随机材料为 256 bit；
- 数据库只保存 SHA-256 哈希；
- 有效期 30 分钟，可撤销，只能原子消费一次；
- Scope 由数据库约束固定为 `posts:submit`；
- 只能创建一条 `pending` 文章投稿；
- AI 无法批准、拒绝、读数据库、写 Blob、覆盖文章或调用管理员接口；
- CLI 不接受命令行参数或环境变量中的票据，使用隐藏输入。

这不是同一 Windows 用户下的硬隔离。恶意进程若拥有当前用户完整权限，理论上仍可能观察输入或进程；当前方案依靠短时、单次、最小权限和人工审批降低风险。

### 7.3 内容处理

- Zod 对文章、配置、上传元数据和拒绝原因做严格 schema 校验；
- Markdown 渲染前清理危险 HTML、脚本、事件属性和不安全 URL；
- RSS HTML 经过允许列表清洗后才交给 React 解析；
- `src/proxy.ts` 按路由生成 CSP；`vercel.json` 设置 Referrer-Policy、X-Content-Type-Options、X-Frame-Options 和 Permissions-Policy；
- 生产 CSP 已移除 `unsafe-eval` 和失效的 AI 日报旧域名；开发环境按 Next 16.3 要求临时允许 `unsafe-eval`；公开静态/ISR 页面仍保留兼容内联策略，后台脚本策略改用每请求 nonce；
- 审计事件不保存密码、Token、完整请求头或本地敏感文件。

## 8. 缓存和发布语义

服务端仓储使用 `unstable_cache`：

- 已发布文章列表：标签 `posts`，约 1 小时缓存；
- 单篇文章：标签 `posts` 和 `post:<slug>`；
- 分类：标签 `post-categories`；
- 配置：标签 `content:<key>`；
- 管理写入、批准和批量修改后主动失效对应标签/路径；
- 公开 API 返回可重新验证的缓存头，管理员和审批 API 返回 `no-store`。

因此，批准文章后不需要 Git commit 或 Vercel rebuild。只有代码、依赖、环境变量或数据库迁移发生变化时，才需要部署或人工执行迁移。

## 9. 外部内容与特殊页面

### AI 日报

`/api/ai-daily` 在 Node runtime 请求 `daily.juya.uk` RSS，限制响应大小和 12 秒超时，缓存 5 分钟并带 `ai-daily` tag。解析器兼容 RSS 字段、日期和 `content:encoded`，正文经 HTML 清洗；前端提供加载、刷新、错误和预览状态。

### 评论

评论页面使用 Twikoo 外部服务，配置来自站点运行时文档。它不是本项目数据库中的评论系统。

### Live2D 与图片工具

Live2D 页面在客户端加载带 integrity 的外部 SDK；图片工具主要在浏览器本地处理文件。它们不参与文章 CMS 数据流。

## 9.1 主题与阅读体验

站点为单一亮色主题；曾试点的暗色模式因与彩色气泡背景视觉冲突已整体移除（见第 19 节），当前代码中不存在 `html.dark` 规则、主题切换组件或相关本地存储逻辑。

### 阅读进度条

- 文章详情页顶部 3px 品牌色进度条，基于 `[data-published-article] article` 元素位置计算；
- 使用 `requestAnimationFrame` 节流 scroll 事件，避免高频更新；
- 短文章（高度不足视口 30%）直接显示 100%。

### 自定义 404 页面

- 根级 `src/app/not-found.tsx` 处理全局未匹配路由；
- `src/app/blog/[id]/not-found.tsx` 处理文章详情内的 `notFound()` 调用；
- 两者不冲突，Next.js App Router 按路由段层级生效。

## 10. 数据迁移与本地运行

### 本地启动

```powershell
pnpm install
pnpm db:migrate
pnpm migrate:legacy:local
pnpm dev
```

本地站点：`http://127.0.0.1:2025`。

`migrate:legacy:local` 的安全条件：

- 必须显式使用 `--local-assets --apply --confirm-environment=development`；
- PostgreSQL hostname 只能是 loopback；
- 只迁移旧文章，图片继续使用 `public/blogs`；
- 同 slug 内容冲突时整批拒绝，不覆盖现有数据库内容；
- 重复运行会跳过已经存在且一致的文章；
- 不连接 Neon，不写 Vercel Blob。

生产迁移命令 `migrate:legacy` 和 `migrate:content` 默认 dry-run，只有显式 `--apply` 才写数据库或 Blob。禁止把 `db:migrate` 放入 Vercel Build Command。

### 环境变量

生产至少需要：

```text
DATABASE_URL
BLOB_READ_WRITE_TOKEN
BLOG_ADMIN_PASSWORD_HASH
BLOG_SESSION_SECRET
NEXT_PUBLIC_SITE_URL
BLOG_RESOURCE_ENV=production
```

Vercel 的 Production、Preview、Development 必须分别设置 `BLOG_RESOURCE_ENV=production|preview|development`，并分别绑定对应的 Neon 数据库/分支和 Blob Store。这个变量只能阻止明显错配，不能替代 Dashboard 中的资源隔离。

`.env*` 被 Git 忽略。不要输出、提交或复制数据库 URL、Blob Token、密码哈希或会话密钥。

## 11. 检查命令

```powershell
pnpm test
pnpm typecheck
pnpm format:check
pnpm db:check
pnpm build
pnpm audit --prod --registry https://registry.npmjs.org
git diff --check
```

源码清理复核使用：

```powershell
pnpm dlx knip --files --exports --dependencies --no-exit-code
```

Knip 对配置文件里以字符串形式声明的 `@svgr/webpack` 会给出误报；该依赖由 `next.config.ts` 的 SVG loader 实际使用，必须保留。

`pnpm check` 串行运行测试、类型检查、格式门禁、Drizzle 迁移检查和生产构建。GitHub Actions 在 push 到 `main` 和 pull request 时执行同一组核心门禁，三个第三方 Action 均固定到对应 v4.4.0 的不可变 commit SHA。当前测试覆盖文章输入、AI 投稿及票据绑定重放、敏感信息扫描、Cookie 畸形输入、配置校验、Markdown 与响应式媒体宽度、RSS 解析、登录限速、严格同源策略、资源环境隔离、脚本迁移安全和 Blob 路径校验。

### 备份与媒体对账

备份必须写到仓库外的新目录，默认只导出 CMS 数据；需要做恢复演练时，同时归档 Blob 字节：

```powershell
pnpm backup:cms -- --output=C:\Backups\zhanming-blog-2026-08-09
pnpm backup:cms -- --output=C:\Backups\zhanming-blog-2026-08-09-with-blobs --include-blobs --archive-blobs
```

导出包含文章、修订、标签、分类、配置文档、配置修订、媒体登记、待审批内容、审计事件和不含哈希的票据元数据；明确排除密码、登录尝试、票据哈希和连接串。`--archive-blobs` 会逐个下载私有 Blob、校验大小和 SHA-256 后写入 `blobs/`。

恢复演练只能写入明确的空目标库，且脚本拒绝 production：

```powershell
$env:RESTORE_DATABASE_URL='目标 Neon 分支或本机空库连接串'
$env:RESTORE_BLOB_READ_WRITE_TOKEN='目标 Blob Store Token'
$env:RESTORE_ALLOW_NON_LOOPBACK='1'
pnpm backup:restore -- --backup=C:\Backups\zhanming-blog-2026-08-09-with-blobs --target-environment=restore-drill --confirm-environment=restore-drill
```

恢复脚本会先完整校验归档字节，再幂等恢复 Blob，最后在数据库事务中再次确认目标表为空并写入数据；同 pathname 已存在且字节一致时复用，不一致时拒绝覆盖。`RESTORE_FAULT_INJECT_AFTER_BLOBS` 可注入中断，清除该变量后可安全重跑；`--repair-blobs-only` 可在不连接数据库的情况下补齐 Blob。恢复后的一次性投稿票据全部撤销，不能再次授权投稿。2026-08-09 已在两个独立本地 PostgreSQL 18 空库之间完成数据库备份/恢复演练，并验证逐表行数、票据哈希重置、强制撤销和序列续写。生产恢复与 Blob 字节异地恢复仍必须由管理员在独立 Neon 分支和独立 Blob Store 上执行并记录 RPO/RTO。

媒体对账只生成报告，不修复、不上传、不删除：

```powershell
pnpm media:reconcile
pnpm media:reconcile -- --include-blobs
pnpm media:maintain -- --action=plan
pnpm assets:audit
```

`media:maintain --action=plan` 列出历史索引回填候选、超过宽限期的孤儿候选和已删除但可恢复的行。写操作按 `backfill → mark → delete` 分阶段，删除前会重新核验引用、宽限期和 ETag，并强制写出 Blob 恢复归档；中断状态 `deleting` 也可由 `recover` 判断对象是否仍存在并恢复。内容写入、上传 pathname 预留和 GC 共用 PostgreSQL 事务级 advisory lock，防止最终引用检查后又被并发引用。上传完成回调重新读取 Blob 并核验实际 SHA-256、大小和 MIME，不信任客户端自报元数据。所有媒体维护写操作拒绝 `BLOG_RESOURCE_ENV=production`，生产执行必须由管理员在已确认的资源上运行。

## 12. 当前数据核对

2026-08-08 本地 PostgreSQL 只读核对：

- 正式文章：11 篇；
- `content_submissions`：0 条；
- 测试 slug `one-time-ticket-e2e-20260808`：0 篇；
- 测试投稿：0 条；
- 有效未使用投稿票据：0 张；
- 保留 1 张已撤销且已过期票据及其审计事件，这是无效授权和正常审计残留，不是文章数据。

仓库仍有 26 个旧 Markdown 文章文件和用户静态资源，未被清理。`public/blogs/hardware-kb/` 的 33 个本地文件完整保留，但不再进入 Git 或 Vercel 部署。

## 13. 已验证问题与已知限制

### 已修复

- `/blog` 首次加载的 hydration mismatch：根因是 Zustand 持久化的已读文章状态在客户端首次渲染时多出 `[已阅读]`；现在等客户端挂载后再显示；
- 根布局平台检测改为零渲染客户端初始化组件，避免严格 CSP 页面出现 nonce 属性 hydration mismatch 或 React 脚本警告；
- `/admin/review`、`/write` 与 `/write/[slug]` 已增加服务端会话 gate；未登录用户不会拿到后台 UI；
- 管理写请求现在必须有严格同源 Origin，并通过部署环境/资源环境一致性检查；
- 生产 CSP 已移除 `unsafe-eval` 和失效域名；开发环境仅为 React 调试启用 `unsafe-eval`；后台使用每请求 nonce；Live2D 加载与 PIXI 同版本、带 SRI 的 CSP 兼容模块，不再要求放开 `unsafe-eval`；补齐 `metadataBase`、canonical、`robots.txt`、静态页 sitemap 与文章 `updatedAt`；
- RSS `lastBuildDate` 现在只随最新文章更新时间变化；
- 已加入 GitHub Actions、带 Blob 字节归档的 CMS 备份/恢复演练、媒体四方对账和可恢复 GC；
- `RuntimeConfigHydrator` 改为浏览器绘制前同步配置，避免先显示 Git 回退配置再闪变；
- 修订历史 UI 已完成：列表、详情、恢复流程，恢复时同步更新所有元数据（标题、摘要、标签、分类、发布时间），不会丢失历史字段；
- 文章搜索已完成：ILIKE 全文搜索 + 标签匹配 + DISTINCT 去重，防抖 + 内容片段展示；
- 阅读进度条已完成：rAF 节流 + 短文章 100% 处理；
- 自定义 404 页面已完成。

浏览器扩展若给 DOM 批量注入 `draggable="true"`，仍可能制造另一类 hydration 报警；这不是项目属性，需关闭扩展或使用无扩展浏览器复现。

### 仍存在的技术债

- 公开静态/ISR 页面为了 Next.js 的内联 RSC/bootstrap 数据保留 `unsafe-inline`；生产浏览器实测表明，Next 16.3 的实验性 SRI 不能覆盖全部流式 chunk 和内联数据，强制严格策略会白屏。后台与写作页继续使用 nonce。除非未来接受全站动态 SSR、失去静态 CDN 缓存并增加 Vercel 成本，否则不把公开页改成全量 nonce；
- `mylike.zhanmingblog.workers.dev` 仍被点赞组件实际调用，它是外部服务依赖，不代表 Cloudflare 部署分支，不能为了“去 Cloudflare”盲删；
- 图片墙原图已归档到仓库外并压缩；5 个仍在使用的 MP3 共约 19.3 MiB，播放器只在用户点击播放后创建 `Audio` 和设置源，不再在任意页面挂载时请求首曲。继续有损压缩会牺牲音质，因此本轮不改写用户音频；
- 备份、恢复、媒体回填和可恢复 GC 工具已经存在，本地 PostgreSQL 数据库恢复已实测；异地调度和真实独立 Neon/Blob 恢复演练仍需要管理员选择目标资源后执行；
- 旧迁移表和审计数据没有自动清理策略，长期运行需要定期归档/保留政策。

## 14. 当前部署决策

只部署到 Vercel。Vercel 项目需要连接正确的 Git 仓库、配置生产环境变量、针对明确的 Neon 数据库执行迁移，然后由 Vercel 构建代码。日常文章和配置更新走数据库运行时链路，不重新构建。

Cloudflare 分支、OpenNext、Worker 配置和 Windows 高权限 Agent broker 不属于当前系统，不应恢复。

## 15. 结论

当前系统已经能稳定承担“个人博客 + 运行时 CMS + 人工审批的 AI 文章投稿”。它还不是完整的无头 CMS，也不是自动写作平台：AI 只能提交，管理员必须审核；数据库和 Blob 是线上内容源；旧 `public/` 内容是备份和回退，不是线上主数据。

代码侧高优先级收尾已经完成，本轮还补齐了修订历史 UI、文章搜索、阅读进度条和自定义 404 页面；剩下的是必须由资源所有者执行的生产操作：

1. 在 Vercel Dashboard 真正隔离 Production/Preview/Development 的 Neon 与 Blob，并设置对应 `BLOG_RESOURCE_ENV`；
2. 用 `backup:cms --archive-blobs` 把备份存到独立故障域，并用 `backup:restore` 在空白 Neon 分支与独立 Blob Store 做一次恢复演练；
3. 先在 Preview 运行 `media:maintain --action=plan/backfill`，核对结果后再决定是否在生产人工执行；
4. 为修订和审计数据确定保留期限；旧 Agent schema 已有带保护条件的迁移，不再属于设计债务。

## 16. 本轮清理状态（2026-08-09）

本轮清理只处理“有引用证据的源码死项”，不把用户资料、数据库历史或线上 Blob 当作垃圾删除。已完成：

- 删除旧文章客户端详情、未使用日志/音乐/WIP/评论文件、旧批量删除服务和旧布局组件；
- 删除 7 个没有任何引用的 Lottie JSON 资产；
- 删除 `lottie-web` 与 `baseline-browser-mapping`，并同步 `pnpm-lock.yaml`；
- 收窄仅模块内部使用的导出，删除无引用的文件读取辅助和颜色转换公共类型；
- 删除过时的 `GIT_CLEANUP_GUIDE.md`，避免继续传播会改写历史并强制推送的危险操作；
- 删除未被项目调用且会无差别 `git add .` 后直接推送的 `git_push.bat`；
- 将旧项目副本和生成物移动到仓库外可恢复归档目录，而不是永久删除。

Knip 复扫后仅报告 `@svgr/webpack`。这是配置文件中以 loader 字符串使用的依赖，必须保留；其余死文件和可安全删除的死依赖已清空。`public/blogs/hardware-kb/` 已从 Git 索引移除但本机 33 个文件完整保留；旧文章 Markdown、图片、音频和数据库遗留表没有被删除。

清理不是发布动作。当前工作区仍有此前升级改造的未提交变更；完成本地门禁后，仍需由用户决定如何拆分提交和推送。

## 17. 运行时性能优化（2026-08-09）

- 独立图片上传统一使用 `Promise.all` 并行执行，减少首页配置、文章编辑和各内容管理页的保存等待时间；数据库写入仍在所有上传成功后进行。
- Markdown 代码块高亮并行化，并对编辑器/审批预览增加短防抖，避免输入时重复启动高成本渲染。
- 根布局使用 React `cache()` 去重 metadata 与布局之间的运行时配置读取。
- 审批队列自动刷新不会覆盖当前正在编辑的草稿。

## 18. 审计修复矩阵（2026-08-10）

> 原 `PROJECT_AUDIT.md`（2026-08-08 审计、2026-08-09 复核）已合并到本节并删除。下表是当前权威状态，原始发现细节不再保留。

| 审计项                      | 状态               | 结果                                                                                                  |
| --------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------- |
| P0-1 文章 SSR/SEO/404       | 已修复             | 列表和正文服务端取数，正文服务端渲染，metadata 与真实 404 已实现                                      |
| P0-2 独立备份/恢复          | 本地演练通过       | 备份/恢复脚本已用两套空白 PostgreSQL 实测；Blob 异地恢复与生产资源演练仍需管理员执行                  |
| P0-3 媒体索引可信度         | 已具备安全回填工具 | 回填逐对象核验 Blob 字节 SHA-256、MIME 和大小；生产回填仍需管理员显式执行                             |
| P0-4 混合脏工作区           | 已隔离             | `public/blogs/hardware-kb/` 已从 Git 索引移除并加入忽略；本机 33 个文件保持完整                       |
| P1-1 管理员登录限速         | 已修复             | 失败窗口、阻断期、数据库记录和自动测试已实现                                                          |
| P1-2 Blob/数据库非原子与 GC | 已具备两阶段流程   | pending/committed/orphaned/deleted 生命周期、标记清单、宽限期、ETag 校验、删除前归档和 recover 已实现 |
| P1-3 迁移半状态与分类清空   | 已修复             | 迁移先规划校验，分类改为安全 upsert，环境确认与本地 loopback 约束已加入                               |
| P1-4 smoke 污染             | 部分修复           | 脚本拒绝生产和共享默认凭据；仍不应在生产执行写入 smoke                                                |
| P1-5 环境资源隔离           | 部分修复           | 代码强制 `BLOG_RESOURCE_ENV` 与 Vercel 环境一致；Dashboard 资源隔离仍需人工核验                       |
| P1-6 CI 缺失                | 已修复             | GitHub Actions 执行 frozen install、test、typecheck、格式检查、Drizzle check 和 build                 |
| P2-1 客户端 Markdown 过重   | 已修复             | 公开文章和 About 阅读态服务端渲染；About 编辑预览按需拆包，且移除挂载后的重复文档请求                 |
| P2-2 图片带宽/CLS           | 已修复             | 响应式 srcset/sizes 与媒体尺寸已实现；缩放宽度固定为四档，Vercel CDN 缓存变体，Next 图片优化已恢复    |
| P2-3 CSP `unsafe-eval`      | 已分层收敛         | 生产不含 `unsafe-eval`；Live2D 使用带 SRI 的 CSP 兼容模块；后台/编辑页 nonce，公开静态页保留内联兼容  |
| P2-4 可访问性语义           | 已修复             | `lang=zh-CN`、允许缩放、核心页面 H1 和密码表单 username 已补齐                                        |
| P2-5 SEO 配置               | 已修复             | metadataBase、canonical、robots、静态页 sitemap 和文章更新时间已补齐                                  |
| P2-6 修订可用性/保留        | 已修复             | 修订历史 UI（列表、详情、恢复）已完成；恢复时同步元数据；分类批量修改的标签快照已修；只读备份覆盖修订 |

### 2026-08-10 代码质量修复

- RSS `buildEnclosure` 和 `optionalUrl` 校验增加路径遍历防护（`..` 检测 + `path.resolve` 边界验证）；
- `markdown-renderer.ts` 的 shiki/katex 懒加载从 boolean flag 改为 Promise 缓存，消除并发渲染竞态；
- `card.tsx` 的 `useEffect` 返回 `clearTimeout` 清理函数，修复组件卸载后定时器泄漏；
- `format:check` 脚本从显式文件列表改为 `prettier --check .`，配合扩展后的 `.prettierignore`；
- 10 个文件中 11 处 `catch (error: any)` 改为 `unknown` 类型推断，使用 `instanceof Error` 收窄。

### 2026-08-10 新功能与 bug 修复

新增功能：

1. **修订历史 UI**：`/write/[slug]` 编辑模式下的“修订历史”面板，支持列表、详情查看和恢复。恢复操作在事务中创建新版本（不覆盖当前版本），前端同步更新标题、摘要、标签、分类、发布时间和正文。
2. **文章搜索**：`/blog` 顶部搜索框，300ms 防抖，服务端 ILIKE 全文搜索 + 标签匹配 + DISTINCT 去重，返回内容片段。
3. **暗色模式**（已于同日晚些时候整体移除，见第 19 节）：曾实现 class 策略 + 防 FOUC inline script + Shiki 双主题 + Twikoo 适配。
4. **阅读进度条**：文章详情页顶部 3px 进度条，rAF 节流，短文章显示 100%。
5. **自定义 404 页面**：根级 `not-found.tsx`，品牌色 404 + 导航按钮。

修复的 bug：

- 修订历史 `onRestore` 只更新 `md`/`version` 导致元数据丢失 → 改为传递完整 `RestorePayload`；
- 修订历史 `useEffect` 在列表为空或加载失败时无限循环 → 新增 `hasLoaded` 标志；
- 搜索 `tagMatchRows` 多标签匹配导致同一文章重复 → 改用 `selectDistinct`；
- 搜索清空后 300ms 内仍显示结果面板 → `isSearching` 依赖 `query.trim()` 而非 `debounced`；
- 阅读进度条短文章（高度不足视口 30%）永远 0% → `total <= 0` 时 `ratio = 1`；
- 暗色模式相关的 hover 覆盖、Shiki 双主题、Twikoo 适配等修复已随功能移除一并撤销，不再单独列出。

## 19. 暗色模式移除与二次审计（2026-08-10 晚）

### 暗色模式移除

暗色模式在当天上线后发现与首页彩色气泡背景（黄/绿暖色系）存在根本视觉冲突：亮色气泡在深色底上压暗后呈现浑浊的橄榄色/棕色，多轮调参（压暗气泡、替换冷色气泡、纯黑/深灰底配不透明卡片）均无法达到可接受的观感，决定整体移除而非继续投入。

移除范围（已经全库 grep 复核无残留）：

- 删除 `src/components/theme-toggle.tsx` 及其在布局中的引用；
- 移除 `globals.css` 的 `@custom-variant dark` 与全部 `html.dark` 规则、`article.css` 的暗色 prose/Twikoo/Shiki 覆盖；
- 移除 `head.tsx` 的防 FOUC 主题脚本与 `localStorage.theme` 读写；
- Shiki 代码高亮从双主题改回固定 `one-light`；
- `blurred-bubbles.tsx` 移除暗色检测与颜色切换逻辑，恢复始终使用站点配置颜色；
- i18n 五个语言文件无主题相关 key，无需变更。

### 二次全面审计结论

对 API 路由、`src/lib` 安全边界、React 组件副作用、hooks、数据层事务和文档一致性做了第二轮全面审计。子代理初步报告中的大部分告警经逐条人工核实为误报，确认无问题的方面：

- 全部 13 个 admin API 端点均有 `assertAdminRequest` / `assertAdminMutationRequest` 会话与同源校验，无认证绕过点；
- `/api/search` 有 200 字符查询上限与 50 条结果上限；`/api/ai-daily` 有 12 秒超时、1 MB 响应上限和 5 分钟缓存；`/api/csp-report` 有 32 KB 请求体上限与字段截断；
- `reading-progress.tsx`、`music-card.tsx`、`use-markdown-render.tsx` 的事件监听、定时器均有完整 cleanup；
- `sanitize-html` 为自研白名单实现（无外部依赖），Markdown 渲染链路服务端/客户端双重清洗；
- i18n 语言文件 key 一致，`package.json` 脚本与本文档命令一致，`vercel.json` 安全头存在。

实际修复（均为低风险小项）：

- `use-search.ts`：搜索请求从 boolean 取消标志改为 `AbortController`，切词/清空时真正中止进行中的 HTTP 请求，不再占用连接与带宽；
- `write-store.ts`：图片哈希去重的 `Map` 构建移除两处冗余 `as any`，改用判别联合收窄（`it.type === 'file'`）加 `typeof it.hash === 'string'` 守卫，保持类型安全。

### 第三轮全面审计（2026-08-10 深夜）

在第二轮基础上再次对全库做安全与代码质量双路扫描，子代理报告的 17 项疑似问题经逐条人工核实，15 项为误报：

- 会话 Cookie 已具备 `httpOnly` + 生产环境 `secure` + `sameSite: 'strict'`；登录限流为数据库 + 内存 Map 双层设计；
- `/api/media/[...pathname]` 的 `isAllowedMediaPathname` 是严格白名单正则（`blog/<slug>/<64位哈希>.<扩展名>` 或 `content/<白名单目录>/<64位哈希>.<扩展名>`），无路径遍历面；
- `route-errors.ts` 对未知错误统一返回"服务器处理失败"并仅服务端记日志，无堆栈/内部细节泄露；
- 三处 `dangerouslySetInnerHTML`（已发布文章、关于页、AI 日报）的数据源全部经过 `sanitizeHtml` 白名单清洗（`renderMarkdown` 内部出口清洗 + AI 日报客户端二次清洗）；
- `select.tsx` 选项使用 `option.value` 作 key；`blog-list-client.tsx` 分组逻辑已 `useMemo`；`category-modal.tsx`、`use-write-data.ts` 无 stale closure；`snowfall.tsx` 为圣诞特效既定设计；
- i18n 五个语言文件 49 个嵌套 key 完全对称；暗色模式全库 grep 确认无残留。

实际修复 2 项：

- `live2d-viewer.tsx`（P2）：异步初始化流程补充 `cancelled` 取消机制。修复前组件卸载后 `init()` 仍会继续加载脚本并创建 PIXI Application，而 cleanup 执行时 `app` 尚为 `null`，后创建的 WebGL 上下文永远无法销毁，造成 GPU 资源泄漏；修复后在脚本加载后与模型加载后分别检查取消标志，卸载时 cleanup 一定能销毁已创建的 app；
- `like-button.tsx`（P3）：两处无 cleanup 的 `setTimeout` 改为 `useEffect` 管理（入场延迟显示、点赞粒子清除），组件卸载后不再回调 `setState`。

三轮审计后，安全边界（认证、同源、路径白名单、错误统一、sanitize 白名单、CSP、密钥管理）确认无已知高优先级残留问题。

## 20. 综合报告整改（2026-08-10）

针对 `reports/comprehensive-review-2026-08-09/REPORT.md` 的 16 项发现，本轮完成以下收口：

- 内容寻址 Blob 禁止覆盖；恢复改为 Blob 优先、幂等复用、冲突拒绝、故障注入和纯 Blob 修复；
- 畸形 Cookie 按未认证处理；投稿重放同时绑定幂等键、原票据哈希、内容哈希和 pending 状态，并用 advisory lock 串行化；
- 移动导航补齐可访问名称；LiquidGrass 推迟 DOM 访问并清理 timer；删除文章同步失效分类缓存；
- About 编辑预览按需加载；音乐直到明确点击才创建媒体元素；Next 图片优化恢复，任意 HTTPS 外部头像绕过受限优化器；媒体缩放只允许四档并进入 Vercel CDN；
- GitHub Actions 固定 SHA；Windows/Linux 统一 LF 格式策略；硬件知识库从部署范围剥离但本地文件未删除；
- Live2D 在不放开生产 `unsafe-eval` 的条件下恢复渲染。

2026-08-10 本地验证：62/62 Node 测试通过，typecheck、Prettier、Drizzle check、无数据库生产构建、生产依赖审计和 `git diff --check` 通过；内置浏览器验证首页、博客搜索、文章、About 奖项图片、AI 日报、后台登录、移动导航与 Live2D，无框架遮罩或应用 console error/warn。生产资源恢复演练、生产媒体回填和 Dashboard 资源隔离仍是运维动作，不应伪装成代码已完成事项。
