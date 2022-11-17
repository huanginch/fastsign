import { createApp } from 'vue'
import "./assets/scss/custom.scss";
import "bootstrap"
import App from './App.vue'
import router from './router/index'


createApp(App).use(router).mount('#app')