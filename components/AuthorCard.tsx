import Link from 'next/link'
import { Author } from '@/types'

interface AuthorCardProps {
  author: Author
  postCount?: number
}

export default function AuthorCard({ author, postCount }: AuthorCardProps) {
  const avatar = author.metadata?.avatar
  const name = author.metadata?.name || author.title
  const bio = author.metadata?.bio

  return (
    <Link
      href={`/authors/${author.slug}`}
      className="group block bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg p-6 transition-all duration-300 text-center"
    >
      {avatar ? (
        <img
          src={`${avatar.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
          alt={name}
          width={96}
          height={96}
          className="w-24 h-24 rounded-full object-cover mx-auto mb-4 ring-4 ring-gray-50 group-hover:ring-brand-50 transition-all"
        />
      ) : (
        <div className="w-24 h-24 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-brand-600 ring-4 ring-gray-50 group-hover:ring-brand-50 transition-all">
          {name.charAt(0)}
        </div>
      )}

      <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-600 transition-colors mb-1">
        {name}
      </h3>

      {bio && (
        <p className="text-sm text-gray-500 line-clamp-2 mb-3">
          {bio}
        </p>
      )}

      {postCount !== undefined && (
        <span className="inline-block text-xs font-medium text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
          {postCount} {postCount === 1 ? 'post' : 'posts'}
        </span>
      )}
    </Link>
  )
}