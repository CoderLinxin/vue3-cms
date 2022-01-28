// 统一注册 element-plus 在项目中使用到的组件

import type { App } from "vue"
import 'element-plus/dist/index.css' // 引入所有样式

// 引入 element-plus 组件
import {
  ElButton,
} from "element-plus/lib/components"

const components = [
  ElButton,
]

const registerElementPlusCpn = {
  // 注册为全局组件
  install(app: App) {
    for (const component of components) {
      app.component(component.name, component)
    }
  },
}

export default registerElementPlusCpn




