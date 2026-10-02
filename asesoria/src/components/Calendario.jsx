import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SplitText from '../motion/SplitText'
import Reveal from '../motion/Reveal'
import { hitos, proximoCierre, yearFrac, fmtDia } from '../data/fiscal'

const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

/**
 * El año fiscal como una linea de tiempo: cada plazo es una barra
 * situada en su fecha real y "Hoy" avanza con el calendario. Al
 * pasar por una barra se ve el detalle; en tactil, al tocarla.
 */
export default function Calendario() {
  const data = useMemo(() => hitos(), [])
  const next = useMemo(() => proximoCierre(), [])
  const today = new Date()
  const [sel, setSel] = useState(null)
  const scroller = useRef(null)

  // En movil la linea de tiempo se desplaza en horizontal: se abre
  // ya centrada en "Hoy" en lugar de en enero.
  useEffect(() => {
    const el = scroller.current
    if (!el || el.scrollWidth <= el.clientWidth) return
    el.scrollLeft = data.todayFrac * el.scrollWidth - el.clientWidth / 2
  }, [data])

  const estado = (it) => (it.to < today ? 'pasado' : it.from <= today ? 'abierto' : 'futuro')

  return (
    <section id="calendario" className="relative bg-paper py-28 sm:py-36">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <Reveal as="p" className="flex items-center gap-3 text-micro uppercase text-lima-deep">
              <span className="bg-grad h-px w-8" />
              Calendario fiscal {data.year}
            </Reveal>
            <SplitText as="h2" text="El año fiscal, *de* *un* *vistazo.*" className="mt-6 block max-w-[14ch] text-h2 text-ink" />
          </div>
          <Reveal as="p" delay={0.2} className="max-w-prose text-body-lg text-ink-body lg:pb-3">
            Nosotros llevamos la cuenta de cada plazo. Tú recibes un aviso con
            el importe antes de que venza, y nada más.
          </Reveal>
        </div>

        <Reveal delay={0.25} className="mt-16 sm:mt-20">
          {/* Solo esta caja se desplaza en horizontal en movil; la pagina no. */}
          <div ref={scroller} className="-mx-6 overflow-x-auto px-6 pb-4 sm:mx-0 sm:px-0">
            <div className="relative min-w-[760px] rounded-xl border border-line bg-canvas px-6 pb-8 pt-14 shadow-card sm:px-10">
              {/* Meses */}
              <div className="relative ml-28 grid grid-cols-12 border-b border-line pb-3">
                {MESES.map((m, i) => (
                  <span key={m} className={`text-micro uppercase ${i === today.getMonth() ? 'text-lima-deep' : 'text-muted'}`}>
                    {m}
                  </span>
                ))}
              </div>

              <div className="relative ml-28">
                {/* Rejilla vertical de meses */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid grid-cols-12">
                  {MESES.map((m) => (
                    <span key={m} className="border-l border-line-soft first:border-l-0" />
                  ))}
                </div>

                {data.rows.map((row, r) => (
                  <div key={row.label} className="relative h-24">
                    <span className="absolute -left-28 top-1/2 w-24 -translate-y-1/2 text-caption font-semibold text-ink-soft">{row.label}</span>
                    {row.items.map((it, i) => {
                      const left = yearFrac(it.from) * 100
                      const width = Math.max(1.6, (yearFrac(it.to) - yearFrac(it.from)) * 100)
                      const st = estado(it)
                      const key = `${r}-${i}`
                      const on = sel === key
                      return (
                        <motion.button
                          key={key}
                          type="button"
                          onMouseEnter={() => setSel(key)}
                          onMouseLeave={() => setSel(null)}
                          onFocus={() => setSel(key)}
                          onBlur={() => setSel(null)}
                          onClick={() => setSel(on ? null : key)}
                          aria-label={`${it.title}: del ${fmtDia(it.from)} al ${fmtDia(it.to)}`}
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, delay: 0.4 + r * 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                          style={{ left: `${left}%`, width: `${width}%` }}
                          className={`absolute top-[1.875rem] h-9 origin-left rounded-pill transition-shadow duration-400 ${
                            st === 'pasado'
                              ? 'bg-paper-deep ring-1 ring-inset ring-line'
                              : st === 'abierto'
                                ? 'bg-grad shadow-lift'
                                : it.main
                                  ? 'bg-oliva-tint ring-1 ring-inset ring-oliva-soft'
                                  : 'bg-lima-tint ring-1 ring-inset ring-lima-soft'
                          } ${on ? 'z-20 shadow-lift' : 'z-10'}`}
                        >
                          <AnimatePresence>
                            {on && (
                              <motion.span
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 6 }}
                                transition={{ duration: 0.25 }}
                                className="pointer-events-none absolute bottom-full left-1/2 mb-3 w-max -translate-x-1/2 rounded-card bg-ink px-4 py-3 text-left shadow-lift"
                              >
                                <span className="block text-caption font-semibold text-white">{it.title}</span>
                                <span className="block text-[0.75rem] text-night-muted">
                                  {fmtDia(it.from)} – {fmtDia(it.to)} · Modelo{it.models.length > 1 ? 's' : ''} {it.models.join(', ')}
                                </span>
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </motion.button>
                      )
                    })}
                  </div>
                ))}

                {/* Hoy */}
                <motion.div
                  aria-hidden="true"
                  initial={{ opacity: 0, scaleY: 0 }}
                  whileInView={{ opacity: 1, scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{ left: `${data.todayFrac * 100}%` }}
                  className="pointer-events-none absolute -top-12 bottom-0 z-30 w-px origin-top bg-ink"
                >
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-full rounded-pill bg-ink px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-[0.14em] text-lima-soft">
                    Hoy
                  </span>
                  <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-pill bg-ink" />
                </motion.div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { k: 'Próximo vencimiento', v: next.q, s: `Hasta el ${fmtDia(next.to)}` },
            { k: 'Quedan', v: `${next.days} ${next.days === 1 ? 'día' : 'días'}`, s: next.open ? 'El plazo ya está abierto' : 'Aún no se ha abierto el plazo' },
            { k: 'Modelos', v: next.models.join(' · '), s: 'Preparados y revisados por nosotros' },
          ].map((c, i) => (
            <Reveal key={c.k} delay={0.1 * i} className="rounded-card border border-line bg-canvas p-6">
              <p className="text-micro uppercase text-muted">{c.k}</p>
              <p className="mt-3 font-display text-h3 text-ink">{c.v}</p>
              <p className="mt-1 text-caption text-ink-body">{c.s}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
