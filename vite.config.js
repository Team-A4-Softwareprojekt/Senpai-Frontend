import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: 'index.html',
    },
    outDir: 'dist',
  },
  server: {
    mimeTypes: {
      '.jsx': 'text/javascript',
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    parallel: true,
    setupFiles: ['./vitest.setup.js']
  }
});

