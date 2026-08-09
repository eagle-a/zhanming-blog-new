# zhanming-blog-new 全面审计报告

> 审计日期：2026-08-08；修复状态复核：2026-08-09
> 状态：历史审计基线；下方原始证据保留，不再代表当前未解决清单
> 审计边界：只读检查与本地运行；未修改业务代码，未提交、推送、部署，未写 Neon，未上传或删除 Blob。

> 2026-08-09 清理复核：在不触碰 `public/blogs/hardware-kb/` 和任何线上资源的前提下，完成死文件、死资产、死依赖和无引用导出清理。具体删除记录见第 9 节；当前工作区仍包含此前功能改造的未提交变更，不能把“清理完成”误解为“工作区已可直接整体提交”。

## 0. 修复状态矩阵（当前权威状态）

原始章节记录的是 2026-08-08 当时的事实，不能继续照单重做。当前状态以此表和 `docs/PROJECT_OVERVIEW.md` 为准。

| 原问题                      | 状态               | 2026-08-09 结果                                                                                       |
| --------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------- |
| P0-1 文章 SSR/SEO/404       | 已修复             | 列表和正文服务端取数，正文服务端渲染，metadata 与真实 404 已实现                                      |
| P0-2 独立备份/恢复          | 本地数据库演练通过 | 备份/恢复脚本已用两套空白 PostgreSQL 实测；Blob 异地恢复与生产资源演练仍需管理员在隔离资源执行        |
| P0-3 媒体索引可信度         | 已具备安全回填工具 | 回填逐对象核验 Blob 字节 SHA-256、MIME 和大小；生产回填仍需管理员显式执行                             |
| P0-4 混合脏工作区           | 未解决             | 仍不应整体提交；`public/blogs/hardware-kb/` 保持未触碰、未提交                                        |
| P1-1 管理员登录限速         | 已修复             | 失败窗口、阻断期、数据库记录和自动测试已实现                                                          |
| P1-2 Blob/数据库非原子与 GC | 已具备两阶段流程   | pending/committed/orphaned/deleted 生命周期、标记清单、宽限期、ETag 校验、删除前归档和 recover 已实现 |
| P1-3 迁移半状态与分类清空   | 已修复             | 迁移先规划校验，分类改为安全 upsert，环境确认与本地 loopback 约束已加入                               |
| P1-4 smoke 污染             | 部分修复           | 脚本拒绝生产和共享默认凭据；仍不应在生产执行写入 smoke                                                |
| P1-5 环境资源隔离           | 部分修复           | 代码强制 `BLOG_RESOURCE_ENV` 与 Vercel 环境一致；Dashboard 中资源是否真正独立仍需人工核验             |
| P1-6 CI 缺失                | 已修复             | GitHub Actions 执行 frozen install、test、typecheck、增量格式检查、Drizzle check 和 build             |
| P2-1 客户端 Markdown 过重   | 已修复（文章链路） | 公开文章 Markdown 已移到服务端；其他强交互页面保留 Client Component                                   |
| P2-2 图片带宽/CLS           | 部分修复           | 图片墙原件已归档并改为 WebP，音乐已降码率；响应式图片衍生尺寸尚未建立                                 |
| P2-3 CSP `unsafe-eval`      | 已分层收敛         | 后台/编辑页使用 nonce CSP；公开页保留 ISR 兼容策略，Preview 自动启用 strict Report-Only               |
| P2-4 可访问性语义           | 已修复             | `lang=zh-CN`、允许缩放、核心页面 H1 和密码表单 username 已补齐                                        |
| P2-5 SEO 配置               | 已修复             | metadataBase、canonical、robots、静态页 sitemap 和文章更新时间已补齐                                  |
| P2-6 修订可用性/保留        | 部分修复           | 分类批量修改的标签快照已修；只读备份覆盖修订，但 UI 恢复和保留策略尚未实现                            |

## 1. 2026-08-08 原始结论（历史）

项目已经从“每次改文章都重新构建”的静态博客，升级成了可在运行时写 Neon PostgreSQL、把图片写入 Private Vercel Blob 的轻量 CMS。数据库事务、乐观锁、修订表、输入校验、同源校验、私有 Blob 代理、缓存失效和迁移 dry-run 都已经存在，方向正确。

以下五项是 2026-08-08 的原始判断，当前状态已经由第 0 节取代，保留它们只为说明修复依据：

