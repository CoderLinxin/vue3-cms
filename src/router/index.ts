import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const Login = () => import('@/views/login/Login.vue')
const Main = () => import('@/views/main/Main.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/main',
    name: 'main',
    component: Main,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
