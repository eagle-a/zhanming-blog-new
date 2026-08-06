import BlogContent from './blog-content'
import blogIndex from '@/../public/blogs/index.json'
import { assertValidSlug } from '@/lib/config-validation'

// 为静态导出生成所有博客路径
export function generateStaticParams() {
  return blogIndex.map((blog) => ({
    id: assertValidSlug(blog.slug),
  }))
}

export default function Page() {
  return <BlogContent />
}
