'use client'

import { ButtonHTMLAttributes, forwardRef, ReactNode, CSSProperties } from 'react'
import Link from 'next/link'
import { ArrowRight } from './ArrowRight'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  arrow?: boolean
  children?: ReactNode
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-navy text-white rounded-md',
  secondary: 'bg-navy text-white rounded-md',
  outline: 'border-2 border-navy text-navy rounded-md bg-transparent',
  ghost: 'text-slate-dark rounded-md bg-transparent',
}

const hoverStyles: Record<ButtonVariant, { bg: string; text: string }> = {
  primary: { bg: '#001A3A', text: '#ffffff' },
  secondary: { bg: '#001A3A', text: '#ffffff' },
  outline: { bg: '#00255D', text: '#ffffff' },
  ghost: { bg: '#191919', text: '#ffffff' },
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', href, arrow = true, className = '', children, style, ...props }, ref) => {
    const baseClasses = `inline-flex items-center justify-center font-semibold whitespace-nowrap select-none transition-colors duration-200 ${sizeClasses[size]} ${variantClasses[variant]}`
    
    const combinedStyle: CSSProperties = {
      cursor: 'pointer',
      textDecoration: 'none',
      position: 'relative',
      zIndex: 10,
      ...style,
    }

    const hover = hoverStyles[variant]
    
    const linkContent = (
      <>
        <span>{children}</span>
        {arrow && <ArrowRight className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />}
      </>
    )

    const LinkButton = () => (
      <Link 
        href={href || '#'} 
        className={`group ${baseClasses} ${className}`}
        style={combinedStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = hover.bg
          e.currentTarget.style.color = hover.text
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = ''
          e.currentTarget.style.color = ''
        }}
      >
        {linkContent}
      </Link>
    )

    const FormButton = () => (
      <button 
        ref={ref} 
        className={`group ${baseClasses} ${className}`}
        style={combinedStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = hover.bg
          e.currentTarget.style.color = hover.text
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = ''
          e.currentTarget.style.color = ''
        }}
        {...props}
      >
        {linkContent}
      </button>
    )
    
    return href ? <LinkButton /> : <FormButton />
  }
)

Button.displayName = 'Button'
