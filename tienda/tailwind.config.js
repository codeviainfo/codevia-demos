/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    // ─────────────────────────────────────────────────────────
    // Direccion tienda: negro frio y un acento acido. Es moda,
    // no gastronomia: el contraste es duro y el tipo, enorme.
    // Se sobrescribe `colors` entero para cerrar el sistema.
    // ─────────────────────────────────────────────────────────
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',

      void: '#09090b',       // fondo mas profundo
      coal: '#101013',       // secciones alternas
      smoke: '#17171b',      // superficies elevadas
      ash: '#26262c',        // hairlines

      chalk: '#f4f2ee',      // texto principal sobre oscuro
      'chalk-dim': '#a9a7a2', // texto secundario
      stone: '#6d6b67',      // captions

      accent: '#d4f34a',     // UNICO acento — lima acida
      'accent-deep': '#b8d92e',
    },
    fontFamily: {
      // Syne: grotesca expresiva, muy de moda editorial.
      display: ['Syne', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    fontSize: {
      micro: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.16em', fontWeight: '600' }],
      caption: ['0.8125rem', { lineHeight: '1.6' }],
      body: ['0.9375rem', { lineHeight: '1.7' }],
      'body-lg': ['1.0625rem', { lineHeight: '1.75' }],
      title: ['1.125rem', { lineHeight: '1.35', letterSpacing: '-0.01em', fontWeight: '600' }],
      h3: ['clamp(1.5rem,2.8vw,2.25rem)', { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '700' }],
      h2: ['clamp(2.25rem,6vw,4.5rem)', { lineHeight: '0.98', letterSpacing: '-0.04em', fontWeight: '700' }],
      h1: ['clamp(3.25rem,11vw,9rem)', { lineHeight: '0.88', letterSpacing: '-0.05em', fontWeight: '800' }],
      mega: ['clamp(4rem,19vw,17rem)', { lineHeight: '0.8', letterSpacing: '-0.06em', fontWeight: '800' }],
      stat: ['clamp(1.5rem,2.4vw,2rem)', { lineHeight: '1', letterSpacing: '-0.03em', fontWeight: '700' }],
    },
    extend: {
      maxWidth: { shell: '1400px', prose: '52ch' },
      borderRadius: { DEFAULT: '0.25rem', card: '0.75rem', xl: '1.25rem', pill: '9999px' },
      transitionTimingFunction: { out: 'cubic-bezier(0.16,1,0.3,1)' },
      transitionDuration: { 400: '400ms', 600: '600ms', 700: '700ms', 900: '900ms' },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
      },
      animation: {
        marquee: 'marquee 34s linear infinite',
        'marquee-fast': 'marquee 18s linear infinite',
      },
    },
  },
  plugins: [],
}