1. **博客核心内容没有服务端渲染。** 文章列表和文章正文的原始 HTML 都只有“加载中”，文章标题、正文、description、Open Graph 和真实 404 都依赖浏览器 JavaScript。对博客而言，这是架构级 SEO 和首屏性能缺陷。
2. **生产内容没有真正备份。** 修订历史和当前数据放在同一个 Neon 数据库；数据库整体损坏或误删时会一起丢。仓库里的旧文件只能恢复迁移前内容，不能恢复迁移后的最新文章和配置。
3. **Blob 索引不完整，也没有生命周期。** 已确认 17 个仍被文章引用且可正常读取的 Blob 没有 `media` 表记录。按表清理会误删；不清理则上传失败、取消编辑和删除引用会持续留下对象。
4. **管理员登录可被无限尝试。** 密码校验是同步 scrypt，接口没有限速、失败锁定或安全事件记录。攻击者既能爆破，也能制造计算消耗。
5. **发布门禁不完整。** 没有 CI、lint 和端到端测试；Vercel 构建不会自动运行 24 个单元测试。当前工作区还混有大批未提交变更，继续直接推送会把不相干改动捆在一起。

结论很直接：**现在可以继续本地验收，但不应该立即把当前工作区整体推到生产。** 先完成 P0/P1，再发布。

## 2. 审计范围与方法

| 领域         | 已执行                                                 | 结果                                                      |
| ------------ | ------------------------------------------------------ | --------------------------------------------------------- |
| Git 与资产   | 状态、diff、行尾、大文件、仓库对象检查                 | 已完成                                                    |
| Next.js 架构 | 路由、Server/Client 边界、缓存、metadata、RSS、sitemap | 已完成                                                    |
| 安全         | 管理员认证、CSRF、上传、XSS 清洗、CSP、密钥与输入边界  | 单人审计完成；不是官方 Deep Scan                          |
| 数据         | Schema、迁移、事务、修订、Blob/数据库引用盘点          | 已完成只读检查                                            |
| 性能         | 客户端边界、图片、Markdown 渲染、生产构建产物          | 已完成静态与运行时抽查                                    |
| 质量         | 测试、类型检查、构建、依赖审计、Drizzle 检查           | 已完成                                                    |
| UI           | 内置浏览器桌面 1280 px、移动 390×844、控制台和溢出抽查 | 已完成公开页抽查                                          |
| 管理写入     | 登录、发布、删除、上传的本地端到端验证                 | 未执行；本地缺少管理员密钥，且现有脚本会写当前数据库/Blob |

正式 Codex Security Deep Scan 仍停在 preflight，原因是当前会话并发容量不足。本文不能替代那个多代理、多阶段扫描，也不会冒充其结果。

## 3. 已确认问题

### P0：发布前必须处理（原始发现，状态见第 0 节）

#### P0-1 文章列表与正文没有服务端内容，SEO、分享预览和 404 语义失效

证据：

- `src/app/blog/page.tsx:1` 是整页 Client Component，通过 `useBlogIndex()` 在浏览器请求 `/api/posts`。
- `src/app/blog/[id]/page.tsx:3-4` 只返回 Client Component；`src/app/blog/[id]/blog-content.tsx:22-45` 在 `useEffect` 里加载文章。
- 本地直接读取服务器 HTML：`/blog` 和 `/blog/diary-april-27-comsol` 都包含“加载中”，都不含文章标题或 `<h1>`。
- 浏览器完成 hydration 后文章可见，但页面 title 仍是 `eagle-a`，description 仍是全站简介，`og:title` 仍是 `eagle-a`，没有 canonical。
- 不存在的文章也由客户端显示错误，路由本身不能在服务端 `notFound()`，因此搜索引擎可能收到 HTTP 200 的软 404。

影响：

- 搜索引擎和不执行 JavaScript 的抓取器看不到正文。
- 每篇文章不能生成准确的标题、描述、Open Graph/Twitter Card 和 canonical。
- 用户先下载/执行 React、SWR、Markdown、Shiki/KaTeX 等代码，才看到正文，首屏链路过长。

建议：

- 把 `/blog` 和 `/blog/[id]` 改成 Server Component 取 Neon 数据。
- 在 `[id]/page.tsx` 使用服务端 `params`、`getCachedPublishedPost()`、`notFound()` 和 `generateMetadata()`。
- 只把阅读进度、图片预览、复制按钮、编辑按钮等交互保留为小型 Client Components。
- 页面更新继续依靠 `revalidateTag`，不需要重新构建。

#### P0-2 当前没有独立于生产库的可执行备份与恢复链路

证据：

- `posts` 与 `post_revisions`、`content_documents` 与 `content_document_revisions` 位于同一数据库（`src/db/schema.ts`）。
- 当时仓库缺少定时导出、异地备份、恢复演练脚本或检查结果；当前实现见第 12、13 节。
- `docs/vercel-cms-migration.md:100-105` 只描述“从修订历史恢复”，但没有列出或恢复修订的 API、管理页面或 CLI 命令。
- `README.md:17` 把 `public/` 称为旧内容备份；它只能覆盖迁移时的旧快照，不能覆盖之后在后台新增和修改的内容。

