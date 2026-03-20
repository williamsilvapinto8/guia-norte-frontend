import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // <--- Mude esta linha para a raiz do domínio/subdomínio
  build: {
    outDir: 'dist', // <--- Mude esta linha para 'dist', que é o padrão para deploy em servidores
  }
})