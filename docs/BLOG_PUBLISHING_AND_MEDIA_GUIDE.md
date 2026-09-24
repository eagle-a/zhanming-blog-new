# 博客发布与图片存储规范

本文记录当前项目真实生效的发布链路。读它是为了解决两个反复出现的问题：文章正文存在哪里，以及正文里的图片存在哪里。第 6 节是 2026-09-24 媒体索引补齐的记录，第 8 节是 2026-09-23 周报图片 404 的复盘。

## 1. 数据落在哪里

| 内容          | 存放位置                                         | 写入方式                                        |
| ------------- | ------------------------------------------------ | ----------------------------------------------- |
| 正文与元数据  | Neon 数据库 `posts` 表                           | 管理后台发布、审批通过、`/api/admin/posts` 接口 |
| 静态图片      | Git 仓库 `public/images/<slug>/`                 | 提交代码后随 Vercel 部署生效                    |
| Blob 图片     | Vercel Blob，路径 `blog/<slug>/<sha>.ext`        | 管理后台 `/write` 上传，或下面的静态迁移命令    |
| 站点/项目配图 | Vercel Blob，路径 `content/<命名空间>/<sha>.ext` | CMS 内容编辑接口                                |

图片文件不会存进 Neon。把 Markdown 写进数据库，不会顺带把本地图片传上线上。

## 2. 图片的两条通道

| 对比项   | 静态 `/images/<slug>/<文件名>`          | Blob `/api/media/blog/<slug>/<sha256>.<ext>` |
| -------- | --------------------------------------- | -------------------------------------------- |
| 生效条件 | 必须 commit + push + CI 通过 + 生产部署 | 上传后立即可用，不需要部署                   |
| 仓库体积 | 每次加图都会永久增大仓库                | 不占仓库                                     |
| 页面渲染 | 走 `/_next/image`，PNG 会转成 WebP/AVIF | 走代理 `?w=` 生成 srcset，JPEG/PNG 转 WebP   |
| 谁能写   | 任何能提交代码的会话                    | 只有管理员会话                               |

两条通道都受支持，选择取决于什么时候要让图片生效。**新周报的推荐做法**是先把图片放进 `public/images/<slug>/` 并随文章一起部署，等页面确认正常，再用第 5 节的命令搬到 Blob 并删掉静态副本。

## 3. 代码里的事实

1. `scripts/submit-ai-post.ts` 只读一个 Markdown 文件并提交 JSON，**没有任何文件上传逻辑**。AI 投稿不会上传图片，这是设计边界。
2. `src/app/write/services/push-blog.ts` 才会调 `@vercel/blob/client`：本地图片按 `blog/<slug>/<sha256>.<ext>` 上传，再把正文里的 `local-image:<id>` 占位符换成 `/api/media/blog/<slug>/<sha256>.<ext>`。注意只有 `type: 'file'` 的图片会触发上传，粘贴的 URL 图片不会。
3. **管理员上传走服务端**：`POST /api/admin/media/store`（`src/lib/media-store.ts`）接收 multipart，用 `put()` 写 Blob 并登记媒体，返回 `/api/media/...`。`src/app/write/services/push-blog.ts` 和 `src/lib/content-client.ts` 都改用它，因此上传不依赖 `BLOB_READ_WRITE_TOKEN`，靠 `BLOB_STORE_ID` + 运行时 OIDC 令牌即可。代价是单张图片受平台请求体上限约束（约 4 MB），超限要先压缩。
4. `POST /api/admin/media/upload` 是另一条路：`@vercel/blob/client` 的客户端直传。它生成上传令牌时**只认 `BLOB_READ_WRITE_TOKEN`**，不认 OIDC，所以该变量缺失或指错存储时必然 500。仓库里保留它是因为 `scripts/smoke-test-cms.ts` 用它，生产环境现在也配了正确的令牌。
5. `scripts/migrate-static-media.ts`（`pnpm media:migrate-static`）把 `public/images/<slug>/` 里的本地图片搬到 Blob，并把正文引用改成 `/api/media/...`。它用 `/api/admin/session` 登录、用 `/api/admin/posts/<slug>/revisions[/<version>]` 读正文，图片交给 `/api/admin/media/store`，最后由 `/api/admin/media/migrate-static` 在同一事务里改写正文。
6. `src/app/api/media/[...pathname]/route.ts` 用 `access: 'private'` 读 Blob。只接受 `blog/<slug>/` 和 `content/(site|bloggers|projects|shares|pictures|migrated)/` 两类路径，其他一律 404。
7. 只有 `RESPONSIVE_MEDIA_WIDTHS`（480/800/1200/1920）是合法的 `?w=` 值，其他宽度返回 400；图片本身比请求宽度小时不做放大，编码宽度上限就是原图宽度。
8. `?w=` 变体对 `image/jpeg` 与 `image/png` 一律编码成 WebP（`src/lib/media-transform.ts`）。格式只由 URL 决定，不看 `Accept`，所以缓存里不存在"给不支持 WebP 的客户端发 WebP"的风险：这类浏览器请求的是不带 `?w=` 的原始 URL，那个 URL 永远返回原始字节。
9. 重编码可能比原图更大（PNG 图表尤其明显），所以编码结果一旦不比自己已经存着的字节小，就回退成原始字节。`?w=` 变体因此永远不会比原图更费流量。
10. `/blog/[id]` 用 `generateStaticParams` 预渲染全部已发布文章（构建输出里是 `● SSG`），配 `revalidate = 60`。少了这一步，每一次文章访问都是一次实时渲染 + 查库，`Cache-Control` 会退化成 `private, no-store`。
11. `media` 表是 Blob 的索引，不是 Blob 本身。缺行不影响图片可读，但页面拿不到 `width`/`height`，也就不会生成 `srcset`。写索引依赖 `width`/`height` 两列，缺列时每次上传都在这一步失败。
12. 本机（校园网）到 Neon 的 WebSocket 通道不通，`scripts/lib/database.ts` 默认给非 loopback 主机选的 `neon-serverless` 驱动连不上。维护脚本加 `$env:BLOG_SCRIPT_DATABASE_DRIVER='pg'` 会改走 `pg` 的 TCP 通道。
13. 正文 HTML 会被 `src/lib/sanitize-html.ts` 过滤，`style` 属性一律丢弃：写在 Markdown 里的内联样式根本到不了浏览器，观感要改就改样式表（`/about` 的证书网格就是这样落到 `src/styles/article.css` 的）。

