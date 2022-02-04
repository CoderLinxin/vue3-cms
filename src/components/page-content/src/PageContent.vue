<!--  表格展示组件  -->
<template>
  <div id="page-content">
    <LXTable :list-data="computedList.listData"
             :list-count="computedList.listCount"
             v-bind="props.contentConfig"
             v-model:page="pageInfo">
      <!--   表格 header 插槽    -->
      <template #header>
        <div>
          <el-button type="primary" v-if="isCreate"
                     @click="handleCreateBtnClick">
            {{ props.addText }}
          </el-button>
          <el-button icon="refresh"/>
        </div>
      </template>

      <!--   使用作用域插槽动态决定 createAt 列的布局    -->
      <template #createAt="{row,key}">
        <strong>{{ $filters.formatUTCTime(row[key]) }}</strong>
      </template>

      <!--   updateAt 列     -->
      <template #updateAt="{row,key}">
        <strong>{{ $filters.formatUTCTime(row[key]) }}</strong>
      </template>

      <!--    最右边操作列    -->
      <template #handler="{row,key}">
        <div class="handler-btn">
          <el-button icon="edit"
                     type="primary"
                     size="small"
                     v-if="isUpdate"
                     @click="handleEditBtnClick(row)">编辑
          </el-button>
          <el-button icon="delete"
                     type="danger"
                     size="small"
                     v-if="isDelete"
                     @click="handleDeleteBtnClick(row)">删除
          </el-button>
        </div>
      </template>

      <!--   排除上面的公共插槽的动态插槽部分（外界可通过这些插槽跨越 PageContent 传递到 LXTable 的插槽中）   -->
      <template v-for="otherProp in otherPropSlots"
                :key="otherProp.prop"
                #[otherProp.slotName]="{row,key}">
        <template v-if="otherProp.slotName">
          <slot :name="otherProp.slotName"
                :row="row"
                :key="key"/>
        </template>
      </template>
    </LXTable>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, ref, watch, defineEmits } from "vue"
import { useStore } from '@/store'
import { usePermission } from "@/hooks/use-permission"
import LXTable from 'common/table'
import type { PropType } from "vue"
import type { ITableConfig } from "common/table"
import type { IPageListPayload, PageNameType } from "service/main/system/types"

// 1.权限校验
const isCreate = usePermission(props.pageName as PageNameType, 'create')
const isDelete = usePermission(props.pageName as PageNameType, 'delete')
const isUpdate = usePermission(props.pageName as PageNameType, 'update')
const isQuery = usePermission(props.pageName as PageNameType, 'query')

// 2.page-content 配置相关
const props = defineProps({
  // 用于生成列表的配置
  contentConfig: {
    type: Object as PropType<ITableConfig>,
    required: true,
  },

  // 要求生成的页面名称（有助于获取对应的 url）
  pageName: {
    type: String as PropType<PageNameType>,
    required: true,
  },

  // 新增操作按钮文字
  addText: {
    type: String,
    default: () => '新建用户',
  },
})

// 3.翻页器相关设置
const pageInfo = ref({
  pageSize: 10,
  currentPage: 1,
})

// 4.vuex 相关
const store = useStore()
const getPageData = (extraQueryInfo?: any) => { // 获取列表数据
  if (!isQuery) return

  // 网络请求需携带的 payload
  const pageListPayload: IPageListPayload = {
    pageName: props.pageName as PageNameType,
    queryInfo: {
      offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
      size: pageInfo.value.pageSize,
      ...extraQueryInfo,
    },
  }

  // 发送网络请求（请求列表数据放入 vuex）:
  store.dispatch('main/getPageListAction', pageListPayload)
}
watch(pageInfo, () => {
  getPageData() // 翻页时重新请求数据
})
getPageData() // 初始时发送一次网络请求
const computedList = computed<{ listData: any, listCount: number }>(
  // 从 vuex 中拿到列表数据（listData: 列表数据，listCount: 列表个数）
  () => store.getters['main/getPageList'](props.pageName),
)

// 4.组件再封装
const otherPropSlots = (props.contentConfig as ITableConfig).listProps.filter(listProp => {
  // 从配置中筛选掉公共插槽部分
  switch (listProp.slotName) {
    case 'updateAt':
      return false
    case 'createAt':
      return false
    case 'handler':
      return false
    default:
      return true
  }
})
defineExpose({ // 暴露出属性
  getPageData, // 将网络请求函数暴露给父组件
})

// 5.删除按钮点击
const handleDeleteBtnClick = (row) => {
  // 删除一条列表数据
  store.dispatch('main/deletePageDataAction', {
    pageName: props.pageName,
    id: row.id,
  })
}

const emits = defineEmits(['createPageData', 'editPageData'])
// 6.新增按钮点击
const handleCreateBtnClick = () => {
  // 新增一条列表数据：通知父组件操作弹窗组件
  emits('createPageData')
}
// 7.编辑按钮点击
const handleEditBtnClick = (row) => {
  // 编辑一条列表数据：通知父组件操作弹窗组件
  emits('editPageData', row)
}
</script>

<style lang="scss" scoped>
#page-content {
  .handler-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;

    > * {
      width: 50px;
    }
  }
}
</style>