影响：

- Neon 数据库整体丢失、账号误操作或错误迁移会同时摧毁当前数据和修订历史。
- “有 revisions 表”会制造虚假的安全感；它解决误编辑，不解决数据库级灾难。

建议：

- 立即确认当前 Neon 套餐的恢复窗口和分支/PITR能力，不在文档中臆测套餐天数。
- 增加定时只读导出：数据库逻辑备份、内容 JSON/Markdown 导出、Blob pathname/etag/size 清单。
- 备份必须落到与生产 Neon/Blob 不同的故障域，并设置保留策略。
- 写一个可重复的恢复脚本，在独立 Neon 分支和独立 Blob Store 上完成一次恢复演练并记录 RPO/RTO。

#### P0-3 `media` 表不是 Blob 的可信索引，现状禁止直接做垃圾清理

证据：

- 生产连接只读统计：11 篇活动文章、8 份内容文档、28 行 `media`。
- 从文章和内容文档中提取到 45 个合法 `/api/media/...` 引用。
- 其中 17 个 `blog/readme/...` 引用不在 `media` 表，但通过本地私有 Blob 代理检查均返回 200。
- 根因是 `scripts/migrate-legacy-blogs.ts:47-69` 只 `head/put` Blob 并返回路径；脚本从未插入 `schema.media`。
- `src/app/api/media/[...pathname]/route.ts:15` 直接按 pathname 读取 Blob，也不查询 `media`，所以索引缺失一直未暴露。

影响：

- 任何“删除 `media` 表未引用行”或“以 `media` 表为 Blob 清单”的清理都会误判。
- 当前无法可靠判断 Blob 是已引用、孤儿、历史修订引用还是完全未知对象。

建议：

- 先做一次只读对账：当前文档、所有修订、`media` 表、Blob Store 四方比对。
- 为 17 个已确认对象补建索引，但必须先核验 SHA-256、大小、MIME 和 Blob 元数据。
- 增加 `media_references` 或可审计的引用快照；至少记录 `last_seen_at`、来源类型/键和删除候选时间。
- 垃圾回收采用“两阶段标记 + 宽限期 + 可恢复清单”，不得直接批量删除。

#### P0-4 当前脏工作区不适合直接整体推送

证据：

- 当前分支 `main`，相对 `origin/main` 有 11 个 tracked 文件修改及多组 untracked 文件。
- tracked diff 为 1153 行新增、1481 行删除；`pnpm-lock.yaml` 单文件约 1713 行变化。
- 还存在用户资产 `public/blogs/hardware-kb/`，本报告未触碰。

影响：

- AI 日报、Markdown、安全清洗、关于页、迁移脚本和依赖锁文件混在同一批变更，回滚和定位故障困难。
- 未跟踪文件一旦漏加，构建在本机通过、Vercel 却会缺文件；反过来误加用户资料会把不该发布的内容送上 Git。

建议：

- 先固定文件归属和提交边界，再按“CMS/数据层”“AI 日报”“Markdown 导入与清洗”“内容修正”拆分提交。
- 明确排除或单独处理 `public/blogs/hardware-kb/`，不能顺手删除、移动或提交。
- 在干净 clone/工作树上重跑最终门禁，再决定推送。

### P1：高优先级（原始发现，状态见第 0 节）

#### P1-1 管理员登录缺少限速、锁定和安全审计

证据：

- `src/app/api/admin/session/route.ts:19-39` 对每次 POST 直接执行密码验证。
- `src/lib/admin-auth.ts:49-65` 使用同步 `scryptSync`。
- 仓库没有登录限速器、失败计数、指数退避、IP/会话锁定或管理员登录告警。

影响：

- 攻击者可以无限爆破单一管理员密码。
- 同步 scrypt 是有意昂贵的密码函数；无速率限制时也可被用来消耗函数 CPU 和费用。

建议：

- 在服务端实现基于 IP + 全局用户名桶的限速，返回 429 和 `Retry-After`。
- 失败响应保持一致，记录成功/失败、时间、来源摘要，不记录密码。
- 采用 `__Host-` Cookie 名并制定 Session Secret 轮换流程。
- 不要只靠 Vercel WAF 配置；应用层仍需有确定行为和测试。

#### P1-2 Blob 上传与数据库保存不是原子流程，删除引用也不会回收对象

证据：

- `src/app/write/services/push-blog.ts:51-70` 先逐个上传，再保存文章。
- `src/app/(home)/services/push-site-content.ts:20-46` 先上传多张图片，再批量保存两份配置。
- 保存冲突、网络失败、用户关闭页面时，已经上传的对象不会回滚。
- `softDeletePost()` 只软删数据库文章；配置页删除图片引用也没有 Blob 删除/候选标记逻辑。
- README 明确承认删除引用不会立即删 Blob，但没有实际引用审计或回收任务。

