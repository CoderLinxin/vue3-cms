<template>
  <div id="menu-content">
    <PageContent :content-config="contentConfig"
                 :page-name="'menu'"
                 :add-text="'新增菜单'"/>
  </div>
</template>

<script lang="ts" setup>
import PageContent from 'components/page-content'
import { contentConfig } from '../config'
</script>

<style lang="scss" scoped>
#menu-content {

}
</style>