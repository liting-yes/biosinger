import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import UnoCSS from '@unocss/vite'

export default defineConfig({
  plugins: [
    UnoCSS(),
    react(),
  ],
  css: {
    devSourcemap: true,
  },
  server: {
    port: 9000,
  },
})
