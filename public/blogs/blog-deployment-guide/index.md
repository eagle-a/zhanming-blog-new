# 个人博客网站部署教程（Vue3+Express-TS+MongoDB+Nginx+Docker）

**日期**: 2026-03-08

**标签**: 笔记

---

## 关于作者

项目 | 信息  
---|---  
姓名 | 孙召顺  
年龄 | 2004.06  
职业 | student  
Github | @eagle-a  
技能 | 自动化、嵌入式软件、Linux、网站开发  
  
## 关于网站

### 核心信息

  * 源代码仓库：`vue3-vite-docker`（基于 @lincenying 项目克隆改造）
  * 学习架构： 
    * 服务端：Express + TypeScript + MongoDB
    * 客户端：Vue3（前台 SSR 渲染模式，后台 SPA 渲染模式）
  * 核心功能：管理员管理、用户管理、文章分类、文章发布、评论互动、文章点赞


## 部署配置与操作步骤

### 1\. Nginx 配置（核心配置备份）

该配置用于实现前端页面访问、API 接口反向代理、静态资源缓存等核心能力，服务器 IP 为 `1.94.109.75`。
    
    
    server
    {
        listen 80;
        server_name 1.94.109.75;
        index index.php index.html index.htm default.php default.htm default.html;
        root /www/wwwroot/1.94.109.75/;
        #CERT-APPLY-CHECK--START
        # 用于SSL证书申请时的文件验证相关配置 -- 请勿删除
        include /www/server/panel/vhost/nginx/well-known/1.94.109.75.conf;
        #CERT-APPLY-CHECK--END
    
        #SSL-START SSL相关配置，请勿删除或修改下一行带注释的404规则
        #error_page 404/404.html;
        #SSL-END
    
        #ERROR-PAGE-START  错误页配置，可以注释、删除或修改
        #error_page 404 /404.html;
        #error_page 502 /502.html;
        #ERROR-PAGE-END
    
        #PHP-INFO-START  PHP引用配置，可以注释或修改
        include enable-php-00.conf;
        #PHP-INFO-END
    
        #REWRITE-START URL重写规则引用,修改后将导致面板设置的伪静态规则失效
        include /www/server/panel/vhost/rewrite/1.94.109.75.conf;
        #REWRITE-END
    
        #禁止访问的文件或目录
        location ~ ^/(\.user.ini|\.htaccess|\.git|\.env|\.svn|\.project|LICENSE|README.md)
        {
            return 404;
        }
    
        #一键申请SSL证书验证目录相关设置
        location ~ \.well-known{
            allow all;
        }
    
        #禁止在证书验证目录放入敏感文件
        if ( $uri ~ "^/\.well-known/.*\.(php|jsp|py|js|css|lua|ts|go|zip|tar\.gz|rar|7z|sql|bak)$" ) {
            return 403;
        }
    
        # 前端路由重定向（适配Vue3 SPA/SSR）
        location / {
            try_files $uri $uri/ /index.html;  # 将所有请求重定向到 index.html
        }
        
        # 图片类静态资源缓存配置
        location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$
        {
            expires      30d;
            error_log /dev/null;
            access_log /dev/null;
        }
        
        # API接口反向代理到Node服务（端口4000）
        location /api
        {
            proxy_pass http://1.94.109.75:4000;
        }
    
        # JS/CSS静态资源缓存配置
        location ~ .*\.(js|css)?$
        {
            expires      12h;
            error_log /dev/null;
            access_log /dev/null;
        }
        
        # 日志配置
        access_log  /www/wwwlogs/1.94.109.75.log;
        error_log  /www/wwwlogs/1.94.109.75.error.log;
    }
### 2\. Node.js 后端服务部署（Express-TS + PNPM）

#### 2.1 项目拉取与基础安装
    
    
    # 克隆后端项目
    git clone https://github.com/lincenying/mmf-blog-api-ts.git
    cd mmf-blog-api-ts
    
    # 安装依赖（使用pnpm）
    pnpm install

#### 2.2 开发/生产环境命令
    
    
    # 开发环境（热重载）
    pnpm serve
    
    # 生产环境打包
    pnpm build
    
    # 生产环境启动
    pnpm start
    
    # 代码格式化与lint检查
    pnpm lint


### 3\. Docker Compose 部署（推荐生产环境）

通过 Docker Compose 可快速部署后端服务（含 MongoDB），无需手动配置环境依赖。

#### 3.1 核心配置修改（docker-compose.yml）

重点修改 MongoDB 数据卷映射，确保数据持久化：
    
    
    api:
      container_name: api-server
      image: lincenying/api-server:1.25.1029
    
    volumes:
      # 宿主机路径:容器内路径（替换为自己的宿主机路径）
      - /Users/lincenying/web/mongodb/data:/data/db
    

#### 3.2 部署命令
    
    
    # 方式1：后端+MongoDB一起启动
    docker-compose build
    docker-compose up -d
    
    # 方式2：仅启动后端（MongoDB在宿主机/其他容器）
    # 需先修改Nginx配置中的proxy_pass指向正确的MongoDB地址
    docker-compose -f docker-compose.api.yml build
    docker-compose -f docker-compose.api.yml up -d
    

#### 3.3 访问地址

  * 网站首页：http://localhost:7779
  * 后台登录：http://localhost:7779/backend/login


## 许可证

本项目基于 MIT 许可证开源。

### 总结

  1. 网站核心架构为 Vue3（前台SSR/后台SPA）+ Express-TS + MongoDB，部署依赖 Nginx 做反向代理和静态资源管理。
  2. Node 后端支持 PNPM 本地开发，也可通过 Docker Compose 快速部署生产环境（需注意 MongoDB 数据卷映射）。
  3. Nginx 配置中 `/api` 路径代理到 Node 服务端口（4000），前端路由通过 `try_files` 适配 Vue 单页应用特性。