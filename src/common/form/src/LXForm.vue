<!--  自定义表单组件  -->
<template>
  <div id="lx-form">
    <el-form :label-width="formItem?.labelWidth ?? '100px'">
      <!--   input 输入框   -->
      <el-form-item :label="formItem?.label"
                    v-if="formItem?.type === 'input' || formItem?.type === 'password'">
        <el-input :show-password="formItem?.type === 'password'"
                  :placeholder="formItem?.placeholder"
                  v-bind="formItem?.otherOptions"/>
      </el-form-item>

      <!--   picker   -->
      <el-form-item :label="formItem?.label"
                    v-else-if="formItem?.type === 'datepicker'">
        <el-date-picker v-bind="formItem?.otherOptions" style="width: 100%;"/>
      </el-form-item>

      <!--   select 选择框   -->
      <el-form-item :label="formItem?.label"
                    v-else-if="formItem?.type === 'select'">
        <el-select :placeholder="formItem?.placeholder"
                   v-bind="formItem?.otherOptions"
                   style="width: 100%;">
          <el-option v-for="option in formItem?.options"
                     :key="option.value"
                     :value="option.value"/>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from "vue"
import { IFormItem } from "./types"

const {formItem, formItemStyle} = defineProps({
  // form 表单元素类型
  formItem: {
    type: Object as PropType<IFormItem>,
    default: () => ({}),
  },
})
</script>

<style lang="scss" scoped>
#lx-form {
}
</style>