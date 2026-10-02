import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SplitText from '../motion/SplitText'
import Reveal from '../motion/Reveal'
import Magnetic from '../motion/Magnetic'
import Logo from './Logo'
import { FIRM } from '../data/content'

const PERFIL = ['Autónomo', 'Empresa', 'Particular']

const controlClass =
  'w-full rounded-card border border-line bg-paper px-4 py-3.5 text-body text-ink transition-all duration-400 ease-out placeholder:text-muted hover:border-oliva-soft focus:border-lima-deep focus:bg-canvas'

function Field({ id, label, children }) {
  return (
    <div className="flex flex-col gap-2.5">
      <label htmlFor={id} className="text-micro uppercase text-muted">
        {label}
      </label>
      {children}
    </div>
  )
}

/**
 * Formulario de demostracion: no envia nada, solo muestra el estado
 * de exito. En la web real se conectaria al correo del despacho.
 */
export default function Contacto() {
  const uid = useId()
  const [perfil, setPerfil] = useState(PERFIL[0])
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contacto" className="relative isolate overflow-hidden bg-paper-deep py-28 sm:py-36">
      <div aria-hidden="true" className="absolute -right-48 -top-48 -z-10 h-[44rem] w-[44rem] opacity-[0.07]">
        <Logo variant="mark" className="h-full w-full" title="" />
      </div>

      <div className="shell grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <Reveal as="p" className="flex items-center gap-3 text-micro uppercase text-lima-deep">
            <span className="bg-grad h-px w-8" />
            Primera consulta
          </Reveal>
          <SplitText as="h2" text="Cuéntanos tu caso. *Te* *llamamos* *nosotros.*" className="mt-6 block max-w-[13ch] text-h2 text-ink" />
          <Reveal as="p" delay={0.2} className="mt-6 max-w-prose text-body-lg text-ink-body">
            Déjanos tus datos y te contactamos en menos de 24 horas laborables
            para una primera valoración, sin compromiso.
          </Reveal>

          <Reveal delay={0.3} className="mt-12 border-t border-line pt-8">
            <p className="text-micro uppercase text-muted">¿Prefieres llamar?</p>
            <a
              href={FIRM.phoneHref}
              className="group mt-3 inline-flex items-baseline gap-4 font-display text-[clamp(2.25rem,4.5vw,3.25rem)] leading-none text-ink transition-colors duration-400 hover:text-lima-deep"
            >
              {FIRM.phone}
              <span className="text-[1.5rem] transition-transform duration-500 ease-out group-hover:translate-x-2">→</span>
            </a>
            <p className="mt-3 text-caption text-ink-body">
              {FIRM.street} · {FIRM.city}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.25}>
          <div className="relative rounded-xl border border-line bg-canvas p-8 shadow-card transition-shadow duration-600 focus-within:shadow-lift sm:p-10">
            <AnimatePresence mode="wait" initial={false}>
              {sent ? (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="flex min-h-[30rem] flex-col items-center justify-center text-center"
                  role="status"
                >
                  <svg width="88" height="88" viewBox="0 0 100 100" aria-hidden="true">
                    <motion.circle
                      cx="50" cy="50" r="44" fill="none" stroke="#8db41e" strokeWidth="4"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                      transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
                    />
                    <motion.path
                      d="M31 51 l13 13 l26 -28" fill="none" stroke="#1a2014" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </svg>
                  <p className="mt-8 font-display text-h3 text-ink">Solicitud recibida</p>
                  <p className="mt-3 max-w-[34ch] text-body text-ink-body">
                    Gracias. Te llamaremos en menos de 24 horas laborables para
                    hablar de tu caso.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-8 text-micro uppercase text-ink-body underline decoration-lima decoration-2 underline-offset-4 transition-colors hover:text-ink"
                  >
                    Enviar otra consulta
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-7"
                >
                  <fieldset>
                    <legend className="text-micro uppercase text-muted">Soy</legend>
                    <div className="mt-3 grid grid-cols-3 gap-2 rounded-pill border border-line bg-paper p-1.5">
                      {PERFIL.map((p) => {
                        const on = p === perfil
                        return (
                          <label key={p} className={`relative cursor-pointer rounded-pill py-2.5 text-center text-caption font-semibold transition-colors duration-400 ${on ? 'text-ink' : 'text-ink-body hover:text-ink'}`}>
                            <input type="radio" name="perfil" value={p} checked={on} onChange={() => setPerfil(p)} className="peer sr-only" />
                            {on && (
                              <motion.span layoutId="perfil-form" transition={{ type: 'spring', stiffness: 380, damping: 32 }} className="absolute inset-0 rounded-pill bg-lima" />
                            )}
                            <span className="relative rounded-pill peer-focus-visible:ring-2 peer-focus-visible:ring-lima-deep peer-focus-visible:ring-offset-2">{p}</span>
                          </label>
                        )
                      })}
                    </div>
                  </fieldset>

                  <div className="grid gap-7 sm:grid-cols-2">
                    <Field id={uid + '-nombre'} label="Nombre">
                      <input id={uid + '-nombre'} name="nombre" type="text" required autoComplete="name" placeholder="Tu nombre" className={controlClass} />
                    </Field>
                    <Field id={uid + '-tel'} label="Teléfono">
                      <input id={uid + '-tel'} name="telefono" type="tel" required autoComplete="tel" placeholder="600 000 000" className={controlClass} />
                    </Field>
                  </div>

                  <Field id={uid + '-email'} label="Correo electrónico">
                    <input id={uid + '-email'} name="email" type="email" autoComplete="email" placeholder="tu@correo.com" className={controlClass} />
                  </Field>

                  <Field id={uid + '-msg'} label="¿En qué podemos ayudarte?">
                    <textarea
                      id={uid + '-msg'}
                      name="mensaje"
                      rows={4}
                      placeholder={
                        perfil === 'Autónomo'
                          ? 'Ej.: Me acabo de dar de alta y quiero que me llevéis los trimestres.'
                          : perfil === 'Empresa'
                            ? 'Ej.: Somos una SL de 6 personas y buscamos cambiar de asesoría.'
                            : 'Ej.: Necesito ayuda con la renta y la herencia de un piso.'
                      }
                      className={controlClass + ' resize-none'}
                    />
                  </Field>

                  <label className="flex items-start gap-3 text-caption text-ink-body">
                    <input type="checkbox" required className="mt-1 h-4 w-4 shrink-0 accent-[#6a8a0f]" />
                    Acepto que Asesoría Noega use estos datos para responder a mi consulta.
                  </label>

                  <Magnetic strength={0.12} className="w-full">
                    <button
                      type="submit"
                      className="group relative w-full overflow-hidden rounded-pill bg-ink px-8 py-4 text-micro uppercase text-white"
                    >
                      <span className="relative z-10 transition-colors duration-500 group-hover:text-ink">Solicitar primera consulta</span>
                      <span className="absolute inset-0 -translate-y-full bg-lima transition-transform duration-600 ease-out group-hover:translate-y-0" />
                    </button>
                  </Magnetic>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
