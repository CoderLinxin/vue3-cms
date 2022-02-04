import lxRequest from "@/service"
import { IDataType } from "service/types"

// 获取列表数据(用户列表,角色列表,菜单列表...多种用途):由于多个接口的请求类似,因此共享该请求函数(url由外界决定)
export function getPageList<T>(url: string, queryInfo?: any) { // 泛型用于显式指定返回数据类型
  return lxRequest.post<IDataType<T>>({
    url,
    data: queryInfo,
  })
}

// 删除一条（用户/菜单/角色....）列表数据
export function deletePageData(url: string) {
  return lxRequest.delete({
    url,
  })
}

