import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SplitText from '../motion/SplitText'
import Reveal from '../motion/Reveal'
import Icon from './Icon'
import { SERVICIOS, MARQUEE } from '../data/content'

function Marquee() {
  return (
    <div className="overflow-hidden border-y border-line bg-paper py-6" aria-hidden="true">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {MARQUEE.map((item) => (
              <span key={`${copy}-${item}`} className="flex items-center gap-10 px-10 font-display text-[1.625rem] italic text-ink-soft/80">
                {item}
                <svg width="16" height="16" viewBox="0 0 20 20" className="text-lima">
                  <circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="38 6" />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Lista editorial: una fila por area. En escritorio se abre al pasar
 * el raton; en tactil, al tocar. Solo hay una abierta a la vez.
 */
export default function Servicios() {
  const [active, setActive] = useState(0)

  const hover = (i) => {
    if (window.matchMedia('(pointer: fine)').matches) setActive(i)
  }

  return (
    <>
      <Marquee />
      <section id="servicios" className="relative bg-paper py-28 sm:py-36">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div>
              <Reveal as="p" className="flex items-center gap-3 text-micro uppercase text-lima-deep">
                <span className="bg-grad h-px w-8" />
                Servicios
              </Reveal>
              <SplitText
                as="h2"
                text="Todo lo que tu negocio necesita, *en* *un* *solo* *despacho.*"
                className="mt-6 block max-w-[17ch] text-h2 text-ink"
              />
            </div>
            <Reveal as="p" delay={0.2} className="max-w-prose text-body-lg text-ink-body lg:pb-3">
              Fiscal, contable, laboral y mercantil bajo el mismo techo. Un único
              equipo que conoce tu situación completa y la mira con perspectiva.
            </Reveal>
          </div>

          <ul className="mt-16 border-b border-line sm:mt-20">
            {SERVICIOS.map((s, i) => {
              const open = active === i
              return (
                <Reveal as="li" key={s.n} delay={i * 0.06} y={20} className="border-t border-line">
                  <button
                    type="button"
                    onMouseEnter={() => hover(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(open ? -1 : i)}
                    aria-expanded={open}
                    className="group relative grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-7 text-left sm:grid-cols-[4rem_1fr_1fr_auto] sm:gap-8 sm:py-9"
                  >
                    <span className={`font-display text-body-lg transition-colors duration-500 ${open ? 'text-lima-deep' : 'text-muted'}`}>
                      {s.n}
                    </span>
                    <span className={`font-display text-h3 transition-all duration-600 ease-out ${open ? 'translate-x-2 text-ink' : 'text-ink-soft'}`}>
                      {s.title}
                    </span>
                    <span className="hidden text-body text-ink-body sm:block">{s.desc}</span>
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-pill border transition-all duration-600 ease-out ${
                        open ? 'rotate-45 border-lima bg-lima text-ink' : 'border-line text-ink-soft group-hover:border-ink-soft'
                      }`}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-6 pb-9 sm:grid-cols-[4rem_1fr_1fr_auto] sm:gap-8">
                          <span className="hidden sm:block" />
                          <span className="flex items-start">
                            <span className="flex h-16 w-16 items-center justify-center rounded-card bg-lima-tint text-lima-deep">
                              <Icon name={s.icon} size={28} />
                            </span>
                          </span>
                          <div>
                            <p className="mb-5 text-body text-ink-body sm:hidden">{s.desc}</p>
                            <ul className="space-y-3">
                              {s.items.map((it, k) => (
                                <motion.li
                                  key={it}
                                  initial={{ opacity: 0, x: -8 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.5, delay: 0.15 + k * 0.07 }}
                                  className="flex items-center gap-3 text-body text-ink"
                                >
                                  <span className="bg-grad h-px w-4 shrink-0" />
                                  {it}
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                          <span className="hidden w-11 sm:block" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Reveal>
              )
            })}
          </ul>
        </div>
      </section>
    </>
  )
}
