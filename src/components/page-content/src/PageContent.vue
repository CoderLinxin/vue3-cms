<!--  表格展示组件  -->
<template>
  <div id="page-content">
    <LXTable :list-data="computedList.listData"
             :list-count="computedList.listCount"
             v-bind="contentConfig"
             v-model:page="pageInfo">
      <!--   表格 header 插槽    -->
      <template #header>
        <div>
          <el-button type="primary">新建用户</el-button>
          <el-button icon="refresh"/>
        </div>
      </template>

      <!--   使用作用域插槽动态决定 status 列的布局    -->
      <template #status="{row,key}">
        <el-button :type="formatStyleButton(row[key])">
          {{ formatUseButton(row[key]) }}
        </el-button>
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
      <template #handler>
        <div class="handler-btn">
          <el-button icon="edit" type="primary" size="small">
            编辑
          </el-button>
          <el-button icon="delete" type="danger" size="small">
            删除
          </el-button>
        </div>
      </template>
    </LXTable>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, ref, watch } from "vue"
import type { PropType } from "vue"
import { useStore } from '@/store'
import LXTable from 'common/table'

import type { ITableConfig } from "common/table"
import type { IPageListPayload, PageNameType } from "service/main/system/types"

const store = useStore()

const {contentConfig, pageName} = defineProps({
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
})

// 翻页器相关设置
const pageInfo = ref({
  pageSize: 10,
  currentPage: 1,
})

// 发送网络请求:
const getPageData = (extraQueryInfo?: any) => {
  // 网络请求需携带的 payload
  const pageListPayload: IPageListPayload = {
    pageName: pageName as PageNameType,
    queryInfo: {
      offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
      size: pageInfo.value.pageSize,
      ...extraQueryInfo,
    },
  }

  // 请求列表数据放入 vuex
  store.dispatch('main/getPageListAction', pageListPayload)
}

// 翻页时重新请求数据
watch(pageInfo, () => {
  getPageData()
})

// 初始时发送一次网络请求
getPageData()

defineExpose({
  getPageData, // 将网络请求函数暴露给父组件
})

// 从 vuex 中拿到列表数据（listData: 列表数据，listCount: 列表个数）
const computedList = computed<{ listData: any, listCount: number }>(
  () => store.getters['main/getPageList'](pageName),
)

// 格式化 el-button 的样式展示（可选）
const formatUseButton = (value) => value === 1 ? '启用' : '禁用'
const formatStyleButton = (value) => value === 1 ? 'success' : 'danger'
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