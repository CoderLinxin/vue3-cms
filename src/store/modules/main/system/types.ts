import { IGoods, IRole, IUser, IMenu } from "service/main/system/types"

export interface IMainStateType {
  usersList: IUser[], // 用户列表
  usersCount: number,// 用户总个数
  roleList: IRole[], // 角色列表
  roleCount: number, // 角色个数
  goodsList: IGoods[], // 商品列表
  goodsCount: number, // 商品个数
  menuList: IMenu[], // 菜单列表
}

// 列表相关 mutations 名称设置
export type ListMutationsType =
  'setUsersList'
  | 'setUsersCount'
  | 'setRoleList'
  | 'setRoleCount'
  | 'setGoodsList'
  | 'setGoodsCount'
  | 'setMenuList'
  | undefined






