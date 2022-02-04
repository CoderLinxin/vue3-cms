import type { Module } from 'vuex'
import type { IMainStateType, ListMutationsType } from "@/store/modules/main/system/types"
import type { IRootState } from "@/store/types"
import type { IGoods, IPageListPayload, IMenu, ListUrl, PageNameType } from "service/main/system/types"
import type { IUser, IUserListType } from "service/main/system/types"
import {
  SET_USERS_LIST,
  SET_USERS_COUNT,
  SET_ROLE_COUNT,
  SET_ROLE_LIST,
  SET_GOODS_LIST,
  SET_GOODS_COUNT,
  SET_MENU_LIST,
} from "@/store/modules/main/system/mutations-types"
import { deletePageData, getPageList } from "service/main/system/system"
import { IRole } from "service/main/system/types"

const mainModule: Module<IMainStateType, IRootState> = {
  namespaced: true,

  state: {
    usersList: [],
    usersCount: 0,
    roleList: [],
    roleCount: 0,
    goodsList: [],
    goodsCount: 0,
    menuList: [],
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
          case 'goods':
            return {listData: state.goodsList, listCount: state.goodsCount}
          case 'menu':
            return {listData: state.menuList, listCount: undefined}
          default:
            const check: never = pageName
        }
      }
    },
  },

  mutations: {
    // 设置用户列表
    [SET_USERS_LIST!](state, userList: IUser[]) {
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

    // 设置商品列表
    [SET_GOODS_LIST!](state, goodsList: IGoods[]) {
      state.goodsList = goodsList
    },

    // 设置商品数
    [SET_GOODS_COUNT!](state, goodsCount: number) {
      state.goodsCount = goodsCount
    },

    // 设置菜单列表
    [SET_MENU_LIST!](state, menuList: IMenu[]) {
      state.menuList = menuList
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
        case 'goods':
          url = '/goods/list'
          listMutation = 'setGoodsList'
          listCountMutation = 'setGoodsCount'
          break
        case 'menu':
          url = '/menu/list'
          listMutation = 'setMenuList'
          listCountMutation = undefined
          break
        default:
          const check: never = pageName
      }

      // 请求（用户/角色）列表数据
      const result = (await getPageList<IUserListType>(url!, queryInfo)).data

      listMutation && commit(listMutation, result.list)
      listCountMutation && commit(listCountMutation, result.totalCount)
    },

    // 删除一条用户列表数据
    async deletePageDataAction({dispatch}, {pageName, id}) {
      const url = `/${pageName}/${id}`
      await deletePageData(url)

      // 重新请求数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10,
        },
      })
    },
  },
}

export default mainModule