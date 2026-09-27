// Toda la informacion editable de la demo vive aqui.

export const CLINIC = {
  name: 'Clara Salud',
  tagline: 'Centro médico certificado · Barcelona',
  address: 'Av. Example, 88 — 08015 Barcelona',
  phone: '+34 600 000 000',
  hours: 'Lunes a viernes, 9:00 – 20:00',
}

export const NAV = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#equipo', label: 'Por qué elegirnos' },
  { href: '#opiniones', label: 'Opiniones' },
  { href: '#cita', label: 'Cita previa' },
]

export const STATS = [
  { to: 12, suffix: ' años', label: 'de experiencia' },
  { to: 5000, prefix: '+', label: 'pacientes atendidos', locale: true },
  { to: 4.9, decimals: 1, suffix: ' / 5', label: 'valoración media' },
]

// `icon` es la clave del trazo SVG en components/Icon.jsx.
export const SERVICIOS = [
  { icon: 'fisio', title: 'Fisioterapia', desc: 'Recuperación funcional, terapia manual y planes de ejercicio personalizados.' },
  { icon: 'dental', title: 'Odontología', desc: 'Revisiones, estética dental e implantes con tecnología de última generación.' },
  { icon: 'clock', title: 'Medicina estética', desc: 'Tratamientos faciales y corporales no invasivos, con resultados naturales.' },
  { icon: 'leaf', title: 'Nutrición', desc: 'Planes alimentarios adaptados a tus objetivos, con seguimiento mensual.' },
  { icon: 'brain', title: 'Psicología', desc: 'Terapia individual con enfoque cercano, presencial u online.' },
  { icon: 'check', title: 'Revisiones generales', desc: 'Chequeos completos y analíticas con resultados explicados sin tecnicismos.' },
]

export const PORQUE = [
  { n: '01', title: 'Diagnóstico claro', desc: 'Te explicamos cada resultado sin tecnicismos, con tiempo para tus preguntas.' },
  { n: '02', title: 'Citas sin esperas', desc: 'Agenda flexible y recordatorios automáticos por WhatsApp.' },
  { n: '03', title: 'Seguimiento real', desc: 'El mismo profesional te acompaña durante todo el tratamiento.' },
]

export const OPINIONES = [
  { texto: 'Desde la primera cita me sentí escuchada. Explican todo con calma y sin prisas.', autor: 'Marta R.', rol: 'Paciente de fisioterapia' },
  { texto: 'Pedí cita un lunes y me atendieron el mismo miércoles. Muy profesionales.', autor: 'Jordi P.', rol: 'Paciente de odontología' },
  { texto: 'El seguimiento mensual marca la diferencia. Se nota que les importa el resultado.', autor: 'Laura G.', rol: 'Paciente de nutrición' },
]

export const ESPECIALIDADES = [
  'Fisioterapia',
  'Odontología',
  'Medicina estética',
  'Nutrición',
  'Psicología',
  'Revisiones generales',
]
