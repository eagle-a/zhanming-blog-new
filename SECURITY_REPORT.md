# 安全问题审计报告

**项目名称：** zhanming-blog-new  
**审计日期：** 2026-04-13  
**审计范围：** 前端安全、依赖安全、配置安全

---

## 🔴 高危问题

### 1. 使用已弃用的 `unescape`/`escape` 函数

**风险等级：** 🔴 高危  
**位置：**
- `src/lib/github-client.ts:23`
- `src/lib/github-client.ts:191`

**代码：**
```typescript
// Line 23
return btoa(unescape(encodeURIComponent(input)))

// Line 191
return decodeURIComponent(escape(atob(data.content)))
```

**风险描述：**
- `unescape()` 和 `escape()` 已被弃用超过10年
- 这些函数不能正确处理 UTF-8 编码，可能导致：
  - 数据损坏/丢失
  - 编码绕过攻击
  - 跨站脚本漏洞

**修复方案：**
```typescript
// 替换为现代编码方案
function utf8ToBase64(str: string): string {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, 
      (_, p1) => String.fromCharCode(parseInt(p1, 16))
    )
  )
}

function base64ToUtf8(str: string): string {
  return decodeURIComponent(
    Array.from(atob(str), c => 
      '%' + c.charCodeAt(0).toString(16).padStart(2, '0')
    ).join('')
  )
}
```

---

### 2. 敏感凭证存储在 sessionStorage（XSS 风险）

**风险等级：** 🔴 高危  
**位置：** `src/lib/auth.ts`

**涉及的凭证：**
- GitHub Installation Token (`GITHUB_TOKEN_CACHE_KEY`)
- 加密的 PEM 私钥 (`GITHUB_PEM_CACHE_KEY`)

**风险描述：**
- sessionStorage 可被 JavaScript 完全访问
- 一旦存在 XSS 漏洞，攻击者可窃取：
  - GitHub Token → 完全控制仓库
  - PEM 私钥 → 伪造 JWT 签名
- 当前 Token 有效期8分钟，泄露窗口期较长

**修复方案：**
1. 缩短 Token 缓存时间至 2 分钟
2. 添加 CSP 策略防止内联脚本
3. 添加额外的 cookie 二次验证

---

### 3. 加密密钥和 APP_ID 硬编码

**风险等级：** 🔴 高危  
**位置：** `src/consts.ts:14-15`

**代码：**
```typescript
export const GITHUB_CONFIG = {
  APP_ID: process.env.NEXT_PUBLIC_GITHUB_APP_ID || '3036081',
  ENCRYPT_KEY: process.env.NEXT_PUBLIC_GITHUB_ENCRYPT_KEY || '5a8bbf6e7d2125e898bb16a5cd83a1f3dda40841'
}
```

**风险描述：**
- 默认密钥和 APP_ID 已提交到 Git 历史
- 即使覆盖环境变量，历史记录中仍可被获取
- 密钥泄露意味着所有用户的 PEM 可被解密

**修复方案：**
1. 立即删除默认值
2. 使用 BFG Repo-Cleaner 清理 Git 历史
3. 轮换 GitHub App 密钥

---

## 🟡 中危问题

### 4. dangerouslySetInnerHTML 使用

**风险等级：** 🟡 中危  
**位置：** `src/app/layout.tsx:47-55`

**代码：**
```tsx
<script
  dangerouslySetInnerHTML={{
    __html: `
      if (/windows|win32/i.test(navigator.userAgent)) {
        document.documentElement.classList.add('windows');
      }
    `
  }}
/>
```

**风险描述：**
- 虽然是硬编码内容，但模式存在风险
- 未来修改时容易引入漏洞

**修复方案：**
```tsx
// 改为外部脚本
<script src="/detect-os.js" />
```

---

### 5. innerHTML 直接操作 DOM

**风险等级：** 🟡 中危  
**位置：**
- `src/components/TwikooComments.jsx:45`
- `src/app/live2d/live2d-viewer.tsx:125`

**风险描述：**
- 第三方组件（Twikoo/Live2D）加载的内容直接插入 DOM
- 如果 CDN 被劫持，可能注入恶意代码

**修复方案：**
1. 使用 `textContent` 替代 `innerHTML` 清理
2. 添加 SRI (Subresource Integrity) 校验

---

### 6. 用户内容通过 html-react-parser 解析

**风险等级：** 🟡 中危  
**位置：** `src/hooks/use-markdown-render.tsx`

**风险描述：**
- Markdown 渲染后转为 HTML，通过 `html-react-parser` 解析
- 整个处理链条较长，存在 XSS 风险点

**现状：**
- `markdown-renderer.ts:79` 已进行 HTML 实体转义
- 但仍需持续监控

---

## 🟢 低危/质量问题

### 7. TypeScript 严格模式关闭

**位置：** `next.config.ts:14-16`

```typescript
typescript: {
  ignoreBuildErrors: true
}
```

**影响：** 类型错误被忽略，可能导致运行时错误

---

### 8. React Strict Mode 关闭

**位置：** `next.config.ts:11`

```typescript
reactStrictMode: false
```

**影响：** 无法检测副作用和潜在问题

---

### 9. 图片未优化

**位置：** `next.config.ts:7-9`

```typescript
images: {
  unoptimized: true
}
```

**影响：** 带宽浪费，加载性能差

---

### 10. 第三方脚本 SRI 缺失

**位置：** Twikoo 动态导入

**风险：** 供应链攻击（CDN 被劫持）

---

## 📋 修复优先级清单

### P0 - 立即修复（24小时内）

- [ ] 替换 `unescape`/`escape` 函数
- [ ] 删除 `consts.ts` 中的硬编码默认值
- [ ] 清理 Git 历史中的敏感信息

### P1 - 本周修复

- [ ] 添加 CSP 响应头
- [ ] 缩短 Token 缓存时间
- [ ] 添加 SRI 校验

### P2 - 本月修复

- [ ] 启用 TypeScript 严格模式
- [ ] 启用 React Strict Mode
- [ ] 启用图片优化
- [ ] 替换 `jsrsasign` 为 Web Crypto API

---

## 🛡️ 推荐的 CSP 策略

```typescript
// next.config.ts
async headers() {
  return [{
    source: '/:path*',
    headers: [{
      key: 'Content-Security-Policy',
      value: [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: https:",
        "connect-src 'self' https://api.github.com https://mylike.zhanmingblog.workers.dev https://mytwikoo-ashen.vercel.app",
        "font-src 'self' https://fonts.gstatic.cn",
        "frame-src 'none'",
        "object-src 'none'"
      ].join('; ')
    }]
  }]
}
```

---

## 📊 风险总结

| 风险类型 | 数量 | 最高等级 |
|---------|------|---------|
| 高危     | 3    | 🔴      |
| 中危     | 3    | 🟡      |
| 低危     | 4    | 🟢      |
| **总计** | **10** | 🔴      |

**建议：** 立即处理 P0 级别问题，防止敏感信息泄露。

---

*报告生成时间：2026-04-13 21:35*  
*审计工具：手动代码审查 + 静态分析*
