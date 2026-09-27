import SplitText from '../motion/SplitText'
import Reveal from '../motion/Reveal'
import { CATEGORIAS } from '../data/content'

export default function Categorias() {
  return (
    <section id="novedades" className="bg-coal py-28 sm:py-36 lg:py-44">
      <div className="shell">
        <Reveal as="p" className="flex items-center gap-3 text-micro uppercase text-accent">
          <span className="h-1.5 w-1.5 rounded-pill bg-accent" />
          Explora
        </Reveal>

        <SplitText
          as="h2"
          text="Compra por *categoría*"
          className="mt-6 block max-w-[14ch] font-display text-h2 uppercase text-chalk"
        />

        {/* Bento: la primera categoria ocupa cuatro veces mas espacio.
            Las fotos son <img> reales, no fondos CSS, asi que tienen
            alt, carga diferida y dimensiones intrinsecas. */}
        <div className="mt-16 grid auto-rows-[190px] grid-cols-2 gap-4 sm:mt-20 sm:grid-cols-4 sm:gap-5">
          {CATEGORIAS.map((cat, i) => (
            <Reveal
              key={cat.title}
              delay={i * 0.09}
              y={32}
              className={`h-full ${cat.span}`}
            >
              <a
                href="#coleccion"
                data-cursor
                className="group relative flex h-full overflow-hidden rounded-card bg-smoke"
              >
                <img
                  src={cat.img}
                  alt={cat.alt}
                  width={1200}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-900 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/25 to-transparent transition-opacity duration-500 group-hover:from-void/80" />

                <span className="relative mt-auto flex w-full items-end justify-between gap-3 p-6">
                  <span>
                    <span className="block font-display text-h3 uppercase text-chalk">
                      {cat.title}
                    </span>
                    <span className="mt-1 block text-caption text-chalk-dim">{cat.count}</span>
                  </span>
                  <span className="flex h-9 w-9 shrink-0 translate-y-1 items-center justify-center rounded-pill border border-chalk/30 text-chalk opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:border-accent group-hover:bg-accent group-hover:text-void group-hover:opacity-100">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M7 17 17 7M9 7h8v8" />
                    </svg>
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