影响：

- Blob 用量持续增长，失败上传和放弃编辑会留下孤儿。
- 已发布后删除的图片 URL 仍可能长期可访问。

建议：

- 上传获得短期 `pending` 记录，内容保存成功后转为 `committed`。
- 定时清理超过宽限期、没有当前或历史修订引用的 pending/orphan 对象。
- 若要保留历史修订图片，垃圾回收必须扫描修订表，不能只扫描当前文档。

#### P1-3 旧文章迁移脚本失败后会留下半迁移状态，且会重建整张分类表

证据：

- `scripts/migrate-legacy-blogs.ts:85-89` 先上传所有媒体。
- `:121-157` 每篇文章单独事务写入；不是全迁移事务。
- `:162-167` 无条件删除全部 categories 后重建。
- `:178-179` 所有外部写入完成后才因 `missingRefs` 抛错。
- 重跑时 `:115-119` 会跳过已存在文章，不能自动修复先前半迁移的数据。

影响：

- 命令以失败结束并不代表“什么都没写”。
- 重跑可能覆盖迁移后新增的分类，同时保留第一次运行产生的不完整文章和 Blob。

建议：

- 在任何写入前完成全部文件/引用/数据校验。
- 生成不可变迁移计划和校验摘要，apply 只执行该计划。
- 分类更新改为受限 upsert，禁止无条件清空生产表。
- 为已执行迁移写一次性 reconciliation，而不是再次盲跑原脚本。

#### P1-4 `cms:smoke` 不是无痕测试，不能安全反复打生产

证据：

- `scripts/smoke-test-cms.ts` 会真实登录、改 snippets、上传两张 Blob、创建/更新/删除文章。
- finally 删除临时 post/tag/media/Blob，但没有删除自动创建的 category。
- 只读查询已确认数据库中存在脚本会创建而不会清理的“测试”分类。
- snippets 恢复是一次新的正常写入，会永久增加 version 和 revision；当前 8 份内容文档已有 16 条修订。

影响：

- 每次“测试”都会污染生产修订历史和分类数据。
- 中途失败时虽然有补偿逻辑，仍可能留下外部 Blob 或部分副作用。

建议：

- 只在独立 Neon 测试分支和独立 Blob Store 运行写入烟雾测试。
- 测试使用专用 namespace/事务清理，并断言前后数据库与 Blob 清单完全一致。
- 生产验收改成只读 health check；需要真实写入时必须人工授权并保存对账结果。

#### P1-5 Preview/Development 与 Production 的数据隔离没有被落实为硬约束

证据：

- 应用只有统一的 `DATABASE_URL` 和 `BLOB_READ_WRITE_TOKEN`，代码层不识别环境数据库。
- `docs/vercel-cms-migration.md:17-23` 要求正式 Neon/Blob 并给 Production/Preview 配管理员密钥。
- `:107` 承认共用数据库会让本地写入直接影响生产，但只把隔离列为“长期”事项。

影响：

- Preview 或本地调试一旦登录管理员，可能直接改生产文章和 Blob。
- 未发布代码可以先于生产验证去修改生产 schema/data，扩大事故半径。

建议：

- Production、Preview、Development 分配独立 Neon 分支/数据库和独立 Blob Store。
- 环境变量按 Vercel environment 单独绑定；Preview 禁止继承生产写令牌。
- 应用启动时校验环境与资源标识，发现 Preview 指向生产资源则拒绝写入。

#### P1-6 没有 CI，单元测试不属于 Vercel 发布门禁

证据：

- `package.json` 有 `test`、`typecheck`、`build`，没有 `lint`、`e2e` 或 `vercel-build` 门禁脚本。
- 仓库没有 GitHub Actions 等 CI 配置。
- `next build` 会跑 TypeScript，但不会运行现有 24 个 Node tests。

影响：

- 单元测试失败仍可能在 Vercel 成功部署。
- 认证、数据库事务、Blob 回调和浏览器主流程没有自动化回归保护。

建议：

- CI 至少运行 install --frozen-lockfile、test、typecheck、lint、build、migration check。
- 增加 Playwright 公开页 E2E；管理写入 E2E 只连隔离测试资源。
- 合并/生产部署必须依赖这些检查通过。

### P2：应纳入下一轮重构（原始发现，状态见第 0 节）

#### P2-1 前端客户端化和 Markdown 渲染过重

证据：

