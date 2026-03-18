import { defineConfig } from 'vite';

export default defineConfig({
  base: '/modulix-editor/',
  build: {
    rollupOptions: {
      input: {
        main:  './index.html',
        cheatsheet: './cheatsheet.html'
      },
    },
  },
})
