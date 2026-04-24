import Image, { ImageProps } from 'next/image'

export default function OptimizedImage({
  quality = 75,
  loading = 'lazy',
  sizes = '(max-width: 768px) 100vw, 50vw',
  ...props
}: ImageProps) {
  return (
    <Image
      loading={loading}
      quality={quality}
      sizes={sizes}
      {...props}
    />
  )
}