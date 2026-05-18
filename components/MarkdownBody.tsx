'use client'

import ReactMarkdown from 'react-markdown'

interface MarkdownBodyProps {
  content: string
  className?: string
}

export function MarkdownBody({ content, className = '' }: MarkdownBodyProps) {
  return (
    <div
      className={`prose ${className}`.trim()}
      style={{ maxWidth: 'none' }}
    >
      <ReactMarkdown
        components={{
          h1: ({ children }) => <h1>{children}</h1>,
          h2: ({ children }) => <h2>{children}</h2>,
          h3: ({ children }) => <h3>{children}</h3>,
          p: ({ children }) => <p>{children}</p>,
          ul: ({ children }) => <ul>{children}</ul>,
          ol: ({ children }) => <ol>{children}</ol>,
          li: ({ children }) => <li>{children}</li>,
          strong: ({ children }) => <strong>{children}</strong>,
          em: ({ children }) => <em>{children}</em>,
          a: ({ children, href }) => <a href={href}>{children}</a>,
          blockquote: ({ children }) => <blockquote>{children}</blockquote>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
