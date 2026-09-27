import { RIBBON } from '../data/content'

export default function Ribbon() {
  return (
    <div className="border-y border-ash bg-coal py-5">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {RIBBON.map((item) => (
              <span
                key={`${copy}-${item}`}
                className="flex items-center gap-12 px-12 text-micro uppercase text-cream-dim"
              >
                {item}
                <span className="h-1 w-1 rounded-pill bg-gold" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
