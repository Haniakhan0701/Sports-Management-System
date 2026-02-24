import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  server: {
    host: true,
    port: 5173,
    fs: {
      allow: ['.'],
    },
  },
  // 👇 This makes sure refresh works on all routes
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  preview: {
    port: 4173,
    strictPort: true,
  }
})
