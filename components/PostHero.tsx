import Link from 'next/link'
import { Post } from '@/types'
import CategoryBadge from '@/components/CategoryBadge'

interface PostHeroProps {
  post: Post
}

export default function PostHero({ post }: PostHeroProps) {
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
    <article className="group relative rounded-3xl overflow-hidden bg-gray-900">
      <Link href={`/posts/${post.slug}`} className="block">
        {featuredImage ? (
          <div className="aspect-[21/9] sm:aspect-[2/1] lg:aspect-[21/9]">
            <img
              src={`${featuredImage.imgix_url}?w=1400&h=600&fit=crop&auto=format,compress`}
              alt={post.title}
              width={1400}
              height={600}
              className="w-full h-full object-cover opacity-70 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
            />
          </div>
        ) : (
          <div className="aspect-[21/9] sm:aspect-[2/1] lg:aspect-[21/9] bg-gradient-to-br from-brand-600 to-brand-900" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
          {category && (
            <div className="mb-3">
              <CategoryBadge category={category} size="md" />
            </div>
          )}

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 max-w-3xl leading-tight">
            {post.title}
          </h2>

          <p className="text-sm sm:text-base text-gray-300 line-clamp-2 max-w-2xl mb-4">
            {post.metadata?.content?.replace(/[#*\[\]`>-]/g, '').substring(0, 200)}...
          </p>

          <div className="flex items-center gap-3">
            {author?.metadata?.avatar ? (
              <img
                src={`${author.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                alt={author.metadata?.name || author.title}
                width={36}
                height={36}
                className="w-9 h-9 rounded-full object-cover border-2 border-white/20"
              />
            ) : author ? (
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold text-white border-2 border-white/20">
                {(author.title || 'A').charAt(0)}
              </div>
            ) : null}
            <div>
              {author && (
                <p className="text-sm font-medium text-white">
                  {author.metadata?.name || author.title}
                </p>
              )}
              {createdAt && (
                <p className="text-xs text-gray-400">{createdAt}</p>
              )}
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}