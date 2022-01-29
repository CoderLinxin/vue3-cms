// 手机验证码登录面板相关配置

// 手机号验证码校验规则
export const rules = {
  phoneNum: [
    {
      required: true, // 是否必传
      message: '手机号不能为空~', // 本规则校验失败的提示信息
      trigger: 'blur', // 失去焦点时校验
    },
    {
      type: 'number',
      message: '手机号只能是数字~',
      trigger: 'blur',
    },
    {
      pattern: /^[0-9]{7,12}$/,
      message: '手机号必须是7~12个数字~',
      trigger: 'blur',
    },
  ],
  verifyCode: [
    {
      required: true,
      message: '验证码不能为空~',
      trigger: 'blur',
    },
  ],
}