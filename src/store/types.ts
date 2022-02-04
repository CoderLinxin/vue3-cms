// 根 store 相关类型定义
import type { ILoginState } from "@/store/modules/login/types"
import type { IMainStateType } from "@/store/modules/main/system/types"
import type { IDepartment } from "service/types"
import type { IRole } from "service/main/system/types"

export interface IRootState {
  departments: IDepartment[], // 所有的部门（不进行任何条件筛选）
  departmentsCount: number, // 所有的部门数
  roleList: IRole[], // 所有的角色列表（不进行任何条件筛选）
  roleCount: number // 所有的角色数
}

interface ILoginModule {
  login: ILoginState,
  main: IMainStateType
}

// 根 state 和 module 的类型定义
export type IRootStateWithModule = IRootState & ILoginModule

