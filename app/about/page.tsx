import { getAboutPage } from '@/lib/cosmic'
import MarkdownContent from '@/components/MarkdownContent'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us - Cosmic Blog',
  description: 'Learn more about our team, mission, and what we do.',
}

export default async function AboutPage() {
  const about = await getAboutPage()

  if (!about) {
    return (
      <div className="container-blog py-20 text-center">
        <span className="text-6xl mb-4 block">📄</span>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">About Page Not Found</h1>
        <p className="text-gray-500 mb-6">
          The about page content hasn&apos;t been added yet.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    )
  }

  return (
    <article>
      {/* Hero Section */}
      {about.metadata.hero_image?.imgix_url && (
        <section className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden bg-gray-100">
          <img
            src={`${about.metadata.hero_image.imgix_url}?w=1600&h=800&fit=crop&auto=format,compress`}
            alt={about.metadata.heading}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 container-blog pb-8 sm:pb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              {about.metadata.heading}
            </h1>
          </div>
        </section>
      )}

      {/* Content Section */}
      <section className="container-blog py-10 sm:py-16">
        {/* Show heading if no hero image */}
        {!about.metadata.hero_image?.imgix_url && (
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            {about.metadata.heading}
          </h1>
        )}

        {about.metadata.content && (
          <div className="max-w-3xl">
            <MarkdownContent content={about.metadata.content} />
          </div>
        )}
      </section>
    </article>
  )
}