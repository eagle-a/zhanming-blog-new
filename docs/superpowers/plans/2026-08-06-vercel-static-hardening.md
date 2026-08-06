# Vercel Static Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 修复项目在 Vercel 静态部署下的配置、类型、安全和工程质量问题，同时保留现有内容。

**Architecture:** 保留 Next.js `output: 'export'`，删除 Cloudflare/OpenNext 入口；将纯函数校验和内容清洗放入 `src/lib`，客户端编辑流程仅在配置完整时启用。Sitemap 使用公开站点 URL，静态内容的 `hidden` 只做列表过滤。

**Tech Stack:** Next.js 16, React 19, TypeScript, marked, html-react-parser, Node test runner, pnpm.

---

### Task 1: Lock deployment mode and configuration validation

**Files:**
- Modify: `package.json`
- Modify: `next.config.ts`
- Modify: `src/consts.ts`
- Modify: `src/app/sitemap.ts`
- Modify: `README.md`
- Delete: `wrangler.toml`
- Delete: `open-next.config.ts`
- Test: `tests/config.test.ts`

- [ ] **Step 1: Write failing tests** for required Vercel URL and GitHub configuration validation.
- [ ] **Step 2: Run the tests and confirm they fail** because current code silently falls back to author-owned defaults and sitemap reads the wrong variable.
- [ ] **Step 3: Implement fail-closed configuration and consistent `NEXT_PUBLIC_SITE_URL` handling.** Remove Cloudflare scripts/config and set `typescript.ignoreBuildErrors` to false.
- [ ] **Step 4: Run configuration tests and inspect generated config.**

### Task 2: Restore type safety and add checks

**Files:**
- Modify: `tsconfig.json`
- Modify: `src/app/juya-ai-daily/page.tsx`
- Modify: `src/app/juya-ai-daily/preview/page.tsx`
- Modify: `src/components/nav-card.tsx`
- Modify: `src/hooks/use-blog-index.ts`
- Modify: `src/app/write/components/sections/meta-section.tsx`
- Modify: `package.json`

- [ ] **Step 1: Run the current type check and record the existing failures.**
- [ ] **Step 2: Fix the smallest type-safe implementation for each current source error.**
- [ ] **Step 3: Exclude the ignored `2025-blog-public/` copy and generated output from the root type check.**
- [ ] **Step 4: Add `typecheck` and formatting check scripts, then run them.**

### Task 3: Sanitize Markdown and RSS content

**Files:**
- Create: `src/lib/sanitize-html.ts`
- Modify: `src/lib/markdown-renderer.ts`
- Modify: `src/hooks/use-markdown-render.tsx`
- Modify: `src/app/juya-ai-daily/page.tsx`
- Modify: `src/app/juya-ai-daily/preview/page.tsx`
- Test: `tests/sanitize-html.test.ts`

- [ ] **Step 1: Write failing sanitizer tests** covering script/style/iframe/event attributes, unsafe URLs, and preservation of normal formatting.
- [ ] **Step 2: Run the sanitizer tests and confirm failure.**
- [ ] **Step 3: Implement a dependency-free allowlist sanitizer suitable for static client rendering.**
- [ ] **Step 4: Apply it to all marked output before `html-react-parser`.**
- [ ] **Step 5: Run sanitizer tests and typecheck.**

### Task 4: Make hidden/static content semantics explicit

**Files:**
- Modify: `src/app/blog/[id]/blog-content.tsx`
- Modify: `src/app/rss.xml/route.ts`
- Modify: `src/app/sitemap.ts`
- Modify: `README.md`
- Test: `tests/blog-data.test.ts`

- [ ] **Step 1: Write failing tests** proving hidden posts are excluded from public feeds and direct public files are not described as private.
- [ ] **Step 2: Implement shared public-blog filtering for index, RSS, and sitemap generation.**
- [ ] **Step 3: Add a visible “hidden means list-hidden” contract to documentation and avoid claiming client-side privacy.**
- [ ] **Step 4: Run data tests and build.**

### Task 5: Harden client editing flows and repository paths

**Files:**
- Create: `src/lib/config-validation.ts`
- Modify: `src/lib/auth.ts`
- Modify: `src/hooks/use-auth.ts`
- Modify: `src/app/write/stores/write-store.ts`
- Modify: `src/app/write/services/push-blog.ts`
- Modify: `src/app/write/services/delete-blog.ts`
- Modify: `src/app/blog/services/batch-delete-blogs.ts`
- Modify: `src/app/blog/services/save-blog-edits.ts`
- Test: `tests/config-validation.test.ts`

- [ ] **Step 1: Write failing tests** for safe slug validation and missing GitHub configuration.
- [ ] **Step 2: Implement validation and fail-closed behavior.**
- [ ] **Step 3: Remove sessionStorage Installation Token caching and fix auth state typing.**
- [ ] **Step 4: Fix object URL cleanup and avoid mutating shared arrays.**
- [ ] **Step 5: Run unit tests and typecheck.**

### Task 6: Dependency and repository hygiene

**Files:**
- Modify: `package.json`
- Delete: `package-lock.json`
- Modify: `.gitignore`
- Modify: `GIT_CLEANUP_GUIDE.md`

- [ ] **Step 1: Add reproducible validation commands and remove the second lockfile.**
- [ ] **Step 2: Remove live-looking historical secret material from current documentation without rewriting Git history.**
- [ ] **Step 3: Run npm/pnpm audit through the configured registry and record remaining dev-chain risks.**

### Task 7: Full verification

**Files:**
- Verify: all modified files and preserved `public/blogs/hardware-kb/`

- [ ] **Step 1: Run unit tests.**
- [ ] **Step 2: Run `pnpm exec tsc --noEmit`.**
- [ ] **Step 3: Run `NEXT_PUBLIC_SITE_URL=https://example.test pnpm run build` equivalent on PowerShell.**
- [ ] **Step 4: Inspect `dist/sitemap.xml`, `dist/rss.xml`, git status, and file preservation.**
- [ ] **Step 5: Report any remaining limitations honestly.**
