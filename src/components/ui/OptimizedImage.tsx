import Image, { ImageProps } from 'next/image'

export default function OptimizedImage({
  quality = 75,
  loading,
  sizes = '(max-width: 768px) 100vw, 50vw',
  alt = '',
  priority,
  ...props
}: ImageProps) {
  // If priority is set, don't use lazy loading - they conflict in Next.js
  const finalLoading = priority ? undefined : (loading || 'lazy');
  
  return (
    <Image
      loading={finalLoading}
      quality={quality}
      sizes={sizes}
      alt={alt}
      priority={priority}
      {...props}
    />
  )
}