## 4. 标准发布流程

### 4.1 无图文章

准备 Markdown，确认 frontmatter 完整，然后由人执行投稿命令并粘贴一次性投稿码：

```powershell
pnpm --dir C:\Users\zm\Desktop\project\zhanming-blog-new agent:submit C:\path\to\article.md
```

投稿成功只代表进入 `pending` 队列，需要在 `/admin/review` 审批后才公开。细节见 `docs/AI_SUBMISSION_GUIDE.md`。

### 4.2 有图文章

1. 把图片复制到 `public/images/<slug>/`，正文统一引用 `/images/<slug>/<文件名>`。
2. 确认本地 `pnpm test`、`pnpm typecheck`、`pnpm format:check` 全过。
3. 提交并推送，等 GitHub Actions 的 `verify` 变绿。
4. 用 `node scripts/deploy-production.mjs` 部署（不要绕过这个脚本）。
5. 部署后逐张确认 `/images/<slug>/<文件名>` 返回 200。
6. 走投稿 + 审批流程发布正文。
7. 需要把图片搬到 Blob 时，执行第 5 节。

### 4.3 只用浏览器的流程

不写代码也能发布带图文章：登录 `/write/<slug>`，在图片管理里拖入本地图片，保存。`pushBlog()` 会上传 Blob 并把正文改成 `/api/media/...`。缺点是文件位置靠人工拖放，文章多了容易和正文对不上。

## 5. 把静态图片迁到 Blob

迁移命令会登录管理员会话，读取文章最新修订里的正文，把本地 `public/images/<slug>/` 的图片逐张交给服务端写进 Blob，然后由服务端改写正文，最后逐张回读线上图片确认 200。它不需要 CI，只需要目标版本已经部署过 `/api/admin/media/migrate-static`。

上传走服务端 `/api/admin/media/store`，不走 `/api/admin/media/upload` 的客户端令牌流程，这样就不受 `BLOB_READ_WRITE_TOKEN` 是否存在、是否指对存储的影响（见第 3 节第 3、4 条）。

先预演，只报告不改动：

```powershell
cd C:\Users\zm\Desktop\project\zhanming-blog-new
pnpm media:migrate-static --slug weekly-report-2026-09-23
```

预演会逐张检查本地是否真的有这个文件。**有 MISS 就先补文件**，否则会跳过。

确认无误后执行迁移：

```powershell
pnpm media:migrate-static --slug weekly-report-2026-09-23 --apply --confirm-environment=production
```

一次迁多篇：

```powershell
pnpm media:migrate-static --slug half-week-report-2026-09-09,half-week-report-2026-09-13,weekly-report-2026-09-18,weekly-report-2026-09-23 --apply --confirm-environment=production
```

