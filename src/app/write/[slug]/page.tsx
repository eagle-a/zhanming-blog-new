import WriteContent from './write-content'
import blogIndex from '@/../public/blogs/index.json'

export const runtime = 'edge'

// 为静态导出生成所有博客路径
export function generateStaticParams() {
  return blogIndex.map((blog) => ({
    slug: blog.slug,
  }))
}

export default function Page() {
  return <WriteContent />
}
