import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // This tells Vite that your files are hosted at /yg/
  base: '/yg/', 
  plugins: [react()],
})