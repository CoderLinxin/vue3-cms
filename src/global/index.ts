// 统一进行全局注册（组件、属性）的入口

import type { App } from "vue"
import registerElementPlusCpn from './register-element-plus-cpn'
import registerGlobalProperties from "global/register-global-properties"

// 统一采用插件的方式注册
const registerApp = {
  install(app: App) {
    app.use(registerElementPlusCpn)
    app.use(registerGlobalProperties)
  },
}

export default registerApp

