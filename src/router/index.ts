import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { RouterPaths } from "@/router/types"
import { beforeEach } from "@/router/guards"
import { firstRoute } from "@/utils/map-menu"

const Login = () => import('@/views/login/Login.vue')
const Main = () => import('@/views/main/Main.vue')
const PageNotFound = () => import('@/views/page-not-found/PageNotFound.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: RouterPaths.main,
  },
  {
    path: RouterPaths.login,
    name: 'login',
    component: Login,
  },
  {
    path: RouterPaths.main,
    name: 'main',
    component: Main,
    children: [],
    beforeEnter: (to, from) => {
      // 重定向到第一个菜单
      if(to.path === '/main')
        return firstRoute!.path
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'path-not-found',
    component: PageNotFound,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

// 进行守卫
beforeEach.call(router)

export default router
