import { useId } from 'react'
import { motion } from 'framer-motion'

/**
 * Logo de Asesoria Noega recreado en SVG a partir de la imagen del
 * cliente: anillo de pincel oliva → lima abierto por la izquierda,
 * monograma "AN" caligrafico y el nombre debajo.
 *
 * Al ser SVG el anillo puede dibujarse solo (`draw`). Si llega el
 * logo original en vectorial, sustituirlo aqui y nada mas cambia.
 *
 * `variant="mark"` deja solo anillo + monograma (cabecera, favicon).
 */
export default function Logo({ variant = 'mark', draw = false, className = '', title = 'Asesoría Noega' }) {
  const uid = useId().replace(/:/g, '')
  const full = variant === 'full'

  const stroke = (delay) =>
    draw
      ? {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: {
            pathLength: { duration: 1.8, delay, ease: [0.65, 0, 0.35, 1] },
            opacity: { duration: 0.2, delay },
          },
        }
      : {}

  return (
    <svg viewBox="0 0 100 100" role="img" aria-label={title} className={className}>
      <defs>
        <linearGradient id={`ring-${uid}`} x1="10" y1="90" x2="90" y2="10" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#7d8166" />
          <stop offset="0.45" stopColor="#7a8a5a" />
          <stop offset="1" stopColor="#8db41e" />
        </linearGradient>
      </defs>

      {/* Anillo principal: 310° de arco, abierto entre las 8 y las 9. */}
      <motion.path
        d="M 8.65 34.95 A 44 44 0 1 1 11.9 72"
        fill="none"
        stroke={`url(#ring-${uid})`}
        strokeWidth="4.6"
        strokeLinecap="round"
        {...stroke(0.1)}
      />
      {/* Hebras del pincel en el arranque superior izquierdo. */}
      <motion.path
        d="M 13.3 32.9 A 40.5 40.5 0 0 1 70.25 14.93"
        fill="none"
        stroke={`url(#ring-${uid})`}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.7"
        {...stroke(0.25)}
      />
      <motion.path
        d="M 8.4 26 A 48 48 0 0 1 38 3.5"
        fill="none"
        stroke={`url(#ring-${uid})`}
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.55"
        {...stroke(0.35)}
      />

      <motion.text
        x={full ? 50 : 49}
        y={full ? 60 : 64}
        textAnchor="middle"
        fontFamily="'Great Vibes', cursive"
        fontSize="40"
        fill="#8db41e"
        {...(draw
          ? {
              initial: { opacity: 0, y: 6 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] },
            }
          : {})}
      >
        AN
      </motion.text>

      {full && (
        <g fontFamily="Abel, sans-serif">
          <text x="30" y="72" fontSize="9" fill="#8b8d85" letterSpacing="0.2">
            Asesoría
          </text>
          <text x="44" y="83" fontSize="12" fill="#8db41e" letterSpacing="0.3">
            Noega
          </text>
        </g>
      )}
    </svg>
  )
}
