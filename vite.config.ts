import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import PurgeIcons from 'vite-plugin-purge-icons';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    PurgeIcons({
      /* PurgeIcons Options */
      content: [
        '**/*.html',
        '**/*.js',
        '**/*.vue', // scan for .vue file as well
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalDate: '@import"./src/assets/styles/global.scss',
      },
    },
  },
});
