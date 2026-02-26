import Link from 'next/link'
import { Post } from '@/types'
import CategoryBadge from '@/components/CategoryBadge'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const category = post.metadata?.category
  const createdAt = post.created_at
    ? new Date(post.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300">
      <Link href={`/posts/${post.slug}`} className="block">
        {featuredImage ? (
          <div className="aspect-[16/10] overflow-hidden bg-gray-100">
            <img
              src={`${featuredImage.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
              alt={post.title}
              width={400}
              height={250}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className="aspect-[16/10] bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
            <span className="text-5xl">📝</span>
          </div>
        )}
      </Link>

      <div className="p-5 sm:p-6">
        {category && (
          <div className="mb-3">
            <CategoryBadge category={category} />
          </div>
        )}

        <Link href={`/posts/${post.slug}`}>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-2 mb-2">
            {post.title}
          </h2>
        </Link>

        <p className="text-sm text-gray-500 line-clamp-2 mb-4">
          {post.metadata?.content?.replace(/[#*\[\]`>-]/g, '').substring(0, 150)}...
        </p>

        <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
          {author?.metadata?.avatar ? (
            <img
              src={`${author.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
              alt={author.metadata?.name || author.title}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-xs font-bold text-brand-600">
              {(author?.title || 'A').charAt(0)}
            </div>
          )}
          <div className="flex-1 min-w-0">
            {author && (
              <p className="text-sm font-medium text-gray-900 truncate">
                {author.metadata?.name || author.title}
              </p>
            )}
            {createdAt && (
              <p className="text-xs text-gray-400">{createdAt}</p>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}