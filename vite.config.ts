import { defineConfig } from 'vite'
import path from "path";

export default defineConfig({
  base: '',
  build: {
    outDir: path.resolve(__dirname, 'docs'),
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        error: path.resolve(__dirname, '404.html')
      }
    }
  }
})
