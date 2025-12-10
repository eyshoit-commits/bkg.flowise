import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4177,
    host: true
  },
  preview: {
    port: 4178,
    host: true
  }
})
