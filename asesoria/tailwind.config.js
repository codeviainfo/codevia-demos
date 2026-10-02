/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    // ─────────────────────────────────────────────────────────
    // Direccion asesoria: papel marfil y un verde casi negro, con
    // la pareja del logo de Noega como acentos: el verde lima del
    // monograma y el oliva grisaceo del anillo de pincel.
    // Sobria como un despacho del Eixample; el degradado
    // oliva → lima del anillo es la firma de la marca.
    //
    // El lima es claro: sobre el va texto `ink`, nunca blanco.
    // ─────────────────────────────────────────────────────────
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',

      canvas: '#ffffff',
      paper: '#f7f6ef',        // fondo general, marfil
      'paper-deep': '#edece1', // superficies hundidas
      line: '#e2e1d4',
      'line-soft': '#eeede4',

      muted: '#80847a',
      'ink-body': '#525949',
      'ink-soft': '#343d29',
      ink: '#1a2014',          // titulares — verde casi negro

      night: '#11150d',        // secciones oscuras
      'night-2': '#192012',
      'night-line': '#2b3322',
      'night-muted': '#a4ac94',

      oliva: '#7a8a5a',        // anillo del logo
      'oliva-deep': '#5b6942',
      'oliva-soft': '#bcc5a3',
      'oliva-tint': '#f0f2e9',

      lima: '#8db41e',         // monograma del logo
      'lima-deep': '#6a8a0f',
      'lima-soft': '#c8e36d',
      'lima-tint': '#f3f8e2',
    },
    fontFamily: {
      display: ['Newsreader', 'ui-serif', 'Georgia', 'serif'],
      // Solo para el monograma y el nombre del logo recreado.
      script: ['Great Vibes', 'cursive'],
      logo: ['Abel', 'ui-sans-serif', 'sans-serif'],
      sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    fontSize: {
      micro: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.18em', fontWeight: '700' }],
      caption: ['0.8125rem', { lineHeight: '1.6' }],
      body: ['0.9375rem', { lineHeight: '1.75' }],
      'body-lg': ['1.0625rem', { lineHeight: '1.8' }],
      title: ['1.25rem', { lineHeight: '1.35', letterSpacing: '-0.01em', fontWeight: '600' }],
      h3: ['clamp(1.5rem,2.6vw,2.125rem)', { lineHeight: '1.15', letterSpacing: '-0.015em', fontWeight: '400' }],
      h2: ['clamp(2.25rem,5.4vw,4.25rem)', { lineHeight: '1.02', letterSpacing: '-0.025em', fontWeight: '400' }],
      h1: ['clamp(3rem,7.6vw,6.75rem)', { lineHeight: '0.96', letterSpacing: '-0.035em', fontWeight: '400' }],
      stat: ['clamp(2.75rem,5vw,4rem)', { lineHeight: '1', letterSpacing: '-0.03em', fontWeight: '400' }],
      mega: ['clamp(5rem,24vw,22rem)', { lineHeight: '0.8', letterSpacing: '-0.05em', fontWeight: '400' }],
    },
    extend: {
      maxWidth: { shell: '1280px', prose: '52ch' },
      borderRadius: { DEFAULT: '0.375rem', card: '1rem', xl: '1.5rem', pill: '9999px' },
      transitionTimingFunction: { out: 'cubic-bezier(0.16,1,0.3,1)' },
      transitionDuration: { 400: '400ms', 600: '600ms', 700: '700ms', 900: '900ms' },
      boxShadow: {
        card: '0 1px 2px rgba(26,32,20,.04), 0 12px 32px -18px rgba(26,32,20,.18)',
        lift: '0 2px 6px rgba(26,32,20,.06), 0 34px 64px -30px rgba(106,138,15,.32)',
        glow: '0 0 0 1px rgba(255,255,255,.06), 0 40px 90px -40px rgba(141,180,30,.45)',
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        drift: {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(4%,-6%,0) scale(1.12)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        ping: {
          '0%': { transform: 'scale(1)', opacity: '.55' },
          '100%': { transform: 'scale(3.2)', opacity: '0' },
        },
      },
      animation: {
        marquee: 'marquee 42s linear infinite',
        drift: 'drift 18s ease-in-out infinite',
        'drift-slow': 'drift 26s ease-in-out infinite reverse',
        float: 'float 7s ease-in-out infinite',
        ping: 'ping 2.4s cubic-bezier(0,0,.2,1) infinite',
      },
    },
  },
  plugins: [],
}
