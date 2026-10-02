import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SplitText from '../motion/SplitText'
import Reveal from '../motion/Reveal'
import Counter from './Counter'
import { PERFILES } from '../data/content'

/** Titular de cada perfil: los *asteriscos* marcan el acento. */
function Titulo({ text }) {
  return (
    <h3 className="text-h2 text-ink">
      {text.split(' ').map((w, i) => {
        const acc = w.startsWith('*') && w.endsWith('*')
        return (
          <span key={i} className={acc ? 'italic text-grad' : ''}>
            {acc ? w.slice(1, -1) : w}{' '}
          </span>
        )
      })}
    </h3>
  )
}

export default function Perfiles() {
  const [tab, setTab] = useState(PERFILES[0].id)
  const p = PERFILES.find((x) => x.id === tab)

  // Flechas izquierda/derecha entre pestañas, como pide el patrón ARIA.
  const onKey = (e) => {
    const i = PERFILES.findIndex((x) => x.id === tab)
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!dir) return
    e.preventDefault()
    const next = PERFILES[(i + dir + PERFILES.length) % PERFILES.length]
    setTab(next.id)
    document.getElementById(`tab-${next.id}`)?.focus()
  }

  return (
    <section id="perfiles" className="relative overflow-hidden bg-canvas py-28 sm:py-36">
      <div aria-hidden="true" className="absolute -right-40 top-0 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,#f3f8e2,transparent_65%)]" />

      <div className="shell relative">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal as="p" className="flex items-center gap-3 text-micro uppercase text-lima-deep">
              <span className="bg-grad h-px w-8" />
              Para quién trabajamos
            </Reveal>
            <SplitText as="h2" text="Cada cliente, *a* *su* *medida.*" className="mt-6 block text-h2 text-ink" />
          </div>

          <Reveal delay={0.15}>
            <div role="tablist" aria-label="Tipo de cliente" onKeyDown={onKey} className="inline-flex rounded-pill border border-line bg-paper p-1.5">
              {PERFILES.map((x) => {
                const on = x.id === tab
                return (
                  <button
                    key={x.id}
                    id={`tab-${x.id}`}
                    role="tab"
                    type="button"
                    aria-selected={on}
                    aria-controls="perfil-panel"
                    tabIndex={on ? 0 : -1}
                    onClick={() => setTab(x.id)}
                    className={`relative rounded-pill px-5 py-3 text-caption font-semibold transition-colors duration-400 sm:px-7 ${on ? 'text-white' : 'text-ink-body hover:text-ink'}`}
                  >
                    {on && (
                      <motion.span
                        layoutId="perfil-pill"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        className="absolute inset-0 rounded-pill bg-ink"
                      />
                    )}
                    <span className="relative">{x.label}</span>
                  </button>
                )
              })}
            </div>
          </Reveal>
        </div>

        <div id="perfil-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="mt-16 min-h-[30rem] sm:mt-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20"
            >
              <div className="flex flex-col">
                <Titulo text={p.title} />
                <p className="mt-7 max-w-prose text-body-lg text-ink-body">{p.desc}</p>

                <div className="mt-auto flex items-end gap-5 border-t border-line pt-8 max-lg:mt-12">
                  <span className="text-stat text-ink">
                    <Counter to={p.stat.to} suffix={p.stat.suffix ?? ''} />
                  </span>
                  <span className="max-w-[20ch] pb-1 text-caption text-muted">{p.stat.label}</span>
                </div>
              </div>

              <div className="relative rounded-xl border border-line bg-paper p-8 sm:p-10">
                <div aria-hidden="true" className="bg-grad absolute inset-x-10 top-0 h-px" />
                <p className="text-micro uppercase text-muted">Nos encargamos de</p>
                <ul className="mt-7 space-y-1">
                  {p.items.map((it, i) => (
                    <motion.li
                      key={it}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                      className="group flex items-center gap-4 rounded-card px-3 py-3.5 transition-colors duration-400 hover:bg-canvas"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-pill bg-lima-tint text-lima-deep transition-all duration-500 group-hover:bg-lima group-hover:text-ink">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="m5 12.5 4.5 4.5L19 7.5" />
                        </svg>
                      </span>
                      <span className="text-body-lg text-ink">{it}</span>
                    </motion.li>
                  ))}
                </ul>
                <a
                  href="#contacto"
                  className="group mt-8 inline-flex items-center gap-3 text-micro uppercase text-ink transition-colors duration-400 hover:text-lima-deep"
                >
                  Hablemos de tu caso
                  <span className="h-px w-6 bg-current transition-all duration-500 ease-out group-hover:w-10" />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
