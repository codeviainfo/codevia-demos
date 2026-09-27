import SplitText from '../motion/SplitText'
import Reveal from '../motion/Reveal'
import { PORQUE } from '../data/content'

export default function Porque() {
  return (
    <section id="nosotros" className="py-28 sm:py-36 lg:py-44">
      <div className="shell">
        <Reveal as="p" className="flex items-center gap-3 text-micro uppercase text-accent">
          <span className="h-1.5 w-1.5 rounded-pill bg-accent" />
          Por qué comprar aquí
        </Reveal>

        <SplitText
          as="h2"
          text="Compra con *confianza*"
          className="mt-6 block max-w-[13ch] font-display text-h2 uppercase text-chalk"
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-card bg-ash sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
          {PORQUE.map((item, i) => (
            <Reveal
              key={item.n}
              delay={i * 0.09}
              className="group relative bg-void p-9 transition-colors duration-500 hover:bg-coal"
            >
              <span className="font-display text-h3 text-ash transition-colors duration-500 group-hover:text-accent">
                {item.n}
              </span>
              <h3 className="mt-6 text-title text-chalk">{item.title}</h3>
              <p className="mt-3 text-body text-chalk-dim">{item.desc}</p>
              <span className="absolute inset-x-0 bottom-0 h-0.5 w-0 bg-accent transition-all duration-600 ease-out group-hover:w-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
