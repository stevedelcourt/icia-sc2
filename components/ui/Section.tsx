import { HTMLAttributes } from 'react'

interface SectionProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  narrow?: boolean
  spacing?: 'normal' | 'large'
}

export function Section({ children, className = '', narrow = false, spacing = 'normal', ...props }: SectionProps) {
  const paddingTop = spacing === 'large' ? 'pt-32 md:pt-40' : 'pt-24 md:pt-32'
  const paddingBottom = spacing === 'large' ? 'pb-20 md:pb-28' : 'pb-16 md:pb-24'
  
  return (
    <section 
      className={`mx-auto px-4 md:px-8 ${paddingTop} ${paddingBottom} ${className}`} 
      style={{ maxWidth: narrow ? '720px' : '1100px' }}
      {...props}
    >
      {children}
    </section>
  )
}
