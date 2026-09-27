import Header from './components/Header'
import Hero from './components/Hero'
import Servicios from './components/Servicios'
import Porque from './components/Porque'
import Cita from './components/Cita'
import Footer from './components/Footer'
import DemoBadge from './components/DemoBadge'

export default function App() {
  return (
    <>
      <a
        href="#servicios"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-caption focus:text-white"
      >
        Saltar al contenido
      </a>

      <Header />

      <main>
        <Hero />
        <Servicios />
        <Porque />
        <Cita />
      </main>

      <Footer />
      <DemoBadge />
    </>
  )
}
