import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // './' ensures all assets load correctly on GitHub Pages
  // regardless of the repository name
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
