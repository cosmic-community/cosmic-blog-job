import Link from 'next/link'
import { Category } from '@/types'

interface CategoryBadgeProps {
  category: Category
  size?: 'sm' | 'md'
}

const categoryColors: Record<string, string> = {
  technology: 'bg-blue-50 text-blue-700 hover:bg-blue-100',
  travel: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100',
  lifestyle: 'bg-pink-50 text-pink-700 hover:bg-pink-100',
  food: 'bg-orange-50 text-orange-700 hover:bg-orange-100',
  business: 'bg-purple-50 text-purple-700 hover:bg-purple-100',
}

const defaultColor = 'bg-gray-50 text-gray-700 hover:bg-gray-100'

export default function CategoryBadge({ category, size = 'sm' }: CategoryBadgeProps) {
  const colorClasses = categoryColors[category.slug] || defaultColor
  const sizeClasses = size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm'

  return (
    <Link
      href={`/categories/${category.slug}`}
      className={`inline-block font-medium rounded-full transition-colors ${colorClasses} ${sizeClasses}`}
    >
      {category.metadata?.name || category.title}
    </Link>
  )
}