<!--  用户管理页面主体部分  -->
<template>
  <div id="user-content">
    <!--  顶部表单部分  -->
    <LXFormFrame v-bind="topSearchConfig"
                 class="form-frame"/>
  </div>
</template>

<script lang="ts" setup>
import LXFormFrame, { IFormItem } from 'common/form'
import { topSearchConfig } from "../config"
</script>

<style lang="scss" scoped>
#user-content {
  .form-frame {
    margin-top: 20px;
    padding: 0 20px;
  }
}
</style>