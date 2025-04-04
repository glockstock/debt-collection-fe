import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Get the repository name for GitHub Pages
const repositoryName = 'debt-collection-fe' // Update this if your repository name changes

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? `/${repositoryName}/` : '/',
  server: {
    port: 8080,
    host: 'localhost'
  }
})
