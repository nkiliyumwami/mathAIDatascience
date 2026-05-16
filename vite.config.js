import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          ui: [
            '@radix-ui/react-accordion',
            '@radix-ui/react-progress',
            '@radix-ui/react-tabs',
            '@radix-ui/react-tooltip',
            'lucide-react',
            'class-variance-authority',
            'clsx',
            'tailwind-merge',
          ],
          charts: ['recharts'],
          motion: ['framer-motion'],
        },
      },
    },
  },
})
