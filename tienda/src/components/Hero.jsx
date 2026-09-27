import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SplitText from '../motion/SplitText'
import Reveal from '../motion/Reveal'
import Magnetic from '../motion/Magnetic'
import Counter from './Counter'
import { STATS } from '../data/content'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const wordX = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])

  return (
    <section id="top" ref={ref} className="relative isolate overflow-hidden pt-36 sm:pt-44">
      {/* Palabra de fondo a tamaño bestia, desplazandose con el scroll. */}
      <motion.div
        aria-hidden="true"
        style={{ x: wordX }}
        className="pointer-events-none absolute inset-x-0 top-[34%] -z-10 overflow-hidden"
      >
        <div className="flex w-max animate-marquee">
          {[0, 1].map((i) => (
            <span
              key={i}
              className="whitespace-nowrap px-8 font-display text-mega uppercase text-transparent [-webkit-text-stroke:1px_rgba(244,242,238,0.07)]"
            >
              Nébula · Nébula ·{' '}
            </span>
          ))}
        </div>
      </motion.div>

      <div className="shell grid items-end gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <Reveal as="p" className="flex items-center gap-3 text-micro uppercase text-accent">
            <span className="h-1.5 w-1.5 rounded-pill bg-accent" />
            Nueva colección · Otoño
          </Reveal>

          <SplitText
            as="h1"
            text="Diseño que se *lleva*."
            delay={0.1}
            className="mt-7 block max-w-[9ch] font-display text-h1 uppercase text-chalk"
          />

          <Reveal as="p" delay={0.45} className="mt-8 max-w-prose text-body-lg text-chalk-dim">
            Piezas atemporales pensadas para el día a día, hechas con materiales
            que duran más de una temporada.
          </Reveal>

          <Reveal delay={0.55} className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href="#coleccion"
                data-cursor
                className="group relative inline-flex overflow-hidden rounded-pill bg-accent px-8 py-4 text-micro uppercase text-void"
              >
                <span className="relative z-10">Ver colección</span>
                <span className="absolute inset-0 -translate-x-full bg-chalk transition-transform duration-600 ease-out group-hover:translate-x-0" />
              </a>
            </Magnetic>
            <a
              href="#nosotros"
              data-cursor
              className="group inline-flex items-center gap-3 rounded-pill border border-ash px-8 py-4 text-micro uppercase text-chalk transition-all duration-400 ease-out hover:-translate-y-0.5 hover:border-accent hover:text-accent"
            >
              Nuestra historia
              <span className="h-px w-5 bg-current transition-all duration-500 ease-out group-hover:w-9" />
            </a>
          </Reveal>

          <Reveal delay={0.7} className="mt-16 grid grid-cols-3 gap-6 border-t border-ash pt-9">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-stat text-chalk">
                  {stat.value ?? (
                    <Counter
                      to={stat.to}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      decimals={stat.decimals}
                      locale={stat.locale}
                    />
                  )}
                </p>
                <p className="mt-2 text-caption text-stone">{stat.label}</p>
              </div>
            ))}
          </Reveal>
        </div>

        {/* Producto destacado: la imagen entra desvelandose desde abajo. */}
        <motion.div style={{ y: imgY }} className="relative">
          <motion.figure
            initial={{ clipPath: 'inset(100% 0 0 0)' }}
            animate={{ clipPath: 'inset(0% 0 0 0)' }}
            transition={{ duration: 1.3, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="group relative overflow-hidden rounded-xl bg-smoke"
            data-cursor
          >
            <img
              src="/img/hero.jpg"
              alt="Chaqueta Studio, la pieza más vendida de la colección."
              width={1200}
              height={1500}
              fetchPriority="high"
              decoding="async"
              className="aspect-[4/5] w-full object-cover transition-transform duration-900 ease-out group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent" />

            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
              <span>
                <span className="block font-display text-title uppercase text-chalk">
                  Chaqueta Studio
                </span>
                <span className="mt-1 block text-caption text-chalk-dim">Más vendido</span>
              </span>
              <span className="rounded-pill bg-accent px-4 py-2 font-display text-title text-void">
                79 €
              </span>
            </figcaption>
          </motion.figure>

          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -left-3 top-8 rounded-pill border border-ash bg-void/90 px-4 py-2 text-caption text-chalk backdrop-blur-md"
          >
            ★ 4.9 (320)
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 1.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -right-2 bottom-24 rounded-pill bg-accent px-4 py-2 text-caption font-medium text-void"
          >
            Se agota
          </motion.span>
        </motion.div>
      </div>
    </section>
  )
}
