# Vercel Static Deployment Hardening Design

> **历史文档，禁止按此实施。** 这是 2026-08-06 的静态导出方案，已经被 Neon 运行时 CMS 架构取代。当前事实和文档入口以仓库根目录 [README.md](../../../README.md) 为准。

## Goal

把项目收敛为唯一的 Vercel 静态导出部署路径，修复当前类型错误、错误站点 URL、危险默认配置、内容渲染风险和工程检查缺口，同时保留现有博客内容与未跟踪资料。

## Constraints

- 只支持 Vercel 静态导出；不再维护 Cloudflare/OpenNext 部署入口。
- 不删除或重写 `public/blogs/` 中现有内容，不触碰未跟踪的 `public/blogs/hardware-kb/`。
- 静态站无法实现真正的管理员私密文章；`hidden` 只定义为“从公开列表隐藏”。
- 本轮不把 GitHub App 改造成服务端代理，避免改变部署架构；但客户端凭据流程必须 fail-closed，并降低缓存暴露风险。

## Architecture

Vercel 构建使用 `output: 'export'` 生成静态文件。所有 sitemap/metadata URL 使用 `NEXT_PUBLIC_SITE_URL`。Markdown 和远程 RSS 内容先经过允许列表清洗，再交给 React 渲染。GitHub 编辑功能仍为客户端直连，但缺失配置立即失败，不再默认为作者仓库。

## Safety

- 删除 Cloudflare 脚本和配置入口，避免误部署；不删除依赖锁文件中的历史内容，先统一 package manager 说明。
- 认证缓存不再保存 Installation Token；Private Key 只在当前页面会话内存中保留。
- 对 slug、站点 URL、远程链接和 Markdown HTML 做显式校验。

## Verification

- `node --experimental-strip-types --test tests/*.test.ts`
- `pnpm exec tsc --noEmit`
- `pnpm run build`
- 产物检查 sitemap 不含 `localhost`，且仅生成预期静态文件。
