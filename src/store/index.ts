import { createStore, useStore as originUseStore } from 'vuex'
import loginModule from "@/store/modules/login"
import mainModule from "@/store/modules/main/system"
import { getPageList } from "service/main/system/system"
import type { Store } from 'vuex'
import type { IRootState, IRootStateWithModule } from "@/store/types"
import type { IDepartmentType } from "service/types"
import type { IRoleList, IMenuList } from "service/main/system/types"

const store = createStore<IRootState>({
  state: () => ({
    departments: [], // 完整的部门（不进行任何条件筛选）
    departmentsCount: 0, // 完整的部门数
    roleList: [], // 完整的角色列表（不进行任何条件筛选，区别于 login 模块中的角色列表（可以进行一些条件筛选））
    roleCount: 0, // 完整的角色数
    menuList: [], // 完整的菜单列表
    menuCount: 0, // 菜完整的单数
  }),
  mutations: {
    // 设置部门数据
    setDepartmentsData(state, {list, totalCount}: IDepartmentType) {
      state.departments = list
      state.departmentsCount = totalCount
    },

    // 设置角色数据
    setRolesData(state, {list, totalCount}: IRoleList) {
      state.roleList = list
      state.roleCount = totalCount
    },

    // 设置菜单数据
    setMenuData(state, {list, totalCount}: IMenuList) {
      state.menuList = list
      state.menuCount = totalCount
    },
  },
  actions: {
    // 获取所有部门、角色、菜单列表
    async getFullListAction({commit}) {
      const departmentsData = (await getPageList<IDepartmentType>('/department/list')).data
      const rolesData = (await getPageList<IRoleList>('/role/list')).data
      const menusData = (await getPageList<IRoleList>('/menu/list')).data

      commit('setDepartmentsData', departmentsData)
      commit('setRolesData', rolesData)
      commit('setMenuData', menusData)
    },
  },
  modules: {
    login: loginModule,
    main: mainModule,
  },
})

// 在安装 store 前进行一些初始化操作
export function setupStore() {
  store?.dispatch('login/loadLocalLoginData')
  // store?.dispatch('getFullListAction')
}

// 由于默认的 useStore 只能提供根 state 的类型而无法提供 module 类型（module 在获取时位于根 state 的属性中），因此对其返回值类型进行扩展
export function useStore(): Store<IRootStateWithModule> { // 根据 store<any> 可以兼容任何类型
  return originUseStore()
}

export default store
