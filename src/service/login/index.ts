import lxRequest from "@/service"
import type { IAccountLoginPayloadType } from "@/store/modules/login/types"
import type { IDataType } from "service/types"
import type { ILoginResult } from "service/login/types"

// 登录接口
enum LoginApi {
  AccountLogin = '/login', // 用户登录接口
  LoginUerInfo = '/users/', // 获取已登录用户信息接口（携带 token）
  UserMenus = '/role' // 获取用户菜单（携带 token）
}

// 用户登录
export function loginRequest(account: IAccountLoginPayloadType) {
  return lxRequest.post<IDataType<ILoginResult>>({
    url: LoginApi.AccountLogin,
    data: {
      name: account.username,
      password: account.password,
    },
  })
}

// 根据用户 id 获取用户信息
export function getUserInfoById<T>(id: number) {
  return lxRequest.get<T>({
    url: LoginApi.LoginUerInfo + id,
    showLoading: false,
  })
}

export function getUserMenuByRoleId<T>(id: number) {
  return lxRequest.get<T>({
    url: `${LoginApi.UserMenus}/${id}/menu`,
    showLoading: false,
  })
}