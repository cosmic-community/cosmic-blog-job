import { getCollections } from '@/lib/cosmic'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Collections — Cosmic Blog',
  description: 'Browse our curated product collections.',
}

export default async function CollectionsPage() {
  const collections = await getCollections()

  return (
    <>
      <section className="container-blog pt-10 sm:pt-16 pb-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-5xl mb-4 block">🗂️</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Collections
          </h1>
          <p className="text-lg text-gray-500">
            Explore our thoughtfully curated product collections.
          </p>
        </div>

        {collections.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {collections.map((collection) => {
              const image = collection.metadata?.image

              return (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.slug}`}
                  className="group relative block rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                    {image ? (
                      <img
                        src={`${image.imgix_url}?w=1000&h=560&fit=crop&auto=format,compress`}
                        alt={collection.metadata?.name || collection.title}
                        width={500}
                        height={280}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-100 to-brand-200">
                        <span className="text-6xl">🗂️</span>
                      </div>
                    )}
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h2 className="text-2xl font-bold text-white mb-1">
                      {collection.metadata?.name || collection.title}
                    </h2>
                    {collection.metadata?.description && (
                      <p className="text-sm text-white/80 line-clamp-2">
                        {collection.metadata.description}
                      </p>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <span className="text-5xl mb-4 block">📦</span>
            <h2 className="text-xl font-bold text-gray-900 mb-2">No collections yet</h2>
            <p className="text-gray-500">Collections will appear here once added to the CMS.</p>
          </div>
        )}
      </section>
    </>
  )
}