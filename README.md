# eagle-a Blog

> 一名热爱技术的在校大学生的个人博客
>
> 网站：https://zhanmingblog.cc.cd
>
> GitHub：https://github.com/eagle-a

## Cloudflare Pages 部署指南

本项目支持部署到 **Cloudflare Pages**，使用 Edge Runtime 运行。

### 1. 环境准备

- **Node.js**: 20.x 或更高版本（项目已配置 `.node-version`）
- **包管理器**: pnpm（推荐）
- **GitHub 仓库**: 用于存储博客内容

### 2. 分支说明

项目有两个主要分支：

| 分支 | 用途 | 部署目标 |
|------|------|----------|
| `main` | 主分支，用于 Vercel 部署 | Vercel |
| `cloudflare` | Cloudflare 专用分支 | Cloudflare Pages |

**切换到 cloudflare 分支：**

```bash
git checkout cloudflare
```

### 3. 安装依赖

```bash
pnpm install
```

### 4. 开发预览

```bash
# 启动开发服务器（端口 2025）
pnpm dev
```

### 5. 构建与部署

#### 5.1 本地构建

```bash
# 构建 Cloudflare 版本
pnpm run build:cf
```

构建输出位于 `.open-next/` 目录。

#### 5.2 本地预览

```bash
# 构建后在本地预览
pnpm run preview
```

**注意：** 预览前必须先执行 `pnpm run build:cf`

#### 5.3 部署到 Cloudflare

```bash
# 构建并部署
pnpm run build:cf
pnpm run deploy
```

或一步完成：

```bash
pnpm run build:cf && pnpm run deploy
```

### 6. 配置说明

#### 6.1 wrangler.toml

项目根目录的 `wrangler.toml` 配置：

```toml
main = ".open-next/worker.js"
name = "zhanming-blog-new"
compatibility_date = "2024-07-29"
compatibility_flags = ["nodejs_compat"]
pages_build_output_dir = ".open-next"

[assets]
directory = ".open-next/assets"
binding = "ASSETS"

[observability]
[observability.logs]
enabled = true
head_sampling_rate = 1
invocation_logs = true
persist = true
```

#### 6.2 Edge Runtime

所有页面和 API 路由已配置使用 Edge Runtime：

```typescript
export const runtime = 'edge'
```

### 7. GitHub Actions 自动部署（推荐）

创建 `.github/workflows/deploy-cloudflare.yml`：

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [cloudflare]
  pull_request:
    branches: [cloudflare]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 9

      - name: Install dependencies
        run: pnpm install

      - name: Build
        run: pnpm run build:cf
        env:
          NEXT_PUBLIC_GITHUB_OWNER: ${{ secrets.NEXT_PUBLIC_GITHUB_OWNER }}
          NEXT_PUBLIC_GITHUB_REPO: ${{ secrets.NEXT_PUBLIC_GITHUB_REPO }}
          NEXT_PUBLIC_GITHUB_BRANCH: ${{ secrets.NEXT_PUBLIC_GITHUB_BRANCH }}
          NEXT_PUBLIC_SITE_URL: ${{ secrets.NEXT_PUBLIC_SITE_URL }}

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy .open-next --project-name=zhanming-blog-new
```

**配置 Secrets：**

在 GitHub 仓库 → Settings → Secrets and variables → Actions 中添加：

- `CLOUDFLARE_API_TOKEN`: Cloudflare API Token
- `CLOUDFLARE_ACCOUNT_ID`: Cloudflare Account ID
- `NEXT_PUBLIC_GITHUB_OWNER`: GitHub 用户名
- `NEXT_PUBLIC_GITHUB_REPO`: 仓库名
- `NEXT_PUBLIC_GITHUB_BRANCH`: 分支名
- `NEXT_PUBLIC_SITE_URL`: 网站地址

### 8. 环境变量

创建 `.env.local` 文件：

```bash
# GitHub 仓库配置（必填）
NEXT_PUBLIC_GITHUB_OWNER=你的GitHub用户名
NEXT_PUBLIC_GITHUB_REPO=仓库名
NEXT_PUBLIC_GITHUB_BRANCH=main

# GitHub App 配置（如需在线编辑功能）
NEXT_PUBLIC_GITHUB_APP_ID=你的GitHubAppID
NEXT_PUBLIC_GITHUB_ENCRYPT_KEY=自定义加密密钥