- `src` 中约 81 个 TS/TSX 文件包含 Client Component 标记/客户端边界。
- 首页、文章列表、项目、图片、AI 日报等主页面都是 Client Components。
- `src/hooks/use-markdown-render.tsx:22-102` 在浏览器渲染 Markdown。
- `src/lib/markdown-renderer.ts:24-64` 动态加载 Shiki 和 KaTeX；生产构建生成 353 个 JS chunk、总计约 13.26 MB（并非全部会被单页下载，但说明语法高亮资源面很大）。
- `marked.use()` 在每次 `renderMarkdown()` 时调用（`:127`），全局扩展可能重复累积。

影响：

- 首屏 JS、解析和高亮占用主线程，低端移动设备更明显。
- 服务端已有数据库和缓存，却没有利用 Server Components 直接输出内容。

建议：

- Markdown 在服务端渲染并清洗，客户端只 hydrate 交互组件。
- Shiki 使用服务端单例 highlighter 和明确语言集合；不要向浏览器发送完整高亮器。
- 把 `marked` 配置初始化移到模块级，只注册一次。

#### P2-2 图片策略会浪费带宽并产生 CLS 风险

证据：

- `next.config.ts:3-15` 设置 `images.unoptimized = true`。
- 代码中大量直接 `<img>`，多数没有原生 width/height、`srcset`/`sizes` 或统一优先级策略。
- `public/` 仍有 91.34 MB、164 个文件；`public/images/pictures` 为 37.25 MB，最大单图 13.67 MB。
- Blob 迁移后这些旧大图仍被打包进每次 Vercel 静态资产部署。

影响：

- 移动端可能下载远大于显示尺寸的图片。
- 无尺寸占位容易发生布局偏移；旧资源拖慢部署上传和冷缓存。

建议：

- 对当前视口 LCP 图片明确尺寸和 `fetchPriority="high"`，且最多 1-2 张。
- 离屏图片统一 lazy load；内容图提供响应式衍生尺寸或可优化的媒体服务。
- 先建立 Git/Blob/数据库三方资产清单，再决定哪些 `public` 旧文件仅归档、不再部署。不能直接删除原文件。

#### P2-3 CSP 仍允许 `unsafe-eval`，第三方脚本为全站策略扩大了攻击面

证据：

- `vercel.json` 的 `script-src` 包含 `'unsafe-inline'` 和 `'unsafe-eval'`。
- Live2D 页从 unpkg 和 Cubism CDN 加载三个第三方脚本，未看到 SRI；但宽松 CSP 应用于所有页面。
- `connect-src` 仍保留旧的 `https://imjuya.github.io`，AI 日报已经改为服务端请求 `daily.juya.uk`，说明策略存在漂移。

影响：

- 一旦出现 HTML/脚本注入，CSP 的兜底能力明显下降。
- 第三方 CDN 供应链风险被带到整个站点，而不是仅 Live2D 功能。

建议：

- 先在 Preview 部署 Report-Only CSP，收集实际违规，再移除 `unsafe-eval`。
- 内联脚本使用 nonce/hash；Live2D 依赖自托管或隔离到更严格的独立路由策略。
- 删除不用的 source，`img-src`/`connect-src` 改为真实最小允许列表。

#### P2-4 可访问性和页面语义存在明显缺口

证据：

- `src/app/layout.tsx:47` 把全站语言写成 `lang='en'`，实际主要内容是中文。
- `src/layout/head.tsx:4` 设置 `maximum-scale=1.0, user-scalable=no`，阻止用户缩放。
- 浏览器抽查 `/blog`、`/projects`、`/pictures` 没有 `<h1>`。
- 移动端 390×844 未发现横向溢出或坏图，这是好现象，但不抵消语义问题。

建议：

- 默认 `lang="zh-CN"`，切换语言时同步更新。
- 移除禁止缩放参数。
- 每个页面提供唯一、可见或仅视觉隐藏的 `<h1>`，并补自动化可访问性检查。

#### P2-5 SEO 配置不完整

证据：

- 根 metadata 只有 title/description/OG/Twitter 的基础字段，没有 `metadataBase`、canonical 等站点级规范化。
- `src/app/sitemap.ts:26-33` 只包含首页和文章，不包含 about、projects、pictures、share、AI 日报等公开页面。
- 仓库没有 robots route/file。
- sitemap 的文章 `lastModified` 使用发布日期，不是实际 `updatedAt`。

建议：

- 先完成文章 SSR/metadata，再补 metadataBase、canonical、文章 OG 图片和结构化数据。
- sitemap 加入真正希望收录的静态页，并使用文章更新时间。
- 添加 robots 并显式声明 sitemap；管理/写作/API 路由不要收录。

#### P2-6 修订历史可写但不可用，且无保留策略

证据：

