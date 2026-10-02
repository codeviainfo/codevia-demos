import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SplitText from '../motion/SplitText'
import Reveal from '../motion/Reveal'
import { FAQ, FIRM } from '../data/content'

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="relative bg-paper py-28 sm:py-36">
      <div className="shell grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div>
          <Reveal as="p" className="flex items-center gap-3 text-micro uppercase text-lima-deep">
            <span className="bg-grad h-px w-8" />
            Preguntas frecuentes
          </Reveal>
          <SplitText as="h2" text="Lo que *suelen* *preguntarnos.*" className="mt-6 block max-w-[12ch] text-h2 text-ink" />
          <Reveal as="p" delay={0.2} className="mt-6 max-w-prose text-body-lg text-ink-body">
            ¿Tu duda no está aquí? Llámanos al{' '}
            <a href={FIRM.phoneHref} className="whitespace-nowrap font-semibold text-ink underline decoration-lima decoration-2 underline-offset-4 transition-colors hover:text-lima-deep">
              {FIRM.phone}
            </a>
            .
          </Reveal>
        </div>

        <ul className="border-b border-line">
          {FAQ.map((f, i) => {
            const on = open === i
            const id = `faq-${i}`
            return (
              <Reveal as="li" key={f.q} delay={i * 0.06} y={16} className="border-t border-line">
                <h3 className="font-sans">
                  <button
                    type="button"
                    aria-expanded={on}
                    aria-controls={id}
                    onClick={() => setOpen(on ? -1 : i)}
                    className="group flex w-full items-center justify-between gap-6 py-7 text-left"
                  >
                    <span className={`font-display text-[1.375rem] leading-snug transition-colors duration-400 sm:text-[1.625rem] ${on ? 'text-ink' : 'text-ink-soft group-hover:text-ink'}`}>
                      {f.q}
                    </span>
                    <span className={`relative h-9 w-9 shrink-0 rounded-pill border transition-all duration-500 ${on ? 'border-lima bg-lima' : 'border-line group-hover:border-ink-soft'}`}>
                      <span className="absolute left-1/2 top-1/2 h-px w-3 -translate-x-1/2 -translate-y-1/2 bg-ink" />
                      <span className={`absolute left-1/2 top-1/2 h-3 w-px -translate-x-1/2 -translate-y-1/2 bg-ink transition-transform duration-500 ${on ? 'scale-y-0' : 'scale-y-100'}`} />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      id={id}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[60ch] pb-8 text-body-lg text-ink-body">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
