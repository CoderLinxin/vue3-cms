// 根 store 相关类型定义
import { ILoginState } from "@/store/modules/login/types"

export interface IRootState {
  username: string,
  age: number
}

interface ILoginModule {
  login: ILoginState
}

// 根 state 和 module 的类型定义
export type IRootStateWithModule = IRootState & ILoginModule

