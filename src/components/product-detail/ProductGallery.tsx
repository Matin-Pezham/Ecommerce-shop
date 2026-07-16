import { useMemo, useState } from 'react'
import type { ProductImage, SupportedLocale } from '@/features/products/types'
import { getLocalizedText } from '@/features/products/productUtils'

type ProductGalleryProps = {
  images: ProductImage[]
  selectedImageId?: string
  onSelectImage: (imageId: string) => void
  locale: SupportedLocale
}

const fallbackImageUrl = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80'

export function ProductGallery({ images, selectedImageId, onSelectImage, locale }: ProductGalleryProps) {
  const [mainImageSrc, setMainImageSrc] = useState<string | null>(null)

  const safeImages = useMemo(() => {
    if (images.length > 0) return images
    return [
      {
        id: 'fallback-image',
        url: fallbackImageUrl,
        alt: { en: 'Product image', fa: 'تصویر محصول' },
        type: 'main' as const,
      },
    ]
  }, [images])

  const selected = safeImages.find((image) => image.id === selectedImageId) ?? safeImages[0]
  const displaySrc = mainImageSrc ?? selected.url

  return (
    <section className="space-y-4" aria-label="Product gallery">
      <div className="overflow-hidden rounded-[2rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-3 shadow-[var(--shadow-soft)] backdrop-blur-xl">
        <img
          src={displaySrc}
          alt={getLocalizedText(selected.alt, locale)}
          className="h-[440px] w-full rounded-[1.5rem] object-cover sm:h-[560px]"
          onError={() => setMainImageSrc(fallbackImageUrl)}
        />
      </div>

      <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
        {safeImages.map((image) => {
          const isActive = image.id === selected.id
          return (
            <button
              key={image.id}
              type="button"
              aria-label={getLocalizedText(image.alt, locale)}
              aria-pressed={isActive}
              onClick={() => {
                setMainImageSrc(null)
                onSelectImage(image.id)
              }}
              className={`overflow-hidden rounded-[1rem] border bg-[color:var(--color-card)]/90 transition ${
                isActive
                  ? 'border-[color:var(--color-primary)] ring-2 ring-[color:var(--color-primary)]/20'
                  : 'border-[color:var(--color-border)] hover:border-[color:var(--color-primary)]/40'
              }`}
            >
              <img
                src={image.url}
                alt={getLocalizedText(image.alt, locale)}
                className="h-20 w-full object-cover"
                onError={(event) => {
                  ;(event.currentTarget as HTMLImageElement).src = fallbackImageUrl
                }}
              />
            </button>
          )
        })}
      </div>
    </section>
  )
}
