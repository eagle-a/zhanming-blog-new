# 介绍 - 湛明

**日期**: 2026-01-24

**标签**: 笔记

---

来自分类 [介绍](/category/67c6dcfd6cde0dc7d37751dc)2026-01-24 23:01:41

[搬家教程](/article/6974de5dfef024d66874e58f)

# 个人博客网站部署教程（Vue3+Express-TS+MongoDB+Nginx+Docker） ## 关于作者 | 项目 | 信息 | | ---- | ---- | | 姓名 | 孙召顺 | | 年龄 | 2004.06 | | 职业 | student | | Github | @eagle-a | | 技能 | 自动化、嵌入式软件、Linux、网站开发 | ## 关于网站 ### 核心信息 \- 源代码仓库：`vue3-vite-docker`（基于 @lincenying 项目克隆改造） \- 技术架构： \- 服务端：Express + TypeScript + MongoDB \- 客户端：Vue3（前台 SSR 渲染模式，后台 SPA 渲染模式） \- 核心功能：管理员管理、用户管理、文章分类、文章发布、评论互动、文章点赞 ## 部署配置与操作步骤 ### 1. Nginx 配置（核心配置备份） 该配置用于实现前端页面访问、API 接口反向代理、静态资源缓存等核心能力，服务器 IP 为 `1.94.109.75`。 ```nginx server { ...
