import {createApp} from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from "@/router";
import PrimeVue from 'primevue/config';

const app = createApp(App);
const pinia = createPinia()

app
    .use(pinia)
    .use(router)
    .use(PrimeVue, {ripple: true})
    .mount('#app')
