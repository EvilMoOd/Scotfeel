import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalDate: '@import"./src/assets/styles/global.scss',
      },
    },
  },
  server: {
    port: 8848,
  },
});
