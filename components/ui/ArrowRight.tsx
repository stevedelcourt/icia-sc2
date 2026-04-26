'use client'

interface ArrowRightProps {
  className?: string
  strokeWidth?: number
}

export function ArrowRight({ className = 'w-4 h-4', strokeWidth = 2 }: ArrowRightProps) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </svg>
  )
}
