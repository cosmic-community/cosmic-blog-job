// Cosmic file/image type
export interface CosmicImage {
  url: string
  imgix_url: string
}

// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  type: string;
  created_at: string;
  modified_at: string;
  metadata: Record<string, unknown>;
}

// Author type
export interface Author {
  id: string
  title: string
  slug: string
  created_at?: string
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
  created_at?: string
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

// AboutPage type for the about-page singleton object
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

// Changed: Added Collection type for ecommerce
export interface Collection {
  id: string
  title: string
  slug: string
  metadata: {
    name: string
    description?: string
    image?: CosmicImage
  }
}

// Changed: Added Product type for ecommerce
export interface Product {
  id: string
  title: string
  slug: string
  metadata: {
    name: string
    description: string
    price: number
    image?: CosmicImage
    collection?: Collection | string
    in_stock: boolean
  }
}

// Changed: Added Review type for ecommerce
export interface Review {
  id: string
  title: string
  slug: string
  metadata: {
    product: Product
    reviewer_name: string
    rating: {
      key: string
      value: string
    }
    comment?: string
  }
}

// Cosmic API response type
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Cosmic single object response
export interface CosmicSingleResponse<T> {
  object: T;
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