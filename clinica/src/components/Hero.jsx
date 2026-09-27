import { motion } from 'framer-motion'
import SplitText from '../motion/SplitText'
import Reveal from '../motion/Reveal'
import Magnetic from '../motion/Magnetic'
import Counter from './Counter'
import Icon from './Icon'
import { STATS, ESPECIALIDADES } from '../data/content'

function FloatCard({ icon, title, sub, className, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute flex animate-float items-center gap-3 rounded-card border border-line bg-canvas/90 px-4 py-3 shadow-card backdrop-blur-sm ${className}`}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-pill bg-accent-tint text-accent">
        <Icon name={icon} size={17} animate={false} />
      </span>
      <span className="leading-tight">
        <strong className="block text-caption font-medium text-ink">{title}</strong>
        <span className="block text-caption text-muted">{sub}</span>
      </span>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-32 sm:pt-40">
      {/* Fondo: degradados suaves en movimiento lento. La clinica no
          tiene fotografia, asi que la atmosfera la crea la luz. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_0%,#e0f7f4,transparent_60%),radial-gradient(ellipse_at_5%_35%,#eef6fb,transparent_55%)]"
      />

      <div className="shell grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <Reveal as="p" className="flex items-center gap-3 text-micro uppercase text-accent">
            <span className="h-1.5 w-1.5 rounded-pill bg-accent" />
            Centro médico certificado
          </Reveal>

          <SplitText
            as="h1"
            text="Tu salud, cuidada de *principio a fin*."
            delay={0.12}
            className="mt-7 block max-w-[13ch] text-h1 text-ink"
          />

          <Reveal as="p" delay={0.45} className="mt-8 max-w-prose text-body-lg text-ink-body">
            Fisioterapia, odontología y medicina estética en un mismo centro.
            Diagnóstico claro, seguimiento cercano y citas sin esperas.
          </Reveal>

          <Reveal delay={0.55} className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href="#cita"
                className="group relative inline-flex overflow-hidden rounded-pill bg-ink px-8 py-4 text-micro uppercase text-white"
              >
                <span className="relative z-10">Pedir cita previa</span>
                <span className="absolute inset-0 -translate-y-full bg-accent transition-transform duration-600 ease-out group-hover:translate-y-0" />
              </a>
            </Magnetic>
            <a
              href="#servicios"
              className="group inline-flex items-center gap-3 rounded-pill border border-line px-8 py-4 text-micro uppercase text-ink transition-all duration-400 ease-out hover:-translate-y-0.5 hover:border-accent hover:text-accent"
            >
              Ver servicios
              <span className="h-px w-5 bg-current transition-all duration-500 ease-out group-hover:w-9" />
            </a>
          </Reveal>

          <Reveal delay={0.7} className="mt-16 grid grid-cols-3 gap-6 border-t border-line pt-10">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-stat text-ink">
                  <Counter
                    to={stat.to}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                    locale={stat.locale}
                  />
                </p>
                <p className="mt-2 text-caption text-muted">{stat.label}</p>
              </div>
            ))}
          </Reveal>
        </div>

        {/* Composicion abstracta: orbe en deriva, anillos y tarjetas. */}
        <div aria-hidden="true" className="relative mx-auto hidden aspect-square w-full max-w-md lg:block">
          <div className="absolute inset-[12%] animate-drift rounded-pill bg-[conic-gradient(from_180deg,#0d9488,#67e8f9,#a7f3d0,#0d9488)] opacity-25 blur-2xl" />
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.2 + i * 0.16, ease: [0.16, 1, 0.3, 1] }}
              style={{ inset: `${i * 11}%` }}
              className="absolute rounded-pill border border-accent/20"
            />
          ))}
          <motion.div
            initial={{ scale: 0.86, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-[26%] flex flex-col items-center justify-center rounded-pill border border-line bg-canvas/70 backdrop-blur-sm"
          >
            <span className="font-display text-h2 italic text-accent">24h</span>
            <span className="mt-1 text-micro uppercase text-muted">Respuesta</span>
          </motion.div>

          <FloatCard
            icon="check"
            title="Cita confirmada"
            sub="Hoy, 17:30 h"
            delay={0.75}
            className="left-0 top-[16%]"
          />
          <FloatCard
            icon="brain"
            title="Seguimiento"
            sub="Cercano y humano"
            delay={0.95}
            className="bottom-[14%] right-0 [animation-delay:1.6s]"
          />
        </div>
      </div>

      {/* Cinta de especialidades, sin bucle duplicado de imagenes. */}
      <div className="mt-24 overflow-hidden border-y border-line bg-canvas py-5">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {ESPECIALIDADES.map((item) => (
                <span
                  key={`${copy}-${item}`}
                  className="flex items-center gap-10 px-10 text-micro uppercase text-muted"
                >
                  {item}
                  <span className="h-1 w-1 rounded-pill bg-accent" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
