import { BookingProvider } from './components/booking/BookingProvider'
import { useSpotlight } from './hooks/usePointerEffects'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { Footer } from './components/layout/Footer'
import { MobileBookingBar } from './components/layout/MobileBookingBar'
import { Navbar } from './components/layout/Navbar'
import { About } from './sections/About'
import { Differentials } from './sections/Differentials'
import { Faq } from './sections/Faq'
import { FinalCta } from './sections/FinalCta'
import { Hero } from './sections/Hero'
import { Results } from './sections/Results'
import { Stats } from './sections/Stats'
import { Team } from './sections/Team'
import { Testimonials } from './sections/Testimonials'
import { TreatmentMarquee } from './sections/TreatmentMarquee'
import { Treatments } from './sections/Treatments'

export default function App() {
  useSmoothScroll()
  useSpotlight()

  return (
    <BookingProvider>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-navy-950 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
      >
        Pular para o conteúdo
      </a>
      <Navbar />
      <main id="conteudo">
        <Hero />
        <Stats />
        <TreatmentMarquee />
        <Treatments />
        <About />
        <Differentials />
        <Results />
        <Testimonials />
        <Team />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileBookingBar />
    </BookingProvider>
  )
}
