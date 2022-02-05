// user 页面的弹窗组件配置
import { IFormFrame } from "common/form"

const modalConfig: IFormFrame = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '角色名',
      placeholder: '请输入角色名',
    },
    {
      field: 'intro',
      type: 'input',
      label: '角色介绍',
      placeholder: '请输入角色介绍',
    },
  ],
  colLayout: {span: 24}, // 独占一行
  formItemStyle: {
    padding: '3px 0',
  },
}

export default modalConfig