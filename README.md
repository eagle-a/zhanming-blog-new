# eagle-a Blog

> 一名热爱技术的在校大学生的个人博客
>
> 网站：https://eagle-a.github.io
>
> GitHub：https://github.com/eagle-a

## 博客内容路径

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

## 1. 安装

使用该项目可以先不做本地开发，直接部署然后配置环境变量。具体变量名请看下列大写变量

```ts
export const GITHUB_CONFIG = {
	OWNER: process.env.NEXT_PUBLIC_GITHUB_OWNER || 'eagle-a',
	REPO: process.env.NEXT_PUBLIC_GITHUB_REPO || 'zhanming-blog-new',
	BRANCH: process.env.NEXT_PUBLIC_GITHUB_BRANCH || 'main',
	APP_ID: process.env.NEXT_PUBLIC_GITHUB_APP_ID || '-'
} as const
```

也可以自己手动先调整安装，可自行 `pnpm i` 或 `npm install`

## 2. 开发预览

安装依赖后，可以使用以下命令进行本地开发和预览：

```bash
# 启动开发服务器（使用 Turbopack，端口 2025）
npm run dev
# 或
pnpm dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start

# Cloudflare 预览（需要配置 wrangler）
npm run preview
```

开发服务器启动后，访问 `http://localhost:2025` 即可预览网站。

## 3. 部署到宝塔

### 3.1 本地打包

```bash
# 安装依赖
npm install

# 打包
npm run build
```

打包完成后会生成 `dist` 文件夹（或 `.next` 文件夹，取决于配置）。

### 3.2 宝塔部署

1. 登录宝塔面板，创建新站点
2. 将打包生成的文件上传到网站目录：
   - 如果是静态导出（`dist` 或 `out` 文件夹），直接上传文件夹内容到网站根目录
   - 如果是 Next.js 应用，需要配置 Node.js 项目

#### 方式一：静态部署（推荐）

修改 `next.config.ts` 添加静态导出配置：

```ts
const nextConfig = {
  output: 'export',
  distDir: 'dist',
}
module.exports = nextConfig
```

然后打包，将 `dist` 文件夹内容上传到宝塔网站目录。

#### 方式二：Node.js 部署

1. 宝塔安装 Node.js 管理器
2. 上传整个项目代码
3. 在 Node.js 管理器中添加项目：
   - 项目目录：选择项目根目录
   - 启动文件：`server.js` 或自定义
   - 端口：填写应用端口（如 3000）
4. 配置反向代理，将域名指向 Node.js 端口

### 3.3 环境变量配置

在宝塔的 Node.js 项目设置中，添加环境变量：

```
NEXT_PUBLIC_GITHUB_OWNER=eagle-a
NEXT_PUBLIC_GITHUB_REPO=zhanming-blog-new
NEXT_PUBLIC_GITHUB_BRANCH=main
NEXT_PUBLIC_GITHUB_APP_ID=你的AppID
```

## 4. 删除默认博客

使用这个项目应该第一件事需要删除我的 blog，单独删除，批量删除已完成。

## 5. 配置

大部分页面右上角都会有一个编辑按钮，意味着你可以使用 **private key** 进行配置部署。

### 5.1 网站配置

首页有一个不显眼的配置按钮，点击就能看到现在可以配置的内容。

## 6. 写 blog

写 blog 的图片管理，可能会有疑惑。图片管理推荐逻辑是先点击 **+ 号** 添加图片，（推荐先压缩好，尺寸推荐宽度不超过 1200）。然后将上传好的图片直接拖入文案编辑区，这就已经添加好了，点击右上角预览就可以看到效果。

## 7. 写给非前端

非前端配置内容，还是需要一个文件指引。下面写一些更细致的代码配置。

### 7.1 移除 Liquid Grass

进入 `src/layout/index.tsx` 文件，删除两行代码，然后提交代码到你的 github
```tsx
const LiquidGrass = dynamic(() => import('@/components/liquid-grass'), { ssr: false })
// 中间省略...
<LiquidGrass /> // 第 53 行
```

### 7.2 配置首页内容

首页的内容现在只能前端配置一部分，所以代码更改在 `src/app/(home)` 目录，这个目录代表首页所有文件。首页的具体文件为  `src/app/(home)/page.tsx`

这里可以看到有很多 `Card` 文件，需要改那个首页 Card 内容就可以点入那个具体文件修改。

比如中间的内容，为 `HiCard`，点击 `hi-card.tsx` 文件，即可更改其内容。

#### 特殊的导航 Card

因为这个 Card 是全局都在的，所以放在了 `src/components` 目录

## Star History

<a href="https://www.star-history.com/#eagle-a/zhanming-blog-new&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=eagle-a/zhanming-blog-new&type=date&theme=dark&legend=top-left" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=eagle-a/zhanming-blog-new&type=date&legend=top-left" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=eagle-a/zhanming-blog-new&type=date&legend=top-left" />
 </picture>
</a>
