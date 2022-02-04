// 用户列表配置
import { ITableConfig } from "common/table"

const contentConfig: ITableConfig = {
  // 列表标题
  title: '角色列表',

  // 列表项配置
  listProps: [
    {prop: 'name', label: '商品名称', minWidth: '80'},
    {prop: 'oldPrice', label: '原价格', minWidth: '80', slotName: 'price'},
    {prop: 'newPrice', label: '现价格', minWidth: '80', slotName: 'price'},
    {prop: 'imgUrl', label: '商品图片', minWidth: '100', slotName: 'image'},
    {prop: 'status', label: '状态', minWidth: '100', slotName: 'status'},
    {prop: 'createAt', label: '创建时间', minWidth: '250', slotName: 'createAt'},
    {prop: 'updateAt', label: '更新时间', minWidth: '250', slotName: 'updateAt'},
    {label: '操作', minWidth: '120', slotName: 'handler'},
  ],

  // 是否显示符号列和多选列
  isShowIndexColumn: true,
  isShowSelectColumn: true,
}

export default contentConfig