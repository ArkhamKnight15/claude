import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import type { MediaAsset } from '../../types'

interface MediaFrameProps {
  asset: MediaAsset
  /** Exibido enquanto não houver uma imagem real configurada. */
  fallback: ReactNode
  className?: string
  imageClassName?: string
  priority?: boolean
}

export function MediaFrame({ asset, fallback, className, imageClassName, priority = false }: MediaFrameProps) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      {asset.src ? (
        <img
          src={asset.src}
          alt={asset.alt}
          width={asset.width}
          height={asset.height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className={cn('absolute inset-0 size-full object-cover', imageClassName)}
        />
      ) : (
        fallback
      )}
    </div>
  )
}
