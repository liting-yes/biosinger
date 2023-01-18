import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import UnoCSS from '@unocss/vite'

export default defineConfig({
  plugins: [
    UnoCSS(),
    react(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/styles/mixins.scss";',
      },
    },
    devSourcemap: true,
  },
  server: {
    port: 9000,
  },
})
