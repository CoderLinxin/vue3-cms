import { BASE_URL, TIME_OUT } from "@/service/request/config"
import LXRequest from "@/service/request"

const lxRequest = new LXRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  showLoading: true,
  interceptors: {
    requestInterceptor(config) {
      const token = 'hello'
      token && (config.headers!.Authorization = `Bearer ${token}`)

      // console.log('axios 实例请求成功时的拦截：', config)
      return config
    },
    requestInterceptorCatch(error) {
      // console.log('axios 实例请求失败时的拦截：', error)
      return error
    },
    responseInterceptor(result) {
      // console.log('axios 实例响应成功时的拦截：', result)
      return result
    },
    responseInterceptorCatch(error) {
      // console.log('axios 实例响应失败时的拦截：', error)
      return error
    },
  },
})

export default lxRequest