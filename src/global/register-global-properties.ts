// 注册全局属性
import type { App } from 'vue'
import { formatUTCString } from "@/utils/date-format"


export default function registerGlobalProperties(app: App) {
  app.config.globalProperties.$filters = {
    // 格式化 UTC 时间
    formatUTCTime(UTCString: string) {
      return formatUTCString(UTCString)
    },

    // 格式化 el-button 的样式展示
    formatUseButton(value: 1 | 0, successText = '启用', failText = '禁用') {
      return value === 1 ? successText : failText
    },
    formatStyleButton(value: 1 | 0) {
      return value === 1 ? 'success' : 'danger'
    },
  }
}

