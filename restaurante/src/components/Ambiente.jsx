import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SplitText from '../motion/SplitText'

export default function Ambiente() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])

  return (
    <section id="ambiente" ref={ref} className="relative isolate overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 -z-20 h-[130%]">
        <img
          src="/img/ambiente.jpg"
          alt=""
          aria-hidden="true"
          width={2000}
          height={1400}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-void/75" />

      <div className="shell py-32 text-center sm:py-48">
        <blockquote className="mx-auto max-w-5xl">
          <SplitText
            as="p"
            text="«Un sitio con carácter, donde el producto manda y el servicio se *nota*.»"
            stagger={0.04}
            className="block font-display text-h2 font-light italic text-cream"
          />
          <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-12 text-micro uppercase text-gold"
          >
            Guía Gastronómica Local
          </motion.footer>
        </blockquote>
      </div>
    </section>
  )
}
