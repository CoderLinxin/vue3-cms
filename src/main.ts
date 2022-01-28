import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import registerApp from "@/global"
import lxRequest from "@/service"

(async () => {
  const result = await lxRequest.request({
    url: '/home/multidata',
    showLoading: true,
    // interceptors: {
    //   requestInterceptor(config) {
    //     console.log('单独的请求成功拦截器')
    //     return config
    //   },
    //   responseInterceptor(result) {
    //     console.log('单独的响应成功拦截器')
    //     return result.data
    //   },
    // },
  })
  console.log(result)
})()

const app = createApp(App)
app.use(store)
app.use(router)
app.use(registerApp)
app.mount('#app')
