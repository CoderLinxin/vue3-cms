// 路由守卫相关
import { RouterPaths } from "@/router/types"
import type { Router } from "vue-router"
import localCache from "@/utils/cache"

// beforeEach 守卫
export function beforeEach(this: Router) {
  this.beforeEach((to, from) => {
    // 进入登录页面外的其他页面前验证是否已登录
    if (to.path !== RouterPaths.login) {
      const token = localCache.getCache('token')
      if (!token) {
        return RouterPaths.login
      }
    }
  })
}