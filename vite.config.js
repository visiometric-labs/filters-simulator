import { defineConfig } from 'vite';

export default defineConfig({
  base: '/filters-simulator/',
  server: {
    port: 3000,
    host: true,
  },
  preview: {
    port: 8080,
    host: true,
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    assetsInlineLimit: 4096,
  },
});