- Schema 有 post/content revision 表，写入事务也会创建修订。
- 没有查看差异、选择版本、恢复版本的管理 API/UI/CLI。
- 修订没有清理/归档策略；正文和整份 JSON 每次完整复制。
- `applyBatchPostEdits()` 在只改分类时把修订 metadata 的 tags 写成空数组（`src/lib/posts-repository.ts:288-293`），历史快照不忠实。

建议：

- 先修复标签快照，再提供只读列表、diff 和“恢复为新版本”的受保护流程。
- 根据内容规模制定保留策略；备份和审计版本不能互相替代。

### P3：工程与体验清理

- `next.config.ts` 全局关闭图片优化，同时还保留 formats/deviceSizes/imageSizes，配置意图矛盾。
- Turbopack 和 webpack 各维护一套 SVG 规则，webpack 又禁用 SVGO，应收敛并验证生产构建实际路径。
- `experimental.scrollRestoration: false` 应按 Next 16.3 本地文档确认是否仍需要。
- `src/app/sitemap.ts:15` 和首页配置代码存在调试 `console.log`，应清理或接入结构化日志。
- 没有统一错误监控、数据库/外部 RSS/Blob 可用性指标或告警；Vercel Analytics/Speed Insights 只解决访问分析和前端指标。
- 自制 HTML sanitizer 已覆盖常见 payload 并有测试，但 regex 服务端分支仍是高维护风险。继续扩展富文本前，应采用成熟、维护中的 sanitizer，或把允许的 RSS 内容转换成结构化节点。

## 4. 已确认优势

- 管理 API 均有服务端 Session 校验；写操作还做同源检查。
- Session Cookie 为 HttpOnly、Production Secure、SameSite Strict、12 小时过期；密码哈希使用固定参数 scrypt 和 timing-safe compare。
- 文章 slug、URL、正文大小、标签、分类、媒体 MIME/大小均有 Zod 或明确格式限制。
- 文章和配置写入使用事务；配置使用 advisory lock，文章使用 row lock；都有乐观版本冲突检测。
- Private Blob 只通过受限 pathname 的同源代理读取，响应带 `nosniff`，SVG/媒体响应带 sandbox CSP。
- AI 日报使用固定 HTTPS 上游、12 秒超时、1 MB 上限、链接 host/path 白名单、HTML 清洗和 5 分钟缓存。
- 公开文章查询正确排除 draft、未来发布时间和软删除文章。
- 本地桌面/移动抽查未见横向溢出、坏图或控制台 error/warn；关于页当前 5 张图片均可加载，AI 日报可显示最近 10 期。
- 生产构建、类型检查、依赖审计和 24 个测试当前全部通过。

## 5. 原始优先级路线图（历史）

### 阶段 A：冻结发布面（现在）

1. 不提交、不推送当前混合工作区。
2. 保存本报告并确认哪些未跟踪文件属于本次改造，`public/blogs/hardware-kb/` 保持原样。
3. 从生产资源导出一次只读快照和 Blob 清单；确认 Neon 恢复能力。

### 阶段 B：先修数据安全（P0/P1）

1. 建立 Production/Preview/Development 资源隔离。
2. 修复 legacy media 回填与四方对账，禁止直接 GC。
3. 把迁移脚本改成先全量验证、再执行不可变计划；移除清空 categories。
4. 把 CMS 写入烟雾测试迁到隔离资源并做到前后零残留。
5. 增加备份、恢复脚本和恢复演练。

### 阶段 C：修博客核心架构

1. `/blog` 和 `/blog/[id]` 服务端取数、服务端 Markdown 渲染。
2. 正确 metadata、notFound、canonical、sitemap、robots。
3. 把交互拆成小型客户端岛，Shiki 移到服务端。

### 阶段 D：安全与发布门禁

1. 登录限速、审计、Cookie/secret 轮换。
2. CI：test + typecheck + lint + build + drizzle check + E2E。
3. CSP Report-Only 收敛后移除 `unsafe-eval`，隔离第三方脚本。

### 阶段 E：性能与资产

1. 恢复可控的图片优化/响应式衍生图，补 width/height、priority、lazy 策略。
2. 资产对账后把不再服务的旧大文件移出 Vercel 部署包，但保留可恢复归档。
3. 用 Vercel Speed Insights 的真实生产数据设 LCP/INP/CLS 目标，不能只凭本机观感。

## 6. 2026-08-08 原始验证结果（历史）

