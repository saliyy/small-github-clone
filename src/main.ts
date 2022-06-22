import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { vue3Debounce } from 'vue-debounce'

createApp(App)
    .use(router)
    .directive('debounce', vue3Debounce({ lock: true }))
    .use(ElementPlus)
    .mount('#app')
