import { motion } from 'framer-motion'

/**
 * Cada icono es una lista de figuras. Se declaran como datos, no como
 * JSX suelto, porque hay que renderizarlas como `motion.path` /
 * `motion.circle`: las variantes solo llegan a hijos que son
 * componentes de Motion, nunca a un <path> normal.
 */
const ICONS = {
  scale: [
    ['path', { d: 'M12 3v18M7 21h10M4 7h16M7 7l-3 7a3 3 0 0 0 6 0L7 7M17 7l-3 7a3 3 0 0 0 6 0l-3-7' }],
  ],
  ledger: [
    ['path', { d: 'M5 3h11l3 3v15H5z' }],
    ['path', { d: 'M9 9h6M9 13h6M9 17h3' }],
  ],
  people: [
    ['circle', { cx: 9, cy: 8, r: 3.5 }],
    ['path', { d: 'M2.5 20a6.5 6.5 0 0 1 13 0M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14a6.5 6.5 0 0 1 3.5 6' }],
  ],
  spark: [['path', { d: 'M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18' }]],
  home: [['path', { d: 'M3 11 12 4l9 7M5.5 9.5V20h13V9.5M10 20v-5.5h4V20' }]],
  building: [
    ['path', { d: 'M4 21V5l8-2v18M12 8h8v13M2 21h20' }],
    ['path', { d: 'M7.5 8h1M7.5 12h1M7.5 16h1M15.5 12h1M15.5 16h1' }],
  ],
  check: [
    ['circle', { cx: 12, cy: 12, r: 10 }],
    ['path', { d: 'm8.5 12 2.5 2.5 4.5-5' }],
  ],
  clock: [
    ['circle', { cx: 12, cy: 12, r: 9 }],
    ['path', { d: 'M12 7.5V12l3 2' }],
  ],
  pin: [
    ['path', { d: 'M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z' }],
    ['circle', { cx: 12, cy: 10, r: 3 }],
  ],
  phone: [['path', { d: 'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.4 2.1L8 9.9a16 16 0 0 0 6 6l1.4-1.4a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.8 2Z' }]],
  calendar: [
    ['path', { d: 'M4 6h16v15H4zM4 10h16M8 3v5M16 3v5' }],
  ],
  arrow: [['path', { d: 'M5 12h14M13 6l6 6-6 6' }]],
}

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.15 },
    },
  },
}

/**
 * Icono de trazo que se dibuja solo al entrar en pantalla.
 */
export default function Icon({ name, size = 22, animate = true, strokeWidth = 1.6, className = '' }) {
  const shapes = ICONS[name] ?? ICONS.check

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...(animate
        ? { initial: 'hidden', whileInView: 'show', viewport: { once: true, amount: 0.6 } }
        : {})}
    >
      {shapes.map(([type, props], i) => {
        const Shape = type === 'circle' ? motion.circle : motion.path
        return <Shape key={i} {...props} variants={animate ? draw : undefined} />
      })}
    </motion.svg>
  )
}
