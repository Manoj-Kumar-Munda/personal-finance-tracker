import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "../server/public"

  },
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://personal-finance-tracker-g0tb.onrender.com',
        changeOrigin: true,
      }
    }
  }
})
