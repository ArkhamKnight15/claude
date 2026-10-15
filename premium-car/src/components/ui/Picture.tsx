import { useState, type ImgHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'
import type { Photo } from '../../types'

interface PictureProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'alt' | 'width' | 'height'> {
  photo: Photo
  /** Primeira dobra: carrega com prioridade em vez de sob demanda. */
  priority?: boolean
  /** Classes do contêiner (a imagem sempre preenche o contêiner com `object-cover`). */
  frameClassName?: string
}

/**
 * Foto responsiva com carregamento sob demanda, fade-in ao carregar e fundo neutro de reserva:
 * se a imagem falhar, o espaço continua com acabamento grafite em vez de um ícone quebrado.
 */
export function Picture({ photo, priority, className, frameClassName, sizes = '100vw', ...props }: PictureProps) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading')

  return (
    <div className={cn('photo-fallback relative overflow-hidden', frameClassName)}>
      {status !== 'error' && (
        <img
          src={photo.src}
          srcSet={photo.srcSet}
          sizes={photo.srcSet ? sizes : undefined}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={cn(
            'absolute inset-0 size-full object-cover transition-opacity duration-700',
            status === 'loaded' ? 'opacity-100' : 'opacity-0',
            className,
          )}
          {...props}
        />
      )}
      {status === 'error' && (
        <span role="img" aria-label={photo.alt} className="absolute inset-0" />
      )}
    </div>
  )
}
