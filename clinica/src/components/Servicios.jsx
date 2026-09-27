import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import SplitText from '../motion/SplitText'
import Reveal from '../motion/Reveal'
import Icon from './Icon'
import { SERVICIOS } from '../data/content'

function ServicioCard({ servicio, index }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()

  // Inclinacion 3D hacia el cursor + foco de luz que lo sigue.
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 200, damping: 20 })
  // El foco se calcula aqui arriba, no dentro del JSX: los hooks no
  // deben quedar escondidos en el valor de una prop.
  const glow = useTransform(
    [mx, my],
    ([gx, gy]) =>
      `radial-gradient(260px circle at ${gx * 100}% ${gy * 100}%, rgba(13,148,136,0.09), transparent 70%)`,
  )

  const onMove = (e) => {
    if (reduce) return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }

  const onLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <Reveal delay={index * 0.08} className="[perspective:900px]">
      <motion.article
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group relative h-full overflow-hidden rounded-card border border-line bg-canvas p-8 transition-shadow duration-500 hover:shadow-lift"
      >
        <motion.div
          aria-hidden="true"
          style={{ background: glow }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        <span className="relative flex h-12 w-12 items-center justify-center rounded-card bg-accent-tint text-accent transition-all duration-500 ease-out group-hover:bg-accent group-hover:text-white">
          <Icon name={servicio.icon} size={22} />
        </span>

        <h3 className="relative mt-7 text-title text-ink">{servicio.title}</h3>
        <p className="relative mt-3 text-body text-ink-body">{servicio.desc}</p>

        <span className="relative mt-6 inline-flex items-center gap-2 text-micro uppercase text-accent opacity-0 transition-all duration-500 ease-out group-hover:opacity-100">
          Más información
          <span className="h-px w-4 bg-current transition-all duration-500 group-hover:w-7" />
        </span>
      </motion.article>
    </Reveal>
  )
}

export default function Servicios() {
  return (
    <section id="servicios" className="bg-surface py-28 sm:py-36 lg:py-44">
      <div className="shell">
        <Reveal as="p" className="flex items-center gap-3 text-micro uppercase text-accent">
          <span className="h-1.5 w-1.5 rounded-pill bg-accent" />
          Servicios
        </Reveal>

        <SplitText
          as="h2"
          text="Especialidades del *centro*"
          className="mt-6 block max-w-[16ch] text-h2 text-ink"
        />

        <Reveal as="p" delay={0.25} className="mt-6 max-w-prose text-body-lg text-ink-body">
          Un equipo multidisciplinar bajo un mismo techo, para no tener que ir de
          un lado a otro.
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-6">
          {SERVICIOS.map((servicio, i) => (
            <ServicioCard key={servicio.title} servicio={servicio} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
