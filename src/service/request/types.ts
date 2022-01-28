// 请求函数相关类型定义
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// 仿造 axios 的拦截器类型
export interface LXRequestInterceptors {
  // 请求拦截器类型
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig,
  requestInterceptorCatch?: (err: any) => any,

  // 响应拦截器类型
  responseInterceptor?: (result: AxiosResponse) => AxiosResponse,
  responseInterceptorCatch?: (err: any) => any,
}

// 扩展 axios 的 config 类型：增加拦截器选项
export interface LXRequestConfig extends AxiosRequestConfig {
  interceptors?: LXRequestInterceptors,
  showLoading?: boolean
}



