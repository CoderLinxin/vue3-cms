// login 页面相关 store 类型
import { IUserInfo, UserMenusType } from "service/login/types"

export interface ILoginState {
  token?: string,
  userInfo?: IUserInfo,
  userMenus?: UserMenusType
}

export interface IAccountLoginPayloadType {
  username: string,
  password: string
}