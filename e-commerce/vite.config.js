
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
  },
  server: {
    proxy: {
      '/ecommerce': {
        target: 'http://localhost:8999',  
        changeOrigin: true,
        secure: false,
      },
     
    },
  },
});
