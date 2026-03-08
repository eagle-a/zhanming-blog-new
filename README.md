# eagle-a Blog

> 一名热爱技术的在校大学生的个人博客
>
> 网站：https://eagle-a.github.io
>
> GitHub：https://github.com/eagle-a

## 宝塔部署完整指南

### 1. 环境准备

- **Node.js**: 建议 18.x 或更高版本
- **包管理器**: npm 或 pnpm（推荐 pnpm）

### 2. 安装依赖

```bash
# 使用 npm
npm install

# 或使用 pnpm（推荐）
pnpm install
```

### 3. 开发预览

```bash
# 启动开发服务器（端口 2025）
npm run dev
# 或
pnpm dev
```

开发服务器启动后，访问 `http://localhost:2025` 即可预览网站。

### 4. 配置静态导出

修改 `next.config.ts` 文件，添加静态导出配置：

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	output: 'export',
	distDir: 'dist',
	// 其他配置...
}

export default nextConfig
```

### 5. 打包构建

```bash
# 构建生产版本（输出到 dist 目录）
npm run build
# 或
pnpm build
```

构建完成后，会在项目根目录生成 `dist` 文件夹，里面包含所有静态文件。

### 6. 宝塔部署

#### 6.1 创建站点

1. 登录宝塔面板
2. 点击「网站」→「添加站点」
3. 填写域名（或 IP 地址）
4. 选择 PHP 版本为「纯静态」
5. 点击「提交」创建站点

#### 6.2 上传文件

**方式一：直接上传（适合首次部署）**

1. 在宝塔中进入网站目录（如 `/www/wwwroot/你的域名`）
2. 删除默认的 `index.html`
3. 点击「上传」→ 选择 `dist` 文件夹内的所有文件 → 上传

**方式二：Git 拉取（适合后续更新）**

1. 在宝塔中安装「Git 版本控制」插件
2. 配置 Git 仓库地址
3. 在服务器上执行构建命令，或本地构建后推送 dist 文件夹

#### 6.3 配置伪静态（Nginx）

如果是单页应用（SPA）路由，需要配置伪静态：

```nginx
location / {
    try_files $uri $uri.html $uri/ =404;
}
```

在宝塔中：
1. 进入站点设置 → 「伪静态」
2. 选择「纯静态」或手动添加上述规则
3. 点击「保存」

#### 6.4 配置 SSL（可选）

1. 进入站点设置 → 「SSL」
2. 选择「Let's Encrypt」免费证书
3. 勾选域名，点击「申请」
4. 开启「强制 HTTPS」（推荐）

### 7. 环境变量配置（可选）

如果需要配置 GitHub 相关功能（如在线编辑后提交到仓库），在宝塔中设置环境变量：

1. 进入站点设置 → 「配置文件」或「环境变量」
2. 添加以下变量：

```
NEXT_PUBLIC_GITHUB_OWNER=你的GitHub用户名
NEXT_PUBLIC_GITHUB_REPO=仓库名
NEXT_PUBLIC_GITHUB_BRANCH=main
NEXT_PUBLIC_GITHUB_APP_ID=你的GitHubAppID
```

**注意**：静态导出后，环境变量需要在构建前设置，构建时会嵌入到代码中。

### 8. 更新部署

后续更新博客内容或代码后：

```bash
# 1. 本地重新构建
npm run build

# 2. 将 dist 文件夹内容重新上传到宝塔站点目录
# 或如果使用 Git，推送代码后在服务器上拉取并构建
```

---

## 博客内容管理

### 博客内容路径

博客文章存储在 `public/blogs/` 目录下：

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

1. 在 `public/blogs/` 下创建新文件夹，如 `my-new-blog/`
2. 创建 `index.md` 写入博客内容
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
