'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownContentProps {
  content: string
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  // Remove the first heading if it matches the post title pattern
  const processedContent = content.replace(/^# .+\n\n/, '')

  return (
    <div className="prose prose-lg prose-gray max-w-none
      prose-headings:font-bold prose-headings:text-gray-900
      prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
      prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
      prose-p:text-gray-600 prose-p:leading-relaxed
      prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline
      prose-strong:text-gray-900
      prose-ul:text-gray-600 prose-ol:text-gray-600
      prose-li:marker:text-brand-400
      prose-blockquote:border-brand-300 prose-blockquote:text-gray-600
      prose-code:text-brand-700 prose-code:bg-brand-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
      prose-pre:bg-gray-900 prose-pre:text-gray-100
      prose-img:rounded-xl prose-img:shadow-md
    ">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {processedContent}
      </ReactMarkdown>
    </div>
  )
}