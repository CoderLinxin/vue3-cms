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
      label: '用户名',
      type: 'input',
      placeholder: '请输入用户名',
    },
    {
      label: '密码',
      type: 'password',
      placeholder: '请输入密码',
    },
    {
      label: '创建时间',
      type: 'datepicker',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange',
      },
    },
    {
      label: '喜欢的运动',
      type: 'select',
      placeholder: '请选择喜欢的运动',
      options: [
        {title: '篮球', value: 'basketball'},
        {title: '足球', value: 'football'},
      ],
    },
  ],
}

export default topSearchConfig