import { defineConfig } from 'vite';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/filters-simulator/' : '/',
  server: {
    port: 5173,
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
}));
