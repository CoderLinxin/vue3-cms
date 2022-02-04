// 针对操作 PageModal 组件的相关 hook
import { ref } from "vue"
import { IPageModalExpose } from "components/page-modal"

type CallbackFn = () => void

export function usePageModal() {
  const pageModalRef = ref<IPageModalExpose | null>(null)

  const handleNewData = (title: string, newCb?: CallbackFn) => {
    newCb && newCb() // 进行每个页面独特的操作（如果有）

    pageModalRef.value!.formData = {}
    pageModalRef.value!.dialogVisible = true // 显示弹窗
    pageModalRef.value!.title = title // 设置弹窗标题

    // 新增一条数据
  }

  const handleEditData = (row: any, title: string, editCb?: CallbackFn) => {
    editCb && editCb() // 进行每个页面独特的操作（如果有）

    pageModalRef.value!.dialogVisible = true // 显示弹窗
    pageModalRef.value!.title = title // 设置弹窗标题

    // 数据回显
    pageModalRef.value!.formData = {...row}

    // 编辑数据
  }

  return [pageModalRef, handleNewData, handleEditData]
}