| 检查                                                      | 结果                                                                                     |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `pnpm test`                                               | 24/24 通过                                                                               |
| `pnpm typecheck`                                          | 通过                                                                                     |
| `pnpm build`                                              | 通过；18 个静态页面生成成功                                                              |
| `pnpm audit --prod --registry=https://registry.npmjs.org` | 未发现已知生产依赖漏洞                                                                   |
| `pnpm exec drizzle-kit check`                             | 迁移快照一致                                                                             |
| `git diff --check`                                        | 无 whitespace error；存在 LF→CRLF 提示                                                   |
| 桌面浏览器                                                | 首页、文章列表、文章、关于、项目、图片、AI 日报可打开；无横向溢出/坏图/控制台 error/warn |
| 移动 390×844                                              | 首页、文章列表、文章、关于、AI 日报无横向溢出/坏图                                       |
| 服务器 HTML                                               | `/blog` 和文章详情都没有文章标题/正文/H1，只含加载态                                     |
| 数据库只读盘点                                            | 11 posts、11 post revisions、8 content docs、16 content revisions、28 media rows         |
| Blob/引用盘点                                             | 45 个合法当前引用；17 个已引用且可读 Blob 未进入 `media` 表                              |
| 管理写入 E2E                                              | 未运行；现有 `.env.local` 缺少管理员密钥，且 smoke 会污染当前数据库/Blob                 |

## 7. 2026-08-08 原始限制与未验证项（历史）

- 没有执行生产部署、Preview 部署或 Vercel 环境变量修改。
- 没有写入 Neon、上传/删除 Blob，也没有运行 `cms:smoke`。
- 没有验证当前 Vercel Production/Preview 实际是否使用独立资源；代码和文档没有提供可信证明。
- 没有完成官方 Codex Security Deep Scan；当前安全结论是单人、证据驱动的标准审计。
- 没有进行真实公网 Core Web Vitals、负载测试、故障注入、PITR 恢复演练或 Blob 全量 API 清单核对。
- 官方文档搜索服务在本次审计中返回 503，因此没有把 Neon 各套餐的具体恢复保留天数写入报告；必须在你的实际项目/套餐中核实。

## 8. 2026-08-08 原始下一步决策（历史）

不要同时开十条战线。下一步应只做一件事：**先完成阶段 B 的数据安全改造和对账，然后再做文章 SSR。** 如果先美化页面或直接推送，得到的是“看起来更完整、实际上更难恢复”的系统。

## 9. 2026-08-09 清理记录

### 已删除且有引用证据

- 旧文章客户端详情：`src/app/blog/[id]/blog-content.tsx`；当前正文由 Server Component 输出，原文件还引用了不存在的变量，属于不可达遗留实现。
- 未使用日志、音乐列表、WIP 组件和评论 JSON：`src/lib/log.ts`、`src/app/music/list.ts`、`src/components/wip.tsx`、`src/app/comments/list.json`。
- 过时且具有误导性的历史清理指南：`GIT_CLEANUP_GUIDE.md`。
- 未被项目调用且会无差别 `git add .` 后直接推送的脚本：`git_push.bat`。
- 未使用的批量删除服务和旧布局组件：`src/app/blog/services/batch-delete-blogs.ts`、`src/components/lottie-icon.tsx`、`src/layout/footer.tsx`、`src/layout/header.tsx`。
- 无引用 Lottie JSON 资产：`src/lottie/` 下 7 个 JSON 文件。
- 未使用依赖：`lottie-web`、`baseline-browser-mapping`；锁文件已同步。
- 仅内部使用的导出已收窄为模块私有，包括颜色转换链、文件读取辅助、投稿票据常量、内容仓储辅助和博客配置类型。公开入口仍保留实际被页面或测试使用的 API。

### 有意保留

- `@svgr/webpack` 虽被 Knip 标记为未使用，但 `next.config.ts` 的 Turbopack 和 webpack 两条 SVG loader 配置都直接依赖它，不能删除。
- `public/blogs/hardware-kb/`、`public/` 图片/音频和各页面 `list.json` 是用户内容、回退数据或迁移输入，不是死文件；本轮未修改、未删除。
- `.next/`、`.vercel/`、`node_modules/` 是本地运行/项目关联目录，不纳入源码清理。
- 当时暂时保留了 `agent_api_keys`、`agent_request_nonces`；现已通过独立且带保护条件的 `0009` 迁移清理，不是靠文件清理直接破坏数据。

### 清理后的门禁

Knip 复扫后仅剩 `@svgr/webpack` 这一项可解释的配置型误报；没有未使用文件，也没有可安全删除的未使用项目依赖。最终仍须串行执行测试、类型检查、格式检查、Drizzle 检查、构建、生产依赖审计和 `git diff --check`。本轮不提交、不推送、不部署。

## 10. 2026-08-09 运行时性能与后台体验优化

