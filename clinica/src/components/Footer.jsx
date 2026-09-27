import { NAV, CLINIC } from '../data/content'

const CONTACTO = ['Instagram', 'Google Maps', 'WhatsApp']

export default function Footer() {
  return (
    <footer className="border-t border-line bg-canvas">
      <div className="shell py-20 sm:py-24">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <a href="#top" className="group flex w-fit items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-pill bg-accent text-white transition-transform duration-600 ease-out group-hover:rotate-90">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                  <path d="M12 3v18M3 12h18" />
                </svg>
              </span>
              <span className="text-title text-ink">{CLINIC.name}</span>
            </a>
            <p className="mt-5 max-w-[34ch] text-body text-ink-body">
              Centro médico multidisciplinar en Barcelona.
            </p>
          </div>

          <nav aria-label="Pie de página">
            <h2 className="text-micro uppercase text-accent">Navegación</h2>
            <ul className="mt-6 space-y-3.5">
              {NAV.slice(0, 3).map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group inline-flex items-center gap-2.5 text-body text-ink-body transition-colors duration-400 hover:text-ink"
                  >
                    <span className="h-px w-0 bg-accent transition-all duration-500 ease-out group-hover:w-5" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-micro uppercase text-accent">Contacto</h2>
            <ul className="mt-6 space-y-3.5">
              {CONTACTO.map((item) => (
                <li key={item}>
                  <a
                    href="#cita"
                    className="group inline-flex items-center gap-2.5 text-body text-ink-body transition-colors duration-400 hover:text-ink"
                  >
                    <span className="h-px w-0 bg-accent transition-all duration-500 ease-out group-hover:w-5" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-8 text-caption text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 {CLINIC.name} — negocio ficticio de demostración.</span>
          <span>
            Plantilla creada por{' '}
            <a
              href="https://codeviaesp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent transition-colors duration-400 hover:text-accent-deep"
            >
              Codevia
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
