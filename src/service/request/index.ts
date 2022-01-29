// 封装基本的请求函数
import axios from "axios"
import type { AxiosInstance } from 'axios'
import { LXRequestConfig, LXRequestInterceptors } from "@/service/request/types"
import { ElLoading } from 'element-plus'

const defaultLoading = true // 默认请求时显示 loading 图标

// 用于创建请求实例的类
export default class LXRequest {
  instance: AxiosInstance // axios 实例
  interceptors?: LXRequestInterceptors // 基于 axios 实例的全局拦截器
  showLoading: boolean // 是否显示 loading 图标
  loading?: { close: () => void } // 可用于关闭 loading

  // 初始时传入 axios 实例的默认配置（增加了可设置拦截器的选项）
  constructor(config: LXRequestConfig) {
    // 为了可扩展性，允许创建多个 axios 实例（每个实例可以对应一套配置）
    this.instance = axios.create(config)

    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? defaultLoading

    // 配置实例默认的拦截器（可选）
    setInstanceInterceptors(this)

    // 配置所有实例的拦截器：这里相当于每次调用构造函数时都会执行下面的代码添加一样的拦截器
    // 不是所有实例共享同一个拦截器（因为搞不了），而是所有实例所拥有的拦截器都一样
    setGlobalInterceptors(this)
  }

  // 每个请求可以有自己单独的配置
  // 使用泛型指定网络请求返回的数据类型
  request<T>(config: LXRequestConfig<T>): Promise<T> {
    // 配置每次请求的单独的拦截器（可选）（一般不配置失败的拦截器）
    // 这里相当于是增加一层，手动进行单个请求的拦截，因为 axios 没有提供单独的请求拦截器
    const requestInterceptor = config.interceptors?.requestInterceptor
    requestInterceptor && (config = requestInterceptor(config)) // 使用拦截器返回的 config

    // 每个请求可以配置是否显示 loading
    config.showLoading === false && (this.showLoading = config.showLoading)

    // 通过 axios 的 request 方法传入泛型动态决定 response 返回的类型
    return this.instance.request<any, T>(config)
      .then(result => {
        const responseInterceptor = config.interceptors?.responseInterceptor
        responseInterceptor && (result = responseInterceptor(result)) // 使用拦截器返回的 result

        // 将 showLoading 设置为默认值，这样不会影响下一个请求
        this.showLoading = defaultLoading

        // 将结果返回
        return result
      })
      .catch(error => {
        // 将 showLoading 设置为默认值，这样不会影响下一个请求
        this.showLoading = defaultLoading

        return error
      })
  }

  get<T>(config: LXRequestConfig<T>): Promise<T> {
    return this.request<T>({...config, method: 'get'})
  }

  post<T>(config: LXRequestConfig<T>): Promise<T> {
    return this.request<T>({...config, method: 'post'})
  }
}

// 设置全局的拦截器
function setGlobalInterceptors(lxRequest: LXRequest) {
  lxRequest.instance.interceptors.request.use(
    config => {
      console.log('所有实例的请求成功拦截器：', config)

      // 请求过程显示 loading
      lxRequest.showLoading && (lxRequest.loading = ElLoading.service({
        lock: true, // 添加蒙版
        text: '正在请求数据',
        background: 'rgba(0,0,0,.5)',
      }))

      return config
    },
    error => {
      console.log('所有实例的请求失败拦截器：', error)
      return error
    },
  )
  lxRequest.instance.interceptors.response.use(
    // 请求完成关闭 loading
    result => {
      lxRequest.loading?.close()

      console.log('所有实例的响应成功拦截器：', result)
      return result.data
    },
    error => {
      console.log('所有实例的响应失败拦截器：', error)

      lxRequest.loading?.close()
      return error
    },
  )
}

// 设置每个请求实例的拦截器
function setInstanceInterceptors(lxRequest: LXRequest) {
  lxRequest.instance.interceptors.request.use(
    lxRequest.interceptors?.requestInterceptor,
    lxRequest.interceptors?.requestInterceptorCatch,
  )
  lxRequest.instance.interceptors.response.use(
    lxRequest.interceptors?.responseInterceptor,
    lxRequest.interceptors?.responseInterceptorCatch,
  )
}

