/**
 * Cinco estrellas con relleno parcial: 4,8 pinta la ultima al 80 %.
 * El relleno se hace recortando una capa llena por encima de una
 * vacia, sin degradados por estrella.
 */
const STAR = 'M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z'

export default function Stars({ value = 5, size = 14, className = '' }) {
  const row = (fill) => (
    <span className="flex gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
          <path d={STAR} fill={fill ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
      ))}
    </span>
  )

  return (
    <span className={`relative inline-flex ${className}`} role="img" aria-label={`${value.toLocaleString('es-ES')} de 5 estrellas`}>
      <span className="opacity-35">{row(false)}</span>
      <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${(value / 5) * 100}%` }}>
        {row(true)}
      </span>
    </span>
  )
}
