// 注册全局属性
import type { App } from 'vue'
import { formatUTCString } from "@/utils/date-format"


export default function registerGlobalProperties(app: App) {
  app.config.globalProperties.$filters = {
    // 格式化 UTC 时间
    formatUTCTime(UTCString: string) {
      return formatUTCString(UTCString)
    },
  }
}

