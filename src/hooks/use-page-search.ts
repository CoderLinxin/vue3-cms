// 针对页面搜索组件操作的相关 hook
import { ref } from "vue"

export function usePageSearch() {
  const pageContentRef = ref(null)

// 调用 pageContentRef 引用的组件中的相关方法发送网络请求
  const handleResetBtnClick = () => {
    (pageContentRef.value as any).getPageData()
  }

// 调用 pageContentRef 引用的组件中的相关方法，根据 queryInfo 发送网络请求
  const handleBtnClick = (queryInfo: any) => {
    (pageContentRef.value as any).getPageData(queryInfo)
  }

  return [pageContentRef, handleResetBtnClick, handleBtnClick]
}

