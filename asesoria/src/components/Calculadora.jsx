import { useEffect, useId, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import SplitText from '../motion/SplitText'
import Reveal from '../motion/Reveal'

// `useGrouping: 'always'`: en es-ES las cifras de cuatro digitos no
// llevan punto por defecto ("4000"), y en importes se lee peor.
const fmt = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 0, useGrouping: 'always' })
const eur = (n) => fmt.format(Math.round(n)) + ' €'

/** Cifra que se desliza hasta su nuevo valor en vez de saltar. */
function Num({ value, className = '' }) {
  const spring = useSpring(value, { stiffness: 90, damping: 20, mass: 0.6 })
  const text = useTransform(spring, eur)
  useEffect(() => spring.set(value), [spring, value])
  return (
    <span className={`tabular-nums ${className}`}>
      <motion.span aria-hidden="true">{text}</motion.span>
      <span className="sr-only">{eur(value)}</span>
    </span>
  )
}

function Slider({ label, value, onChange, min, max, step, hint }) {
  const id = useId()
  const fill = ((value - min) / (max - min)) * 100
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-caption font-semibold text-white/80">
          {label}
        </label>
        <span className="font-display text-[1.75rem] leading-none text-white tabular-nums">{eur(value)}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ '--fill': `${fill}%` }}
        className="range mt-5"
      />
      <p className="mt-3 text-caption text-night-muted">{hint}</p>
    </div>
  )
}

/**
 * Estimacion de lo que un autonomo en estimacion directa deberia
 * reservar cada mes para los modelos 303 (IVA) y 130 (IRPF).
 *
 * Simplificaciones, avisadas en pantalla: IVA general del 21 % en
 * ventas y gastos, y pago fraccionado del 20 % del rendimiento neto.
 * Si los clientes le practican retencion, el 130 no se presenta
 * (mas del 70 % de ingresos con retencion) y la retencion del 15 %
 * ya la ingresan ellos.
 */
