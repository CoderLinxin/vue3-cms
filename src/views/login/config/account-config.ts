// 账号登录面板相关配置

// 用户名密码校验规则
export const rules = {
  username: [
    {
      required: true, // 是否必传
      message: '用户名不能为空~', // 本规则校验失败的提示信息
      trigger: 'blur', // 失去焦点时校验
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '用户名必须是5~10个字符~',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '密码不能为空~',
      trigger: 'blur',
    },
    {
      pattern: /^[a-z0-9]{5,}$/,
      message: '密码必须为5个字符以上~',
      trigger: 'blur',
    },
  ],
}

// LoginAccount 组件暴露出来的对象类型
export interface IAccountExposeType {
  loginAction: (isKeepCode: boolean) => void
}