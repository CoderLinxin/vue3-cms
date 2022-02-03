// 用户管理页面顶部表单搜索组件配置
import { IFormFrame } from "common/form"

const topSearchConfig: IFormFrame = {
  formItemStyle: {
    padding: '10px 30px',
  },
  colLayout: {
    xl: 6,
    lg: 8,
    md: 12,
    sm: 24,
    xs: 24,
  },
  formItems: [
    {
      label: 'id',
      type: 'input',
      placeholder: '请输入用户id',
      field: 'id',
    },
    {
      label: '用户名',
      type: 'input',
      placeholder: '请输入用户名',
      field: 'name',
    },
    {
      label: '真实姓名',
      type: 'input',
      placeholder: '请输入真实姓名',
      field: 'realname',
    },
    {
      label: '电话号码',
      type: 'input',
      placeholder: '请输入电话号码',
      field: 'cellphone',
    },
    {
      label: '用户状态',
      type: 'select',
      options: [
        {title: '启用', value: 1},
        {title: '禁用', value: 0},
      ],
      placeholder: '请选择用户状态',
      field: 'enable',
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