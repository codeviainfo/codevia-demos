import { useMemo, useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import SplitText from '../motion/SplitText'
import Reveal from '../motion/Reveal'
import Magnetic from '../motion/Magnetic'
import EixampleGrid from './EixampleGrid'
import Stars from './Stars'
import Icon from './Icon'
import { FIRM } from '../data/content'
import { proximoCierre, fmtLargo } from '../data/fiscal'

const MODELOS = {
  303: 'IVA trimestral',
  130: 'Pago fraccionado IRPF',
  111: 'Retenciones',
  115: 'Alquiler de local',
  390: 'Resumen anual de IVA',
}

/**
 * Panel "vivo": el siguiente cierre trimestral calculado sobre la
 * fecha real del visitante. El anillo marca cuanto del trimestre
 * ha pasado y los modelos se van marcando como preparados.
 */
function CierreCard() {
  const c = useMemo(() => proximoCierre(), [])
  const R = 44
  const C = 2 * Math.PI * R

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1.4, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-[26rem] rounded-xl border border-white/10 bg-white/[0.045] p-6 shadow-glow backdrop-blur-xl sm:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-micro uppercase text-night-muted">Próximo cierre trimestral</p>
        <span className="inline-flex whitespace-nowrap items-center gap-2 rounded-pill border border-lima/30 bg-lima/10 px-3 py-1.5 text-[0.6875rem] font-semibold text-lima-soft">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 animate-ping rounded-pill bg-lima" />
            <span className="relative h-1.5 w-1.5 rounded-pill bg-lima" />
          </span>
          {c.open ? 'Plazo abierto' : 'En preparación'}
        </span>
      </div>

      <div className="mt-7 flex items-center gap-6">
        <div className="relative h-28 w-28 shrink-0">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden="true">
            <defs>
              <linearGradient id="cierre-ring" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#bcc5a3" />
                <stop offset="1" stopColor="#b9e03f" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r={R} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="5" />
            <motion.circle
              cx="50"
              cy="50"
              r={R}
              fill="none"
              stroke="url(#cierre-ring)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={C}
              initial={{ strokeDashoffset: C }}
              animate={{ strokeDashoffset: C * (1 - c.progress) }}
              transition={{ duration: 2, delay: 1.2, ease: [0.65, 0, 0.35, 1] }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-[2.5rem] leading-none text-white">{c.days}</span>
            <span className="mt-1 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-night-muted">
              {c.days === 1 ? 'día' : 'días'}
            </span>
          </div>
        </div>

        <div>
          <p className="font-display text-[1.75rem] leading-tight text-white">{c.q}</p>
          <p className="mt-1 text-caption text-night-muted">
            Vence el <span className="text-white/90">{fmtLargo(c.to)}</span>
          </p>
        </div>
      </div>

      <ul className="mt-7 divide-y divide-white/[0.07] border-y border-white/[0.07]">
        {c.models.map((m, i) => (
          <motion.li
            key={m}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 1.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-between py-3"
          >
            <span className="flex items-baseline gap-3">
              <span className="w-9 font-display text-body-lg text-lima-soft">{m}</span>
              <span className="text-caption text-white/75">{MODELOS[m]}</span>
            </span>
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 2.1 + i * 0.28, ease: [0.34, 1.56, 0.64, 1] }}
              className="flex h-5 w-5 items-center justify-center rounded-pill bg-lima text-ink"
              aria-label="Preparado"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m5 12.5 4.5 4.5L19 7.5" />
              </svg>
            </motion.span>
          </motion.li>
        ))}
      </ul>

      <p className="mt-5 flex items-center gap-2.5 text-caption text-night-muted">
        <Icon name="clock" size={15} animate={false} className="text-lima-soft" />
        Te avisamos con 10 días de margen.
      </p>
    </motion.div>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const gridY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={ref}
      id="top"
      className="grain relative isolate flex min-h-[100svh] items-center overflow-hidden bg-night pb-20 pt-32 text-white sm:pt-36"
    >
      {/* Mapa del Eixample tumbado en perspectiva, como sobre una mesa. */}
      <motion.div
        aria-hidden="true"
        style={reduce ? undefined : { y: gridY }}
        className="pointer-events-none absolute inset-x-[-30%] bottom-[-35%] top-[18%] -z-10 [perspective:1200px]"
      >
        <div className="h-full w-full [transform:rotateX(58deg)_rotateZ(-14deg)] [mask-image:radial-gradient(ellipse_at_50%_40%,black_20%,transparent_70%)]">
          <EixampleGrid cols={18} rows={10} pin={[10, 3]} stroke="#3b4630" strokeWidth={1.4} delay={0.2} className="h-full w-full" />
        </div>
      </motion.div>

      {/* Auroras oliva y lima. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute -left-[10%] -top-[20%] h-[60vmax] w-[60vmax] animate-drift rounded-full bg-[radial-gradient(circle,rgba(122,138,90,.35),transparent_60%)] blur-2xl" />
        <div className="absolute -right-[15%] top-[10%] h-[55vmax] w-[55vmax] animate-drift-slow rounded-full bg-[radial-gradient(circle,rgba(141,180,30,.22),transparent_60%)] blur-2xl" />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-night to-transparent" />

      <motion.div style={reduce ? undefined : { opacity: fade }} className="shell grid items-center gap-16 lg:grid-cols-[1.25fr_0.75fr] lg:gap-10">
        <div>
          <Reveal as="p" className="flex items-center gap-3 text-micro uppercase text-lima-soft">
            <span className="bg-grad h-px w-8" />
            {FIRM.kind} · {FIRM.district}
          </Reveal>

          <SplitText
            as="h1"
            text="Tus impuestos, *en* *orden.* Tu cabeza, tranquila."
            delay={0.15}
            accentClass="italic text-grad-light"
            className="mt-7 block max-w-[13ch] text-[clamp(3rem,6.4vw,5.5rem)] font-normal leading-[0.98] tracking-[-0.035em] text-white"
          />

          <Reveal as="p" delay={0.45} className="mt-8 max-w-prose text-body-lg text-white/70">
            Asesoría fiscal, contable y laboral para autónomos, pymes y
            particulares en el corazón del Eixample. Nos ocupamos de Hacienda
            para que tú te ocupes de lo tuyo.
          </Reveal>

          <Reveal delay={0.55} className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href="#contacto"
                className="group relative inline-flex overflow-hidden rounded-pill bg-lima px-8 py-4 text-micro uppercase text-ink"
              >
                <span className="relative z-10">Pide tu primera consulta</span>
                <span className="absolute inset-0 -translate-y-full bg-white transition-transform duration-600 ease-out group-hover:translate-y-0" />
              </a>
            </Magnetic>
            <a
              href={FIRM.phoneHref}
              className="group inline-flex items-center gap-3 rounded-pill border border-white/15 px-7 py-4 text-micro uppercase text-white transition-all duration-400 ease-out hover:-translate-y-0.5 hover:border-lima-soft hover:text-lima-soft"
            >
              <Icon name="phone" size={14} animate={false} />
              {FIRM.phone}
            </a>
          </Reveal>

          <Reveal delay={0.7} className="mt-12">
            <a
              href={FIRM.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-4 text-caption text-white/70 transition-colors duration-400 hover:text-white"
            >
              <span className="font-display text-[2rem] leading-none text-white">
                {FIRM.rating.toLocaleString('es-ES', { minimumFractionDigits: 1 })}
              </span>
              <span>
                <Stars value={FIRM.rating} className="text-lima" />
                <span className="mt-1 block">
                  {FIRM.reviews} reseñas en Google
                  <span className="ml-2 inline-block transition-transform duration-500 ease-out group-hover:translate-x-1">→</span>
                </span>
              </span>
            </a>
          </Reveal>
        </div>

        <div className="flex justify-center lg:justify-end">
          <CierreCard />
        </div>
      </motion.div>

      <a
        href="#servicios"
        aria-label="Bajar a servicios"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[0.625rem] font-semibold uppercase tracking-[0.22em] text-white/40 transition-colors duration-400 hover:text-white/80 md:flex"
      >
        Descubre
        <span className="relative h-10 w-px overflow-hidden bg-white/15">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-lima"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </a>
    </section>
  )
}
