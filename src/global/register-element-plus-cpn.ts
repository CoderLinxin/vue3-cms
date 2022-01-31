// 统一注册 element-plus 在项目中使用到的组件

import type { App } from "vue"
import 'element-plus/dist/index.css' // 引入所有样式

// 引入 element-plus 组件
import {
  ElButton,
  ElTabs,
  ElIcon,
  ElTabPane,
  ElForm,
  ElFormItem,
  ElInput,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElDropdownMenu,
  ElDropdown,
  ElDropdownItem,
  ElAvatar,
  ElCol,
  ElRow,
  ElDatePicker,
  ElOption,
  ElSelect,
} from "element-plus/lib/components"
import {
  UserFilled,
  Iphone,
  Location,
  Expand,
  Fold,
  ChatDotRound,
  Bell,
  CollectionTag,
} from "@element-plus/icons-vue"

const components = [
  ElButton,
  ElTabs,
  ElIcon,
  ElTabPane,
  ElForm,
  ElFormItem,
  ElInput,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElDropdownMenu,
  ElDropdown,
  ElDropdownItem,
  ElAvatar,
  ElCol,
  ElRow,
  ElOption,
  ElDatePicker,
  ElSelect,

  UserFilled,
  Iphone,
  Location,
  Expand,
  Fold,
  ChatDotRound,
  Bell,
  CollectionTag,
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




