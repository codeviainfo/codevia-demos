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
  const rotateX = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 })

  // El foco se calcula aqui arriba, no dentro del JSX: los hooks no
  // deben quedar escondidos en el valor de una prop.
  const glow = useTransform(
    [mx, my],
    ([gx, gy]) =>
      `radial-gradient(280px circle at ${gx * 100}% ${gy * 100}%, rgba(13,148,136,0.10), transparent 70%)`,
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
    <Reveal delay={index * 0.08} className="h-full [perspective:1000px]">
      <motion.article
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-canvas transition-shadow duration-500 hover:shadow-lift"
      >
        {/* Dos capas a propósito: la interior recorta el zoom de la foto,
            la exterior posiciona el icono SIN recortar. Si el
            `overflow-hidden` envuelve también al icono, su `-bottom-6`
            queda cortado y, al no tener superficie visible, el
            IntersectionObserver que dibuja el trazo no llega a dispararse. */}
        <div className="relative">
          <div className="relative overflow-hidden">
            <img
              src={servicio.img}
              alt={servicio.alt}
              width={1200}
              height={900}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover transition-transform duration-900 ease-out group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
          </div>

          {/* El icono se dibuja solo al entrar en pantalla y monta a
              caballo entre la foto y la tarjeta. */}
          <span className="absolute -bottom-6 left-6 z-10 flex h-12 w-12 items-center justify-center rounded-card border border-line bg-canvas text-accent shadow-card transition-all duration-500 ease-out group-hover:bg-accent group-hover:text-white">
            <Icon name={servicio.icon} size={22} />
          </span>
        </div>

        <motion.div
          aria-hidden="true"
          style={{ background: glow }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        <div className="relative flex flex-1 flex-col p-7 pt-10">
          <h3 className="text-title text-ink">{servicio.title}</h3>
          <p className="mt-3 text-body text-ink-body">{servicio.desc}</p>

          <span className="mt-6 inline-flex items-center gap-2 text-micro uppercase text-accent opacity-0 transition-all duration-500 ease-out group-hover:opacity-100">
            Más información
            <span className="h-px w-4 bg-current transition-all duration-500 group-hover:w-7" />
          </span>
        </div>
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

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-7">
          {SERVICIOS.map((servicio, i) => (
            <ServicioCard key={servicio.title} servicio={servicio} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
