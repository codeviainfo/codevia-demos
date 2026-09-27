import Cursor from './motion/Cursor'
import Header from './components/Header'
import Hero from './components/Hero'
import Categorias from './components/Categorias'
import Coleccion from './components/Coleccion'
import Porque from './components/Porque'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import DemoBadge from './components/DemoBadge'

export default function App() {
  return (
    <>
      <a
        href="#novedades"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-caption focus:text-void"
      >
        Saltar al contenido
      </a>

      <Cursor />
      <Header />

      <main>
        <Hero />
        <Categorias />
        <Coleccion />
        <Porque />
        <Newsletter />
      </main>

      <Footer />
      <DemoBadge />
    </>
  )
}
