import { useState } from 'react'
import { motion } from 'framer-motion'
import SplitText from '../motion/SplitText'
import { SHOWCASE } from '../data/content'

/**
 * Scroll anclado: la columna de imagen se queda fija mientras los
 * bloques de texto pasan por delante, y la foto cambia con fundido
 * segun el bloque que este en pantalla.
 */
export default function Showcase() {
  const [active, setActive] = useState(0)

  return (
    <section className="bg-coal py-28 sm:py-40 lg:py-48">
      <div className="shell">
        <p className="flex items-center gap-4 text-micro uppercase text-gold">
          <span className="h-px w-10 bg-gold" />
          La casa
        </p>
        <SplitText
          as="h2"
          text="Tres cosas que no *negociamos*"
          className="mt-7 block max-w-[16ch] font-display text-h2 font-light text-cream"
        />

        <div className="mt-20 grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Columna fija con las fotos superpuestas. */}
          <div className="hidden lg:block">
            <div className="sticky top-32 aspect-[4/5] overflow-hidden rounded-card">
              {SHOWCASE.map((item, i) => (
                <motion.img
                  key={item.img}
                  src={item.img}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  animate={{
                    opacity: active === i ? 1 : 0,
                    scale: active === i ? 1 : 1.08,
                  }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ))}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/50 to-transparent" />
            </div>
          </div>

          {/* Bloques de texto que activan la foto correspondiente. */}
          <div className="space-y-24 lg:space-y-48">
            {SHOWCASE.map((item, i) => (
              <motion.div
                key={item.n}
                onViewportEnter={() => setActive(i)}
                viewport={{ margin: '-45% 0px -45% 0px' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* En movil cada bloque lleva su propia foto. */}
                <img
                  src={item.img}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className="mb-8 aspect-[4/3] w-full rounded-card object-cover lg:hidden"
                />
                <span className="font-display text-h3 italic text-gold/50">{item.n}</span>
                <h3 className="mt-4 font-display text-h3 font-light text-cream">
                  {item.title}
                </h3>
                <p className="mt-5 max-w-prose text-body-lg text-cream-dim">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
