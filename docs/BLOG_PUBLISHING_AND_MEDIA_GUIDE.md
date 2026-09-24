# 博客发布与图片存储规范

本文记录当前项目真实生效的发布链路。读它是为了解决两个反复出现的问题：文章正文存在哪里，以及正文里的图片存在哪里。最后附 2026-09-23 周报图片 404 的复盘。

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
| 页面渲染 | 走 `/_next/image`，PNG 会转成 WebP/AVIF | 走代理 `?w=` 生成 srcset，回原格式           |
| 谁能写   | 任何能提交代码的会话                    | 只有管理员会话                               |

两条通道都受支持，选择取决于什么时候要让图片生效。**新周报的推荐做法**是先把图片放进 `public/images/<slug>/` 并随文章一起部署，等页面确认正常，再用第 5 节的命令搬到 Blob 并删掉静态副本。

## 3. 代码里的事实

1. `scripts/submit-ai-post.ts` 只读一个 Markdown 文件并提交 JSON，**没有任何文件上传逻辑**。AI 投稿不会上传图片，这是设计边界。
2. `src/app/write/services/push-blog.ts` 才会调 `@vercel/blob/client`：本地图片按 `blog/<slug>/<sha256>.<ext>` 上传，再把正文里的 `local-image:<id>` 占位符换成 `/api/media/blog/<slug>/<sha256>.<ext>`。注意只有 `type: 'file'` 的图片会触发上传，粘贴的 URL 图片不会。
3. `scripts/migrate-static-media.ts`（`pnpm media:migrate-static`）把 `public/images/<slug>/` 里的本地图片搬到 Blob，并把正文引用改成 `/api/media/...`。它只用线上已经存在的接口：`/api/admin/session` 登录、`/api/admin/posts/<slug>/revisions[/<version>]` 读正文、`/api/admin/media/upload` 上传、`PATCH /api/admin/posts/<slug>` 写回。**因此它不需要任何部署**。
4. `src/app/api/media/[...pathname]/route.ts` 用 `access: 'private'` 读 Blob。只接受 `blog/<slug>/` 和 `content/(site|bloggers|projects|shares|pictures|migrated)/` 两类路径，其他一律 404。

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

迁移命令会登录管理员会话，读取文章最新修订里的正文，把本地 `public/images/<slug>/` 的图片逐张上传到 Blob，改写正文，再逐张回读线上图片。**不需要部署，也不需要 CI**，因为用到的接口线上都已经在跑。

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

## 6. 部署与验证

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

## 7. 2026-09-23 周报图片 404 复盘

现象：`/blog/weekly-report-2026-09-23` 正常打开，11 张图片全部 404。

真实原因不是 Blob，也不是 Markdown 路径写错：

1. 提交 `8337dc0`（2026-09-19）加入 `docs/WEEKLY_REPORT_STYLE_GUIDE.md`，该文件不符合 Prettier 格式，`pnpm format:check` 失败，`verify` 工作流转红。
2. 之后所有提交的 CI 都继承这条红记录，`55c6d9e`（2026-09-23，加入第 4 周 11 张图片）同样红。
3. 部署脚本按设计拒绝部署 CI 未通过的提交，生产站因此停留在 `cdeacf0`（2026-09-18）。第 3 周图片属于 `cdeacf0`，所以正常；第 4 周图片属于 `55c6d9e`，从未上线。
4. 正文早已通过审批进入 Neon，图片却还在仓库里等部署，于是出现「文章在、图片全 404」。

修复有两条路，任选其一：

- 让静态通道生效：`3a2154c` 只做格式化，`verify` 变绿后再部署，`/images/weekly-report-2026-09-23/...` 就能返回 200。
- 直接走 Blob：执行第 5 节的迁移命令，图片进 Blob，正文改写成 `/api/media/...`，**不需要部署**。

教训：跑完 `pnpm format:check`、`pnpm test`、`pnpm typecheck` 再提交；CI 红了先修 CI，再谈图片通道。

## 8. 禁止的做法

- 不把 `C:\Users\...`、`../...` 或工作区绝对路径写进投稿正文。
- 不把 `public/images` 路径当作 Blob 地址。
- 不在投稿脚本里加入文件上传、数据库写入或 Blob 凭据。
- 不直接读取或复制 `BLOB_READ_WRITE_TOKEN`、Neon 连接串或管理员会话。
- 不在确认 Blob 版本可访问前删除静态图片。
- 不用任意工作区直接跑 `vercel deploy --prod`，那会绕过提交校验。
- 不把「文章进了数据库」当成「图片已经上线」。

## 9. 发布前检查表

- [ ] `pnpm test`、`pnpm typecheck`、`pnpm format:check` 全部通过。
- [ ] frontmatter 的 `title`、`slug`、`summary`、`date`、`category`、`tags` 完整。
- [ ] 正文没有本机绝对路径、投稿码、Token 或数据库连接串。
- [ ] 每个图片引用都能在目标环境返回 200。
- [ ] GitHub Actions `verify` 为 success。
- [ ] 使用 `node scripts/deploy-production.mjs` 部署。
- [ ] 部署后再次检查文章页和全部图片 URL。