命令会隐藏输入管理员密码。密码只用于换取一个管理员会话 Cookie，不写入磁盘，也不读取 Blob 或数据库凭据。正文来自文章最新修订，而不是本地 Markdown 文件，所以不会覆盖你在后台改过的内容。

迁移完成后：

1. 打开文章页面，确认全部图片正常显示。
2. 确认正文里已经没有 `/images/<slug>/` 残留。
3. 再删除 `public/images/<slug>/` 静态副本并提交。

## 6. 补齐已经发布内容的媒体索引

图片进 Blob 和「媒体登记进 `media` 表」是两件事。正文里写着 `/api/media/...` 只证明图片可读；`media` 表没有对应行时，文章页拿不到 `width`/`height`，不会输出 `srcset`，`pnpm media:maintain --action=plan` 也会一直把它列成「索引缺失」。

2026-09-24 核对生产库发现 `media` 表缺 `width`、`height` 两列，`drizzle/0011_responsive_media_dimensions.sql` 从未在生产执行。后果有两层：

1. 任何一次上传都在写索引时失败。`dd4d64a` 起这一步已降级为不致命，接口返回 `indexed: false`，图片仍然可读，所以问题被藏住了。
2. 60 张已经迁进 Blob 的图片（4 篇周报 43 张 + `readme` 17 张）只有 Blob 对象，`media` 表里没有行。

补齐分两步。第一步补 schema，本地 `.env.local` 里已经有生产 `DATABASE_URL`：

```powershell
node --env-file=.env.local node_modules/drizzle-kit/bin.cjs migrate
```

改 schema 之前先导出一次受影响表的完整快照（`media`、`posts`、`content_documents`、`drizzle.__drizzle_migrations`），写到仓库外；`ALTER TABLE ... ADD COLUMN` 本身不动数据，但这张表是唯一记录「哪些字节被引用」的地方，值得先留底。

第二步把已发布内容的图片重新交给服务端登记。这一步有两个看起来能用、实际不能用的命令：

- `pnpm media:migrate-static` 按「正文里的静态引用」找图片，而这批正文早就改写成 `/api/media/...`，它会报没有静态引用；
- `pnpm media:maintain --action=backfill` 语义正好，但按设计拒绝在生产执行。

对已经发布的内容，经过授权且自带校验的生产登记路径是 `/api/admin/media/store`：把 Blob 里已经存在的字节再提交一次。pathname 按内容寻址，`put()` 遇到已存在对象会复用，随后服务端 `sharp` 读出真实尺寸写进索引。注意四点：

- 字节从线上读回后先在本地算 SHA-256，必须等于 pathname 里的那一段，否则立即中止；
- 单张超过 4 MB 会被服务端拒绝，需要另行压缩处理；
- 同一个 URL 重复提交是幂等的，所以中断可以直接重跑；
- `storeAdminMedia` 只接受 `blog|content` 与 `site|bloggers|projects|shares|pictures` 命名空间。`content/migrated/` 不在其中，这类行只能本地算尺寸后补 `width`/`height`。

登记出来的行初始状态是 `pending`，语义是「已上传、还没有被内容写入引用」。这批 pathname 已经被已发布正文引用，正确状态是 `committed`，字段与 `markMediaReferencesCommitted()` 写的完全一致：`state='committed'`、`pending_at=null`、`committed_at=now()`、`last_seen_at=now()`、`orphaned_at=null`、`deleted_at=null`。改状态和补尺寸放在一个事务里，提交前断言「所有 `blog/*` 行都是 committed 且有尺寸、所有 `content/migrated/*` 非 SVG 行都有尺寸」，不满足就回滚。

2026-09-24 的结果：`pnpm media:reconcile --include-blobs` 报告 88 条引用 = `media` 表 88 行，全部 `committed`，`pendingMedia`、`missingDatabaseRows`、`missingBlobObjects`、`unreferencedDatabaseRows` 均为 0；Blob 里有 91 个对象，多出的 3 个是没有任何引用的 `blog/readme/*.webp` 残留；7 条只有 SVG 没有尺寸，属于预期。

## 7. 部署与验证

### CI 是部署闸门

`scripts/deploy-production.mjs` 会调用 `checkReleaseState()`，检查工作区干净、分支为 `main`、本地 HEAD 与 `origin/main` 一致、且该提交的 `verify` 工作流结论为 `success`。任一条件不满足就拒绝部署。所以 **CI 红了等于线上不会更新**，这与图片路径无关。

### 部署命令

```powershell
cd C:\Users\zm\Desktop\project\zhanming-blog-new
git status
$env:HTTPS_PROXY = 'http://127.0.0.1:11520'
git push origin main
node scripts/deploy-production.mjs
```

GitHub 需要代理，站点本身通常可以直连。

### 验证清单

