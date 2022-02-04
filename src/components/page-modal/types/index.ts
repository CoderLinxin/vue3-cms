import { Ref, UnwrapRef } from "@vue/reactivity"

export interface IPageModalExpose {
  dialogVisible: Ref<UnwrapRef<boolean>>
  title: Ref<UnwrapRef<string>>,
  formData: Ref<UnwrapRef<any>>
}