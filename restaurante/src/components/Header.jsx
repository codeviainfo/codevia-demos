import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { NAV, RESTAURANT } from '../data/content'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const toggleRef = useRef(null)
  const panelRef = useRef(null)

  // Barra de progreso de lectura, arriba del todo.
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        setSolid(window.scrollY > 40)
        frame = 0
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    panelRef.current?.querySelector('a')?.focus()
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        style={{ scaleX: progress }}
        className="h-px origin-left bg-gold"
      />

      <div
        className={`transition-all duration-700 ease-out ${
          solid || open
            ? 'border-b border-ash bg-void/80 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="shell flex h-20 items-center justify-between py-4 sm:h-20">
          <a
            href="#top"
            className="font-display text-title font-normal text-cream transition-opacity duration-400 hover:opacity-70"
          >
            Ánf<span className="italic text-gold">o</span>ra
          </a>

          <nav aria-label="Principal" className="hidden items-center gap-11 md:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative text-micro uppercase text-cream-dim transition-colors duration-400 hover:text-cream"
              >
                {item.label}
                <span className="absolute -bottom-2 left-0 h-px w-0 bg-gold transition-all duration-600 ease-out group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#reservas"
              className="group relative hidden overflow-hidden rounded-pill border border-gold/50 px-6 py-2.5 text-micro uppercase text-gold-soft transition-colors duration-500 hover:text-void sm:inline-flex"
            >
              <span className="relative z-10">Reservar</span>
              <span className="absolute inset-0 -translate-y-full bg-gold transition-transform duration-500 ease-out group-hover:translate-y-0" />
            </a>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              className="flex h-10 w-10 items-center justify-center text-cream md:hidden"
            >
              <span className="relative block h-3.5 w-6">
                <span className={`absolute left-0 block h-px w-full bg-current transition-all duration-400 ease-out ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 top-1.5 block h-px w-full bg-current transition-opacity duration-300 ${open ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`absolute left-0 block h-px w-full bg-current transition-all duration-400 ease-out ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Panel movil: despliegue con transicion, nunca de golpe. */}
      <div
        id="menu-movil"
        ref={panelRef}
        className={`overflow-hidden bg-void/95 backdrop-blur-xl transition-all duration-600 ease-out md:hidden ${
          open ? 'max-h-[70vh] border-b border-ash opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav aria-label="Principal (móvil)" className="shell flex flex-col py-4">
          {NAV.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              style={{ transitionDelay: open ? `${i * 60 + 80}ms` : '0ms' }}
              className={`border-b border-ash py-5 font-display text-h3 text-cream transition-all duration-600 ease-out last:border-0 hover:text-gold ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
