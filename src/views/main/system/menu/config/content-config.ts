// 用户列表配置
import { ITableConfig } from "common/table"

const contentConfig: ITableConfig = {
  // 列表标题
  title: '菜单列表',

  // 列表项配置
  listProps: [
    {prop: 'name', label: '菜单名称', minWidth: '150'},
    {prop: 'type', label: '类型', minWidth: '60'},
    {prop: 'url', label: '菜单url', minWidth: '100'},
    {prop: 'icon', label: '菜单icon', minWidth: '100'},
    {prop: 'permission', label: '按钮权限', minWidth: '100'},
    {prop: 'createAt', label: '创建时间', minWidth: '200', slotName: 'createAt'},
    {prop: 'updateAt', label: '更新时间', minWidth: '200', slotName: 'updateAt'},
    {label: '操作', minWidth: '120', slotName: 'handler'},
  ],

  // 是否显示符号列和多选列
  isShowIndexColumn: false,
  isShowSelectColumn: false,

  // 多级菜单显示
  childrenProps: {
    rowKey: 'id', // 每级菜单中的 id，用于标识每一级菜单
    treeProp: {
      children: 'children'
    }
  },

  // 不显示分页器
  isShowFooter: false
}

export default contentConfig