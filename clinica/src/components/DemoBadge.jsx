export default function DemoBadge() {
  return (
    <a
      href="https://codeviaesp.com"
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-5 right-5 z-40 inline-flex items-center gap-2.5 rounded-pill border border-line bg-canvas/90 px-4 py-2.5 text-caption text-ink-body shadow-card backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-accent/50 hover:text-ink"
    >
      <span className="h-1.5 w-1.5 rounded-pill bg-accent transition-transform duration-500 ease-out group-hover:scale-150" />
      Demo creada por Codevia
    </a>
  )
}