# 网站地址（用于 RSS 和 Sitemap）
NEXT_PUBLIC_SITE_URL=https://你的域名
```

### 9. 常见问题

#### 构建失败
- 检查 Node.js 版本是否为 20.x
- 确保使用 pnpm 安装依赖
- 检查 `.env.local` 环境变量是否正确

#### Edge Runtime 错误
- 确保所有页面都有 `export const runtime = 'edge'`
- 避免使用 Node.js 特有的 API（如 `fs`、`path` 等）

#### 部署后 404
- 检查 `wrangler.toml` 中的 `pages_build_output_dir` 是否为 `.open-next`
- 确认构建输出目录 `.open-next/` 存在

#### 静态资源加载失败
- 检查 `[assets]` 配置是否正确
- 确认 `wrangler.toml` 中的 `directory` 指向正确

---

## 快速开始

### 1. Fork 仓库

点击右上角 **Fork** 按钮，将仓库复制到你的 GitHub 账号下。

### 2. 配置环境变量

在 Vercel 部署前，需要配置以下环境变量：

```bash
# GitHub 仓库配置（必填）
NEXT_PUBLIC_GITHUB_OWNER=你的GitHub用户名
NEXT_PUBLIC_GITHUB_REPO=你的仓库名
NEXT_PUBLIC_GITHUB_BRANCH=main

# 网站地址
NEXT_PUBLIC_SITE_URL=https://你的域名.vercel.app

# GitHub App 配置（如需在线编辑功能）
NEXT_PUBLIC_GITHUB_APP_ID=你的GitHubAppID
NEXT_PUBLIC_GITHUB_ENCRYPT_KEY=自定义加密密钥
```

### 3. Vercel 一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/eagle-a/zhanming-blog-new)

部署步骤：
1. 点击上方按钮进入 Vercel 部署页面
2. 选择你的 GitHub 账号和 fork 的仓库
3. 填写项目名称
4. 在 Environment Variables 中添加上述环境变量
5. 点击 Deploy 开始部署

部署完成后，Vercel 会自动分配一个域名，你也可以绑定自己的自定义域名。

---

## GitHub App 配置（在线编辑功能）

如需使用在线编辑功能，需要创建 GitHub App：

1. 进入 GitHub → Settings → Developer settings → GitHub Apps → New GitHub App
2. 填写 App 名称、主页 URL（填写你的 Vercel 部署地址）
3. **Webhook**: 可暂不配置
4. **Permissions**: 选择 `Contents` → `Read and write`
5. **Where can this GitHub App be installed?**: 选择 `Any account`
6. 创建后记录 **App ID**
7. 生成 **Private key** 并下载保存
8. 安装 App 到你的仓库

将 App ID 和加密密钥配置到 Vercel 的环境变量中，即可使用在线编辑功能。

---

## 博客内容管理

博客内容存储在 GitHub 仓库的 `public/blogs/` 目录下：

```
public/blogs/
├── index.json              # 博客索引（自动生成）
├── readme/                 # 每篇博客一个文件夹
│   ├── index.md           # 博客正文（Markdown）
│   └── config.json        # 博客配置
└── ...
```

### 添加新博客

**方式一：直接提交到 GitHub**

1. 在 `public/blogs/` 下创建新文件夹
2. 添加 `index.md`（博客内容）和 `config.json`（配置信息）
3. 提交到 GitHub，Vercel 会自动重新部署

**方式二：在线编辑（需配置 GitHub App）**

1. 在网站右上角点击编辑按钮
2. 使用 Private Key 登录
3. 在线编辑并提交，自动推送到 GitHub

### config.json 格式

```json
{
  "title": "博客标题",
  "tags": ["标签1", "标签2"],
  "date": "2026-03-08T12:00",
  "summary": "博客摘要",
  "cover": "/blogs/文件夹名/cover.png",
  "hidden": false
}
```

---

## 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

访问 `http://localhost:2025` 预览。

---

## 其他配置

### 移除 Liquid Grass 动画

编辑 `src/layout/index.tsx`，删除以下代码：

```tsx
const LiquidGrass = dynamic(() => import('@/components/liquid-grass'), { ssr: false })
// ...
<LiquidGrass />
```

### 配置首页内容

首页内容在 `src/app/(home)` 目录：
- `page.tsx` - 首页主文件
- `hi-card.tsx` - HiCard 内容

---

## Star History

<a href="https://www.star-history.com/#eagle-a/zhanming-blog-new&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=eagle-a/zhanming-blog-new&type=date&theme=dark&legend=top-left" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=eagle-a/zhanming-blog-new&type=date&legend=top-left" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=eagle-a/zhanming-blog-new&type=date&legend=top-left" />
 </picture>
</a>
