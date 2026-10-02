import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import SplitText from '../motion/SplitText'
import Reveal from '../motion/Reveal'
import Magnetic from '../motion/Magnetic'
import { METODO } from '../data/content'

/**
 * Titulo fijo a la izquierda y pasos a la derecha. La linea que une
 * los pasos se rellena con el scroll, como un expediente que avanza.
 */
export default function Metodo() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  return (
    <section id="metodo" className="relative bg-canvas py-28 sm:py-36">
      <div className="shell grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal as="p" className="flex items-center gap-3 text-micro uppercase text-lima-deep">
            <span className="bg-grad h-px w-8" />
            Cómo trabajamos
          </Reveal>
          <SplitText as="h2" text="Cuatro pasos y *ninguna* *sorpresa.*" className="mt-6 block max-w-[12ch] text-h2 text-ink" />
          <Reveal as="p" delay={0.2} className="mt-6 max-w-prose text-body-lg text-ink-body">
            Un método sencillo, el mismo desde el primer día: escuchar,
            proponer, ocuparnos y avisarte antes de que haga falta.
          </Reveal>
          <Reveal delay={0.3} className="mt-10">
            <Magnetic>
              <a
                href="#contacto"
                className="group relative inline-flex overflow-hidden rounded-pill bg-ink px-8 py-4 text-micro uppercase text-white"
              >
                <span className="relative z-10 transition-colors duration-500 group-hover:text-ink">Empezar por el paso 1</span>
                <span className="absolute inset-0 -translate-y-full bg-lima transition-transform duration-600 ease-out group-hover:translate-y-0" />
              </a>
            </Magnetic>
          </Reveal>
        </div>

        <ol ref={ref} className="relative">
          <span aria-hidden="true" className="absolute bottom-6 left-[1.6875rem] top-6 w-px bg-line" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: fill }}
            className="absolute bottom-6 left-[1.6875rem] top-6 w-px origin-top bg-gradient-to-b from-oliva to-lima"
          />

          {METODO.map((m, i) => (
            <Reveal as="li" key={m.n} delay={i * 0.08} className="relative flex gap-8 pb-16 last:pb-0">
              <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-pill border border-line bg-canvas font-display text-body-lg text-ink shadow-card">
                {m.n}
              </span>
              <div className="pt-2.5">
                <h3 className="text-h3 text-ink">{m.title}</h3>
                <p className="mt-3 max-w-prose text-body-lg text-ink-body">{m.desc}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
