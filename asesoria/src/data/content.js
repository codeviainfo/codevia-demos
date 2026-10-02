// Toda la informacion editable de la demo vive aqui.
//
// Nombre, direccion, telefono y valoracion son los de la ficha de
// Google de Asesoria Noega. El horario completo no figura en ella:
// revisar `hours` con el cliente antes de publicar.

export const FIRM = {
  name: 'Noega',
  fullName: 'Asesoría Noega',
  kind: 'Asesoría fiscal, contable y laboral',
  street: 'Carrer de París, 118',
  floor: 'Esc. B, entresuelo 1.º A',
  city: '08036 Barcelona',
  district: 'Eixample',
  phone: '930 18 01 84',
  phoneHref: 'tel:+34930180184',
  hours: 'Lunes a viernes, con cita previa',
  rating: 4.8,
  reviews: 19,
  maps: 'https://www.google.com/maps/search/?api=1&query=Asesor%C3%ADa+Noega+Carrer+de+Par%C3%ADs+118+08036+Barcelona',
}

export const NAV = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#perfiles', label: 'Para quién' },
  { href: '#calculadora', label: 'Calculadora' },
  { href: '#calendario', label: 'Calendario fiscal' },
  { href: '#despacho', label: 'El despacho' },
]

export const MARQUEE = [
  'Declaración de la renta',
  'IVA trimestral',
  'Impuesto de Sociedades',
  'Nóminas y seguros sociales',
  'Altas de autónomo',
  'Contabilidad',
  'Herencias y donaciones',
  'Constitución de sociedades',
  'Requerimientos de Hacienda',
  'Verifactu',
]

// `icon` es la clave del trazo SVG en components/Icon.jsx.
export const SERVICIOS = [
  {
    n: '01',
    icon: 'scale',
    title: 'Fiscalidad',
    desc: 'Planificamos tus impuestos con antelación para que pagues lo justo, ni un euro más.',
    items: ['IVA, IRPF e Impuesto de Sociedades', 'Planificación fiscal anual', 'Requerimientos e inspecciones'],
  },
  {
    n: '02',
    icon: 'ledger',
    title: 'Contabilidad',
    desc: 'Libros al día y cierres sin prisas, con informes que se entienden a la primera.',
    items: ['Llevanza de libros oficiales', 'Cuentas anuales y depósito', 'Informes trimestrales de gestión'],
  },
  {
    n: '03',
    icon: 'people',
    title: 'Laboral',
    desc: 'Nóminas, contratos y Seguridad Social, para que tu equipo cobre bien y a tiempo.',
    items: ['Nóminas y seguros sociales', 'Contratos, altas y bajas', 'Finiquitos y despidos'],
  },
  {
    n: '04',
    icon: 'spark',
    title: 'Autónomos',
    desc: 'Del alta al día a día: modelos trimestrales, cuota y facturación sin sobresaltos.',
    items: ['Alta en Hacienda y Seguridad Social', 'Modelos 303, 130, 111 y 115', 'Facturación preparada para Verifactu'],
  },
  {
    n: '05',
    icon: 'home',
    title: 'Renta y patrimonio',
    desc: 'Tu declaración revisada línea a línea, buscando cada deducción que te corresponde.',
    items: ['Renta individual o conjunta', 'Alquileres y venta de inmuebles', 'Herencias y donaciones'],
  },
  {
    n: '06',
    icon: 'building',
    title: 'Mercantil',
    desc: 'Constituimos tu sociedad y la mantenemos en regla, año tras año.',
    items: ['Constitución de sociedades', 'Actas y libros societarios', 'Ampliaciones y cambios de órganos'],
  },
]

export const PERFILES = [
  {
    id: 'autonomos',
    label: 'Autónomos',
    title: 'Empieza o crece *sin* *miedo* a Hacienda.',
    desc: 'Te damos de alta, elegimos contigo la cuota que te toca y presentamos cada trimestre por ti. Tú solo nos envías las facturas.',
    items: [
      'Alta en Hacienda y Seguridad Social',
      'Modelos 303, 130, 111 y 115 cada trimestre',
      'Cuota de autónomo ajustada a tus rendimientos',
      'Facturación preparada para Verifactu',
      'Declaración de la renta incluida',
    ],
    stat: { to: 4, label: 'trimestres al año sin pensar en plazos' },
  },
  {
    id: 'pymes',
    label: 'Pymes',
    title: 'Tu departamento de *administración*, sin ampliar plantilla.',
    desc: 'Contabilidad, impuestos y nóminas en un mismo despacho, con un interlocutor que conoce tu empresa por dentro.',
    items: [
      'Contabilidad y cierre del ejercicio',
      'Impuesto de Sociedades y cuentas anuales',
      'Nóminas, contratos y seguros sociales',
      'Informes trimestrales para decidir con datos',
      'Gestión de requerimientos e inspecciones',
    ],
    stat: { to: 1, label: 'interlocutor para fiscal, contable y laboral' },
  },
  {
    id: 'particulares',
    label: 'Particulares',
    title: 'La renta y los trámites, resueltos *con* *calma*.',
    desc: 'Revisamos tu situación personal y familiar para aplicar cada deducción, y te acompañamos en los momentos importantes.',
    items: [
      'Declaración de la renta, individual o conjunta',
      'Alquileres, compraventa y plusvalías',
      'Herencias y donaciones',
      'Impuesto sobre el Patrimonio',
      'Recursos y alegaciones ante Hacienda',
    ],
    stat: { to: 100, suffix: ' %', label: 'de las deducciones revisadas, una a una' },
  },
]

export const METODO = [
  { n: '01', title: 'Primera consulta', desc: 'Nos cuentas tu situación y revisamos tus últimas declaraciones. Sin compromiso.' },
  { n: '02', title: 'Propuesta por escrito', desc: 'Un presupuesto claro y cerrado: sabes qué incluye y cuánto cuesta desde el primer día.' },
  { n: '03', title: 'Nos ocupamos', desc: 'Nos envías tus facturas y documentos; preparamos y presentamos cada modelo en plazo.' },
  { n: '04', title: 'Te avisamos antes', desc: 'Días antes de cada vencimiento sabes cuánto vas a pagar. Sin sorpresas de última hora.' },
]

export const FAQ = [
  {
    q: '¿Puedo cambiar de asesoría a mitad de año?',
    a: 'Sí. Nos encargamos de pedir la documentación a tu asesoría anterior y de revisar que todo lo presentado hasta ahora esté en regla, para empezar sin cabos sueltos.',
  },
  {
    q: '¿Tengo que venir al despacho?',
    a: 'Solo si quieres. Te atendemos en el Eixample, pero también por teléfono, correo o videollamada, y la documentación se intercambia de forma digital.',
  },
  {
    q: '¿Qué necesito para la primera consulta?',
    a: 'Tus últimas declaraciones de la renta y, si eres autónomo o empresa, las facturas del trimestre en curso. Con eso podemos darte una primera valoración.',
  },
  {
    q: 'He recibido una carta de Hacienda, ¿qué hago?',
    a: 'Que no cunda el pánico: la mayoría de requerimientos se resuelven aportando documentación. Envíanosla, la revisamos y respondemos en plazo en tu nombre.',
  },
  {
    q: '¿Trabajáis con autónomos que empiezan?',
    a: 'Es una de las cosas que más nos gusta hacer. Te ayudamos a elegir epígrafe, régimen y cuota desde el principio, que es cuando más se nota un buen asesoramiento.',
  },
]
