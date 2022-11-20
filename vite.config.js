import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/fastsign/',
  plugins: [vue()],
  optimizeDeps: {
    include: ['linked-dep']
  },
  build: {
    commonjsOptions: {
      include: [/linked-dep/, /node_modules/]
    }
  }
})
