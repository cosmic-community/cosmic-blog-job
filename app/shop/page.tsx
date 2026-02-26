import { getProducts, getCollections } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shop — Cosmic Blog',
  description: 'Browse our curated collection of handmade and artisan products.',
}

export default async function ShopPage() {
  const [products, collections] = await Promise.all([
    getProducts(),
    getCollections(),
  ])

  return (
    <>
      {/* Hero */}
      <section className="container-blog pt-10 sm:pt-16 pb-10">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-5xl mb-4 block">🛍️</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Shop
          </h1>
          <p className="text-lg text-gray-500">
            Discover our curated collection of handmade and artisan products.
          </p>
        </div>
      </section>

      {/* Collections bar */}
      {collections.length > 0 && (
        <section className="container-blog pb-8">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 justify-center">
            <span className="text-sm font-medium text-gray-400 shrink-0">Collections:</span>
            {collections.map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.slug}`}
                className="shrink-0 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"
              >
                {collection.metadata?.name || collection.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Products Grid */}
      <section className="container-blog pb-16">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <span className="text-5xl mb-4 block">📦</span>
            <h2 className="text-xl font-bold text-gray-900 mb-2">No products yet</h2>
            <p className="text-gray-500">Products will appear here once added to the CMS.</p>
          </div>
        )}
      </section>
    </>
  )
}