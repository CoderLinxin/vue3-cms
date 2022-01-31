<!--  承载自定义表单的框架(布局)  -->
<template>
  <div id="lx-form-frame">
    <el-row>
      <el-col v-for="(formItem,index) in formItems"
              :key="index"
              v-bind="colLayout">
        <LXForm :form-item="formItem"
                :style="formItemStyle"/>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import LXForm from './LXForm'
import { defineProps, PropType } from "vue"
import { IFormItem } from "common/form"

const {formItems, formItemStyle, colLayout} = defineProps({
  // 表单元素列表
  formItems: {
    type: Array as PropType<IFormItem>,
  },

  // 表单元素样式
  formItemStyle: {
    type: Object,
    default: () => ({padding: '10px 30px'}),
  },

  // 响应式布局属性
  colLayout: {
    type: Object,
    default: () => ({
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24,
      xs: 24,
    }),
  },
})
</script>

<style lang="scss" scoped>
#lx-form-frame {
}
</style>