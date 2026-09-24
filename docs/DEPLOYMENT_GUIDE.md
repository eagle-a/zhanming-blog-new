# 用 Vercel 部署（不再依赖 GitHub CI/CD）

发布代码只走本机 Vercel CLI。GitHub 只用来放源码，不再参与部署决策。

## 1. 什么时候需要部署

| 改动                                                                       | 要不要部署                                         |
| -------------------------------------------------------------------------- | -------------------------------------------------- |
| 页面代码、组件、样式、`src/` 下任何东西                                    | 要                                                 |
| `public/` 外壳素材（`images/`、`live2d/`、`favicon.png`、`manifest.json`） | 要                                                 |
| 背景音乐 `public/music/`                                                   | 要                                                 |
| `next.config.ts`、`vercel.json`、`package.json`、依赖                      | 要                                                 |
| Vercel 环境变量                                                            | 要，改完必须重新部署才生效                         |
| 文章、图片、站点文案配置                                                   | **不要**，见 [提交文章与图片](PUBLISHING_GUIDE.md) |

## 2. 一条命令

```powershell
pnpm deploy:production
```

它依次做四件事：

1. **发布前提检查**：工作区干净、当前分支是 `main`、`vercel.json` 里 `git.deploymentEnabled.main` 仍然是 `false`（保持 Vercel 的 Git 集成自动部署关闭）。
2. **本地质量门禁**：跑 `pnpm check`（`test` → `typecheck` → `format:check` → `db:check` → `build`），任何一步失败就拒绝发布。
3. **导出提交快照**：用 `git archive` 把该提交导出到临时目录。`.env`、`node_modules`、未提交的改动和本地资料都不会进发布包。
4. **Vercel 生产部署**：在快照目录里执行 `vercel deploy --prod --yes`，并写入 `releaseCommit=<sha>` 元数据，方便事后对上是哪个提交。

部署完成会打印 Production 地址和别名（`https://zhanmingblog.cc.cd`）。用 `/api/admin/diagnostics` 可以看到线上实际运行的 `releaseCommit`。

## 3. 门禁变了什么

以前 `pnpm deploy:production` 要求「本地 HEAD 等于远端 `main`，且该 SHA 的 GitHub Actions 必须绿」。结果 GitHub 或代理一不稳定，发布就卡住。

现在：

- **GitHub 不在部署链路上**。质量门禁是本地 `pnpm check`，不再调用 GitHub API。
- **推送不再是发布前提**。没推送时脚本只给警告：「这次部署的源码只存在于本机」。
- `.github/workflows/ci.yml` 仍然会在推送时跑，但它是**事后信号，不阻断发布**。

代价要说清楚，别自欺：

- 本地校验跑在你的机器和你的环境上，独立性不如干净容器里的 CI。**同一个提交在你的机器上过、在别人机器上不过，是可能的。**
- 默认门禁不含两个较重的检查。要更接近原来 CI 的覆盖，先手动跑：

  ```powershell
  pnpm test:browser
  pnpm build
  pnpm test:production
  ```

- 唯一强制的源码备份仍然是 `git push`。长期不推送 = 线上跑着远端没有的代码，机器一坏就找不回来。

## 4. 发布前手检

```powershell
git status                 # 必须是干净的
git log --oneline -1       # 确认这是你要发的提交
git push origin main       # 强烈建议，脚本不再强制
```

代理：Vercel CLI 需要能出网。本机 Clash 在 `127.0.0.1:11520` 时先设：

```powershell
$env:HTTP_PROXY='http://127.0.0.1:11520'
$env:HTTPS_PROXY='http://127.0.0.1:11520'
```

站点域名 `zhanmingblog.cc.cd` 走直连，验证时加 `--noproxy '*'`，免得请求被代理绕上去导致误判：

```powershell
curl.exe -s -o NUL -w '%{http_code}' --noproxy '*' https://zhanmingblog.cc.cd/
```

## 5. 明确跳过本地校验

知道自己在做什么时才用：

```powershell
pnpm deploy:production --skip-check
```

适用场景只有「只改了文档或不影响运行的资源，不想再等一遍构建」。它不会跳过前提检查（干净工作区、`main`、自动部署关闭）。

## 6. 应急：直接调 Vercel CLI

包装脚本本身坏了、或者要发一个当前工作目录的状态时：

```powershell
vercel deploy --prod --yes
```

两者差别要知道：包装脚本只上传 `git archive` 出来的提交内容；直接 CLI 上传的是当前工作目录（受 `.gitignore`/`.vercelignore` 约束），**可能带上未提交的改动，也不会写入 `releaseCommit`**。用它发完之后，线上跑的到底是哪个提交就只能靠猜。

## 7. 回滚

1. Vercel Dashboard → 该项目 → Deployments。
2. 找到上一个正常的生产部署，Promote to Production（或 Redeploy）。
3. 数据库**不回滚**，Blob 对象**不删除**。代码回滚不会撤销已写入的文章或图片。
4. 把回滚的 deployment ID 和原因记下来；如果这次问题来自代码，回滚后仍要修分支再发一次。

## 8. 环境变量

```powershell
vercel login
vercel link
vercel env pull .env.local --environment=production
```

`.env.local` 被 Git 忽略，不要提交。生产必需变量：

```text
DATABASE_URL
BLOB_READ_WRITE_TOKEN
BLOG_ADMIN_PASSWORD_HASH
BLOG_SESSION_SECRET
NEXT_PUBLIC_SITE_URL=https://zhanmingblog.cc.cd
```

`BLOG_ADMIN_PASSWORD_HASH` 和 `BLOG_SESSION_SECRET` 必须只在服务端使用，不要加 `NEXT_PUBLIC_` 前缀。生成命令：`pnpm admin:secrets`。

数据库结构变更**不要**放进 Vercel Build Command：先针对明确的 Neon 数据库人工执行 `pnpm db:migrate`，否则 Preview 或回滚部署可能改到生产库。

## 9. 相关命令

| 命令                                         | 作用                                                         |
| -------------------------------------------- | ------------------------------------------------------------ |
| `pnpm release:check`                         | 只跑发布前提检查，不部署                                     |
| `pnpm deploy:production`                     | 前提检查 + 本地校验 + Vercel 生产部署                        |
| `pnpm deploy:production --skip-check`        | 跳过本地校验（前提检查仍执行）                               |
| `pnpm check`                                 | `test` + `typecheck` + `format:check` + `db:check` + `build` |
| `pnpm test:browser` / `pnpm test:production` | 更重的浏览器与生产模式回归                                   |
| `vercel ls` / `vercel inspect <url>`         | 查部署列表和构建日志                                         |
