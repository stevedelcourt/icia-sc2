'use client'

import { BauhausIcon } from './BauhausIcon'

export function BauhausHero({ className = '' }: { className?: string }) {
  return (
    <div className={`grid grid-cols-2 w-full h-full ${className}`}>
      <BauhausIcon icon="01" />
      <BauhausIcon icon="02" />
      <BauhausIcon icon="23" />
      <BauhausIcon icon="08" />
    </div>
  )
}
