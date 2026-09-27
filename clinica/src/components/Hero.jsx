import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SplitText from '../motion/SplitText'
import Reveal from '../motion/Reveal'
import Magnetic from '../motion/Magnetic'
import Counter from './Counter'
import Icon from './Icon'
import { STATS, ESPECIALIDADES, FOTOS } from '../data/content'

function FloatCard({ icon, title, sub, className, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute flex animate-float items-center gap-3 rounded-card border border-line bg-canvas/95 px-4 py-3 shadow-lift backdrop-blur-sm ${className}`}
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
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  // Parallax por transform, compositado en GPU.
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section id="top" className="relative isolate overflow-hidden pt-32 sm:pt-40">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[70vh] bg-[radial-gradient(ellipse_at_75%_0%,#e0f7f4,transparent_62%),radial-gradient(ellipse_at_5%_30%,#eef6fb,transparent_55%)]"
      />

      <div className="shell">
        <Reveal as="p" className="flex items-center gap-3 text-micro uppercase text-accent">
          <span className="h-1.5 w-1.5 rounded-pill bg-accent" />
          Centro médico certificado
        </Reveal>

        <SplitText
          as="h1"
          text="Tu salud, cuidada de *principio a fin*."
          delay={0.12}
          className="mt-7 block max-w-[15ch] text-h1 text-ink"
        />

        <div className="mt-10 flex flex-col gap-10 border-t border-line pt-10 sm:mt-12 sm:flex-row sm:items-end sm:justify-between sm:gap-16">
          <Reveal as="p" delay={0.4} className="max-w-prose text-body-lg text-ink-body">
            Fisioterapia, odontología y medicina estética en un mismo centro.
            Diagnóstico claro, seguimiento cercano y citas sin esperas.
          </Reveal>

          <Reveal delay={0.5} className="flex shrink-0 flex-wrap items-center gap-4">
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
        </div>
      </div>

      {/* Fotografía ancha del centro: entra desvelándose desde abajo
          y se desplaza en parallax. Es el LCP, así que no lleva lazy. */}
      <div ref={ref} className="shell mt-14 sm:mt-16">
        <motion.figure
          initial={{ clipPath: 'inset(14% 0 0 0)', opacity: 0 }}
          animate={{ clipPath: 'inset(0% 0 0 0)', opacity: 1 }}
          transition={{ duration: 1.3, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-xl bg-mist"
        >
          <motion.img
            src={FOTOS.hero.src}
            alt={FOTOS.hero.alt}
            width={2000}
            height={1125}
            fetchPriority="high"
            decoding="async"
            style={{ y: imgY }}
            className="aspect-[4/3] h-[118%] w-full object-cover sm:aspect-[16/9]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />

          <FloatCard
            icon="check"
            title="Cita confirmada"
            sub="Hoy, 17:30 h"
            delay={1}
            className="left-4 top-6 sm:left-8 sm:top-10"
          />
          <FloatCard
            icon="clock"
            title="Respuesta en 24 h"
            sub="Por teléfono o WhatsApp"
            delay={1.2}
            className="bottom-6 right-4 [animation-delay:1.6s] sm:bottom-10 sm:right-8"
          />
        </motion.figure>
      </div>

      <div className="shell mt-14 grid grid-cols-1 gap-8 border-t border-line pt-10 sm:mt-16 sm:grid-cols-3">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.1}>
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
          </Reveal>
        ))}
      </div>

      <div className="mt-20 overflow-hidden border-y border-line bg-canvas py-5">
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
