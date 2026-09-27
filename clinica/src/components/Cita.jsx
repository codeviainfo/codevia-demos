import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SplitText from '../motion/SplitText'
import Reveal from '../motion/Reveal'
import Magnetic from '../motion/Magnetic'
import Icon from './Icon'
import { CLINIC, ESPECIALIDADES } from '../data/content'

const controlClass =
  'w-full rounded border border-line bg-canvas px-4 py-3.5 text-body text-ink transition-all duration-400 ease-out placeholder:text-muted hover:border-accent/50 focus:border-accent'

function Field({ id, label, children }) {
  return (
    <div className="flex flex-col gap-2.5">
      {/* `htmlFor` real: antes los <label> no estaban asociados a su campo. */}
      <label htmlFor={id} className="text-micro uppercase text-muted">
        {label}
      </label>
      {children}
    </div>
  )
}

export default function Cita() {
  const uid = useId()
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    window.setTimeout(() => setSent(false), 4000)
  }

  const info = [
    { icon: 'clock', t: 'Horario', v: CLINIC.hours },
    { icon: 'pin', t: 'Dirección', v: CLINIC.address },
    { icon: 'phone', t: 'Teléfono', v: CLINIC.phone },
  ]

  return (
    <section id="cita" className="relative isolate overflow-hidden bg-surface py-28 sm:py-36 lg:py-44">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_90%_15%,#dff5f2,transparent_55%)]"
      />

      <div className="shell grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <Reveal as="p" className="flex items-center gap-3 text-micro uppercase text-accent">
            <span className="h-1.5 w-1.5 rounded-pill bg-accent" />
            Cita previa
          </Reveal>

          <SplitText
            as="h2"
            text="Pide tu cita en un *minuto*"
            className="mt-6 block max-w-[15ch] text-h2 text-ink"
          />

          <Reveal as="p" delay={0.25} className="mt-6 max-w-prose text-body-lg text-ink-body">
            Elige el servicio y te confirmamos la disponibilidad por teléfono o
            WhatsApp.
          </Reveal>

          <Reveal delay={0.35} className="mt-12">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-7 rounded-xl border border-line bg-canvas p-8 shadow-card transition-shadow duration-500 focus-within:shadow-lift sm:p-10"
            >
              <div className="grid gap-7 sm:grid-cols-2">
                <Field id={uid + '-esp'} label="Especialidad">
                  <select id={uid + '-esp'} name="especialidad" className={controlClass}>
                    {ESPECIALIDADES.map((e) => (
                      <option key={e}>{e}</option>
                    ))}
                  </select>
                </Field>
                <Field id={uid + '-fecha'} label="Fecha preferida">
                  <input id={uid + '-fecha'} name="fecha" type="date" className={controlClass} />
                </Field>
              </div>

              <div className="grid gap-7 sm:grid-cols-2">
                <Field id={uid + '-nombre'} label="Nombre">
                  <input
                    id={uid + '-nombre'}
                    name="nombre"
                    type="text"
                    autoComplete="name"
                    placeholder="Tu nombre"
                    className={controlClass}
                  />
                </Field>
                <Field id={uid + '-tel'} label="Teléfono">
                  <input
                    id={uid + '-tel'}
                    name="telefono"
                    type="tel"
                    autoComplete="tel"
                    placeholder="600 000 000"
                    className={controlClass}
                  />
                </Field>
              </div>

              <div>
                <Magnetic strength={0.16} className="w-full">
                  <button
                    type="submit"
                    className={
                      'group relative w-full overflow-hidden rounded-pill px-8 py-4 text-micro uppercase text-white transition-colors duration-500 ' +
                      (sent ? 'bg-accent' : 'bg-ink')
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
                          {sent ? '✓ Solicitud enviada' : 'Solicitar cita'}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                    {!sent && (
                      <span className="absolute inset-0 -translate-y-full bg-accent transition-transform duration-600 ease-out group-hover:translate-y-0" />
                    )}
                  </button>
                </Magnetic>

                {/* El cambio de estado se anuncia a lectores de pantalla. */}
                <p aria-live="polite" className="sr-only">
                  {sent ? 'Solicitud de cita enviada correctamente.' : ''}
                </p>
                <p className="mt-4 text-center text-caption text-muted">
                  Ejemplo de formulario — no envía datos reales.
                </p>
              </div>
            </form>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="lg:pt-32">
          <div className="rounded-xl border border-line bg-canvas p-8 shadow-card sm:p-10">
            <h3 className="text-title text-ink">Información del centro</h3>
            <dl className="mt-8 space-y-px">
              {info.map((item) => (
                <div
                  key={item.t}
                  className="group flex items-start gap-4 border-t border-line-soft py-6 transition-all duration-500 ease-out last:border-b hover:pl-2"
                >
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-pill bg-accent-tint text-accent transition-all duration-500 ease-out group-hover:bg-accent group-hover:text-white">
                    <Icon name={item.icon} size={17} animate={false} />
                  </span>
                  <div>
                    <dt className="text-micro uppercase text-muted">{item.t}</dt>
                    <dd className="mt-1.5 text-body text-ink">{item.v}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
