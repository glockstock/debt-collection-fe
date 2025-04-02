import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/debt-collection-fe/', // Replace with your repository name
  server: {
    proxy: {
      '/api': {
        target: 'https://collect-ai-service-337679415316.us-central1.run.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false
      }
    }
  }
})
