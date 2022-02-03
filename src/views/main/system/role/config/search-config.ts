// 角色管理页面顶部表单搜索组件配置
import { IFormFrame } from "common/form"

const topSearchConfig: IFormFrame = {
  formItems: [
    {
      label: '角色名称',
      type: 'input',
      placeholder: '请输入角色id',
      field: 'name',
    },
    {
      label: '权限介绍',
      type: 'password',
      placeholder: '请输入权限介绍',
      field: 'intro',
    },
    {
      label: '创建时间',
      type: 'datepicker',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange',
      },
      field: 'createAt',
    },
  ],
}

export default topSearchConfig