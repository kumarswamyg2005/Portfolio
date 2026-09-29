import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // three.js is ~560 kB raw / ~145 kB gzip, but it's a lazy chunk the hero
  // loads after first paint — the initial bundle stays React + the page.
  build: { chunkSizeWarningLimit: 600 },
})
