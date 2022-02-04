<!--  角色管理主内容  -->
<template>
  <div id="role-content">
    <!--  顶部搜索组件  -->
    <PageSearch :search-config="topSearchConfig"/>

    <!--  中间角色列表组件  -->
    <PageContent :content-config="contentConfig"
                 :page-name="'role'"
                 :add-text="'新增角色'"/>
  </div>
</template>

<script lang="ts" setup>
import PageSearch from 'components/page-search'
import PageContent from 'components/page-content'
import { topSearchConfig, contentConfig } from '../config'
</script>

<style lang="scss" scoped>
#role-content {
}
</style>