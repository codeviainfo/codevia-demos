import { useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion'
import SplitText from '../motion/SplitText'
import Reveal from '../motion/Reveal'
import { MENU } from '../data/content'

export default function Menu() {
  const reduce = useReducedMotion()
  const [preview, setPreview] = useState(null)

  // La vista previa flota siguiendo al raton con retardo elastico.
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const px = useSpring(x, { stiffness: 190, damping: 22, mass: 0.5 })
  const py = useSpring(y, { stiffness: 190, damping: 22, mass: 0.5 })

  const fine = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
  const canPreview = fine && !reduce

  const track = (e) => {
    if (!canPreview) return
    x.set(e.clientX)
    y.set(e.clientY)
  }

  return (
    <section id="carta" className="relative bg-void py-28 sm:py-40 lg:py-48" onMouseMove={track}>
      <div className="shell">
        <Reveal as="p" className="flex items-center gap-4 text-micro uppercase text-gold">
          <span className="h-px w-10 bg-gold" />
          Carta
        </Reveal>

        <SplitText
          as="h2"
          text="Una selección de *temporada*"
          className="mt-7 block max-w-[16ch] font-display text-h2 font-light text-cream"
        />

        <Reveal as="p" delay={0.25} className="mt-7 max-w-prose text-body-lg text-cream-dim">
          Platos pensados para compartir, con producto local y técnicas de brasa.
          La carta completa cambia cada mes.
        </Reveal>

        <div className="mt-24 space-y-24">
          {MENU.map((group) => (
            <div key={group.id}>
              <Reveal className="flex items-baseline gap-6">
                <h3 className="whitespace-nowrap font-display text-h3 italic font-light text-gold">
                  {group.title}
                </h3>
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  className="h-px flex-1 origin-left bg-ash"
                />
                <span className="text-micro uppercase tabular-nums text-sand">
                  {String(group.items.length).padStart(2, '0')}
                </span>
              </Reveal>

              <ul className="mt-10">
                {group.items.map((item, i) => (
                  <Reveal
                    as="li"
                    key={item.name}
                    delay={i * 0.07}
                    y={18}
                    onMouseEnter={() => canPreview && setPreview(item)}
                    onMouseLeave={() => canPreview && setPreview(null)}
                    data-cursor
                    className="group border-b border-ash py-7 transition-all duration-600 ease-out first:border-t hover:border-gold/40 hover:pl-4"
                  >
                    <div className="flex items-baseline gap-5">
                      <h4 className="font-display text-title font-light text-cream transition-colors duration-400 group-hover:text-gold-soft">
                        {item.name}
                      </h4>
                      <span className="hidden h-px flex-1 bg-ash sm:block" />
                      <span className="ml-auto shrink-0 font-display text-title italic tabular-nums text-gold transition-transform duration-500 ease-out group-hover:scale-110 sm:ml-0">
                        {item.price} €
                      </span>
                    </div>

                    {/* Siempre visible. Antes vivia tras un :hover, asi que
                        en movil era contenido inalcanzable. */}
                    <p className="mt-2.5 max-w-prose text-caption text-sand transition-colors duration-400 group-hover:text-cream-dim">
                      {item.desc}
                    </p>

                    {item.tag && (
                      <span className="mt-4 inline-flex rounded-pill border border-ash px-3 py-1 text-micro uppercase text-sand transition-colors duration-400 group-hover:border-gold/50 group-hover:text-gold">
                        {item.tag}
                      </span>
                    )}
                  </Reveal>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Vista previa del plato: sigue al cursor, solo en raton fino. */}
      {canPreview && (
        <motion.div
          style={{ x: px, y: py }}
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-[120]"
        >
          <AnimatePresence>
            {preview && (
              <motion.div
                initial={{ opacity: 0, scale: 0.88, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: -2 }}
                exit={{ opacity: 0, scale: 0.9, rotate: -5 }}
                transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                className="-ml-[9rem] -mt-[6rem] h-48 w-72 overflow-hidden rounded-card border border-ash shadow-2xl"
              >
                <img
                  src={preview.img}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/60 to-transparent" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  )
}
