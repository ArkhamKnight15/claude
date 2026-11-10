import { useState } from 'react'
import { cn } from '../../lib/cn'
import type { Photo } from '../../types'

interface PictureProps {
  photo: Photo
  className?: string
  imageClassName?: string
  priority?: boolean
}

/**
 * Foto com proporção reservada (sem salto de layout), carregamento preguiçoso
 * e um fundo neutro que some com fade quando a imagem termina de carregar.
 */
export function Picture({ photo, className, imageClassName, priority = false }: PictureProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={cn('relative overflow-clip bg-sand', className)}>
      <img
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        onLoad={() => setLoaded(true)}
        ref={(node) => {
          // Imagens em cache podem terminar de carregar antes da hidratação do onLoad.
          if (node?.complete && node.naturalWidth > 0) setLoaded(true)
        }}
        className={cn(
          'absolute inset-0 size-full object-cover transition-opacity duration-700 ease-out',
          loaded ? 'opacity-100' : 'opacity-0',
          imageClassName,
        )}
      />
    </div>
  )
}
