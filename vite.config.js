import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/guia-norte-frontend/', // <--- Mantenha esta linha com o nome do seu repositório
  build: {
    outDir: 'docs', // <--- Mantenha esta linha
  }
})