```powershell
curl.exe -I https://zhanmingblog.cc.cd/blog/<slug>
curl.exe -I https://zhanmingblog.cc.cd/images/<slug>/<文件名>
curl.exe -I https://zhanmingblog.cc.cd/api/media/blog/<slug>/<sha256>.<ext>
```

文章页返回 200 不代表图片存在，每张图片必须单独确认 200 且 `Content-Type` 是 `image/*`。

## 8. 2026-09-23 周报图片 404 复盘

现象：`/blog/weekly-report-2026-09-23` 正常打开，11 张图片全部 404。

真实原因不是 Blob，也不是 Markdown 路径写错：

1. 提交 `8337dc0`（2026-09-19）加入 `docs/WEEKLY_REPORT_STYLE_GUIDE.md`，该文件不符合 Prettier 格式，`pnpm format:check` 失败，`verify` 工作流转红。
2. 之后所有提交的 CI 都继承这条红记录，`55c6d9e`（2026-09-23，加入第 4 周 11 张图片）同样红。
3. 部署脚本按设计拒绝部署 CI 未通过的提交，生产站因此停留在 `cdeacf0`（2026-09-18）。第 3 周图片属于 `cdeacf0`，所以正常；第 4 周图片属于 `55c6d9e`，从未上线。
4. 正文早已通过审批进入 Neon，图片却还在仓库里等部署，于是出现「文章在、图片全 404」。

修复分三层：

1. `3a2154c` 只做格式化，`verify` 变绿；部署 `dac0fbe` 后 `/images/weekly-report-2026-09-23/...` 立即返回 200。
2. 执行第 5 节的迁移命令，四篇周报共 43 张图片进入 Blob，正文改写成 `/api/media/...`，线上复查每张都是 200，页面里已无 `/images/<slug>/` 引用。
3. 顺带发现更深的坑：生产环境缺少 `BLOB_READ_WRITE_TOKEN`，`/write` 的图片上传一直是 500，因为客户端直传的令牌生成只认这个变量。
4. 补令牌时又踩了第二个坑：Vercel 那句「Remove this variable from Vercel does not revoke the credential」之外还有个陷阱——**如果填进项目的令牌属于另一个（public）存储，`/api/media` 会用它去读图，结果全站 Blob 图片 404**。当时的错误信息是 `Cannot use private access on a public store`。判定方法：令牌形如 `vercel_blob_rw_<storeId>_<secret>`，`<storeId>` 必须等于项目里的 `BLOB_STORE_ID`（本项目为 `jUAToL4WM4h2opno`）。
5. 最终做法：管理员上传改走服务端 `put()`，不再依赖该令牌；同时把正确的令牌配回生产环境，让 `scripts/smoke-test-cms.ts` 那条客户端直传路径也能用。

教训：跑完 `pnpm format:check`、`pnpm test`、`pnpm typecheck` 再提交；CI 红了先修 CI，再谈图片通道。

## 9. 禁止的做法

- 不把 `C:\Users\...`、`../...` 或工作区绝对路径写进投稿正文。
- 不把 `public/images` 路径当作 Blob 地址。
- 不在投稿脚本里加入文件上传、数据库写入或 Blob 凭据。
- 不直接读取或复制 `BLOB_READ_WRITE_TOKEN`、Neon 连接串或管理员会话。
- 不在确认 Blob 版本可访问前删除静态图片。
- 不用任意工作区直接跑 `vercel deploy --prod`，那会绕过提交校验。
- 不把「文章进了数据库」当成「图片已经上线」。

## 10. 发布前检查表

- [ ] `pnpm test`、`pnpm typecheck`、`pnpm format:check` 全部通过。
- [ ] frontmatter 的 `title`、`slug`、`summary`、`date`、`category`、`tags` 完整。
- [ ] 正文没有本机绝对路径、投稿码、Token 或数据库连接串。
- [ ] 每个图片引用都能在目标环境返回 200。
- [ ] `pnpm media:reconcile --include-blobs` 的 `missingDatabaseRows` 与 `missingBlobObjects` 都是 0。
- [ ] 文章页的 `<img>` 带 `width`、`height` 与 `srcset`（没带就说明 `media` 表缺行或缺尺寸）。
- [ ] `?w=800` 返回 `Content-Type: image/webp`，且字节数小于原图 URL。
- [ ] 文章页的响应头是 ISR 缓存（`s-maxage` 或 `x-vercel-cache: HIT/STALE`），不是 `private, no-store`。
- [ ] GitHub Actions `verify` 为 success。
- [ ] 使用 `node scripts/deploy-production.mjs` 部署。
- [ ] 部署后再次检查文章页和全部图片 URL。
