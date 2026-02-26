import { getAuthors, getPosts } from '@/lib/cosmic'
import AuthorCard from '@/components/AuthorCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Authors | Cosmic Blog',
  description: 'Meet the writers behind our blog',
}

export default async function AuthorsPage() {
  const authors = await getAuthors()
  const posts = await getPosts()

  return (
    <div className="container-blog py-10 sm:py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
          Our Authors
        </h1>
        <p className="text-gray-500 max-w-md mx-auto">
          Meet the talented writers who bring our content to life
        </p>
      </div>

      {authors.length === 0 ? (
        <div className="text-center py-16">
          <span className="text-5xl mb-4 block">✍️</span>
          <p className="text-gray-500">No authors yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {authors.map((author) => {
            const authorPostCount = posts.filter(
              (p) => p.metadata?.author?.slug === author.slug
            ).length

            return (
              <AuthorCard key={author.id} author={author} postCount={authorPostCount} />
            )
          })}
        </div>
      )}
    </div>
  )
}