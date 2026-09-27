import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { NAV, ANUNCIOS } from '../data/content'

function Anuncios() {
  return (
    <div className="overflow-hidden border-b border-ash bg-accent py-2">
      <div className="flex w-max animate-marquee-fast">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {ANUNCIOS.map((item) => (
              <span
                key={`${copy}-${item}`}
                className="flex items-center gap-8 px-8 text-micro uppercase text-void"
              >
                {item}
                <span className="h-1 w-1 rounded-pill bg-void/50" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function IconBtn({ label, children, badge }) {
  return (
    <button
      type="button"
      aria-label={label}
      data-cursor
      className="relative flex h-10 w-10 items-center justify-center rounded-pill border border-ash text-chalk transition-all duration-400 ease-out hover:border-accent hover:text-accent"
    >
      {children}
      {badge && (
        <span className="absolute -right-1 -top-1 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-pill bg-accent px-1 text-[0.625rem] font-semibold text-void">
          {badge}
        </span>
      )}
    </button>
  )
}

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
      <Anuncios />
      <motion.div style={{ scaleX: progress }} className="h-px origin-left bg-accent" />

      <div
        className={`transition-all duration-600 ease-out ${
          solid || open ? 'border-b border-ash bg-void/85 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <div className="shell flex h-20 items-center justify-between sm:h-20">
          <a
            href="#top"
            className="font-display text-title font-extrabold uppercase tracking-tight text-chalk transition-colors duration-400 hover:text-accent"
          >
            Néb<span className="text-accent">u</span>la
          </a>

          <nav aria-label="Principal" className="hidden items-center gap-10 lg:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                data-cursor
                className="group relative overflow-hidden text-micro uppercase text-chalk-dim transition-colors duration-400 hover:text-chalk"
              >
                {item.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-accent transition-all duration-500 ease-out group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <IconBtn label="Buscar">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </IconBtn>
            <IconBtn label="Carrito (2 artículos)" badge="2">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
              </svg>
            </IconBtn>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              className="flex h-10 w-10 items-center justify-center text-chalk lg:hidden"
            >
              <span className="relative block h-3.5 w-6">
                <span className={`absolute left-0 block h-0.5 w-full bg-current transition-all duration-400 ease-out ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 top-1.5 block h-0.5 w-full bg-current transition-opacity duration-300 ${open ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`absolute left-0 block h-0.5 w-full bg-current transition-all duration-400 ease-out ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div
        id="menu-movil"
        ref={panelRef}
        className={`overflow-hidden bg-void/95 backdrop-blur-xl transition-all duration-600 ease-out lg:hidden ${
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
              style={{ transitionDelay: open ? `${i * 55 + 70}ms` : '0ms' }}
              className={`border-b border-ash py-5 font-display text-h3 uppercase text-chalk transition-all duration-600 ease-out last:border-0 hover:text-accent ${
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
