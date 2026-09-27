import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SplitText from '../motion/SplitText'
import Reveal from '../motion/Reveal'
import Magnetic from '../motion/Magnetic'
import { RESTAURANT } from '../data/content'

const inputClass =
  'w-full rounded border border-ash bg-void/60 px-4 py-3.5 text-body text-cream transition-all duration-400 ease-out placeholder:text-sand hover:border-sand focus:border-gold [color-scheme:dark]'

const stepperBtn =
  'flex items-center justify-center px-5 py-3.5 text-title text-gold-soft transition-colors duration-300 hover:bg-gold/10 disabled:opacity-25'

function Field({ id, label, children }) {
  return (
    <div className="flex flex-col gap-2.5">
      {/* `htmlFor` real: antes los <label> no estaban asociados a su input. */}
      <label htmlFor={id} className="text-micro uppercase text-sand">
        {label}
      </label>
      {children}
    </div>
  )
}

export default function Reservas() {
  const uid = useId()
  const [guests, setGuests] = useState(2)
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    window.setTimeout(() => setSent(false), 4000)
  }

  const info = [
    { t: 'Horario', d: [RESTAURANT.hours, RESTAURANT.kitchen] },
    { t: 'Dirección', d: [RESTAURANT.address, 'Parking público a 100 m'] },
    { t: 'Contacto', d: [RESTAURANT.phone, RESTAURANT.email] },
  ]

  return (
    <section
      id="reservas"
      className="relative isolate overflow-hidden bg-coal py-28 sm:py-40 lg:py-48"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_10%,rgba(201,162,39,0.10),transparent_55%)]" />

      <div className="shell grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
        <div>
          <p className="flex items-center gap-4 text-micro uppercase text-gold">
            <span className="h-px w-10 bg-gold" />
            Reservas
          </p>

          <SplitText
            as="h2"
            text="Reserva tu *mesa*"
            className="mt-7 block font-display text-h2 font-light text-cream"
          />

          <Reveal as="p" delay={0.25} className="mt-7 max-w-prose text-body-lg text-cream-dim">
            Rellena tus datos y te confirmamos por WhatsApp en menos de una hora.
          </Reveal>

          <Reveal delay={0.35} className="mt-14">
            <form onSubmit={handleSubmit} noValidate className="space-y-9">
              <div className="grid gap-9 sm:grid-cols-2">
                <Field id={uid + '-fecha'} label="Fecha">
                  <input id={uid + '-fecha'} name="fecha" type="date" className={inputClass} />
                </Field>
                <Field id={uid + '-hora'} label="Hora">
                  <input
                    id={uid + '-hora'}
                    name="hora"
                    type="time"
                    defaultValue="21:00"
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="grid gap-9 sm:grid-cols-2">
                <div className="flex flex-col gap-2.5">
                  <span id={uid + '-comensales'} className="text-micro uppercase text-sand">
                    Comensales
                  </span>
                  <div
                    role="group"
                    aria-labelledby={uid + '-comensales'}
                    className="flex w-fit items-center rounded border border-ash bg-void/60 transition-colors duration-400 hover:border-sand"
                  >
                    <button
                      type="button"
                      onClick={() => setGuests((g) => Math.max(1, g - 1))}
                      aria-label="Quitar un comensal"
                      disabled={guests <= 1}
                      className={stepperBtn}
                    >
                      &minus;
                    </button>
                    <output
                      aria-live="polite"
                      className="w-16 border-x border-ash py-3.5 text-center font-display text-title italic tabular-nums text-cream"
                    >
                      {guests}
                    </output>
                    <button
                      type="button"
                      onClick={() => setGuests((g) => Math.min(12, g + 1))}
                      aria-label="Añadir un comensal"
                      disabled={guests >= 12}
                      className={stepperBtn}
                    >
                      +
                    </button>
                  </div>
                </div>

                <Field id={uid + '-tel'} label="Teléfono">
                  <input
                    id={uid + '-tel'}
                    name="telefono"
                    type="tel"
                    autoComplete="tel"
                    placeholder="600 000 000"
                    className={inputClass}
                  />
                </Field>
              </div>

              <div>
                <Magnetic strength={0.18} className="w-full">
                  <button
                    type="submit"
                    data-cursor
                    className={
                      'group relative w-full overflow-hidden rounded-pill px-8 py-4 text-micro uppercase transition-colors duration-500 ' +
                      (sent ? 'bg-gold text-void' : 'bg-cream text-void')
                    }
                  >
                    <span className="relative z-10 block">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                          key={sent ? 'ok' : 'idle'}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.28 }}
                          className="block"
                        >
                          {sent ? '✓ Reserva enviada' : 'Confirmar reserva'}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                    {!sent && (
                      <span className="absolute inset-0 -translate-x-full bg-gold transition-transform duration-600 ease-out group-hover:translate-x-0" />
                    )}
                  </button>
                </Magnetic>

                {/* El cambio de estado se anuncia a lectores de pantalla. */}
                <p aria-live="polite" className="sr-only">
                  {sent ? 'Reserva enviada correctamente.' : ''}
                </p>
                <p className="mt-5 text-center text-caption text-sand">
                  Ejemplo de formulario — no envía datos reales.
                </p>
              </div>
            </form>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="lg:pt-28">
          <dl className="divide-y divide-ash border-y border-ash">
            {info.map((block) => (
              <div
                key={block.t}
                className="group py-8 transition-all duration-500 ease-out hover:pl-3"
              >
                <dt className="text-micro uppercase text-gold">{block.t}</dt>
                <dd className="mt-3.5 space-y-1 text-body text-cream-dim transition-colors duration-400 group-hover:text-cream">
                  {block.d.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
