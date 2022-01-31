type FormItemType = 'input' | 'password' | 'select' | 'datepicker'

interface IOptionType {
  title: string,
  value: string,

  [key: string]: string
}

// 表单元素类型(根据该类型配置生成一个表单元素)
export interface IFormItem {
  type: FormItemType, // 表单元素类型
  label: string, // 表单元素标签
  labelWidth?: string,
  rules?: any[], // 一些规则
  placeholder?: any, // 占位
  options?: IOptionType[], // select 表单中的 option 配置
  otherOptions?: any // 其他表单元素的配置信息
}

// 承载表单元素的框架类型
export interface IFormFrame {
  formItems: IFormItem[], // 表单元素列表
  formItemStyle?: any, // 单个表单元素样式
  colLayout?: any // element-plus 响应式布局属性: {xl: ,lg: ,md: ,sm: ,xs: ,}
}