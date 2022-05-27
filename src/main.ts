import { createSSRApp } from 'vue';
import App from './App.vue';
import * as Pinia from 'pinia';

import '@purge-icons/generated'; // icon
import 'animate.css';

export function createApp(): any {
  const app = createSSRApp(App);
  app.use(Pinia.createPinia());
  return {
    app,
    Pinia,
  };
}
