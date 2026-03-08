import BlogContent from './blog-content'
import blogIndex from '@/../public/blogs/index.json'

// 为静态导出生成所有博客路径
export function generateStaticParams() {
  return blogIndex.map((blog) => ({
    id: blog.slug,
  }))
}

export default function Page() {
  return <BlogContent />
}
