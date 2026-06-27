import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'

const dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  base: '/Personal-website/',
  root: dirname,
  plugins: [vue()],
  build: {
    outDir: dirname + 'dist'
  }
})
