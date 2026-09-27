import { useInView } from '../hooks/useInView'

/**
 * Aparicion al entrar en pantalla: opacidad + desplazamiento corto.
 * `delay` escalona grupos (en ms) sin necesidad de reglas nth-child.
 */
export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  y = 24,
  className = '',
  children,
  ...rest
}) {
  const [ref, inView] = useInView()

  return (
    <Tag
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transform: inView ? 'none' : `translateY(${y}px)`,
      }}
      className={`transition-[opacity,transform] duration-700 ease-out ${
        inView ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
