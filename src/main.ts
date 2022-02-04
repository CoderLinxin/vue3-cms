import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, { setupStore } from './store'
import registerApp from "@/global"
import 'normalize.css'
import '@/assets/css/index.scss'

const app = createApp(App)
app.use(store)
setupStore() // 初始时加载本地用户数据（如果有）
app.use(router)
app.use(registerApp)
app.mount('#app')
