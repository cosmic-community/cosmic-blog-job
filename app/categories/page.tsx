import { getCategories, getPosts } from '@/lib/cosmic'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Categories | Cosmic Blog',
  description: 'Browse all blog categories',
}

const categoryEmojis: Record<string, string> = {
  technology: '💻',
  travel: '✈️',
  lifestyle: '🌿',
  food: '🍕',
  business: '📊',
}

export default async function CategoriesPage() {
  const categories = await getCategories()
  const posts = await getPosts()

  return (
    <div className="container-blog py-10 sm:py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
          Categories
        </h1>
        <p className="text-gray-500 max-w-md mx-auto">
          Explore our content organized by topic
        </p>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-16">
          <span className="text-5xl mb-4 block">🏷️</span>
          <p className="text-gray-500">No categories yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {categories.map((category) => {
            const categoryPosts = posts.filter(
              (p) => p.metadata?.category?.slug === category.slug
            )
            const emoji = categoryEmojis[category.slug] || '📂'

            return (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group block bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg p-8 transition-all duration-300"
              >
                <span className="text-4xl mb-4 block">{emoji}</span>
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-brand-600 transition-colors mb-2">
                  {category.metadata?.name || category.title}
                </h2>
                {category.metadata?.description && (
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {category.metadata.description}
                  </p>
                )}
                <span className="text-xs font-medium text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
                  {categoryPosts.length} {categoryPosts.length === 1 ? 'post' : 'posts'}
                </span>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}