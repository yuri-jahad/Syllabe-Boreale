import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      routesDirectory: './src/app/routes', // ✅ Nouveau chemin
      quoteStyle: 'single',
      generatedRouteTree: './src/app/routes/routeTree.gen.ts'
    }),
    react()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@eden': path.resolve(__dirname, './src/app/client'),
      '@routes': path.resolve(__dirname, './src/app/routes'),
      '@features': path.resolve(__dirname, './src/features'),
      '@word-finder': path.resolve(__dirname, './src/features/word-finder'),
      '@auth': path.resolve(__dirname, './src/features/auth'),
      '@charts': path.resolve(__dirname, './src/features/charts'),
      '@management': path.resolve(__dirname, './src/features/management'),
      '@settings': path.resolve(__dirname, './src/features/settings'),
      '@shared': path.resolve(__dirname, './src/features/shared'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@backend': path.resolve(__dirname, '../backend/src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '~styled-system': path.resolve(__dirname, './styled-system')
    }
  }
})
