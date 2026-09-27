import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { NAV, CLINIC } from '../data/content'

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
      <motion.div style={{ scaleX: progress }} className="h-0.5 origin-left bg-accent" />

      <div
        className={`transition-all duration-600 ease-out ${
          solid || open
            ? 'border-b border-line bg-canvas/85 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="shell flex h-20 items-center justify-between">
          <a href="#top" className="group flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-pill bg-accent text-white transition-transform duration-600 ease-out group-hover:rotate-90">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                <path d="M12 3v18M3 12h18" />
              </svg>
            </span>
            <span className="text-title text-ink">{CLINIC.name}</span>
          </a>

          <nav aria-label="Principal" className="hidden items-center gap-9 lg:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative text-caption text-ink-body transition-colors duration-400 hover:text-ink"
              >
                {item.label}
                <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 rounded-pill bg-accent transition-all duration-500 ease-out group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#cita"
              className="hidden rounded-pill bg-ink px-6 py-3 text-micro uppercase text-white transition-all duration-400 ease-out hover:-translate-y-0.5 hover:bg-accent hover:shadow-lift sm:inline-flex"
            >
              Pedir cita
            </a>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              className="flex h-10 w-10 items-center justify-center rounded text-ink transition-colors duration-300 hover:bg-mist lg:hidden"
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
        className={`overflow-hidden bg-canvas/95 backdrop-blur-xl transition-all duration-600 ease-out lg:hidden ${
          open ? 'max-h-[70vh] border-b border-line opacity-100' : 'max-h-0 opacity-0'
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
              className={`border-b border-line-soft py-4 text-title text-ink transition-all duration-600 ease-out last:border-0 hover:text-accent ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#cita"
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
            className="my-4 rounded-pill bg-ink px-6 py-3.5 text-center text-micro uppercase text-white transition-colors duration-400 hover:bg-accent"
          >
            Pedir cita
          </a>
        </nav>
      </div>
    </header>
  )
}
