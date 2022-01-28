// 环境配置
enum EnvType {
  prod = 'production',
  dev = 'development'
}

export const {BASE_URL, TIME_OUT} = (function initEnv(env: EnvType) {
  let BASE_URL: string = ''
  let TIME_OUT = 5000

  switch (env) {
    case EnvType.prod:
      BASE_URL = ''
      break
    case EnvType.dev:
      BASE_URL = 'http://123.207.32.32:8000'
      break
    default:
      const check: never = env
      break
  }

  return {BASE_URL, TIME_OUT}
})(process.env.NODE_ENV)

