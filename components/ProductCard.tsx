import Link from 'next/link'
import { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const image = product.metadata?.image
  const price = product.metadata?.price
  const inStock = product.metadata?.in_stock

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300">
      <Link href={`/products/${product.slug}`} className="block">
        {image ? (
          <div className="aspect-square overflow-hidden bg-gray-100">
            <img
              src={`${image.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
              alt={product.metadata?.name || product.title}
              width={400}
              height={400}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className="aspect-square bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
            <span className="text-5xl">🛍️</span>
          </div>
        )}
      </Link>

      <div className="p-5 sm:p-6">
        <Link href={`/products/${product.slug}`}>
          <h2 className="text-lg font-bold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-1 mb-1">
            {product.metadata?.name || product.title}
          </h2>
        </Link>

        <div className="flex items-center justify-between mt-3">
          <span className="text-xl font-bold text-gray-900">
            ${typeof price === 'number' ? price.toFixed(2) : '0.00'}
          </span>
          {inStock ? (
            <span className="text-xs font-medium text-green-700 bg-green-50 px-2.5 py-1 rounded-full">
              In Stock
            </span>
          ) : (
            <span className="text-xs font-medium text-red-700 bg-red-50 px-2.5 py-1 rounded-full">
              Out of Stock
            </span>
          )}
        </div>
      </div>
    </article>
  )
}