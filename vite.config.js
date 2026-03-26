import { defineConfig } from 'vite';

export default defineConfig({
  base: '/modulix-editor/',
  build: {
    rolldownOptions: {
      input: {
        main:  './index.html',
        cheatsheet: './cheatsheet.html'
      },
    },
  },
})
