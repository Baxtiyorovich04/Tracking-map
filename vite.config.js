import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/", // Добавляем базовый путь
  build: {
    outDir: "dist" // Vite по умолчанию использует "dist"
  }
})
