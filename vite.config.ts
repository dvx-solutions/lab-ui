import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import { peerDependencies, dependencies } from './package.json';

export default defineConfig({
  plugins: [react(), dts()],
  resolve: {
    alias: {
      '+': resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src', 'index.ts'),
      formats: ['es', 'cjs'],
      fileName: ext => `index.${ext}.js`,
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
      external: [
        ...Object.keys(peerDependencies),
        ...Object.keys(dependencies),
      ],
    },
    target: 'esnext',
    sourcemap: true,
  },
  define: {
    'process.env': {},
  },
});