- 文章、首页配置、博客作者、项目、分享和图片墙的独立 Blob 上传改为并行，仍然坚持“全部上传成功后才写 Neon”。
- Markdown 代码块高亮改为并行处理，长技术文章不再按代码块串行等待。
- 编辑器和审批预览的 Markdown 渲染增加 120 ms 防抖，避免每个按键都启动 Shiki/KaTeX 渲染。
- 根布局的运行时站点配置使用 React `cache()` 做请求内去重，metadata 和布局不会重复读取同一份配置。
- 审批后台轮询不再覆盖正在编辑的投稿草稿，只在切换投稿时同步编辑内容。

## 11. 2026-08-09 媒体生命周期第一阶段

- `media` 增加 `state`、`pending_at`、`committed_at`、`last_seen_at` 和 `orphaned_at`，并通过 `drizzle/0007_curly_la_nuit.sql`、`drizzle/0008_plain_hercules.sql` 迁移；既有行默认视为 `committed`，不会删除任何旧对象。
- Vercel Blob `onUploadCompleted` 只登记 `pending`。文章保存、文章批准和运行时配置保存都在同一数据库事务中，把实际引用且已存在索引行标记为 `committed`，并更新 `last_seen_at`。
- 重复 pathname 上传不会把已提交对象降级为 `pending`；未完成保存的上传会保留为 `pending`，交给对账脚本人工复核。
- `scripts/reconcile-media.ts` 统一使用同一套媒体引用提取逻辑，报告超过 24 小时且未被内容引用的 pending 候选，以及“仍被引用但仍 pending”的异常；脚本明确只读，永不自动删除、回填或上传。
- 本节记录的是第一阶段当时的状态；第 12 节已经补齐逐对象核验回填和可恢复两阶段 GC，不能再把这句话当成当前缺口。

## 12. 2026-08-09 高优先级收尾

- 备份格式升级为 v2：可选归档私有 Blob 字节；恢复脚本校验 manifest、只允许空目标库，恢复的一次性票据统一撤销。
- `media:maintain` 提供 plan/backfill/mark/delete/recover。回填要求内容 SHA-256 与 pathname 摘要一致；GC 先标记 `orphaned`，经过宽限期后重新检查引用和 ETag，先归档再删除，归档可恢复。内容写入、上传预留与 GC 共用事务级 advisory lock，关闭最终引用检查到删除之间的竞态。
- CSP 改为 Next 16 `proxy.ts` 分层策略：公开页面保留兼容头，Preview 同时发送 strict Report-Only；`/admin` 和 `/write` 使用每请求 nonce，原生内联平台检测改为零渲染客户端初始化组件。
- 图片墙 9 张原图已在 `C:\Users\zm\Desktop\zhanming-blog-picture-originals-20260809` 保留并替换为 WebP，从 39,060,854 字节降到 2,596,864 字节。
- 高码率音乐原件已在 `C:\Users\zm\Desktop\zhanming-blog-music-originals-20260809` 保留；3 首高码率 MP3 转为 128 kbps，未使用的 `christmas.m4a` 和 `search_links.txt` 移出部署包。`public/blogs/hardware-kb/` 未触碰。
- 旧 `agent_api_keys`、`agent_request_nonces`、非 post submission 枚举和 Agent 外键由 `drizzle/0009_fixed_firebird.sql` 清理，迁移前有旧数据、投稿类型和幂等键保护检查。

## 13. 2026-08-09 本地恢复与浏览器验收

- 在两个独立的本地 PostgreSQL 18 空库之间执行了真实 `backup:cms` → `backup:restore` 演练；文章、修订、标签、分类、内容文档、媒体、待审批投稿、审计事件和票据元数据共 11 组数据逐表恢复成功。
- 备份 manifest SHA-256 校验通过；目标库非空保护生效路径保留；恢复后所有投稿票据均已撤销，票据哈希与源库不同，自增序列可以继续插入。
- 本地演练没有连接任何生产 Neon 或 Blob，也没有伪装成生产灾备演练。完整 Blob 字节异地恢复仍必须在管理员创建的隔离 Blob Store 上执行。
- `ffprobe` 已验证 5 首部署中的 MP3 均可解码；内置浏览器实际播放 `close-to-you` 后进度前进，图片墙 9 张 WebP 均完成解码。
- 本地 CSP 已按 Next 16.3 文档仅在 development 加入 `unsafe-eval`；生产仍不包含该项。后台脚本策略为每请求 nonce 且不含 `unsafe-inline`；公开静态/ISR 页面保留兼容内联策略。
- 根布局的 Windows 平台检测改为零渲染客户端初始化组件，消除了后台 nonce 属性 hydration mismatch 和 React 脚本警告；音乐播放按钮补齐动态可访问名称。
- Blob 上传令牌签发前会把已存在的孤儿/已删除 pathname 预留为 `pending`；上传回调重新读取私有 Blob 并验证实际 SHA-256、大小和 MIME，浏览器自报元数据不再直接进入可信索引。
