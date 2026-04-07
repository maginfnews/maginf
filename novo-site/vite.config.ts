import { resolve } from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        suporte: resolve(__dirname, 'suporte/index.html'),
        support: resolve(__dirname, 'support/index.html'),
      },
    },
  },
  server: {
    // HMR can be disabled through DISABLE_HMR in restricted preview environments.
    hmr: process.env.DISABLE_HMR !== 'true',
  },
});
