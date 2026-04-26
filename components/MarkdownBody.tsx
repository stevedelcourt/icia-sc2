'use client'

import ReactMarkdown from 'react-markdown'

interface MarkdownBodyProps {
  content: string
  className?: string
}

export function MarkdownBody({ content, className = '' }: MarkdownBodyProps) {
  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <ReactMarkdown
        components={{
          h1: ({ children }) => <h1 className="text-3xl md:text-4xl font-bold text-black mb-6 mt-12">{children}</h1>,
          h2: ({ children }) => <h2 className="text-2xl md:text-3xl font-bold text-black mb-4 mt-10">{children}</h2>,
          h3: ({ children }) => <h3 className="text-xl md:text-2xl font-bold text-black mb-3 mt-8">{children}</h3>,
          p: ({ children }) => <p className="text-lg text-gray-600 leading-relaxed mb-6">{children}</p>,
          ul: ({ children }) => <ul className="list-disc pl-6 mb-6 space-y-2">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-6 mb-6 space-y-2">{children}</ol>,
          li: ({ children }) => <li className="text-lg text-gray-600 leading-relaxed">{children}</li>,
          strong: ({ children }) => <strong className="font-bold text-black">{children}</strong>,
          em: ({ children }) => <em className="italic text-gray-700">{children}</em>,
          a: ({ children, href }) => (
            <a href={href} className="text-navy underline hover:text-navy-light transition-colors">
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-navy pl-6 italic text-gray-600 my-8">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
