<!--  自定义表格组件  -->
<template>
  <div id="lx-table">
    <!--  顶部 header 部分  -->
    <div class="header">
      <h3 class="title">{{ props.title }}</h3>
      <slot name="header" icon="RefreshRight"/>
    </div>

    <!--  表格主体部分  -->
    <el-table :data="props.listData" border style="width: 100%"
              @selection-change="handleSelectionChange"
              v-bind="props.childrenProps">
      <!--   多选操作列   -->
      <el-table-column v-if="props.isShowSelectColumn"
                       type="selection" width="60" align="center"/>

      <!--   序号列   -->
      <el-table-column v-if="props.isShowIndexColumn"
                       type="index" width="60"
                       align="center" label="序号"/>

      <!--   列表主体列   -->
      <template v-for="listProp in props.listProps" :key="listProp.prop">
        <el-table-column v-bind="listProp" align="center" show-overflow-tooltip>
          <!--  所有的 listData 都会插入默认插槽(n 个列表项会生成 n 个默认插槽):   -->
          <template #default="scope">
            <!--   使用 listProp.slotName 设置动态插槽名来标识某一列对应的所有插槽,
              使用作用域插槽让父组件有决定某一列数据布局格式的能力     -->
            <slot :name="listProp.slotName"
                  :row="scope.row"
                  :key="listProp.prop">
              <!--    使用 scope.row 拿到每一行数据,使用 listProp.prop 为 key 拿到每一列数据,下面为默认展示的数据格式     -->
              {{ scope.row[listProp.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <!--  底部 footer 部分  -->
    <div class="footer" v-if="props.isShowFooter">
      <slot name="footer">
        <el-pagination
                :currentPage="props.page?.currentPage"
                :page-sizes="[2, 4, 6]"
                :page-size="props.page?.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="props.listCount"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"/>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import type { PropType } from 'vue'
import type { ITablePropsType } from "common/table"

const props = defineProps({
  // 列表标题
  title: {
    type: String,
    default: () => '',
  },

  // 用于生成列表的数据
  listData: {
    type: Array,
    required: true,
  },

  // 列表数据条数
  listCount: {
    type: Number,
    default: () => 0,
  },

  // 当前页面和页面大小
  page: {
    type: Object as PropType<{ pageSize: number, currentPage: number }>,
    default: () => ({pageSize: 10, currentPage: 1}),
  },

  // 列表列头信息数据(一个数组元素描述一个列表头)
  listProps: {
    type: Array as PropType<ITablePropsType[]>,
    required: true,
  },

  // 多级菜单展示相关配置
  childrenProps: {
    type: Object,
    default: () => ({}),
  },

  // 是否显示序号列
  isShowIndexColumn: {
    type: Boolean,
    default: () => true,
  },

  // 是否显示选择列
  isShowSelectColumn: {
    type: Boolean,
    default: () => true,
  },

  // 是否显示翻页器
  isShowFooter: {
    type: Boolean,
    default: () => true,
  },
})

const emit = defineEmits(['selectionChange', 'update:page'])
// 处理列表选择事件: 发射事件传递所选择的行
const handleSelectionChange = (row: any) => emit('selectionChange', row)
// 翻页器设置页面大小时触发
const handleSizeChange = (pageSize) => emit('update:page', {...props.page, pageSize})
// 进行翻页时触发
const handleCurrentChange = (currentPage) => emit('update:page', {...props.page, currentPage})
</script>

<style lang="scss" scoped>
#lx-table {
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .title {
    position: relative;
    text-indent: 10px;
    bottom: 10px;
  }

  padding: 20px;
  border-top: 20px solid #f5f5f5;

  .footer {
    display: flex;
    justify-content: right;
    margin-top: 20px;
  }
}
</style>