import { motion } from 'framer-motion'

/**
 * Titular que entra palabra a palabra desde detras de una mascara.
 * Cada palabra vive en un contenedor `overflow-hidden`, asi que el
 * texto no aparece: emerge.
 *
 * Marcar una palabra con asteriscos la pone en cursiva con el
 * degradado de marca (`accentClass` lo cambia en fondos oscuros).
 *
 * `motion[Tag]` se resuelve sobre los componentes ya creados por la
 * libreria. Llamar a `motion.create()` aqui dentro devolveria un
 * componente distinto en cada render y remontaria el nodo, perdiendo
 * la animacion a medias.
 */
export default function SplitText({
  text,
  as = 'span',
  delay = 0,
  stagger = 0.055,
  className = '',
  accentClass = 'italic text-grad',
}) {
  const MotionTag = motion[as] ?? motion.span
  const words = text.split(' ')

  return (
    <MotionTag
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      className={className}
      aria-label={text.replace(/\*/g, '')}
    >
      {words.map((word, i) => {
        const accent = word.startsWith('*') && word.endsWith('*')
        const clean = accent ? word.slice(1, -1) : word

        return (
          <span
            key={word + i}
            aria-hidden="true"
            className="inline-block overflow-hidden align-bottom"
          >
            <motion.span
              variants={{
                hidden: { y: '115%' },
                show: { y: '0%', transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
              }}
              className={'inline-block' + (accent ? ' ' + accentClass : '')}
            >
              {clean}
              {i < words.length - 1 && ' '}
            </motion.span>
          </span>
        )
      })}
    </MotionTag>
  )
}
