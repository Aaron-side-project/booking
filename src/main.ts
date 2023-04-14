import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import router from './router'

import 'element-plus/dist/index.css'
import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()

// ui
app.use(ElementPlus);
app.use(router);
app.use(pinia)

app.mount('#app')
