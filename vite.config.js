import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/guia-norte-frontend/',
  build: {
    outDir: 'docs', // <-- Adicione ou ajuste esta linha
  }
})