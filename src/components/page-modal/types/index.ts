import { Ref, UnwrapRef } from "@vue/reactivity"

export type ModeType = 'edit' | 'create'

export interface IPageModalExpose {
  dialogVisible: Ref<UnwrapRef<boolean>>
  title: Ref<UnwrapRef<string>>,
  formData: Ref<UnwrapRef<any>>,
  mode: Ref<UnwrapRef<ModeType>>
}