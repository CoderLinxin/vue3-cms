import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import registerApp from "@/global"
import 'normalize.css'
import '@/assets/css/index.scss'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(registerApp)
app.mount('#app')
