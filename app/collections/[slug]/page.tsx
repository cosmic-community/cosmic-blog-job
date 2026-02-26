// app/collections/[slug]/page.tsx
import { getCollectionBySlug, getProductsByCollectionId } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import type { Metadata } from 'next'

interface CollectionPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params
  const collection = await getCollectionBySlug(slug)

  if (!collection) {
    return { title: 'Collection Not Found — Cosmic Blog' }
  }

  return {
    title: `${collection.metadata?.name || collection.title} — Cosmic Blog`,
    description: collection.metadata?.description || `Browse products in ${collection.metadata?.name || collection.title}`,
  }
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params
  const collection = await getCollectionBySlug(slug)

  if (!collection) {
    notFound()
  }

  const products = await getProductsByCollectionId(collection.id)
  const image = collection.metadata?.image

  return (
    <>
      {/* Collection Hero */}
      <section className="container-blog pt-8 sm:pt-12">
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/shop" className="hover:text-gray-600 transition-colors">Shop</Link>
          <span>/</span>
          <Link href="/collections" className="hover:text-gray-600 transition-colors">Collections</Link>
          <span>/</span>
          <span className="text-gray-600">{collection.metadata?.name || collection.title}</span>
        </nav>

        <div className="relative rounded-2xl overflow-hidden mb-12">
          <div className="aspect-[21/9] bg-gray-100">
            {image ? (
              <img
                src={`${image.imgix_url}?w=1400&h=600&fit=crop&auto=format,compress`}
                alt={collection.metadata?.name || collection.title}
                width={1400}
                height={600}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-100 to-brand-200">
                <span className="text-8xl">🗂️</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
              {collection.metadata?.name || collection.title}
            </h1>
            {collection.metadata?.description && (
              <p className="text-lg text-white/80 max-w-2xl">
                {collection.metadata.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container-blog pb-16">
        {products.length > 0 ? (
          <>
            <p className="text-sm text-gray-500 mb-6">
              {products.length} product{products.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <span className="text-5xl mb-4 block">📦</span>
            <h2 className="text-xl font-bold text-gray-900 mb-2">No products in this collection</h2>
            <p className="text-gray-500">Products will appear here once added to this collection.</p>
          </div>
        )}
      </section>
    </>
  )
}