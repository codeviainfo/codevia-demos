import { useCallback, useEffect, useRef, useState } from 'react'
import SplitText from '../motion/SplitText'
import Reveal from '../motion/Reveal'
import { PRODUCTOS } from '../data/content'

function Flecha({ dir, onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 'prev' ? 'Productos anteriores' : 'Productos siguientes'}
      data-cursor
      className="flex h-11 w-11 items-center justify-center rounded-pill border border-ash text-chalk transition-all duration-400 ease-out hover:border-accent hover:bg-accent hover:text-void disabled:pointer-events-none disabled:opacity-30"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {dir === 'prev' ? <path d="M19 12H5M11 18l-6-6 6-6" /> : <path d="M5 12h14M13 6l6 6-6 6" />}
      </svg>
    </button>
  )
}

export default function Coleccion() {
  const railRef = useRef(null)
  const [edge, setEdge] = useState({ start: true, end: false })

  // El carril original solo se movia arrastrando con el raton: sin
  // teclado y sin lector de pantalla. Aqui es un scroll nativo con
  // snap, mas dos botones, asi que funciona con rueda, dedo, Tab y
  // flechas del teclado.
  const sync = useCallback(() => {
    const el = railRef.current
    if (!el) return
    setEdge({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft >= el.scrollWidth - el.clientWidth - 4,
    })
  }, [])

  useEffect(() => {
    const el = railRef.current
    if (!el) return
    sync()
    el.addEventListener('scroll', sync, { passive: true })
    window.addEventListener('resize', sync)
    return () => {
      el.removeEventListener('scroll', sync)
      window.removeEventListener('resize', sync)
    }
  }, [sync])

  const nudge = (dir) => {
    const el = railRef.current
    if (!el) return
    const card = el.querySelector('li')
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8
    el.scrollBy({ left: dir === 'prev' ? -step : step, behavior: 'smooth' })
  }

  return (
    <section id="coleccion" className="bg-coal pb-28 sm:pb-36 lg:pb-44">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Reveal as="p" className="flex items-center gap-3 text-micro uppercase text-accent">
              <span className="h-1.5 w-1.5 rounded-pill bg-accent" />
              Colección
            </Reveal>
            <SplitText
              as="h2"
              text="Lo más *destacado*"
              className="mt-6 block font-display text-h2 uppercase text-chalk"
            />
            <Reveal as="p" delay={0.25} className="mt-6 max-w-prose text-body-lg text-chalk-dim">
              Piezas seleccionadas de la temporada, disponibles en todas las
              tallas.
            </Reveal>
          </div>

          <Reveal delay={0.3} className="flex gap-3">
            <Flecha dir="prev" onClick={() => nudge('prev')} disabled={edge.start} />
            <Flecha dir="next" onClick={() => nudge('next')} disabled={edge.end} />
          </Reveal>
        </div>
      </div>

      {/* El carril sangra hasta el borde: se intuye que hay mas piezas. */}
      <ul
        ref={railRef}
        tabIndex={0}
        aria-label="Productos destacados"
        className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 [scrollbar-width:none] sm:px-10 lg:px-14 [&::-webkit-scrollbar]:hidden"
      >
        {PRODUCTOS.map((prod, i) => (
          <li
            key={prod.name}
            className="w-[70vw] shrink-0 snap-start sm:w-[45vw] lg:w-[23vw] xl:w-[21rem]"
          >
            <Reveal delay={i * 0.07} y={30}>
              <article className="group" data-cursor>
                <div className="relative overflow-hidden rounded-card bg-smoke">
                  <img
                    src={prod.img}
                    alt={prod.alt}
                    width={900}
                    height={1125}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-900 ease-out group-hover:scale-105"
                  />
                  {prod.badge && (
                    <span className="absolute left-4 top-4 rounded-pill bg-accent px-3 py-1.5 text-micro uppercase text-void">
                      {prod.badge}
                    </span>
                  )}
                  <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition-transform duration-500 ease-out group-hover:translate-y-0">
                    <span className="block rounded-pill bg-chalk py-3 text-center text-micro uppercase text-void transition-colors duration-400 group-hover:bg-accent">
                      Añadir a la cesta
                    </span>
                  </div>
                </div>

                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h3 className="text-title text-chalk transition-colors duration-400 group-hover:text-accent">
                    {prod.name}
                  </h3>
                  <p className="shrink-0 font-display text-title text-chalk">
                    {prod.old && (
                      <span className="mr-2 font-sans text-caption font-normal text-stone line-through">
                        {prod.old}
                      </span>
                    )}
                    {prod.price}
                  </p>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}
