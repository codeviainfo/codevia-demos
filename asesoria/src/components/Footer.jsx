import Reveal from '../motion/Reveal'
import Logo from './Logo'
import { NAV, FIRM } from '../data/content'

export default function Footer() {
  return (
    <footer className="grain relative isolate overflow-hidden bg-night text-white">
      <div className="shell pt-24 sm:pt-28">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <a href="#top" className="group flex w-fit items-center gap-4">
              <Logo variant="full" className="h-24 w-24 transition-transform duration-900 ease-out group-hover:rotate-[10deg]" />
            </a>
            <p className="mt-6 max-w-[34ch] text-body text-night-muted">
              {FIRM.kind} para autónomos, pymes y particulares en el Eixample de Barcelona.
            </p>
          </div>

          <nav aria-label="Pie de página">
            <h2 className="font-sans text-micro uppercase text-lima-soft">Navegación</h2>
            <ul className="mt-6 space-y-3.5">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="group inline-flex items-center text-body text-white/70 transition-colors duration-400 hover:text-white">
                    <span className="h-px w-0 bg-lima transition-all duration-500 ease-out group-hover:mr-2.5 group-hover:w-5" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-sans text-micro uppercase text-lima-soft">Contacto</h2>
            <ul className="mt-6 space-y-3.5 text-body text-white/70">
              <li>
                <a href={FIRM.phoneHref} className="transition-colors duration-400 hover:text-white">{FIRM.phone}</a>
              </li>
              <li>{FIRM.street}</li>
              <li>{FIRM.floor}</li>
              <li>{FIRM.city}</li>
              <li>
                <a href={FIRM.maps} target="_blank" rel="noopener noreferrer" className="transition-colors duration-400 hover:text-white">
                  Ver en Google Maps ↗
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* El nombre a toda anchura, cortado por el borde inferior. */}
      <Reveal y={60} className="pointer-events-none mt-16 select-none overflow-hidden" aria-hidden="true">
        <p className="text-grad-light text-center font-display text-mega italic leading-[0.78] tracking-[-0.05em] [margin-bottom:-0.12em]">
          Noega
        </p>
      </Reveal>

      <div className="relative border-t border-white/[0.08] bg-night">
        <div className="shell flex flex-col gap-3 pb-24 pt-7 text-caption sm:pb-7 text-night-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {FIRM.fullName}</span>
          <span className="sm:mr-56">
            Propuesta de web diseñada por{' '}
            <a href="https://codeviaesp.com" target="_blank" rel="noopener noreferrer" className="text-white/80 underline decoration-lima/60 underline-offset-4 transition-colors hover:text-white">
              Codevia
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
