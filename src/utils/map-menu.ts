import { Child, Child2, IUserMenu, UserMenusType } from "service/login/types"
import type { RouteRecordRaw } from 'vue-router'
import type { ICrumbType } from "common/breadcrumb"
import type { IMenu } from "service/main/system/types"

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
function getMenuWithPath(
  userMenus: UserMenusType,
  currentPath: string,
  crumbProps?: ICrumbType[],
): IUserMenu | undefined {
  for (const userMenu of userMenus) {
    if (userMenu.type === 2 && userMenu.url === currentPath) {
      return userMenu // 如果是二级菜单且路径匹配则返回
    } else if (userMenu.type === 1) { // 否则继续向下递归
      const findMenu = getMenuWithPath(userMenu.children as any as UserMenusType, currentPath)
      if (findMenu) { // 匹配到符合条件的二级菜单
        // 查找完整的菜单路径
        crumbProps?.push({name: userMenu.name, path: userMenu.url}) // 二级菜单的父菜单
        crumbProps?.push({name: findMenu.name, path: findMenu.url})
        return findMenu
      }
    }
  }
}

// 根据当前路由 path 查找完整的菜单路径,作为面包屑组件的数据来源
function getCrumbPropsWithCurrentPath(
  userMenus: UserMenusType,
  currentPath: string,
) {
  const crumbProps: ICrumbType[] = []
  getMenuWithPath(userMenus, currentPath, crumbProps)
  return crumbProps
}

// 获取用户菜单中拿到所有用户权限（用户权限在三级菜单中）
function getUserPermissions(userMenus: UserMenusType) {
  const permission: string[] = []

  const traverUserMenu = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2)
        traverUserMenu(menu.children ?? [])
      else if (menu.type === 3)
        permission.push((menu as any as Child2).permission)
    }
  }
  traverUserMenu(userMenus)

  return permission
}

// 递归获取所有用户菜单的叶子结点
export function getMenuLeafKeys(menuList: IMenu[]) {
  const menuLeafKeys: number[] = []

  const _recursiveGetLeaf = (menuList: IMenu[]) => {
    for (const menu of menuList) {
      menu.children
        ? _recursiveGetLeaf(menu.children as any as IMenu[])
        : menuLeafKeys.push(menu.id)
    }
  }
  _recursiveGetLeaf(menuList)

  return menuLeafKeys
}

export {
  firstRoute,
  getMenuWithPath,
  getCrumbPropsWithCurrentPath,
  getUserPermissions,
}