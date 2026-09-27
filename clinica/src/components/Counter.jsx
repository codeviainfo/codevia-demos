import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'

/**
 * Cuenta desde 0 hasta `to` cuando entra en pantalla, una sola vez.
 *
 * El valor final se renderiza siempre en el HTML y se marca el nodo
 * animado como `aria-hidden`, para que un lector de pantalla lea la
 * cifra real y no un numero a medio contar.
 */
export default function Counter({ to, prefix = '', suffix = '', decimals = 0, locale = false }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const [value, setValue] = useState(0)

  const format = (n) =>
    prefix + (locale ? Math.round(n).toLocaleString('es-ES') : n.toFixed(decimals)) + suffix

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setValue(to)
      return
    }
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: setValue,
    })
    return () => controls.stop()
  }, [inView, to, reduce])

  return (
    <span ref={ref} className="tabular-nums">
      <span aria-hidden="true">{format(value)}</span>
      <span className="sr-only">{format(to)}</span>
    </span>
  )
}
