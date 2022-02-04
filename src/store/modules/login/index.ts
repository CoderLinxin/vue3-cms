// 登录模块的 store
import type { Module } from 'vuex'
import { IRootState } from "@/store/types"
import { IAccountLoginPayloadType, ILoginState } from "@/store/modules/login/types"
import { getUserInfoById, getUserMenuByRoleId, loginRequest } from "service/login"
import localCache from "@/utils/cache"
import type { IDataType } from 'service/types'
import type { IUserInfo, UserMenusType } from "service/login/types"
import router from "@/router"
import mapMenuToRoutes, { getUserPermissions } from "@/utils/map-menu"

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state: () => ({
    token: undefined,
    userInfo: undefined,
    userMenus: undefined,
    permissions: [],
  }),
  getters: {},
  mutations: {
    // 设置 token
    setToken(state, token: string) {
      state.token = token
    },
    // 设置用户信息
    setUserInfo(state, userInfo: IUserInfo) {
      state.userInfo = userInfo
    },

    // 设置用户菜单
    setUserMenus(state, userMenus: UserMenusType) {
      state.userMenus = userMenus

      // 根据用户菜单动态添加路由映射
      const routes = mapMenuToRoutes(userMenus)
      routes.forEach(route => router.addRoute('main', route))

      // 获取用户菜单中的所有用户权限
      state.permissions = getUserPermissions(userMenus)
    },
  },
  actions: {
    // 账号密码登录
    async accountLoginAction({commit}, account: IAccountLoginPayloadType) {
      // 1.验证登录
      const {token, id, name} = (await loginRequest(account))?.data
      commit('setToken', token)
      localCache.setCache('token', token)

      // 2.根据用户 id 请求用户的信息（需携带 token）
      const userInfo = (await getUserInfoById<IDataType<IUserInfo>>(id)).data
      commit('setUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      // 3.根据用户的 role id 请求用户菜单（需携带 token）
      const userMenus = (await getUserMenuByRoleId<IDataType<UserMenusType>>(userInfo.role.id)).data
      commit('setUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      // 4.跳转到首页
      await router.push('/main')
    },

    // 手机验证码登录
    phoneLoginAction({commit}, payload: any) {
      console.log(11)
      console.log(payload)
    },

    // 加载本地用户信息（如果有）
    loadLocalLoginData({commit}) {
      const token = localCache.getCache('token')
      token && commit('setToken', token)

      const userInfo = localCache.getCache('userInfo')
      userInfo && commit('setUserInfo', userInfo)

      const userMenus = localCache.getCache('userMenus')
      userMenus && commit('setUserMenus', userMenus)
    },
  },
}

export default loginModule