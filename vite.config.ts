import { defineConfig } from 'vite';
import { resolve } from 'node:path';

const root = import.meta.dirname;

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        work: resolve(root, 'work.html'),
        studio: resolve(root, 'studio.html'),
        contact: resolve(root, 'contact.html'),
      },
    },
  },
});
