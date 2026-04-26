'use client'

interface ArrowRightProps {
  className?: string
}

export function ArrowRight({ className = 'w-4 h-4' }: ArrowRightProps) {
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
        strokeWidth="2"
        d="M5 12h14m0 0l-5-5m5 5l-5 5"
      />
    </svg>
  )
}
