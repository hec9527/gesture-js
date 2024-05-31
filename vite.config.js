import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',
  },
  build: {
    lib: {
      entry: './src/index.ts',
      fileName: 'gesture',
      formats: ['es', 'cjs', 'iife', 'umd'],
      name: 'Gesture',
    },
  },
});
