import { createStore } from 'vuex'
import { IRootState } from "@/store/types"
import loginModule from "@/store/modules/login"

export default createStore<IRootState>({
  state: () => ({
    username: '',
    age: 0,
  }),
  mutations: {},
  actions: {},
  modules: {
    login: loginModule,
  },
})
