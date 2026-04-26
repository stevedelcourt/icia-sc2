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
      viewBox="0 0 256 512"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M184 112l144 144-144 144"
      />
    </svg>
  )
}
