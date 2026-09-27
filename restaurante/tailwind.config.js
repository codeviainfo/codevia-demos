/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    // ─────────────────────────────────────────────────────────
    // Paleta CONTENIDA, direccion cinematografica.
    // Negro calido + crema + un unico acento dorado.
    // Se sobrescribe `colors` entero: imposible colar un color
    // fuera del sistema por descuido.
    // ─────────────────────────────────────────────────────────
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',

      void: '#0a0908',       // fondo mas profundo
      coal: '#121010',       // secciones oscuras
      smoke: '#1d1a18',      // superficies elevadas en oscuro
      ash: '#2a2623',        // hairlines sobre oscuro

      cream: '#f7f3ea',      // fondo claro / texto sobre oscuro
      'cream-dim': '#cfc6b6',// texto secundario sobre oscuro
      sand: '#8c8474',       // captions
      bone: '#e8e1d3',       // superficie clara alterna
      line: '#ddd4c2',       // hairlines sobre claro

      gold: '#c9a227',       // UNICO acento
      'gold-soft': '#e3c96a',
    },
    fontFamily: {
      // Fraunces ya es la display de la marca Codevia: coherencia de casa.
      display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
      sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    // Escala ESTRICTA, pero con rango dramatico: del 11px al 9rem.
    fontSize: {
      micro: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.18em', fontWeight: '500' }],
      caption: ['0.8125rem', { lineHeight: '1.6', letterSpacing: '0.01em' }],
      body: ['0.9375rem', { lineHeight: '1.75' }],
      'body-lg': ['1.0625rem', { lineHeight: '1.8' }],
      title: ['1.375rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
      h3: ['clamp(1.5rem,2.6vw,2.125rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
      h2: ['clamp(2.25rem,5.5vw,4rem)', { lineHeight: '1.04', letterSpacing: '-0.03em' }],
      h1: ['clamp(3rem,9vw,7.5rem)', { lineHeight: '0.96', letterSpacing: '-0.04em' }],
      mega: ['clamp(4rem,16vw,14rem)', { lineHeight: '0.85', letterSpacing: '-0.05em' }],
    },
    extend: {
      maxWidth: { shell: '1280px', prose: '54ch' },
      borderRadius: { DEFAULT: '0.25rem', card: '0.5rem', pill: '9999px' },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16,1,0.3,1)',
        soft: 'cubic-bezier(0.33,1,0.68,1)',
      },
      transitionDuration: { 400: '400ms', 600: '600ms', 700: '700ms', 900: '900ms' },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        kenburns: {
          '0%': { transform: 'scale(1) translate3d(0,0,0)' },
          '100%': { transform: 'scale(1.12) translate3d(0,-1.5%,0)' },
        },
        cue: {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '45%': { transform: 'scaleY(1)', transformOrigin: 'top' },
          '55%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
        },
      },
      animation: {
        marquee: 'marquee 42s linear infinite',
        kenburns: 'kenburns 24s ease-out infinite alternate',
        cue: 'cue 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
