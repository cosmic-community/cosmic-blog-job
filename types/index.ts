// Cosmic file/image type
export interface CosmicImage {
  url: string
  imgix_url: string
}

// Author type
export interface Author {
  id: string
  title: string
  slug: string
  metadata: {
    name: string
    bio?: string
    avatar?: CosmicImage
  }
}

// Category type
export interface Category {
  id: string
  title: string
  slug: string
  metadata: {
    name: string
    description?: string
  }
}

// Post type
export interface Post {
  id: string
  title: string
  slug: string
  created_at?: string
  metadata: {
    content: string
    featured_image?: CosmicImage
    author?: Author
    category?: Category
  }
}

// Changed: Added AboutPage type for the about-page singleton object
export interface AboutPage {
  id: string
  title: string
  slug: string
  metadata: {
    heading: string
    content?: string
    hero_image?: CosmicImage
  }
}

// Type guard for error status
export function hasStatus(error: unknown): error is { status: number } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    typeof (error as { status: unknown }).status === 'number'
  )
}