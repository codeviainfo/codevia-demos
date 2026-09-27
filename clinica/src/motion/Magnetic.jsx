import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/**
 * El elemento se inclina hacia el cursor y vuelve con un muelle.
 * Solo en punteros finos y si el usuario no pidio menos movimiento.
 */
export default function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()

  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 })

  const onMove = (e) => {
    if (reduce || !window.matchMedia('(pointer: fine)').matches) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * strength)
    y.set((e.clientY - rect.top - rect.height / 2) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x, y }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  )
}
