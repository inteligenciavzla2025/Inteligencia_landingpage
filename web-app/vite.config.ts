import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api/chat': {
        target: 'https://n8n.srv1162650.hstgr.cloud',
        changeOrigin: true,
        rewrite: () => '/webhook/chatbot',
      },
    },
  },
})
