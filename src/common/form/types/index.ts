type FormItemType = 'input' | 'password' | 'select' | 'datepicker'

interface IOptionType {
  title: string,
  value: any,

  [key: string]: any
}

// 表单元素类型(根据该类型配置生成一个表单元素)
export interface IFormItem {
  type: FormItemType, // 表单元素类型
  label: string, // 表单元素标签
  labelWidth?: string,
  rules?: any[], // 一些规则
  field?: string, // 当前表单元素对应的 formData 的那个 key，用于将表单元素的数据绑定到该字段中，该字段也用于作为接口查询条件的 key
  placeholder?: any, // 占位
  options?: IOptionType[], // select 表单中的 option 配置
  otherOptions?: any // 其他表单元素的配置信息
}

// 承载表单元素的框架类型
export interface IFormFrame {
  formItems: IFormItem[], // 表单元素列表，每个配置对象用于生成一个表单元素
  formItemStyle?: any, // 单个表单元素样式
  colLayout?: any // element-plus 响应式布局属性: {xl: ,lg: ,md: ,sm: ,xs: ,}
}