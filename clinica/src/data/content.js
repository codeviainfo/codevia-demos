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
// `img` + `alt`: la foto que encabeza cada tarjeta de servicio.
export const SERVICIOS = [
  { icon: 'fisio', title: 'Fisioterapia', img: '/img/fisioterapia.jpg', alt: 'Sala de fisioterapia con camilla, pelotas y material de ejercicio.', desc: 'Recuperación funcional, terapia manual y planes de ejercicio personalizados.' },
  { icon: 'dental', title: 'Odontología', img: '/img/dental.jpg', alt: 'Gabinete dental con sillón moderno e instrumental ordenado.', desc: 'Revisiones, estética dental e implantes con tecnología de última generación.' },
  { icon: 'clock', title: 'Medicina estética', img: '/img/consulta.jpg', alt: 'Consulta luminosa con escritorio de roble y camilla de exploración.', desc: 'Tratamientos faciales y corporales no invasivos, con resultados naturales.' },
  { icon: 'leaf', title: 'Nutrición', img: '/img/nutricion.jpg', alt: 'Mesa con verduras y fruta fresca de temporada junto a un cuaderno.', desc: 'Planes alimentarios adaptados a tus objetivos, con seguimiento mensual.' },
  { icon: 'brain', title: 'Psicología', img: '/img/psicologia.jpg', alt: 'Sala de terapia con dos butacas enfrentadas y luz natural suave.', desc: 'Terapia individual con enfoque cercano, presencial u online.' },
  { icon: 'check', title: 'Revisiones generales', img: '/img/equipo.jpg', alt: 'Doctora conversando con dos pacientes al otro lado de la mesa.', desc: 'Chequeos completos y analíticas con resultados explicados sin tecnicismos.' },
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

// Foto ancha que abre la pagina y foto del centro en 'Por que elegirnos'.
export const FOTOS = {
  hero: {
    src: '/img/hero.jpg',
    alt: 'Recepción del centro médico: mostrador de roble claro, bancada verde azulado y mucha luz natural.',
  },
  centro: {
    src: '/img/recepcion.jpg',
    alt: 'Zona de espera del centro con sofás verde azulado, plantas y grandes ventanales.',
  },
}

export const ESPECIALIDADES = [
  'Fisioterapia',
  'Odontología',
  'Medicina estética',
  'Nutrición',
  'Psicología',
  'Revisiones generales',
]
