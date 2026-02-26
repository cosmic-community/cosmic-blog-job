// app/categories/[slug]/page.tsx
import { getCategoryBySlug, getPostsByCategoryId } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import PostCard from '@/components/PostCard'
import Link from 'next/link'
import type { Metadata } from 'next'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    return { title: 'Category Not Found' }
  }

  return {
    title: `${category.metadata?.name || category.title} | Cosmic Blog`,
    description: category.metadata?.description || `Posts in ${category.title}`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategoryId(category.id)

  return (
    <div className="container-blog py-10 sm:py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/categories" className="hover:text-gray-600 transition-colors">Categories</Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">{category.metadata?.name || category.title}</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
          {category.metadata?.name || category.title}
        </h1>
        {category.metadata?.description && (
          <p className="text-lg text-gray-500 max-w-2xl">
            {category.metadata.description}
          </p>
        )}
        <p className="text-sm text-gray-400 mt-2">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'}
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl">
          <span className="text-5xl mb-4 block">📝</span>
          <p className="text-gray-500">No posts in this category yet.</p>
          <Link href="/" className="text-brand-600 text-sm font-medium hover:underline mt-2 inline-block">
            ← Back to all posts
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}