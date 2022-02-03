// el-table-column 的 props 属性类型,每个对象代表一列
export interface ITablePropsType {
  prop?: string,
  label?: string,
  minWidth?: string,
  width?: string,
  slotName?: string // 对应该列的插槽名称(用于作用域插槽中标识某一列)
}

// 列表的配置类型
export interface ITableConfig {
  title?: string,
  listProps: ITablePropsType[],
  isShowIndexColumn?: Boolean,
  isShowSelectColumn?: Boolean,

  [key: string]: any
}