// 登录模块的 store
import type { Module } from 'vuex'
import { IRootState } from "@/store/types"
import { ILoginState } from "@/store/modules/login/types"

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state: () => ({
    token: '',
    userInfo: '',
  }),
  getters: {},
  mutations: {},
  actions: {
    accountLoginAction({commit}, payload: any) {
      console.log(payload)
    },
  },
}

export default loginModule