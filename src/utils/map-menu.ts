import { Child, Child2, IUserMenu, UserMenusType } from "service/login/types"
import type { RouteRecordRaw } from 'vue-router'

let firstRoute: RouteRecordRaw | undefined = undefined

// 根据用户菜单提取对应路由映射
export default function mapMenuToRoutes(userMenus: UserMenusType): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 1.加载所有的 route 对象：使用 webpack 提供的 require.context 函数读取文件
  // 在 ../router/main （基于当前文件的相对路径）路径下查找
  // true 表示递归查找，不论文件路径有多深
  // 查找的是 .ts 文件（每个 .ts 文件中定义了一个 route 对象）
  const routeFiles = require.context('../router/main', true, /\.ts/)
  const allRoutes: RouteRecordRaw[] = []
  // 遍历查找到的 ts 文件的路径（该路径基于 ../router/main）
  routeFiles.keys().forEach(routeFileName => {
    const routeFilePath = routeFileName.split('.')[1]
    const route = require(`../router/main${routeFilePath}`).default // 根据路径加载对应文件中导出的 route 对象
    allRoutes.push(route)
  })

  // 2.在所有的 route 对象中使用菜单项的 url 属性进行匹配
  const mapMenuUrlToRoutePath = (userMenus: UserMenusType) => {
    for (const userMenu of userMenus) {
      if (userMenu.type !== 2) // 仍包含子菜单则继续向下遍历
        mapMenuUrlToRoutePath(userMenu.children as any as UserMenusType)
      else {
        const route = allRoutes.find(route => route.path === userMenu.url)
        firstRoute = firstRoute ?? route
        route && routes.push(route)
      }
    }
  }
  mapMenuUrlToRoutePath(userMenus)

  return routes
}

// 根据当前路由路径获取对应的菜单项
export function getMenuWithPath(userMenus: UserMenusType, currentPath: string): IUserMenu | undefined {
  for (const userMenu of userMenus) {
    if (userMenu.type === 2 && userMenu.url === currentPath) {
      return userMenu
    } else if (userMenu.type === 1) {
      const findMenu = getMenuWithPath(userMenu.children as any as UserMenusType, currentPath)
      if (findMenu) {
        return findMenu
      }
    }
  }
}

export {
  firstRoute,
}