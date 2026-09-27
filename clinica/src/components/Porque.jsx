import { motion } from 'framer-motion'
import SplitText from '../motion/SplitText'
import Reveal from '../motion/Reveal'
import { PORQUE, OPINIONES } from '../data/content'

function Estrellas() {
  return (
    <div className="flex gap-1" aria-label="5 de 5 estrellas">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className="text-accent"
          initial={{ opacity: 0, scale: 0.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
        >
          <path d="m12 2 2.9 6.3 6.8.8-5 4.7 1.3 6.8L12 17.3 6 20.6l1.3-6.8-5-4.7 6.8-.8Z" />
        </motion.svg>
      ))}
    </div>
  )
}

export default function Porque() {
  return (
    <section id="equipo" className="py-28 sm:py-36 lg:py-44">
      <div className="shell grid gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <Reveal as="p" className="flex items-center gap-3 text-micro uppercase text-accent">
            <span className="h-1.5 w-1.5 rounded-pill bg-accent" />
            Por qué elegirnos
          </Reveal>

          <SplitText
            as="h2"
            text="Cerca de ti en *cada paso*"
            className="mt-6 block max-w-[14ch] text-h2 text-ink"
          />

          <Reveal as="p" delay={0.25} className="mt-6 max-w-prose text-body-lg text-ink-body">
            No somos una consulta más: acompañamos cada tratamiento de principio
            a fin.
          </Reveal>

          <ol className="mt-14 space-y-px">
            {PORQUE.map((item, i) => (
              <Reveal
                as="li"
                key={item.n}
                delay={i * 0.1}
                className="group flex gap-6 border-t border-line py-7 transition-all duration-500 ease-out last:border-b hover:pl-3"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-pill border border-line text-micro text-muted transition-colors duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                  {item.n}
                </span>
                <div>
                  <h3 className="text-title text-ink">{item.title}</h3>
                  <p className="mt-2 text-body text-ink-body">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* Las opiniones se apilan escalonadas y se enderezan al pasar
            el raton: dan volumen sin necesidad de fotografia. */}
        <div id="opiniones" className="flex flex-col justify-center gap-5 lg:pt-16">
          {OPINIONES.map((op, i) => (
            <Reveal
              key={op.autor}
              delay={i * 0.12}
              y={34}
              className={i % 2 === 0 ? 'lg:ml-0 lg:mr-8' : 'lg:ml-8 lg:mr-0'}
            >
              <figure className="group rounded-xl border border-line bg-canvas p-8 shadow-card transition-all duration-600 ease-out hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-lift">
                <Estrellas />
                <blockquote className="mt-5 text-body-lg text-ink">
                  <span className="font-display text-h3 italic leading-none text-accent/40">“</span>
                  {op.texto}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-line-soft pt-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-pill bg-accent-tint text-title text-accent transition-transform duration-500 ease-out group-hover:scale-110">
                    {op.autor.charAt(0)}
                  </span>
                  <span className="leading-tight">
                    <strong className="block text-caption font-medium text-ink">{op.autor}</strong>
                    <span className="block text-caption text-muted">{op.rol}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
