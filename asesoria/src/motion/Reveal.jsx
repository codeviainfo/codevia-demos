import { motion } from 'framer-motion'

/**
 * Aparicion sobria al entrar en pantalla. `delay` va en segundos.
 *
 * Se indexa `motion[as]` en lugar de llamar a `motion.create()`:
 * crear el componente dentro del render lo remontaria en cada pasada.
 */
export default function Reveal({
  as = 'div',
  delay = 0,
  y = 28,
  className = '',
  children,
  ...rest
}) {
  const MotionTag = motion[as] ?? motion.div

  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
