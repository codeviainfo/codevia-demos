import { motion } from 'framer-motion'
import { NAV, RESTAURANT } from '../data/content'

const SOCIAL = ['Instagram', 'Google Maps', 'WhatsApp']

export default function Footer() {
  return (
    <footer id="contacto" className="relative isolate overflow-hidden border-t border-ash bg-void">
      <div className="shell pb-10 pt-24 sm:pt-32">
        <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <a
              href="#top"
              className="font-display text-h3 font-light text-cream transition-opacity duration-400 hover:opacity-70"
            >
              Ánf<span className="italic text-gold">o</span>ra
            </a>
            <p className="mt-5 max-w-[34ch] text-body text-sand">
              Cocina mediterránea de mercado en el corazón de Barcelona.
            </p>
          </div>

          <nav aria-label="Pie de página">
            <h2 className="text-micro uppercase text-gold">Navegación</h2>
            <ul className="mt-6 space-y-3.5">
              {NAV.slice(0, 3).map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group inline-flex items-center gap-2.5 text-body text-cream-dim transition-colors duration-400 hover:text-cream"
                  >
                    <span className="h-px w-0 bg-gold transition-all duration-500 ease-out group-hover:w-5" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-micro uppercase text-gold">Síguenos</h2>
            <ul className="mt-6 space-y-3.5">
              {SOCIAL.map((item) => (
                <li key={item}>
                  <a
                    href="#contacto"
                    className="group inline-flex items-center gap-2.5 text-body text-cream-dim transition-colors duration-400 hover:text-cream"
                  >
                    <span className="h-px w-0 bg-gold transition-all duration-500 ease-out group-hover:w-5" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Firma gigante: cierra la pagina con peso visual, no con un muro de enlaces. */}
        <motion.p
          aria-hidden="true"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 select-none font-display text-mega font-light leading-none text-transparent [-webkit-text-stroke:1px_rgba(247,243,234,0.12)]"
        >
          Ánfora
        </motion.p>

        <div className="mt-10 flex flex-col gap-3 border-t border-ash pt-8 text-caption text-sand sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 {RESTAURANT.name} — negocio ficticio de demostración.</span>
          <span>
            Plantilla creada por{' '}
            <a
              href="https://codeviaesp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold transition-colors duration-400 hover:text-gold-soft"
            >
              Codevia
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
