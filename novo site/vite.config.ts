import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // HMR can be disabled through DISABLE_HMR in restricted preview environments.
    hmr: process.env.DISABLE_HMR !== 'true',
  },
});
