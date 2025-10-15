import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
      '@api': '/src/api',
      '@assets': '/src/assets',
      '@components': '/src/components',
      '@composables': '/src/composables',
      '@home': '/src/modules/home',
      '@news': '/src/modules/news',
      '@places': '/src/modules/places',
      '@routers': '/src/modules/routers',
      '@stores': '/src/stores',
    }
  }
})
