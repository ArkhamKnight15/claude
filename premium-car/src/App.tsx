import { FloatingWhatsApp } from './components/layout/FloatingWhatsApp'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { SetupNotice } from './components/layout/SetupNotice'
import { About } from './sections/About'
import { Differentials } from './sections/Differentials'
import { FinalCta } from './sections/FinalCta'
import { Gallery } from './sections/Gallery'
import { Hero } from './sections/Hero'
import { Services } from './sections/Services'

export default function App() {
  return (
    <>
      <a
        href="#conteudo"
        className="fixed top-3 left-3 z-50 -translate-y-20 rounded-full bg-brand-400 px-5 py-3 text-sm font-semibold text-ink-950 transition-transform focus:translate-y-0"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Services />
        <Differentials />
        <Gallery />
        <About />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <SetupNotice />
    </>
  )
}
