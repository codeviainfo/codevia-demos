import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Logo from './Logo'

const KEY = 'noega-intro'

function yaVista() {
  try {
    return sessionStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

/**
 * Telon de entrada: el anillo del logo se dibuja y se levanta.
 * Una vez por sesion y nunca con movimiento reducido, para no
 * hacer esperar a quien vuelve o navega entre anclas.
 */
export default function Intro({ onDone }) {
  const reduce = useReducedMotion()
  const [show, setShow] = useState(() => !reduce && !yaVista())

  // `onDone` se dispara cuando el telon empieza a subir: la pagina se
  // monta debajo y sus animaciones de entrada coinciden con la salida.
  useEffect(() => {
    if (!show) {
      onDone()
      return
    }
    const t = window.setTimeout(() => {
      setShow(false)
      try {
        sessionStorage.setItem(KEY, '1')
      } catch {
        /* sin almacenamiento: se vera otra vez, sin mas */
      }
    }, 2100)
    return () => window.clearTimeout(t)
  }, [show, onDone])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          aria-hidden="true"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          style={{ clipPath: 'inset(0 0 0% 0)' }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-night"
        >
          <motion.div exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }}>
            <Logo variant="full" draw className="h-44 w-44 sm:h-56 sm:w-56" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
