import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { galleryApiPlugin } from './vite-gallery-plugin.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), galleryApiPlugin()],
  server: {
    host: true,
    port: 5173,
  },
})

