// Toda la informacion editable de la demo vive aqui.
// Los componentes solo la pintan: cambiar la carta no toca el diseno.

export const RESTAURANT = {
  name: 'Ánfora',
  tagline: 'Cocina mediterránea · Barcelona',
  address: 'Calle Example, 24 — 08001 Barcelona',
  phone: '+34 600 000 000',
  email: 'hola@anfora-demo.codeviaesp.com',
  hours: 'Lunes a domingo, 18:00 – 00:00',
  kitchen: 'Cocina abierta hasta las 23:30',
}

export const NAV = [
  { href: '#carta', label: 'Carta' },
  { href: '#ambiente', label: 'Ambiente' },
  { href: '#reservas', label: 'Reservas' },
  { href: '#contacto', label: 'Contacto' },
]

// `img` alimenta la vista previa flotante al pasar el raton por un plato.
export const MENU = [
  {
    id: 'compartir',
    title: 'Para compartir',
    items: [
      { name: 'Pulpo a la brasa', price: '18', tag: 'Recomendado', img: '/img/hero.jpg', desc: 'Pulpo asado sobre puré de patata ahumada y pimentón de la Vera.' },
      { name: 'Croquetas de jamón ibérico', price: '12', tag: '6 uds.', img: '/img/cocina.jpg', desc: 'Bechamel cremosa de larga cocción y jamón ibérico de bellota.' },
      { name: 'Burrata con tomate de temporada', price: '15', tag: 'Vegetariano', img: '/img/mesa.jpg', desc: 'Burrata cremosa, tomate de km 0, albahaca y aceite de oliva virgen extra.' },
      { name: 'Berenjena ahumada con miel', price: '11', tag: 'Vegetariano', img: '/img/barra.jpg', desc: 'Berenjena asada al carbón, miel de caña y semillas de sésamo tostado.' },
    ],
  },
  {
    id: 'principales',
    title: 'Principales',
    items: [
      { name: 'Arroz de temporada', price: '22', tag: 'Para dos', img: '/img/mesa.jpg', desc: 'Arroz meloso con verduras de mercado y alioli casero.' },
      { name: 'Entrecot a la brasa', price: '26', tag: '300 g', img: '/img/cocina.jpg', desc: 'Maduración propia, brasa de carbón vegetal y patata confitada.' },
      { name: 'Lubina a la sal', price: '28', tag: 'Para dos', img: '/img/hero.jpg', desc: 'Lubina salvaje al horno, costra de sal marina y verduras de temporada.' },
      { name: 'Risotto de setas y trufa', price: '19', tag: 'Vegetariano', img: '/img/sala.jpg', desc: 'Arroz cremoso, setas de temporada y virutas de trufa negra.' },
    ],
  },
  {
    id: 'postres',
    title: 'Postres',
    items: [
      { name: 'Crema catalana', price: '7', tag: 'Casera', img: '/img/mesa.jpg', desc: 'Receta de la casa, con vainilla de Madagascar y azúcar quemado al momento.' },
      { name: 'Torrija caramelizada', price: '7', tag: 'Casera', img: '/img/barra.jpg', desc: 'Con helado de canela y caramelo ligeramente salado.' },
      { name: 'Coulant de chocolate', price: '8', tag: 'Recomendado', img: '/img/cocina.jpg', desc: 'Corazón líquido de chocolate 70 %, con helado de vainilla.' },
    ],
  },
  {
    id: 'bebidas',
    title: 'Vinos y bebidas',
    items: [
      { name: 'Copa de vino de la casa', price: '5', tag: 'Tinto / blanco', img: '/img/vino.jpg', desc: 'Selección de bodegas locales, cambia cada temporada.' },
      { name: 'Vermut de grifo', price: '4,5', tag: 'Con soda', img: '/img/barra.jpg', desc: 'Vermut artesano de barril, con sifón y una rodaja de naranja.' },
      { name: 'Agua con gas', price: '4', tag: '75 cl', img: '/img/bodega.jpg', desc: 'Para compartir en la mesa.' },
    ],
  },
]

// Seccion con scroll anclado: el texto avanza y la foto cambia detras.
export const SHOWCASE = [
  {
    n: '01',
    title: 'El producto manda',
    body: 'Compramos cada mañana en el mercado. Lo que no está en su punto, no entra en la carta. Por eso el menú cambia con las estaciones y nunca al revés.',
    img: '/img/cocina.jpg',
    alt: 'Cocinero seleccionando producto fresco junto al pase.',
  },
  {
    n: '02',
    title: 'Brasa de carbón vegetal',
    body: 'Fuego lento y paciencia. El carbón vegetal da un ahumado que ninguna plancha reproduce, y obliga a cocinar mirando, no midiendo.',
    img: '/img/barra.jpg',
    alt: 'Barra del restaurante con la parrilla de carbón al fondo.',
  },
  {
    n: '03',
    title: 'Una bodega con criterio',
    body: 'Trabajamos con bodegas pequeñas, muchas de ellas a menos de cien kilómetros. Cada copa se puede explicar, y esa es toda la carta de vinos que hace falta.',
    img: '/img/bodega.jpg',
    alt: 'Bodega con botellas ordenadas en estantes de madera.',
  },
]

export const GALLERY = [
  { src: '/img/sala.jpg', label: 'Sala principal', alt: 'Sala principal del restaurante con mesas vestidas y luz cálida.' },
  { src: '/img/terraza.jpg', label: 'Terraza', alt: 'Terraza exterior con mesas bajo toldos y plantas.' },
  { src: '/img/barra.jpg', label: 'Barra', alt: 'Barra de madera con taburetes altos y botellas al fondo.' },
  { src: '/img/vino.jpg', label: 'Vinos', alt: 'Copa de vino tinto servida sobre una mesa.' },
  { src: '/img/cocina.jpg', label: 'Cocina', alt: 'Equipo de cocina emplatando junto al pase.' },
  { src: '/img/mesa.jpg', label: 'Mesa', alt: 'Mesa montada con varios platos para compartir.' },
]

export const RIBBON = [
  'Producto de mercado',
  'Brasa lenta',
  'Carta de temporada',
  'Bodega local',
  'Barcelona',
]
