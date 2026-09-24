> blog 前端网站（[zhanmingblog.cc.cd](https://zhanmingblog.cc.cd/blog/readme)）已链接到 public 仓库

该项目使用 Github App 管理项目内容，请保管好后续创建的 **Private key**，不要上传到公开网上。

## 0. Fork 项目

请先 fork 我的[项目](https://github.com/eagle-a/zhanming-blog-new)到你自己的仓库中。后续我的更新，可以直接同步最新功能。

## 1. 安装

使用该项目可以先不做本地开发，直接部署然后配置环境变量。具体变量名请看下列大写变量

```ts
export const GITHUB_CONFIG = {
	OWNER: process.env.NEXT_PUBLIC_GITHUB_OWNER || '',
	REPO: process.env.NEXT_PUBLIC_GITHUB_REPO || '',
	BRANCH: process.env.NEXT_PUBLIC_GITHUB_BRANCH || '',
	APP_ID: process.env.NEXT_PUBLIC_GITHUB_APP_ID || ''
} as const
```

也可以自己手动先调整安装，可自行 `pnpm i`

## 2. 部署

以 Vercel 部署为例，创建 Project => Import 这个项目

![](/api/media/blog/readme/730266f17fab9717b4c1278dbdf852bad3696b151f03a8a1073cdae8a181c9aa.png)

无需配置，直接点部署

![](/api/media/blog/readme/95dee9a69154d0d00f857f885b2087383b531a4a87eefb818c5745dcf863d626.png)

大约 60 秒会部署完成，有一个直接 vercel 域名，如：https://2025-blog-public.vercel.app/

到这里部署网站已经完成了，下一步创建 Github App

## 3. 创建 Github App 链接仓库

在 github 个人设置里面，找到最下面的 Developer Settings ，点击进入

![](/api/media/blog/readme/0abb3b592cbedad6306bc8e651e3c78f5cf546da624eedc40b4bfb742b7d1143.png)

进入开发者页面，点击 **New Github App**

*GitHub App name* 和 *Homepage URL* , 输入什么都不影响。Webhook 也关闭，不需要。

![](/api/media/blog/readme/71dcd9cf8ec967c07f0460728a2cf0b596c53d3604f7a165a5b08aa8ba7e2f94.png)

只需要注意设置一个仓库 write 权限，其它不用。

![](/api/media/blog/readme/2be290016e56cd34a92ca76981deaded36965e77634a0df033140e6342270a5d.png)

点击创建，谁能安装这个仓库这个选择无所谓。直接创建。

![](/api/media/blog/readme/aa002e6805ab2d65dca904052bf190ab2a29a8637925f9976a56915d81941102.png)


### 创建密钥

创建好 Github App 后会提示必须创建一个 **Private Key**，直接创建，会自动下载（不见了也不要紧，后面自己再创建再下载就行）。页面上有个 **App ID** 需要复制一下

再切换到安装页面

![](/api/media/blog/readme/c122b1585bb7a46aa618adfcd8e0f25782265d2130d72af2b9b880ae18e0b33b.png)

这里一定要只**授权当前项目**。

![](/api/media/blog/readme/2cf1cee3b04326f124e92a13a562abcd02e5049b545f27d09182f4ce786cb3f1.png)

点击安装，就完成了 Github App 管理该仓库的权限设置了。下一步就是让前端知道推送那个项目，就是最开始提到的**环境变量**。（如果你不会设置环境变量，直接改仓库文件 `src/consts.ts` 也行。因为是公开的，所以环境变量意义也不大）

### 环境变量

直接输入这几个环境变量值就行，一般只用设置 OWNER 和 APP_ID。其它配置不用管，直接输入创建就行。

![](/api/media/blog/readme/c5a049d737848abfaa1fe2d65de28031f8a0d5f7f93c16679831fd2b9c035715.png)

设置完成后，需要手动再部署一次，让环境变量生效。
* 可以直接 push 一次仓库代码会触发部署
* 也可以手动选择创建一次部署
![](/api/media/blog/readme/59a802ed8d1c3a133d8eb2ad2f8ead49579488fa9d7cce21a5ad1446cc8b8724.png)

## 4. 完成

现在，部署的这个网站就可以开始使用前端改内容了。比如更改一个分享内容。

**提示**，网站前端页面删改完提示成功之后，你需要等待后台的部署完成，再刷新页面才能完成服务器内容的更新哦。

## 5. 删除

使用这个项目应该第一件事需要删除我的 blog，单独删除，批量删除已完成。

## 6. 配置

大部分页面右上角都会有一个编辑按钮，意味着你可以使用 **private key** 进行配置部署。

### 6.1 网站配置

首页如图有一个不显眼蓝色框内的配置按钮，点击就能看到现在可以配置的内容。
![](/api/media/blog/readme/755aca4a6ede4685227807db88f80fcb75d28a0b8d9d62aecd86692c4649187e.png)
## 7. 写 blog

写 blog 的图片管理，可能会有疑惑。图片管理推荐逻辑是先点击 **+ 号** 添加图片，（推荐先压缩好，尺寸推荐宽度不超过 1200）。然后将上传好的图片直接拖入文案编辑区，这就已经添加好了，点击右上角预览就可以看到效果。

## 8. 写给非前端

非前端配置内容，还是需要一个文件指引。下面写一些更细致的代码配置。

### 8.1 移除 Liquid Grass

> 已移动至相关文章中显示，图例已过时

![](/api/media/blog/readme/f70ff3fe3a77f193cde7f8f91a73812c6bf757db13d6f93c0667ce9458004f65.png)

### 8.2 配置首页内容

首页的内容现在只能前端配置一部分，所以代码更改在 `src/app/(home)` 目录，这个目录代表首页所有文件。首页的具体文件为  `src/app/(home)/page.tsx`

 ![](/api/media/blog/readme/011679cd9bf736023803ea12d685368d1433101920e70116bc1ba9d27d08558e.png)

这里可以看到有很多 `Card` 文件，需要改那个首页 Card 内容就可以点入那个具体文件修改。

比如中间的内容，为 `HiCard`，点击 `hi-card.tsx` 文件，即可更改其内容。

![](/api/media/blog/readme/20b0791d012163eeb9bc6f8fc33f5cc2b1694a9831bf787a8fdb9712f03491ed.png)

#### 特殊的导航 Card

因为这个 Card 是全局都在的，所以放在了 `src/components` 目录

![](/api/media/blog/readme/9780c38f886322fdd4d4142ea70cb10a62813773e71f1fb2de5756371f5357bd.png)

### 8.3 移除 blog 列表的更多按钮

`src/app/blog/page.tsx` 文件，下图位置，删除这部分代码。

![](/api/media/blog/readme/a190410a273b2beaf774098d72835025b18ca02215dd8e4a93770902c28a46d2.png)
