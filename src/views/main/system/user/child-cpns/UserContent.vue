<!--  用户管理页面主体部分  -->
<template>
  <div id="user-content">
    <!--  顶部表单搜索部分  -->
    <PageSearch :search-config="topSearchConfig"
                @reset-btn-click="handleResetBtnClick"
                @search-btn-click="handleBtnClick"/>

    <!--  中间用户列表部分  -->
    <PageContent :content-config="contentConfig"
                 :page-name="'users'"
                 ref="pageContentRef"/>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import PageSearch from 'components/page-search'
import PageContent from 'components/page-content'
import { topSearchConfig, contentConfig } from "../config"
import { usePageSearch } from "@/hooks/use-page-search"

// 使用操作搜索组件的相关 hook
const [pageContentRef, handleResetBtnClick, handleBtnClick] = usePageSearch()
</script>

<style lang="scss" scoped>
#user-content {

}
</style>