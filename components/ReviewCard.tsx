import { Review } from '@/types'
import StarRating from '@/components/StarRating'
import Link from 'next/link'

interface ReviewCardProps {
  review: Review
  showProduct?: boolean
}

export default function ReviewCard({ review, showProduct = false }: ReviewCardProps) {
  const ratingNum = parseInt(review.metadata?.rating?.key || '0', 10)

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 sm:p-6">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-semibold text-gray-900">{review.metadata?.reviewer_name}</p>
          <StarRating rating={ratingNum} />
        </div>
        {showProduct && review.metadata?.product && (
          <Link
            href={`/products/${review.metadata.product.slug}`}
            className="text-xs font-medium text-brand-600 hover:text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full transition-colors"
          >
            {review.metadata.product.metadata?.name || review.metadata.product.title}
          </Link>
        )}
      </div>
      {review.metadata?.comment && (
        <p className="text-sm text-gray-600 leading-relaxed">{review.metadata.comment}</p>
      )}
    </div>
  )
}