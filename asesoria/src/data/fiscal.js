// Calendario fiscal de autonomos y pymes (regimen general, AEAT).
//
// Se calcula sobre la fecha real del visitante, asi que la demo
// nunca caduca: el "proximo vencimiento" siempre es el siguiente.
// Si un plazo cae en fin de semana se traslada al lunes, como hace
// la Agencia Tributaria. Los festivos no se contemplan.

const DAY = 86400000

const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate())

function habil(date) {
  const d = new Date(date)
  const wd = d.getDay()
  if (wd === 6) d.setDate(d.getDate() + 2)
  if (wd === 0) d.setDate(d.getDate() + 1)
  return d
}

// Los cuatro cierres trimestrales de un año natural `y`.
// El del 4T se presenta en enero del año siguiente y vence el 30.
function trimestres(y) {
  return [
    { q: `4T ${y - 1}`, from: new Date(y, 0, 1), to: habil(new Date(y, 0, 30)), models: ['303', '130', '111', '115', '390'] },
    { q: `1T ${y}`, from: new Date(y, 3, 1), to: habil(new Date(y, 3, 20)), models: ['303', '130', '111', '115'] },
    { q: `2T ${y}`, from: new Date(y, 6, 1), to: habil(new Date(y, 6, 20)), models: ['303', '130', '111', '115'] },
    { q: `3T ${y}`, from: new Date(y, 9, 1), to: habil(new Date(y, 9, 20)), models: ['303', '130', '111', '115'] },
  ]
}

/** El siguiente cierre trimestral desde `now` (incluido el de hoy). */
export function proximoCierre(now = new Date()) {
  const today = startOfDay(now)
  const all = [...trimestres(today.getFullYear()), ...trimestres(today.getFullYear() + 1)]
  const next = all.find((t) => t.to >= today)
  const prev = [...all].reverse().find((t) => t.to < today)
  const days = Math.round((next.to - today) / DAY)
  const open = today >= next.from

  // Avance entre el cierre anterior y el siguiente, para el anillo.
  const span = next.to - (prev ? prev.to : next.from)
  const progress = Math.min(1, Math.max(0, (today - (prev ? prev.to : next.from)) / span))

  return { ...next, days, open, progress }
}

/** Hitos del año en curso para la linea de tiempo. */
export function hitos(now = new Date()) {
  const y = now.getFullYear()
  const t = trimestres(y)
  return {
    year: y,
    todayFrac: (startOfDay(now) - new Date(y, 0, 1)) / (new Date(y + 1, 0, 1) - new Date(y, 0, 1)),
    rows: [
      {
        label: 'Trimestrales',
        items: t.map((x) => ({ title: `Cierre ${x.q}`, from: x.from, to: x.to, models: x.models, main: true })),
      },
      {
        label: 'Anuales',
        items: [
          { title: 'Modelo 347', from: new Date(y, 1, 1), to: new Date(y, 1, 28), models: ['347'] },
          { title: 'Campaña de la Renta', from: new Date(y, 3, 8), to: habil(new Date(y, 5, 30)), models: ['100'] },
          { title: 'Impuesto de Sociedades', from: new Date(y, 6, 1), to: habil(new Date(y, 6, 25)), models: ['200'] },
        ],
      },
    ],
  }
}

export const yearFrac = (date) => {
  const y = date.getFullYear()
  return (date - new Date(y, 0, 1)) / (new Date(y + 1, 0, 1) - new Date(y, 0, 1))
}

export const fmtDia = (d) => d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }).replace('.', '')
export const fmtLargo = (d) => d.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })
