'use client'

import Image from 'next/image'

interface ArrowRightProps {
  className?: string
}

export function ArrowRight({ className = 'w-4 h-4 shrink-0' }: ArrowRightProps) {
  return (
    <Image
      src="/images/arrow-right.svg"
      alt="→"
      width={16}
      height={16}
      className={className}
      style={{ filter: 'none' }}
    />
  )
}
