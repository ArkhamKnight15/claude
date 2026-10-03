import { Suspense } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router'
import { FavoritesProvider } from '../../state/FavoritesProvider'
import { InquiryProvider } from '../../state/InquiryProvider'
import { ToastProvider } from '../../state/ToastProvider'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { PageFallback } from './PageFallback'

/** As rotas de busca compartilham a mesma chave para não reiniciar a página ao trocar a finalidade. */
function pageKey(pathname: string) {
  return /^\/(imoveis|comprar|alugar)\/?$/.test(pathname) ? 'busca' : pathname
}

export function RootLayout() {
  const { pathname } = useLocation()
  return (
    <FavoritesProvider>
      <ToastProvider>
        <InquiryProvider>
          <a
            href="#conteudo"
            className="eyebrow fixed left-4 top-4 z-[70] -translate-y-24 bg-ink px-4 py-3 text-paper transition-transform focus:translate-y-0"
          >
            Pular para o conteúdo
          </a>
          <Navbar />
          <main id="conteudo" tabIndex={-1} className="outline-none">
            {/* A chave reinicia a animação de entrada a cada troca de página. */}
            <div key={pageKey(pathname)} className="animate-page-in">
              <Suspense fallback={<PageFallback />}>
                <Outlet />
              </Suspense>
            </div>
          </main>
          <Footer />
          <ScrollRestoration />
        </InquiryProvider>
      </ToastProvider>
    </FavoritesProvider>
  )
}