export default function Calculadora() {
  const [ingresos, setIngresos] = useState(4000)
  const [gastos, setGastos] = useState(900)
  const [retencion, setRetencion] = useState(false)

  const neto = Math.max(0, ingresos - gastos)
  const iva = Math.max(0, (ingresos - gastos) * 0.21)
  const irpf = retencion ? 0 : neto * 0.2
  const aparta = iva + irpf

  const cobras = ingresos * 1.21 - (retencion ? ingresos * 0.15 : 0)
  const gastosIva = gastos * 1.21
  const paraTi = Math.max(0, cobras - gastosIva - aparta)

  const parts = [
    { k: 'ti', label: 'Para ti', v: paraTi, cls: 'bg-lima' },
    { k: 'gastos', label: 'Gastos', v: gastosIva, cls: 'bg-oliva-soft' },
    { k: 'iva', label: 'IVA (303)', v: iva, cls: 'bg-oliva' },
    { k: 'irpf', label: 'IRPF (130)', v: irpf, cls: 'bg-[#4b5638]' },
  ]
  const total = parts.reduce((a, p) => a + p.v, 0) || 1

  return (
    <section id="calculadora" className="grain relative isolate overflow-hidden bg-night py-28 text-white sm:py-36">
      <div aria-hidden="true" className="absolute -left-40 top-1/3 -z-10 h-[40rem] w-[40rem] animate-drift rounded-full bg-[radial-gradient(circle,rgba(141,180,30,.16),transparent_62%)] blur-2xl" />

      <div className="shell grid gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <div>
          <Reveal as="p" className="flex items-center gap-3 text-micro uppercase text-lima-soft">
            <span className="bg-grad h-px w-8" />
            Calculadora para autónomos
          </Reveal>
          <SplitText
            as="h2"
            text="¿Cuánto deberías *apartar* cada mes?"
            accentClass="italic text-grad-light"
            className="mt-6 block max-w-[14ch] text-h2 text-white"
          />
          <Reveal as="p" delay={0.2} className="mt-6 max-w-prose text-body-lg text-white/65">
            El error más común al empezar: gastar el IVA y el IRPF antes de que
            llegue el trimestre. Mueve los valores y mira cuánto conviene reservar.
          </Reveal>

          <Reveal delay={0.3} className="mt-12 space-y-10">
            <Slider
              label="Facturación mensual (sin IVA)"
              value={ingresos}
              onChange={setIngresos}
              min={500}
              max={15000}
              step={100}
              hint="Lo que facturas de media al mes, antes de impuestos."
            />
            <Slider
              label="Gastos deducibles al mes (sin IVA)"
              value={gastos}
              onChange={setGastos}
              min={0}
              max={8000}
              step={50}
              hint="Material, software, alquiler del local, gestoría…"
            />

            <label className="flex cursor-pointer items-center justify-between gap-6 rounded-card border border-night-line bg-white/[0.03] px-5 py-4 transition-colors duration-400 hover:border-oliva">
              <span>
                <span className="block text-caption font-semibold text-white/85">Mis clientes me retienen el 15 %</span>
                <span className="block text-caption text-night-muted">Si facturas sobre todo a empresas y profesionales.</span>
              </span>
              <input type="checkbox" checked={retencion} onChange={(e) => setRetencion(e.target.checked)} className="peer sr-only" />
              <span className="relative h-7 w-12 shrink-0 rounded-pill bg-night-line transition-colors duration-400 peer-checked:bg-lima peer-focus-visible:ring-2 peer-focus-visible:ring-lima-soft peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-night peer-checked:[&>span]:translate-x-5">
                <span className="absolute left-1 top-1 h-5 w-5 rounded-pill bg-white shadow transition-transform duration-500 ease-out" />
              </span>
            </label>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="lg:pt-16">
          <div className="relative rounded-xl border border-white/10 bg-white/[0.04] p-8 shadow-glow backdrop-blur-xl sm:p-10">
            <p className="text-micro uppercase text-night-muted">Aparta cada mes</p>
            <p className="mt-4 font-display text-[clamp(3.5rem,8vw,5.5rem)] leading-none">
              <Num value={aparta} className="text-grad-light" />
            </p>
            <p className="mt-3 text-caption text-night-muted">
              Unos <span className="text-white/90">{eur(aparta * 3)}</span> cada trimestre entre los dos modelos.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-card bg-white/10">
              <div className="bg-night-2 p-5">
                <p className="text-caption text-night-muted">Modelo 303 · IVA</p>
                <p className="mt-2 font-display text-[1.75rem] leading-none text-white">
                  <Num value={iva * 3} />
                </p>
                <p className="mt-1.5 text-[0.75rem] text-night-muted">por trimestre</p>
              </div>
              <div className="bg-night-2 p-5">
                <p className="text-caption text-night-muted">Modelo 130 · IRPF</p>
                <p className="mt-2 font-display text-[1.75rem] leading-none text-white">
                  <Num value={irpf * 3} />
                </p>
                <p className="mt-1.5 text-[0.75rem] text-night-muted">{retencion ? 'no se presenta' : 'por trimestre'}</p>
              </div>
            </div>

            <div className="mt-10">
              <div className="flex items-baseline justify-between">
                <p className="text-caption text-white/80">De cada mes cobrado</p>
                <p className="font-display text-body-lg text-white">
                  <Num value={cobras} />
                </p>
              </div>
              <div className="mt-4 flex h-3 w-full overflow-hidden rounded-pill bg-night-line">
                {parts.map((p) => (
                  <motion.span
                    key={p.k}
                    className={`h-full ${p.cls}`}
                    animate={{ width: `${(p.v / total) * 100}%` }}
                    transition={{ type: 'spring', stiffness: 90, damping: 20 }}
                  />
                ))}
              </div>
              <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
                {parts.map((p) => (
                  <li key={p.k} className="text-[0.75rem] text-night-muted">
                    <span className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-pill ${p.cls}`} />
                      {p.label}
                    </span>
                    <span className="mt-1 block text-caption text-white/90 tabular-nums">{eur(p.v)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-10 border-t border-white/10 pt-6 text-[0.75rem] leading-relaxed text-night-muted">
              Estimación orientativa con IVA general del 21 % y pago fraccionado del
              20 %. No incluye la cuota de autónomos ni deducciones personales. Tu
              caso real lo calculamos en la primera consulta.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
