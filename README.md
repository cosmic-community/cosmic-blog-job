TEST 2

TEST 1

# Cosmic Blog

![Cosmic Blog](https://imgix.cosmicjs.com/5c91e660-12a7-11f1-87b4-a3b1ac0874fc-photo-1493976040374-85c8e12f0c0e-1772064544230.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, responsive blog platform built with Next.js 16 and powered by [Cosmic](https://www.cosmicjs.com). Features rich markdown rendering, category filtering, author profiles, and a beautiful editorial design.

## Features

- 📝 **Dynamic Blog Posts** — Rich markdown content with featured images
- 🏷️ **Category System** — Filter and browse posts by category
- ✍️ **Author Profiles** — Dedicated pages with bio and published posts
- 📱 **Fully Responsive** — Beautiful on mobile, tablet, and desktop
- ⚡ **Server-Side Rendering** — Fast page loads with Next.js App Router
- 🔍 **SEO Optimized** — Dynamic metadata and Open Graph tags
- 🎨 **Modern Design** — Clean editorial aesthetic with Inter typography

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=699f8edaf276ae650676d539&clone_repository=699fa586f276ae650676d55b)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "A blog with posts, authors, and categories"

### Code Generation Prompt

> "Based on the content model I created for 'A blog with posts, authors, and categories', now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [Cosmic](https://www.cosmicjs.com) — Headless CMS for content management
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript
- [react-markdown](https://github.com/remarkjs/react-markdown) — Markdown rendering

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (or Node.js 18+)
- A [Cosmic](https://www.cosmicjs.com) account with a bucket containing Posts, Authors, and Categories

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd cosmic-blog

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Cosmic credentials

# Run the development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see the blog.

### Environment Variables