'use client'

import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'
import Link from 'next/link'

type ButtonVariant = 'black' | 'warm' | 'outline' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  href?: string
  arrow?: boolean
  children?: ReactNode
}

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  black: { backgroundColor: '#000000', color: '#ffffff' },
  warm: { backgroundColor: 'var(--bg-warm)', color: 'var(--text-primary)' },
  outline: { border: '1px solid var(--border-light)', color: 'var(--text-primary)', backgroundColor: 'transparent' },
  ghost: { color: 'var(--text-tertiary)', backgroundColor: 'transparent', padding: '8px 12px' },
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'black', href, arrow = true, className = '', children, ...props }, ref) => {
    const style = variantStyles[variant]
    const baseClasses = `btn-pill ${className}`

    const content = (
      <>
        <span>{children}</span>
        {arrow && (
          <svg className="btn-chevron" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.25 2.625L9.625 7L5.25 11.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </>
    )

    if (href) {
      return (
        <Link href={href} className={baseClasses} style={style}>
          {content}
        </Link>
      )
    }

    return (
      <button ref={ref} className={baseClasses} style={style} {...props}>
        {content}
      </button>
    )
  }
)

Button.displayName = 'Button'
