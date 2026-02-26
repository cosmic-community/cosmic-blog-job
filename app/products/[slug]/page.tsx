// app/products/[slug]/page.tsx
import { getProductBySlug, getReviewsByProductId } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import MarkdownContent from '@/components/MarkdownContent'
import ReviewCard from '@/components/ReviewCard'
import StarRating from '@/components/StarRating'
import type { Metadata } from 'next'
import { Collection } from '@/types'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return { title: 'Product Not Found — Cosmic Blog' }
  }

  return {
    title: `${product.metadata?.name || product.title} — Cosmic Blog`,
    description: `${product.metadata?.description?.replace(/[#*\[\]`>-]/g, '').substring(0, 160)}`,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const reviews = await getReviewsByProductId(product.id)

  const image = product.metadata?.image
  const price = product.metadata?.price
  const inStock = product.metadata?.in_stock
  const collection = product.metadata?.collection as Collection | undefined

  // Calculate average rating
  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + parseInt(r.metadata?.rating?.key || '0', 10), 0) / reviews.length
    : 0

  return (
    <>
      <section className="container-blog pt-8 sm:pt-12 pb-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/shop" className="hover:text-gray-600 transition-colors">Shop</Link>
          <span>/</span>
          {collection && typeof collection === 'object' && collection.slug && (
            <>
              <Link href={`/collections/${collection.slug}`} className="hover:text-gray-600 transition-colors">
                {collection.metadata?.name || collection.title}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-gray-600">{product.metadata?.name || product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Product Image */}
          <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
            {image ? (
              <img
                src={`${image.imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
                alt={product.metadata?.name || product.title}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-100 to-brand-200">
                <span className="text-8xl">🛍️</span>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
              {product.metadata?.name || product.title}
            </h1>

            {/* Rating summary */}
            {reviews.length > 0 && (
              <div className="flex items-center gap-3 mb-4">
                <StarRating rating={Math.round(avgRating)} />
                <span className="text-sm text-gray-500">
                  {avgRating.toFixed(1)} out of 5 ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
                </span>
              </div>
            )}

            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-gray-900">
                ${typeof price === 'number' ? price.toFixed(2) : '0.00'}
              </span>
              {inStock ? (
                <span className="text-sm font-medium text-green-700 bg-green-50 px-3 py-1 rounded-full">
                  In Stock
                </span>
              ) : (
                <span className="text-sm font-medium text-red-700 bg-red-50 px-3 py-1 rounded-full">
                  Out of Stock
                </span>
              )}
            </div>

            {collection && typeof collection === 'object' && collection.slug && (
              <div className="mb-6">
                <Link
                  href={`/collections/${collection.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
                >
                  <span>🗂️</span>
                  {collection.metadata?.name || collection.title}
                </Link>
              </div>
            )}

            {/* Description */}
            {product.metadata?.description && (
              <div className="prose prose-gray max-w-none">
                <MarkdownContent content={product.metadata.description} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      {reviews.length > 0 && (
        <section className="container-blog pb-16">
          <div className="border-t border-gray-100 pt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Customer Reviews ({reviews.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}