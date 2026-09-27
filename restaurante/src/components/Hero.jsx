import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SplitText from '../motion/SplitText'
import Reveal from '../motion/Reveal'
import Magnetic from '../motion/Magnetic'
import { RESTAURANT } from '../data/content'

export default function Hero() {
  const ref = useRef(null)

  // Parallax por transform (compositado en GPU). El original movia
  // `background-position` en cada evento de scroll, que repinta.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '24%'])
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '38%'])
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden"
    >
      {/* Capa de imagen con ken-burns lento + parallax al hacer scroll. */}
      <motion.div style={{ y: imageY }} className="absolute inset-0 -z-20 h-[125%]">
        <img
          src="/img/hero.jpg"
          alt=""
          aria-hidden="true"
          width={2400}
          height={1600}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full animate-kenburns object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-void via-void/75 to-void/45" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_20%_20%,rgba(201,162,39,0.14),transparent_55%)]" />

      {/* Marquesina de contorno detras del titular. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[22%] -z-10 overflow-hidden"
      >
        <div className="flex w-max animate-marquee">
          {[0, 1].map((i) => (
            <span
              key={i}
              className="whitespace-nowrap px-10 font-display text-mega italic text-transparent [-webkit-text-stroke:1px_rgba(247,243,234,0.09)]"
            >
              Ánfora · Ánfora · Ánfora ·{' '}
            </span>
          ))}
        </div>
      </div>

      <motion.div style={{ y: copyY, opacity: fade }} className="shell pb-28 pt-40 sm:pb-36">
        <Reveal as="p" className="flex items-center gap-4 text-micro uppercase text-gold">
          <span className="h-px w-10 bg-gold" />
          {RESTAURANT.tagline}
        </Reveal>

        <SplitText
          as="h1"
          text="Cocina *mediterránea* con alma, mesa a mesa."
          delay={0.15}
          className="mt-8 block max-w-[14ch] font-display text-h1 font-light text-cream"
        />

        <div className="mt-12 flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between sm:gap-16">
          <Reveal as="p" delay={0.5} className="max-w-prose text-body-lg text-cream-dim">
            Producto de mercado, brasa lenta y una carta que cambia con las
            estaciones. Un sitio para quedarse, hablar y volver.
          </Reveal>

          <Reveal delay={0.62} className="flex shrink-0 flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href="#reservas"
                data-cursor
                className="group relative inline-flex overflow-hidden rounded-pill bg-cream px-8 py-4 text-micro uppercase text-void transition-colors duration-500 hover:text-void"
              >
                <span className="relative z-10">Reservar mesa</span>
                <span className="absolute inset-0 -translate-x-full bg-gold transition-transform duration-600 ease-out group-hover:translate-x-0" />
              </a>
            </Magnetic>
            <a
              href="#carta"
              data-cursor
              className="group inline-flex items-center gap-3 text-micro uppercase text-cream-dim transition-colors duration-400 hover:text-cream"
            >
              Ver la carta
              <span className="h-px w-8 bg-current transition-all duration-500 ease-out group-hover:w-14" />
            </a>
          </Reveal>
        </div>
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="text-micro uppercase text-sand">Descubre</span>
        <span className="h-9 w-px animate-cue bg-gradient-to-b from-gold to-transparent" />
      </motion.div>
    </section>
  )
}
