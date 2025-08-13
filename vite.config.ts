import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

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
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          icons: ['react-icons'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    host: '0.0.0.0', // Importante para VPS
    port: process.env.PORT ? parseInt(process.env.PORT) : 4173, // Usar variable de entorno o puerto por defecto
    hmr: {
      overlay: false,
    },
  },
  preview: {
    host: '0.0.0.0', // Para preview builds
    port: process.env.PORT ? parseInt(process.env.PORT) : 4173,
  },
  css: {
    devSourcemap: true,
  },
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg', '**/*.webp'],
})