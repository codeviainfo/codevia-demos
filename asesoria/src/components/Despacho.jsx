import SplitText from '../motion/SplitText'
import Reveal from '../motion/Reveal'
import EixampleGrid from './EixampleGrid'
import Stars from './Stars'
import Icon from './Icon'
import { FIRM } from '../data/content'

export default function Despacho() {
  const info = [
    { icon: 'pin', t: 'Dirección', v: `${FIRM.street}, ${FIRM.floor}`, s: `${FIRM.city} · ${FIRM.district}` },
    { icon: 'phone', t: 'Teléfono', v: FIRM.phone, s: 'Te atendemos personalmente', href: FIRM.phoneHref },
    { icon: 'clock', t: 'Horario', v: FIRM.hours, s: 'También por videollamada' },
  ]

  return (
    <section id="despacho" className="grain relative isolate overflow-hidden bg-night py-28 text-white sm:py-36">
      <div className="shell grid gap-16 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
        <div>
          <Reveal as="p" className="flex items-center gap-3 text-micro uppercase text-lima-soft">
            <span className="bg-grad h-px w-8" />
            El despacho
          </Reveal>
          <SplitText
            as="h2"
            text="En el corazón del *Eixample.*"
            accentClass="italic text-grad-light"
            className="mt-6 block max-w-[12ch] text-h2 text-white"
          />
          <Reveal as="p" delay={0.2} className="mt-6 max-w-prose text-body-lg text-white/65">
            Un despacho cercano, donde te atiende siempre alguien que conoce tu
            caso. Ven a vernos o resolvamos todo a distancia: tú eliges.
          </Reveal>

          <ul className="mt-12 divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {info.map((it, i) => {
              const Tag = it.href ? 'a' : 'div'
              return (
                <Reveal as="li" key={it.t} delay={0.25 + i * 0.08}>
                  <Tag
                    {...(it.href ? { href: it.href } : {})}
                    className="group flex items-start gap-5 py-6"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-pill border border-white/10 text-lima-soft transition-colors duration-500 group-hover:border-lima group-hover:bg-lima group-hover:text-ink">
                      <Icon name={it.icon} size={18} />
                    </span>
                    <span>
                      <span className="block text-micro uppercase text-night-muted">{it.t}</span>
                      <span className="mt-2 block text-body-lg text-white">{it.v}</span>
                      <span className="block text-caption text-night-muted">{it.s}</span>
                    </span>
                  </Tag>
                </Reveal>
              )
            })}
          </ul>

          <Reveal delay={0.5} className="mt-10 flex flex-wrap gap-4">
            <a
              href={FIRM.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-pill bg-white px-7 py-4 text-micro uppercase text-ink transition-all duration-400 ease-out hover:-translate-y-0.5 hover:bg-lima-soft"
            >
              Cómo llegar
              <span className="transition-transform duration-500 ease-out group-hover:translate-x-1">→</span>
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="relative">
          <div className="relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-night-2 sm:aspect-[5/4]">
            <EixampleGrid cols={9} rows={8} pin={[4, 3]} diagonalAt={0.5} diagonalLabel="Avinguda Diagonal" stroke="#56633f" strokeWidth={1.6} className="absolute inset-0 h-full w-full" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_30%,#11150d_95%)]" />

            {/* Ficha de Google, con la valoracion real. */}
            <a
              href={FIRM.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-5 left-5 right-5 flex items-center gap-4 rounded-card border border-white/10 bg-night/80 p-4 backdrop-blur-md transition-colors duration-400 hover:border-lima/50 sm:bottom-6 sm:left-6 sm:right-auto sm:pr-7"
            >
              <span className="font-display text-[2.25rem] leading-none text-white">
                {FIRM.rating.toLocaleString('es-ES', { minimumFractionDigits: 1 })}
              </span>
              <span>
                <span className="block text-caption font-semibold text-white">{FIRM.fullName}</span>
                <span className="mt-1 flex items-center gap-2 text-[0.75rem] text-night-muted">
                  <Stars value={FIRM.rating} size={12} className="text-lima" />
                  {FIRM.reviews} reseñas
                </span>
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
