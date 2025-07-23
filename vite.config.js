import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: 'llm.abduboriy.tech',
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://llm.abduboriy.tech:8003',
        changeOrigin: true,
      },
      '/public': {
        target: 'https://llm.abduboriy.tech:8003',
        changeOrigin: true,
      },
    },
  },
  plugins: [react(), tailwindcss()],
});
