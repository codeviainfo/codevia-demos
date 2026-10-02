import { useCallback, useState } from 'react'
import Intro from './components/Intro'
import Header from './components/Header'
import Hero from './components/Hero'
import Servicios from './components/Servicios'
import Perfiles from './components/Perfiles'
import Calculadora from './components/Calculadora'
import Calendario from './components/Calendario'
import Metodo from './components/Metodo'
import Despacho from './components/Despacho'
import Faq from './components/Faq'
import Contacto from './components/Contacto'
import Footer from './components/Footer'
import DemoBadge from './components/DemoBadge'

export default function App() {
  const [ready, setReady] = useState(false)
  const onDone = useCallback(() => setReady(true), [])

  return (
    <>
      <Intro onDone={onDone} />
      {ready && <Page />}
    </>
  )
}

function Page() {
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
        <Perfiles />
        <Calculadora />
        <Calendario />
        <Metodo />
        <Despacho />
        <Faq />
        <Contacto />
      </main>

      <Footer />
      <DemoBadge />
    </>
  )
}
