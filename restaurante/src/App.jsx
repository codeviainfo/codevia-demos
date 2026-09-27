import Cursor from './motion/Cursor'
import Header from './components/Header'
import Hero from './components/Hero'
import Ribbon from './components/Ribbon'
import Menu from './components/Menu'
import Showcase from './components/Showcase'
import Ambiente from './components/Ambiente'
import Gallery from './components/Gallery'
import Reservas from './components/Reservas'
import Footer from './components/Footer'
import DemoBadge from './components/DemoBadge'

export default function App() {
  return (
    <div className="grain">
      <a
        href="#carta"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded focus:bg-cream focus:px-4 focus:py-2 focus:text-caption focus:text-void"
      >
        Saltar al contenido
      </a>

      <Cursor />
      <Header />

      <main>
        <Hero />
        <Ribbon />
        <Menu />
        <Showcase />
        <Ambiente />
        <Gallery />
        <Reservas />
      </main>

      <Footer />
      <DemoBadge />
    </div>
  )
}
