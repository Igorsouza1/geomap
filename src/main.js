import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/lara-light-cyan/theme.css'
import { createPinia } from 'pinia';


const pinia = createPinia();

createApp(App)
  .use(PrimeVue)
  .use(pinia)
  .mount('#app');