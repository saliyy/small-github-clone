import { createApp } from 'vue'
import App from './views/App.vue'
import './index.css'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

createApp(App).use(router).use(ElementPlus).mount('#app')
