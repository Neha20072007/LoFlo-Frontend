import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8091',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    server: {
      proxy: {
        // Proxy API calls to backend server in development
        '/api': {
          target: mode === 'development'
            ? 'https://loflo-backend-production.up.railway.app/'
            : 'https://your-production-backend-url.com/', // Modify the production URL if needed
          changeOrigin: true,
          secure: false,
        },
      },
    },
    build: {
      // Define build options if needed
    },
    define: {
      // Environment variables can be set here
      'process.env.API_BASE_URL': JSON.stringify(mode === 'development' 
        ? 'https://loflo-backend-production.up.railway.app/' 
        : 'https://your-production-backend-url.com/'),
    },
  };
});
