// 权限校验相关 hook
import { useStore } from "@/store"
import type { PageNameType } from "service/main/system/types"

// 校验某个页面是否存在某项权限
export function usePermission(pageName: PageNameType, handleName: string) {
  const store = useStore()
  const permissions = store.state.login.permissions
  const permissionStr = `system:${pageName}:${handleName}` // 需要校验的目标字符串权限
  return !!permissions.find(permission => permission === permissionStr)
}