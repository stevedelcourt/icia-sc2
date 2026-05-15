interface PictureProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  [key: string]: any
}

export function Picture({ src, alt, className, width: _w, height: _h, ...props }: PictureProps) {
  const avifSrc = src.replace(/\.webp$/, '.avif')
  const enc = (s: string) => s.replace(/ /g, '%20')

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <picture>
        <source srcSet={enc(avifSrc)} type="image/avif" />
        <source srcSet={enc(src)} type="image/webp" />
        <img
          src={enc(src)}
          alt={alt}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          className={className}
          {...props}
        />
      </picture>
    </div>
  )
}
