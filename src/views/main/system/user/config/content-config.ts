// 用户列表配置
import { ITableConfig } from "common/table"

const contentConfig: ITableConfig = {
  // 列表标题
  title: '用户列表',

  // 列表项配置
  listProps: [
    {prop: 'name', label: '用户名', minWidth: '100'},
    {prop: 'realname', label: '真实姓名', minWidth: '100'},
    {prop: 'cellphone', label: '手机号码', minWidth: '150'},
    {prop: 'enable', label: '状态', minWidth: '100', slotName: 'status'},
    {prop: 'createAt', label: '创建时间', minWidth: '230', slotName: 'createAt'},
    {prop: 'updateAt', label: '更新时间', minWidth: '230', slotName: 'updateAt'},
    {label: '操作', minWidth: '120', slotName: 'handler'},// 列表最右边操作列]
  ],

  // 是否显示符号列和多选列
  isShowIndexColumn: true,
  isShowSelectColumn: true,
}

export default contentConfig