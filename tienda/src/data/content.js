// Toda la informacion editable de la demo vive aqui.

export const STORE = {
  name: 'Nébula',
  full: 'Nébula Store',
  claim: 'Tienda online de moda y accesorios, con base en Barcelona.',
}

export const NAV = [
  { href: '#novedades', label: 'Novedades' },
  { href: '#coleccion', label: 'Colección' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#contacto', label: 'Contacto' },
]

export const ANUNCIOS = [
  'Envío gratis desde 40 €',
  'Devoluciones en 30 días',
  'Nueva colección de otoño',
  'Pago seguro con Bizum',
]

export const STATS = [
  { value: '24–48 h', label: 'Envío nacional' },
  { to: 2400, prefix: '+', locale: true, label: 'Pedidos entregados' },
  { to: 4.8, decimals: 1, suffix: ' / 5', label: 'Valoración media' },
]

export const CATEGORIAS = [
  { title: 'Ropa', count: '+120 piezas', img: '/img/cat-ropa.jpg', alt: 'Prendas de ropa colgadas en un perchero.', span: 'sm:col-span-2 sm:row-span-2' },
  { title: 'Accesorios', count: '+60 piezas', img: '/img/cat-accesorios.jpg', alt: 'Accesorios de moda sobre una superficie neutra.', span: '' },
  { title: 'Calzado', count: '+40 piezas', img: '/img/cat-calzado.jpg', alt: 'Par de zapatos de diseño sobre fondo claro.', span: 'sm:row-span-2' },
  { title: 'Nuevo', count: 'Recién llegado', img: '/img/cat-nuevo.jpg', alt: 'Novedades de la temporada expuestas en tienda.', span: '' },
]

export const PRODUCTOS = [
  { name: 'Chaqueta Studio', price: '79 €', badge: 'Nuevo', img: '/img/p-chaqueta.jpg', alt: 'Chaqueta Studio de corte recto en tono neutro.' },
  { name: 'Camisa Lino Natural', price: '49 €', img: '/img/p-camisa.jpg', alt: 'Camisa de lino natural doblada.' },
  { name: 'Pantalón Recto Negro', price: '52 €', old: '65 €', badge: '−20 %', img: '/img/p-pantalon.jpg', alt: 'Pantalón recto negro sobre fondo claro.' },
  { name: 'Gorra Técnica', price: '29 €', img: '/img/p-gorra.jpg', alt: 'Gorra técnica de perfil bajo.' },
  { name: 'Bolso Cross Body', price: '59 €', badge: 'Nuevo', img: '/img/p-bolso.jpg', alt: 'Bolso cross body con correa ajustable.' },
]

export const PORQUE = [
  { n: '01', title: 'Envío 24–48 h', desc: 'Pedidos gestionados a diario desde nuestro almacén.' },
  { n: '02', title: 'Devolución gratis', desc: '30 días para cambiar de opinión, sin preguntas.' },
  { n: '03', title: 'Pago seguro', desc: 'Tarjeta, Bizum o PayPal, con cifrado de extremo a extremo.' },
  { n: '04', title: 'Atención cercana', desc: 'Respondemos por WhatsApp en menos de un día.' },
]
