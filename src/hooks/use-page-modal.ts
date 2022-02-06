// 针对操作 PageModal 组件的相关 hook
import { ref } from "vue"
import { IPageModalExpose } from "components/page-modal"

type CallbackFn = (data?: any) => void

export function usePageModal() {
  const pageModalRef = ref<IPageModalExpose | null>(null)

  // 打开新增数据弹窗
  const handleNewData = (title: string, newCb?: CallbackFn) => {
    pageModalRef.value!.formData = {}
    pageModalRef.value!.dialogVisible = true // 显示弹窗
    pageModalRef.value!.title = title // 设置弹窗标题
    pageModalRef.value!.mode = 'create' // 本次弹窗操作为新增数据操作

    newCb && newCb() // 进行每个页面独特的操作（如果有）
  }

  // 打开编辑数据弹窗
  const handleEditData = (row: any, title: string, editCb?: CallbackFn) => {
    pageModalRef.value!.dialogVisible = true // 显示弹窗
    pageModalRef.value!.title = title // 设置弹窗标题

    pageModalRef.value!.formData = {...row} // PageModal 中的数据回显
    pageModalRef.value!.mode = 'edit' // 本次弹窗操作为编辑数据操作

    editCb && editCb(row) // 进行每个页面独特的操作（如果有）
  }

  return [pageModalRef, handleNewData, handleEditData]
}