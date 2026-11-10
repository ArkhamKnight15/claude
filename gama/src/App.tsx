import { AgeGate } from './components/layout/AgeGate'
import { ContactDock } from './components/layout/ContactDock'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { useSpotlight } from './hooks/usePointerEffects'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { About } from './sections/About'
import { CategoryMarquee } from './sections/CategoryMarquee'
import { Faq } from './sections/Faq'
import { FinalCta } from './sections/FinalCta'
import { Gallery } from './sections/Gallery'
import { Hero } from './sections/Hero'
import { Highlights } from './sections/Highlights'
import { Location } from './sections/Location'
import { Services } from './sections/Services'
import { Support } from './sections/Support'

export default function App() {
  useSmoothScroll()
  useSpotlight()

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-ink-950 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
      >
        Pular para o conteúdo
      </a>
      <Navbar />
      <main id="conteudo">
        <Hero />
        <Highlights />
        <CategoryMarquee />
        <Services />
        <Gallery />
        <About />
        <Support />
        <Location />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <ContactDock />
      <AgeGate />
    </>
  )
}
