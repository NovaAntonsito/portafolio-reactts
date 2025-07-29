import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), './src'),
      '@/components': path.resolve(process.cwd(), './src/components'),
      '@/styles': path.resolve(process.cwd(), './src/styles'),
      '@/assets': path.resolve(process.cwd(), './src/assets'),
      '@/hooks': path.resolve(process.cwd(), './src/hooks'),
      '@/utils': path.resolve(process.cwd(), './src/utils'),
      '@/types': path.resolve(process.cwd(), './src/types'),
    },
  },
})
