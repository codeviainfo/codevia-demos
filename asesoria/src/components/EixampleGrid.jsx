import { useId, useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * La cuadricula de Cerda: manzanas cuadradas con los chaflanes
 * cortados, atravesadas por la Diagonal. Es la "foto" de la marca:
 * situa el despacho en el Eixample sin necesitar ninguna imagen.
 *
 * Las manzanas se dibujan en onda desde la marcada con `pin`, que
 * es donde esta el despacho. La Diagonal se recorta con una mascara,
 * asi el componente vale igual sobre fondo claro que oscuro.
 */
const CELL = 100
const BLOCK = 76
const CHAMFER = 15

function blockPath(x, y) {
  const s = BLOCK
  const c = CHAMFER
  return `M${x + c} ${y}H${x + s - c}L${x + s} ${y + c}V${y + s - c}L${x + s - c} ${y + s}H${x + c}L${x} ${y + s - c}V${y + c}Z`
}

export default function EixampleGrid({
  cols = 14,
  rows = 9,
  pin = [8, 4],
  stroke = 'currentColor',
  strokeWidth = 1.2,
  pinFill = '#8db41e',
  diagonal = true,
  diagonalAt = 0.62,
  diagonalLabel = '',
  className = '',
  delay = 0,
}) {
  const uid = useId().replace(/:/g, '')
  const reduce = useReducedMotion()
  const W = cols * CELL
  const H = rows * CELL

  const blocks = useMemo(() => {
    const out = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const dist = Math.hypot(c - pin[0], r - pin[1])
        out.push({ key: `${c}-${r}`, d: blockPath(c * CELL + 12, r * CELL + 12), dist, isPin: c === pin[0] && r === pin[1] })
      }
    }
    return out
  }, [cols, rows, pin])

  const px = pin[0] * CELL + 12 + BLOCK / 2
  const py = pin[1] * CELL + 12 + BLOCK / 2

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true" className={className}>
      <defs>
        <mask id={`diag-${uid}`}>
          <rect width={W} height={H} fill="white" />
          {diagonal && (
            <rect x={-W} y={H * diagonalAt} width={W * 3} height={64} fill="black" transform={`rotate(-24 ${W / 2} ${H / 2})`} />
          )}
        </mask>
      </defs>

      <g mask={`url(#diag-${uid})`}>
        {blocks.map((b) => (
          <motion.path
            key={b.key}
            d={b.d}
            fill={b.isPin ? pinFill : 'none'}
            fillOpacity={b.isPin ? 0.16 : 0}
            stroke={b.isPin ? pinFill : stroke}
            strokeWidth={b.isPin ? strokeWidth * 1.8 : strokeWidth}
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              pathLength: { duration: 1.6, delay: delay + b.dist * 0.09, ease: [0.65, 0, 0.35, 1] },
              opacity: { duration: 0.3, delay: delay + b.dist * 0.09 },
            }}
          />
        ))}
      </g>

      {/* La Diagonal: dos bordes de acera y, si se pide, su nombre. */}
      {diagonal && (
        <g transform={`rotate(-24 ${W / 2} ${H / 2})`} stroke={stroke} strokeWidth={strokeWidth} opacity="0.8">
          <line x1={-W} x2={W * 2} y1={H * diagonalAt + 8} y2={H * diagonalAt + 8} />
          <line x1={-W} x2={W * 2} y1={H * diagonalAt + 56} y2={H * diagonalAt + 56} />
          {diagonalLabel && (
            <text
              x={W * 0.32}
              y={H * diagonalAt + 37}
              textAnchor="middle"
              fill={stroke}
              stroke="none"
              fontSize="15"
              fontWeight="700"
              letterSpacing="7"
              style={{ textTransform: 'uppercase' }}
            >
              {diagonalLabel}
            </text>
          )}
        </g>
      )}

      {/* Chincheta del despacho: un pulso que se repite. */}
      <motion.g
        initial={reduce ? false : { scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: delay + 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ transformOrigin: `${px}px ${py}px` }}
      >
        <circle cx={px} cy={py} r="10" fill={pinFill} className="origin-center animate-ping" style={{ transformBox: 'fill-box' }} />
        <circle cx={px} cy={py} r="10" fill={pinFill} />
        <circle cx={px} cy={py} r="4" fill="#fff" />
      </motion.g>
    </svg>
  )
}
