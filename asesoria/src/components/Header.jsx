import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Logo from './Logo'
import { NAV, FIRM } from '../data/content'

/**
 * Sobre el hero (oscuro) la cabecera es transparente y clara; al
 * bajar pasa a marfil con texto oscuro. `solid` decide ambas cosas.
 */
export default function Header() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const toggleRef = useRef(null)
  const panelRef = useRef(null)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        setSolid(window.scrollY > window.innerHeight * 0.75)
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

  const light = solid || open

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div style={{ scaleX: progress }} className="bg-grad h-0.5 origin-left" />

      <div
        className={`transition-all duration-700 ease-out ${
          light
            ? 'border-b border-line bg-paper/95 backdrop-blur-xl'
            : 'border-b border-white/[0.06] bg-night/30 backdrop-blur-md'
        }`}
      >
        <div className="shell flex h-20 items-center justify-between">
          <a href="#top" className="group flex items-center gap-3" aria-label={`${FIRM.fullName}, ir al inicio`}>
            <Logo
              variant="mark"
              className="h-11 w-11 transition-transform duration-900 ease-out group-hover:rotate-[20deg]"
            />
            <span className="flex flex-col font-logo leading-none">
              <span className={`text-[0.8125rem] tracking-wide transition-colors duration-700 ${light ? 'text-muted' : 'text-night-muted'}`}>
                Asesoría
              </span>
              <span className="text-[1.375rem] tracking-wide text-lima">Noega</span>
            </span>
          </a>

          <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`group relative text-caption font-medium transition-colors duration-400 ${
                  light ? 'text-ink-body hover:text-ink' : 'text-white/70 hover:text-white'
                }`}
              >
                {item.label}
                <span className="bg-grad absolute -bottom-1.5 left-0 h-px w-0 transition-all duration-500 ease-out group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contacto"
              className={`hidden rounded-pill px-6 py-3 text-micro uppercase transition-all duration-400 ease-out hover:-translate-y-0.5 sm:inline-flex ${
                light
                  ? 'bg-ink text-white hover:bg-lima hover:text-ink hover:shadow-lift'
                  : 'bg-white text-ink hover:bg-lima-soft'
              }`}
            >
              Primera consulta
            </a>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              className={`flex h-10 w-10 items-center justify-center rounded transition-colors duration-300 lg:hidden ${
                light ? 'text-ink hover:bg-paper-deep' : 'text-white hover:bg-white/10'
              }`}
            >
              <span className="relative block h-3.5 w-5">
                <span className={`absolute left-0 block h-0.5 w-full rounded-pill bg-current transition-all duration-400 ease-out ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 top-1.5 block h-0.5 w-full rounded-pill bg-current transition-opacity duration-300 ${open ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`absolute left-0 block h-0.5 w-full rounded-pill bg-current transition-all duration-400 ease-out ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div
        id="menu-movil"
        ref={panelRef}
        className={`overflow-hidden bg-paper/95 backdrop-blur-xl transition-all duration-600 ease-out lg:hidden ${
          open ? 'max-h-[80vh] border-b border-line opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav aria-label="Principal (móvil)" className="shell flex flex-col py-3">
          {NAV.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              style={{ transitionDelay: open ? `${i * 55 + 70}ms` : '0ms' }}
              className={`border-b border-line-soft py-4 font-display text-h3 text-ink transition-all duration-600 ease-out last:border-0 hover:text-lima-deep ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
            className="my-4 rounded-pill bg-ink px-6 py-3.5 text-center text-micro uppercase text-white transition-colors duration-400 hover:bg-lima hover:text-ink"
          >
            Pedir primera consulta
          </a>
        </nav>
      </div>
    </header>
  )
}
