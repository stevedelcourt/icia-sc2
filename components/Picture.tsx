interface PictureProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  [key: string]: any
}

export function Picture({ src, alt, className, width, height, ...props }: PictureProps) {
  const avifSrc = src.replace(/\.webp$/, '.avif')
  
  return (
    <picture>
      <source srcSet={avifSrc} type="image/avif" />
      <source srcSet={src} type="image/webp" />
      <img 
        src={src} 
        alt={alt} 
        className={className}
        width={width}
        height={height}
        {...props} 
      />
    </picture>
  )
}
