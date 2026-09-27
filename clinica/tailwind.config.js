/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    // ─────────────────────────────────────────────────────────
    // Direccion clinica: luz, aire y calma. Es el contrapunto
    // deliberado al restaurante (oscuro y cinematografico):
    // en salud, la claridad es lo que transmite confianza.
    // Un unico acento verde azulado.
    // ─────────────────────────────────────────────────────────
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',

      canvas: '#ffffff',
      surface: '#f5f9f9',    // secciones alternas
      mist: '#eaf2f2',       // superficies elevadas
      line: '#dde8e8',       // hairlines
      'line-soft': '#edf4f4',

      muted: '#8ba0a3',      // captions
      'ink-body': '#4c6166',       // texto corrido
      'ink-soft': '#25454b',
      ink: '#0b2429',        // titulares — casi negro con fondo verde

      accent: '#0d9488',     // UNICO acento
      'accent-deep': '#0f766e',
      'accent-soft': '#99f6e4',
      'accent-tint': '#f0fdfa',
    },
    fontFamily: {
      // Serif solo para las palabras destacadas: elegancia sin
      // caer en lo gastronomico. El resto, Inter.
      display: ['Instrument Serif', 'ui-serif', 'Georgia', 'serif'],
      sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    fontSize: {
      micro: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.16em', fontWeight: '600' }],
      caption: ['0.8125rem', { lineHeight: '1.6' }],
      body: ['0.9375rem', { lineHeight: '1.75' }],
      'body-lg': ['1.0625rem', { lineHeight: '1.8' }],
      title: ['1.25rem', { lineHeight: '1.35', letterSpacing: '-0.015em', fontWeight: '500' }],
      h3: ['clamp(1.375rem,2.4vw,1.875rem)', { lineHeight: '1.22', letterSpacing: '-0.022em', fontWeight: '500' }],
      h2: ['clamp(2rem,5vw,3.5rem)', { lineHeight: '1.06', letterSpacing: '-0.032em', fontWeight: '500' }],
      h1: ['clamp(2.75rem,7.5vw,6rem)', { lineHeight: '0.98', letterSpacing: '-0.042em', fontWeight: '500' }],
      stat: ['clamp(2.25rem,4.5vw,3.25rem)', { lineHeight: '1', letterSpacing: '-0.035em', fontWeight: '500' }],
    },
    extend: {
      maxWidth: { shell: '1240px', prose: '54ch' },
      borderRadius: { DEFAULT: '0.375rem', card: '1rem', xl: '1.5rem', pill: '9999px' },
      transitionTimingFunction: { out: 'cubic-bezier(0.16,1,0.3,1)' },
      transitionDuration: { 400: '400ms', 600: '600ms', 700: '700ms', 900: '900ms' },
      boxShadow: {
        card: '0 1px 2px rgba(11,36,41,.04), 0 10px 30px -16px rgba(11,36,41,.14)',
        lift: '0 2px 6px rgba(11,36,41,.05), 0 30px 60px -28px rgba(13,148,136,.32)',
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        drift: {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(2%,-3%,0) scale(1.06)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        drift: 'drift 16s ease-in-out infinite',
        float: 'float 7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
