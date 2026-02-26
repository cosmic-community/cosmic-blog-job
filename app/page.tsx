import { getPosts, getCategories, getProducts, getReviews } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import PostHero from '@/components/PostHero'
import ProductCard from '@/components/ProductCard'
import ReviewCard from '@/components/ReviewCard'
import Link from 'next/link'

export default async function HomePage() {
  const [posts, categories, products, reviews] = await Promise.all([
    getPosts(),
    getCategories(),
    getProducts(),
    getReviews(),
  ])

  // Sort posts by created_at descending
  const sortedPosts = posts.sort((a, b) => {
    const dateA = new Date(a.created_at || '').getTime()
    const dateB = new Date(b.created_at || '').getTime()
    return dateB - dateA
  })

  // Changed: Added undefined check for noUncheckedIndexedAccess compatibility
  const featuredPost = sortedPosts.length > 0 ? sortedPosts[0] : undefined
  const remainingPosts = sortedPosts.slice(1)

  // Show up to 3 products on homepage
  const featuredProducts = products.slice(0, 3)

  // Show up to 2 reviews on homepage
  const featuredReviews = reviews.slice(0, 2)

  return (
    <>
      {/* Hero Section */}
      <section className="container-blog pt-8 sm:pt-12">
        {featuredPost ? (
          <PostHero post={featuredPost} />
        ) : (
          <div className="text-center py-20">
            <span className="text-6xl mb-4 block">📝</span>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Cosmic Blog</h1>
            <p className="text-gray-500">No posts yet. Add some content in your Cosmic dashboard.</p>
          </div>
        )}
      </section>

      {/* Categories bar */}
      {categories.length > 0 && (
        <section className="container-blog pt-10 sm:pt-14">
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            <span className="text-sm font-medium text-gray-400 shrink-0">Browse:</span>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="shrink-0 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"
              >
                {category.metadata?.name || category.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Recent Posts Grid */}
      {remainingPosts.length > 0 && (
        <section className="container-blog pt-10 sm:pt-14 pb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Recent Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {remainingPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* All posts when only one post exists */}
      {sortedPosts.length === 1 && featuredPost && (
        <section className="container-blog pt-10 sm:pt-14 pb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">All Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <PostCard key={featuredPost.id} post={featuredPost} />
          </div>
        </section>
      )}

      {/* Changed: Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="container-blog pb-16">
          <div className="border-t border-gray-100 pt-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
              <Link
                href="/shop"
                className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
              >
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Changed: Customer Reviews Section */}
      {featuredReviews.length > 0 && (
        <section className="container-blog pb-16">
          <div className="border-t border-gray-100 pt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {featuredReviews.map((review) => (
                <ReviewCard key={review.id} review={review} showProduct />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}