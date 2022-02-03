import { createStore, useStore as originUseStore } from 'vuex'
import type { Store } from 'vuex'
import { IRootState, IRootStateWithModule } from "@/store/types"
import loginModule from "@/store/modules/login"
import mainModule from "@/store/modules/main/system"

export default createStore<IRootState>({
  state: () => ({
    username: '',
    age: 0,
  }),
  mutations: {},
  actions: {},
  modules: {
    login: loginModule,
    main: mainModule,
  },
})

// 由于默认的 useStore 只能提供根 state 的类型而无法提供 module 类型（module 在获取时位于根 state 的属性中），因此对其返回值类型进行扩展
export function useStore(): Store<IRootStateWithModule> { // 根据 store<any> 可以兼容任何类型
  return originUseStore()
}
