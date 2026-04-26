'use client'

interface ArrowRightProps {
  className?: string
}

export function ArrowRight({ className = 'shrink-0' }: ArrowRightProps) {
  return (
    <svg
      className={className}
      style={{ width: '1em', height: '1em', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }}
      viewBox="0 0 24 24"
    >
      <path d="M5 12h14M13 6l6 6-6 6"/>
    </svg>
  )
}
