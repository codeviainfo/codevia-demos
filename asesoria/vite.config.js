import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Sin sourcemaps: reduce el pico de RAM y el disco durante el build
    // en el VPS (1 vCPU / 1.6 GB), donde el margen es ajustado.
    sourcemap: false,
    // Los assets pequenos se inlinean; el resto sale con hash en /assets.
    assetsInlineLimit: 2048,
  },
})
