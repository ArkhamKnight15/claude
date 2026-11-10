interface ImportMetaEnv {
  /** Endpoint opcional que devolve as fotos da galeria (mesmo formato de `GalleryPhoto`). */
  readonly VITE_GALLERY_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
