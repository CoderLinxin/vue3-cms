// user 页面的弹窗组件配置
import { IFormFrame } from "common/form"

const modalConfig: IFormFrame = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名',
    },
    {
      field: 'realname',
      type: 'input',
      label: '真实姓名',
      placeholder: '请输入真实姓名',
    },
    {
      field: 'password',
      type: 'password',
      label: '用户密码',
      placeholder: '请输入密码',
      isHidden: false, // 是否隐藏密码表单元素
    },
    {
      field: 'cellphone',
      type: 'input',
      label: '电话号码',
      placeholder: '请输入电话号码',
    },
    {
      field: 'departmentId',
      type: 'select',
      label: '选择部门',
      placeholder: '请选择部门',
      options: [],
    },
    {
      field: 'roleId',
      type: 'select',
      label: '选择角色',
      placeholder: '请选择角色',
      options: [],
    },
  ],
  colLayout: {span: 24}, // 独占一行
  formItemStyle: {
    padding: '3px 0',
  },
}

export default modalConfig