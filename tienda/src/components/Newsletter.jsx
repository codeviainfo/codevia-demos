import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SplitText from '../motion/SplitText'
import Reveal from '../motion/Reveal'
import Magnetic from '../motion/Magnetic'

export default function Newsletter() {
  const uid = useId()
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    window.setTimeout(() => setSent(false), 4000)
  }

  return (
    <section className="relative isolate overflow-hidden bg-accent py-24 sm:py-32">
      {/* Palabra de fondo en el propio acento, un tono mas oscuro. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 overflow-hidden">
        <div className="flex w-max animate-marquee-fast opacity-30">
          {[0, 1].map((i) => (
            <span key={i} className="whitespace-nowrap px-6 font-display text-mega uppercase text-accent-deep">
              10 % dto · 10 % dto ·{' '}
            </span>
          ))}
        </div>
      </div>

      <div className="shell text-center">
        <SplitText
          as="h2"
          text="Un 10 % en tu primer pedido"
          className="mx-auto block max-w-[16ch] font-display text-h2 uppercase text-void"
        />

        <Reveal as="p" delay={0.25} className="mx-auto mt-6 max-w-prose text-body-lg text-void/75">
          Súmate a la newsletter y entérate antes que nadie de nuevas colecciones
          y ofertas.
        </Reveal>

        <Reveal delay={0.35} className="mx-auto mt-10 max-w-xl">
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3 sm:flex-row">
            {/* La etiqueta existe de verdad, aunque no se vea: el campo
                original no tenia ninguna asociada. */}
            <label htmlFor={uid + '-email'} className="sr-only">
              Tu correo electrónico
            </label>
            <input
              id={uid + '-email'}
              name="email"
              type="email"
              autoComplete="email"
              placeholder="tu@email.com"
              className="w-full rounded-pill border border-void/20 bg-void/5 px-6 py-4 text-body text-void transition-all duration-400 ease-out placeholder:text-void/45 hover:border-void/40 focus:border-void focus:bg-void/10"
            />

            <Magnetic strength={0.16}>
              <button
                type="submit"
                data-cursor
                className="group relative w-full shrink-0 overflow-hidden rounded-pill bg-void px-8 py-4 text-micro uppercase text-accent sm:w-auto"
              >
                <span className="relative z-10 block whitespace-nowrap">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={sent ? 'ok' : 'idle'}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.28 }}
                      className="block"
                    >
                      {sent ? '✓ Suscrito' : 'Suscribirme'}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </button>
            </Magnetic>
          </form>

          <p aria-live="polite" className="sr-only">
            {sent ? 'Suscripción completada.' : ''}
          </p>
          <p className="mt-5 text-caption text-void/60">
            Ejemplo de formulario — no envía datos reales.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
