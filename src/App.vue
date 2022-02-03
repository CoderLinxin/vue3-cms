<template>
  <div id="app">
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script lang="ts" setup>
import { ElConfigProvider } from 'element-plus/lib/components'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
</script>

<style lang="scss" scoped>
#app {
}
</style>