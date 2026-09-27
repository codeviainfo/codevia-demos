import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/**
 * Cursor a medida: un punto que sigue al raton al instante y un anillo
 * que llega con retardo elastico. Se agranda sobre cualquier elemento
 * con `data-cursor`.
 *
 * Solo se monta si hay puntero fino y no se pidio movimiento reducido;
 * el cursor nativo se oculta desde JS, nunca desde el CSS base, para
 * que un fallo de script no deje al usuario sin puntero.
 */
export default function Cursor() {
  const reduce = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [active, setActive] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.5 })

  useEffect(() => {
    if (reduce || !window.matchMedia('(pointer: fine)').matches) return

    setEnabled(true)
    document.body.classList.add('has-custom-cursor')

    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const hit = e.target.closest?.('[data-cursor], a, button')
      setActive(Boolean(hit))
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [reduce, x, y])

  if (!enabled) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[200]">
      <motion.div
        style={{ x, y }}
        className="absolute -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-pill bg-gold"
      />
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{ scale: active ? 1.9 : 1, opacity: active ? 0.9 : 0.45 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -ml-5 -mt-5 h-10 w-10 rounded-pill border border-gold"
      />
    </div>
  )
}
