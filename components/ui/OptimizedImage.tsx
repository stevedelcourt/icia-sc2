'use client'

import { useState, useEffect, ImgHTMLAttributes } from 'react'
import Image from 'next/image'

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  sizes?: string
  priority?: boolean
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
}

const SIZES = [640, 750, 828, 1080, 1200, 1920]

function buildSrcSet(url: string): string {
  if (!url) return ''
  
  return SIZES
    .map(size => `${url}?w=${size}&q=80 ${size}w`)
    .join(', ')
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false,
  placeholder = 'empty',
  blurDataURL,
  className,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentSrc, setCurrentSrc] = useState('')
  
  useEffect(() => {
    if (!src) return
    
    // For S3 URLs with signature, we use a lower resolution initially
    if (src.includes('amazonaws.com')) {
      setCurrentSrc(`${src}&w=640`)
    } else {
      setCurrentSrc(src)
    }
  }, [src])

  if (!src) {
    return null
  }

  // Check if it's an external URL (Notion/S3)
  const isExternal = src.startsWith('http')
  
  if (isExternal) {
    // For external images, use a simple img with lazy loading
    // since we can't optimize them server-side in static export
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        className={`${className} ${isLoaded ? '' : 'animate-pulse'}`}
        onLoad={() => setIsLoaded(true)}
        {...props}
      />
    )
  }

  // For local images, use Next.js Image
  return (
    <div className={`relative ${fill ? 'inset-0' : ''}`} style={fill ? { position: 'absolute' } : {}}>
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        sizes={sizes}
        priority={priority}
        className={`${className} transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
        {...props}
      />
    </div>
  )
}

// Utility function to generate responsive image URLs
export function getResponsiveUrl(url: string, width: number): string {
  if (!url) return ''
  
  try {
    const urlObj = new URL(url)
    
    // Add width parameter for S3
    if (url.includes('amazonaws.com')) {
      const separator = urlObj.search ? '&' : '?'
      return `${url}${separator}w=${width}&q=80`
    }
    
    return url
  } catch {
    return url
  }
}
