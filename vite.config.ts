import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        sw: resolve(__dirname, 'public/service-worker.js')  // ✅ include service worker
      }
    }
  },
  server: {
    fs: {
      allow: ['.']
    }
  }
});
