// app/authors/[slug]/page.tsx
import { getAuthorBySlug, getPostsByAuthorId } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import PostCard from '@/components/PostCard'
import Link from 'next/link'
import type { Metadata } from 'next'

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    return { title: 'Author Not Found' }
  }

  return {
    title: `${author.metadata?.name || author.title} | Cosmic Blog`,
    description: author.metadata?.bio || `Posts by ${author.title}`,
  }
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthorId(author.id)

  const avatar = author.metadata?.avatar
  const name = author.metadata?.name || author.title
  const bio = author.metadata?.bio

  return (
    <div className="container-blog py-10 sm:py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/authors" className="hover:text-gray-600 transition-colors">Authors</Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">{name}</span>
      </nav>

      {/* Author Profile */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-12 p-8 bg-gray-50 rounded-2xl">
        {avatar ? (
          <img
            src={`${avatar.imgix_url}?w=240&h=240&fit=crop&auto=format,compress`}
            alt={name}
            width={120}
            height={120}
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover ring-4 ring-white shadow-md"
          />
        ) : (
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-brand-100 flex items-center justify-center text-4xl font-bold text-brand-600 ring-4 ring-white shadow-md">
            {name.charAt(0)}
          </div>
        )}

        <div className="text-center sm:text-left flex-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
            {name}
          </h1>
          {bio && (
            <p className="text-gray-600 leading-relaxed max-w-2xl mb-3">
              {bio}
            </p>
          )}
          <span className="inline-block text-sm font-medium text-gray-400 bg-white px-4 py-1.5 rounded-full border border-gray-100">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'} published
          </span>
        </div>
      </div>

      {/* Posts by Author */}
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Posts by {name}
      </h2>

      {posts.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl">
          <span className="text-5xl mb-4 block">📝</span>
          <p className="text-gray-500">No posts by this author yet.</p>
          <Link href="/" className="text-brand-600 text-sm font-medium hover:underline mt-2 inline-block">
            ← Back to all posts
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}