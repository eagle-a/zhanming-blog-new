# eagle-a Blog

> 一名热爱技术的在校大学生的个人博客
>
> 网站：https://eagle-a.github.io
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

## 宝塔部署完整指南

> ⚠️ **重要提示**：本项目使用 **GitHub 作为数据源**，博客内容通过 GitHub API 获取。部署前请确保已配置好 GitHub 相关设置。

### 1. 环境准备

- **Node.js**: 建议 18.x 或更高版本
- **包管理器**: npm 或 pnpm（推荐 pnpm）
- **GitHub 仓库**: 用于存储博客内容
- **GitHub App**（可选）: 用于在线编辑功能

### 2. GitHub 配置（重要）

本项目使用 GitHub 作为数据源，需要配置以下环境变量：

#### 2.1 创建环境变量文件

在项目根目录创建 `.env.local` 文件：

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

#### 2.2 GitHub 仓库结构

确保你的 GitHub 仓库包含以下结构：

```
你的仓库/
├── public/
│   └── blogs/           # 博客文章目录
│       ├── index.json   # 博客索引（自动生成）
│       ├── readme/      # 每篇博客一个文件夹
│       │   ├── index.md
│       │   └── config.json
│       └── ...
└── ...
```

#### 2.3 GitHub App 配置（在线编辑功能）

如需使用在线编辑功能，需要创建 GitHub App：

1. 进入 GitHub → Settings → Developer settings → GitHub Apps → New GitHub App
2. 填写 App 名称、主页 URL
3. **Webhook**: 可以暂时不配置
4. **Permissions**: 选择 `Contents` → `Read and write`
5. **Subscribe to events**: 可不选
6. **Where can this GitHub App be installed?**: 选择 `Any account`
7. 创建后记录 **App ID**
8. 生成 **Private key** 并下载保存
9. 安装 App 到你的仓库，记录 **Installation ID**

### 3. 安装依赖

```bash
# 使用 npm
npm install

# 或使用 pnpm（推荐）
pnpm install
```

### 4. 开发预览

```bash
# 启动开发服务器（端口 2025）
npm run dev
# 或
pnpm dev
```

开发服务器启动后，访问 `http://localhost:2025` 即可预览网站。

### 5. 配置静态导出

项目已配置静态导出，位于 `next.config.ts`：

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	output: 'export',
	distDir: 'dist',
	images: {
		unoptimized: true
	},
	// 其他配置...
}

export default nextConfig
```

### 6. 打包构建

```bash
# 构建生产版本（输出到 dist 目录）
npm run build
# 或
pnpm build
```

**⚠️ 重要**：构建时会从 GitHub API 获取博客内容，请确保：
- 网络可以访问 GitHub API (`api.github.com`)
- 环境变量已正确配置（见第 2 节）
- 如 GitHub 仓库为私有，需要配置 GitHub App

构建完成后，会在项目根目录生成 `dist` 文件夹，里面包含所有静态文件。

### 7. 宝塔部署

#### 7.1 创建站点

1. 登录宝塔面板
2. 点击「网站」→「添加站点」
3. 填写域名（或 IP 地址）
4. 选择 PHP 版本为「纯静态」
5. 点击「提交」创建站点

#### 7.2 上传文件

**方式一：直接上传（适合首次部署）**

1. 在宝塔中进入网站目录（如 `/www/wwwroot/你的域名`）
2. 删除默认的 `index.html`
3. 点击「上传」→ 选择 `dist` 文件夹内的所有文件 → 上传

**方式二：服务器端构建（适合频繁更新）**

如果需要在服务器上直接构建（确保服务器能访问 GitHub API）：

```bash
# 1. 进入网站目录
cd /www/wwwroot/你的域名

# 2. 克隆项目（如果还没有）
git clone https://github.com/你的用户名/你的仓库.git .

# 3. 安装依赖
pnpm install

# 4. 设置环境变量（在宝塔面板中设置）
# 或者创建 .env.local 文件

# 5. 构建
pnpm build

