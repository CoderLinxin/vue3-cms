import { IRole, IUserList } from "service/main/system/types"

export interface IMainStateType {
  usersList: IUserList[], // 用户列表
  usersCount: number,// 用户总个数
  roleList: IRole[], // 角色列表
  roleCount: number // 角色个数
}

// 列表相关 mutations 名称设置
export type ListMutationsType = 'setUsersList' | 'setUsersCount' | 'setRoleList' | 'setRoleCount' | undefined






