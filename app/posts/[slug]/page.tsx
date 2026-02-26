// app/posts/[slug]/page.tsx
import { getPostBySlug, getPosts } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import CategoryBadge from '@/components/CategoryBadge'
import MarkdownContent from '@/components/MarkdownContent'
import type { Metadata } from 'next'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  const description = post.metadata?.content
    ?.replace(/[#*\[\]`>-]/g, '')
    .substring(0, 160)

  return {
    title: `${post.title} | Cosmic Blog`,
    description,
    openGraph: {
      title: post.title,
      description,
      images: post.metadata?.featured_image?.imgix_url
        ? [`${post.metadata.featured_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`]
        : undefined,
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const category = post.metadata?.category
  const content = post.metadata?.content || ''
  const createdAt = post.created_at
    ? new Date(post.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  return (
    <article>
      {/* Hero */}
      <div className="relative">
        {featuredImage ? (
          <div className="aspect-[21/9] sm:aspect-[3/1] relative overflow-hidden bg-gray-900">
            <img
              src={`${featuredImage.imgix_url}?w=1600&h=600&fit=crop&auto=format,compress`}
              alt={post.title}
              width={1600}
              height={600}
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/30 to-transparent" />
          </div>
        ) : (
          <div className="aspect-[21/9] sm:aspect-[3/1] bg-gradient-to-br from-brand-600 to-brand-900" />
        )}

        <div className="absolute bottom-0 left-0 right-0">
          <div className="container-blog pb-8 sm:pb-12">
            {category && (
              <div className="mb-3">
                <CategoryBadge category={category} size="md" />
              </div>
            )}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white max-w-4xl leading-tight">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Author & Date bar */}
      <div className="container-blog">
        <div className="flex items-center gap-4 py-6 border-b border-gray-100">
          {author && (
            <Link href={`/authors/${author.slug}`} className="flex items-center gap-3 group">
              {author.metadata?.avatar ? (
                <img
                  src={`${author.metadata.avatar.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                  alt={author.metadata?.name || author.title}
                  width={44}
                  height={44}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-gray-100"
                />
              ) : (
                <div className="w-11 h-11 rounded-full bg-brand-100 flex items-center justify-center text-sm font-bold text-brand-600 ring-2 ring-gray-100">
                  {(author.title || 'A').charAt(0)}
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">
                  {author.metadata?.name || author.title}
                </p>
                {author.metadata?.bio && (
                  <p className="text-xs text-gray-400 line-clamp-1 max-w-xs">
                    {author.metadata.bio}
                  </p>
                )}
              </div>
            </Link>
          )}

          {createdAt && (
            <div className="ml-auto text-sm text-gray-400">
              {createdAt}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="container-blog py-10 sm:py-14">
        <div className="max-w-3xl mx-auto">
          <MarkdownContent content={content} />
        </div>
      </div>

      {/* Back link */}
      <div className="container-blog pb-16">
        <div className="max-w-3xl mx-auto pt-8 border-t border-gray-100">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-brand-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to all posts
          </Link>
        </div>
      </div>
    </article>
  )
}