# 6. 将 dist 内容移动到网站根目录
mv dist/* .
```

#### 7.3 配置伪静态（Nginx）

在宝塔中配置伪静态规则：

1. 进入站点设置 → 「伪静态」
2. 选择「纯静态」或手动添加以下完整规则：

```nginx
location / {
    try_files $uri $uri.html $uri/ =404;
}

# 处理 .html 后缀
location ~* \.html$ {
    try_files $uri =404;
}

# 静态资源缓存（提升性能）
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|json|xml)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# HTML 文件禁用缓存（确保内容更新及时生效）
location ~* \.html$ {
    add_header Cache-Control "no-cache, no-store, must-revalidate";
    add_header Pragma "no-cache";
    expires 0;
}
```

3. 点击「保存」

#### 7.4 配置 SSL（可选）

1. 进入站点设置 → 「SSL」
2. 选择「Let's Encrypt」免费证书
3. 勾选域名，点击「申请」
4. 开启「强制 HTTPS」（推荐）

### 8. 环境变量配置（重要）

由于本项目使用 GitHub 作为数据源，**环境变量必须在构建前设置**。

#### 8.1 本地构建时

创建 `.env.local` 文件（见第 2.1 节），构建时会自动读取。

#### 8.2 服务器端构建时

在宝塔面板中设置环境变量：

1. 进入「网站」→ 选择站点 → 「设置」
2. 找到「环境变量」或「配置文件」
3. 添加以下变量：

```bash
NEXT_PUBLIC_GITHUB_OWNER=你的GitHub用户名
NEXT_PUBLIC_GITHUB_REPO=仓库名
NEXT_PUBLIC_GITHUB_BRANCH=main
NEXT_PUBLIC_GITHUB_APP_ID=你的GitHubAppID
NEXT_PUBLIC_GITHUB_ENCRYPT_KEY=你的加密密钥
NEXT_PUBLIC_SITE_URL=https://你的域名
```

**⚠️ 重要提示**：
- `NEXT_PUBLIC_` 前缀的变量会在构建时嵌入到代码中
- 修改环境变量后必须**重新构建**才能生效
- 服务器需要能访问 `api.github.com`

### 9. 更新部署

后续更新博客内容或代码后：

```bash
# 1. 本地重新构建
npm run build

# 2. 将 dist 文件夹内容重新上传到宝塔站点目录
# 或如果使用 Git，推送代码后在服务器上拉取并构建
```

### 10. 自动部署脚本（可选）

创建 `deploy.sh` 脚本实现一键部署：

```bash
#!/bin/bash

# 配置
SERVER="root@你的服务器IP"
REMOTE_DIR="/www/wwwroot/你的域名"
LOCAL_DIST="./dist"

echo "开始构建..."
npm run build

echo "上传到服务器..."
rsync -avz --delete $LOCAL_DIST/ $SERVER:$REMOTE_DIR/

echo "部署完成！"
```

使用方法：
```bash
chmod +x deploy.sh
./deploy.sh
```

**注意**：使用脚本前需要配置 SSH 免密登录。

### 11. 常见问题

#### 构建失败 / 无法获取博客内容
- **检查网络**：确保能访问 `api.github.com`
- **检查环境变量**：确认 `NEXT_PUBLIC_GITHUB_OWNER` 和 `NEXT_PUBLIC_GITHUB_REPO` 已正确设置
- **检查仓库权限**：如为私有仓库，需要配置 GitHub App 或 Token
- **检查分支名称**：确认 `NEXT_PUBLIC_GITHUB_BRANCH` 与仓库实际分支一致

#### 页面 404
- 检查伪静态配置是否正确
- 确认 `dist` 文件夹内的文件已正确上传
- 检查 `_next` 文件夹是否存在（包含 JS/CSS 资源）

#### 图片不显示
- 确认 `images/` 文件夹已上传
- 检查图片路径是否正确（区分大小写）

#### 样式丢失
- 确认 `_next/static/` 文件夹已完整上传
- 检查浏览器控制台是否有 404 错误

#### 更新后不生效
- 清除浏览器缓存（Ctrl+F5 强制刷新）
- 检查 CDN 缓存（如使用了 CDN）
- 确认上传的是最新构建的 `dist` 文件夹
- **重要**：修改 GitHub 内容后必须**重新构建**才能生效

#### 在线编辑功能无法使用
- 确认已正确配置 GitHub App
- 检查 `NEXT_PUBLIC_GITHUB_APP_ID` 是否正确
- 确认 Private Key 格式正确（PEM 格式）
- 检查 GitHub App 是否已安装到目标仓库

---

## 博客内容管理

> ⚠️ **重要**：博客内容存储在 **GitHub 仓库**，通过 GitHub API 获取。本地 `public/blogs/` 目录仅在开发时用于预览。

### 博客内容路径（GitHub 仓库）

博客文章存储在 GitHub 仓库的 `public/blogs/` 目录下：

```
public/blogs/
├── index.json              # 博客索引文件（自动生成）
├── readme/                 # 每篇博客一个文件夹
│   ├── index.md           # 博客正文（Markdown格式）
│   └── config.json        # 博客配置（标题、标签、日期等）
├── driving-tour/
│   ├── index.md
│   └── config.json
└── ...其他博客文件夹
```

### 添加新博客

#### 方式一：直接提交到 GitHub（推荐）

1. 在 GitHub 仓库的 `public/blogs/` 下创建新文件夹，如 `my-new-blog/`
2. 创建 `index.md` 写入博客内容（Markdown 格式）
3. 创建 `config.json` 配置博客信息：

```json
{
  "title": "博客标题",
  "tags": ["标签1", "标签2"],
  "date": "2026-03-08T12:00",
  "summary": "博客摘要",
  "cover": "/blogs/my-new-blog/cover.png",
  "hidden": false,
  "category": ""
}
```

4. 图片放在博客文件夹内，通过相对路径引用
5. **提交到 GitHub 后，需要重新构建部署才能看到新博客**

#### 方式二：在线编辑（需配置 GitHub App）

1. 在网站右上角点击编辑按钮
2. 使用 Private Key 登录
3. 在线编辑博客内容
4. 提交后会自动推送到 GitHub 仓库
5. **重新构建部署后生效**

#### 方式三：本地开发时添加

1. 在本地项目的 `public/blogs/` 下创建新文件夹
2. 添加 `index.md` 和 `config.json`
3. 开发服务器会自动刷新预览
4. 完成后将文件提交到 GitHub 仓库

---

## 其他说明

### 删除默认博客

使用这个项目应该第一件事需要删除默认的示例 blog。

### 在线编辑配置

大部分页面右上角都会有一个编辑按钮，意味着你可以使用 **private key** 进行配置部署。

首页有一个不显眼的配置按钮，点击就能看到现在可以配置的内容。

### 写 blog 的图片管理

图片管理推荐逻辑：
1. 先点击 **+ 号** 添加图片（推荐先压缩好，尺寸宽度不超过 1200）
2. 将上传好的图片直接拖入文案编辑区
3. 点击右上角预览查看效果

### 移除 Liquid Grass 动画

进入 `src/layout/index.tsx` 文件，删除以下两行代码：

```tsx
const LiquidGrass = dynamic(() => import('@/components/liquid-grass'), { ssr: false })
// ...
<LiquidGrass /> // 第 53 行
```

### 配置首页内容

首页内容配置在 `src/app/(home)` 目录：

- `page.tsx` - 首页主文件
- `hi-card.tsx` - 中间 HiCard 内容
- 其他 Card 组件也在此目录

导航 Card 在 `src/components` 目录。

---

## Star History

<a href="https://www.star-history.com/#eagle-a/zhanming-blog-new&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=eagle-a/zhanming-blog-new&type=date&theme=dark&legend=top-left" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=eagle-a/zhanming-blog-new&type=date&legend=top-left" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=eagle-a/zhanming-blog-new&type=date&legend=top-left" />
 </picture>
</a>
