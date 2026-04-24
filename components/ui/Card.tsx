import { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  hover?: boolean
}

export function Card({ children, className = '', hover = true, ...props }: CardProps) {
  return (
    <div 
      className={`bg-white p-8 ${className}`} 
      {...props}
    >
      {children}
    </div>
  )
}
