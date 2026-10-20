import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Keep every asset as a file so the strict Content-Security-Policy in public/_headers holds.
    assetsInlineLimit: 0,
  },
});
