// 请求函数相关类型定义
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// 仿造 axios 的拦截器类型
export interface LXRequestInterceptors<T = AxiosResponse> {
  // 请求拦截器类型
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig,
  requestInterceptorCatch?: (err: any) => any,

  // 响应拦截器类型
  responseInterceptor?: (result: T) => T, // 由于可能经过多个拦截器的处理，response 返回的数据类型是可变的。
  responseInterceptorCatch?: (err: any) => any,
}

// 扩展 axios 的 config 类型：增加拦截器选项
export interface LXRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: LXRequestInterceptors<T>,
  showLoading?: boolean
}
