import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SplitText from '../motion/SplitText'
import { GALLERY } from '../data/content'

function Photo({ photo, index, progress }) {
  // Cada foto se desplaza a distinta velocidad: profundidad real
  // en lugar de una cuadricula plana.
  const depth = [80, 0, 140, 40, 110, 0][index % 6]
  const y = useTransform(progress, [0, 1], [depth, -depth])

  return (
    <motion.figure
      style={{ y }}
      className="group relative overflow-hidden rounded-card bg-smoke"
      data-cursor
    >
      <img
        src={photo.src}
        alt={photo.alt}
        width={1200}
        height={900}
        loading="lazy"
        decoding="async"
        className="aspect-[4/5] w-full object-cover transition-transform duration-900 ease-out group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/85 via-void/10 to-transparent" />
      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-3 p-6">
        <span className="h-px w-0 bg-gold transition-all duration-600 ease-out group-hover:w-8" />
        <span className="text-micro uppercase text-cream">{photo.label}</span>
      </figcaption>
    </motion.figure>
  )
}

export default function Gallery() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  return (
    <section ref={ref} className="bg-void py-28 sm:py-40 lg:py-48">
      <div className="shell">
        <p className="flex items-center gap-4 text-micro uppercase text-gold">
          <span className="h-px w-10 bg-gold" />
          El espacio
        </p>
        <SplitText
          as="h2"
          text="Sala, terraza y *barra*"
          className="mt-7 block max-w-[16ch] font-display text-h2 font-light text-cream"
        />

        <div className="mt-20 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {GALLERY.map((photo, i) => (
            <Photo key={photo.src} photo={photo} index={i} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  )
}
