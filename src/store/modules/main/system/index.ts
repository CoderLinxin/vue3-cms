import type { Module } from 'vuex'
import type { IMainStateType, ListMutationsType } from "@/store/modules/main/system/types"
import type { IRootState } from "@/store/types"
import type { IPageListPayload, IRoleList, ListUrl, PageNameType } from "service/main/system/types"
import type { IUserList, IUserListType } from "service/main/system/types"
import {
  SET_USERS_LIST,
  SET_USERS_COUNT,
  SET_ROLE_COUNT,
  SET_ROLE_LIST,
} from "@/store/modules/main/system/mutations-types"
import { getPageList } from "service/main/system/system"
import { IRole } from "service/main/system/types"

const mainModule: Module<IMainStateType, IRootState> = {
  namespaced: true,

  state: {
    usersList: [],
    usersCount: 0,
    roleList: [],
    roleCount: 0,
  },

  getters: {
    // 根据 pageName 获取对应的列表数据
    getPageList(state) {
      return (pageName: PageNameType) => {
        switch (pageName) {
          case 'users':
            return {listData: state.usersList, listCount: state.usersCount}
          case 'role':
            return {listData: state.roleList, listCount: state.roleCount}
          default:
            const check: never = pageName
        }
      }
    },
  },

  mutations: {
    // 设置用户列表
    [SET_USERS_LIST!](state, userList: IUserList[]) {
      state.usersList = userList
    },

    // 设置用户数
    [SET_USERS_COUNT!](state, userCount: number) {
      state.usersCount = userCount
    },

    // 设置角色列表
    [SET_ROLE_LIST!](state, roleList: IRole[]) {
      state.roleList = roleList
    },

    // 设置角色数
    [SET_ROLE_COUNT!](state, roleCount: number) {
      state.roleCount = roleCount
    },
  },

  actions: {
    // 请求用户列表数据
    async getPageListAction({commit}, {pageName, queryInfo}: IPageListPayload) {
      let url: ListUrl = undefined
      let listMutation: ListMutationsType = undefined
      let listCountMutation: ListMutationsType = undefined

      // 根据 pageName 获取 url 和 对应的 mutation
      switch (pageName) {
        case 'users':
          url = '/users/list'
          listMutation = 'setUsersList'
          listCountMutation = 'setUsersCount'
          break
        case 'role':
          url = '/role/list'
          listMutation = 'setRoleList'
          listCountMutation = 'setRoleCount'
          break
        default:
          const check: never = pageName
      }

      // 请求（用户/角色）列表数据
      const result = (await getPageList<IUserListType>(url!, queryInfo)).data

      commit(listMutation!, result.list)
      commit(listCountMutation!, result.totalCount)
    },
  },
}

export default mainModule