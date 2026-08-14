import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) return 'vendor-react'
          if (id.includes('node_modules/gsap')) return 'vendor-gsap'
          if (id.includes('node_modules/three') || id.includes('node_modules/postprocessing')) return 'vendor-three'
          if (id.includes('node_modules/ogl')) return 'vendor-ogl'
        },
      },
    },
    chunkSizeWarningLimit: 800,
  },
})
