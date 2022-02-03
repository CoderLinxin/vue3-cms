<!--  面包屑组件(用于菜单导航提示)  -->
<template>
  <div id="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(crumbProp,index) in crumbProps"
                          :key="crumbProp.name">
        {{ crumbProp.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from 'vue'
import { ICrumbType } from "common/breadcrumb"

// 用于生成面包屑的完整菜单路径数组: 一级菜单/二级菜单/三级菜单/...
const {crumbProps} = defineProps({
  crumbProps: {
    type: Array as PropType<ICrumbType[]>,
    default: () => [],
  },
})
</script>

<style lang="scss" scoped>
#breadcrumb {
}
</style>