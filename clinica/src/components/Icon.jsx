import { motion } from 'framer-motion'

/**
 * Cada icono es una lista de figuras. Se declaran como datos, no como
 * JSX suelto, porque hay que renderizarlas como `motion.path` /
 * `motion.circle`: las variantes solo llegan a hijos que son
 * componentes de Motion, nunca a un <path> normal.
 */
const ICONS = {
  fisio: [['path', { d: 'M6 3v6a4 4 0 0 0 4 4h0a4 4 0 0 0 4-4V3M6 21v-4a4 4 0 0 1 4-4h0' }]],
  dental: [['path', { d: 'M12 2c-3 0-5 2-5 5 0 4 2 6 2 9a3 3 0 0 0 6 0c0-3 2-5 2-9 0-3-2-5-5-5Z' }]],
  clock: [
    ['circle', { cx: 12, cy: 12, r: 9 }],
    ['path', { d: 'M12 8v4l3 2' }],
  ],
  leaf: [['path', { d: 'M4 12a8 8 0 1 1 16 0c0 4-2 6-4 7H8c-2-1-4-3-4-7Z' }]],
  brain: [['path', { d: 'M21 11.5a8.4 8.4 0 0 1-9.6 8.3 8.5 8.5 0 0 1-6.6-6.6A8.4 8.4 0 0 1 13.1 3a7 7 0 0 0 7.9 8.5Z' }]],
  check: [
    ['circle', { cx: 12, cy: 12, r: 10 }],
    ['path', { d: 'm9 12 2 2 4-4' }],
  ],
  pin: [
    ['path', { d: 'M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z' }],
    ['circle', { cx: 12, cy: 10, r: 3 }],
  ],
  phone: [['path', { d: 'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.4 2.1L8 9.9a16 16 0 0 0 6 6l1.4-1.4a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.8 2Z' }]],
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
 * `pathLength` evita medir cada figura con getTotalLength(), que es
 * lo que hacia el script original a mano.
 */
export default function Icon({ name, size = 22, animate = true, className = '' }) {
  const shapes = ICONS[name] ?? ICONS.check

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
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
