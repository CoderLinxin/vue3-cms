<!--  承载自定义表单的框架(布局)  -->
<template>
  <div id="lx-form-frame">
    <!--  顶部插槽  -->
    <div class="header">
      <slot name="header"></slot>
    </div>

    <el-row>
      <el-col v-for="(formItem,index) in props.formItems"
              :key="index"
              v-bind="props.colLayout">
        <el-form :label-width="formItem?.labelWidth ?? '100px'"
                 :style="props.formItemStyle">
          <!--   input 输入框   -->
          <el-form-item :label="formItem?.label" v-if="!formItem.isHidden">
            <template v-if="formItem?.type === 'input' || formItem?.type === 'password'">
              <el-input :show-password="formItem?.type === 'password'"
                        v-if="!formItem.isHidden"
                        :placeholder="formItem?.placeholder"
                        v-bind="formItem?.otherOptions"
                        :model-value="props.modelValue[`${formItem?.field}`]"
                        @update:model-value="handleUpdateModelValue($event,formItem?.field)"/>
            </template>

            <!--   picker   -->
            <template v-else-if="formItem?.type === 'datepicker'">
              <el-date-picker v-bind="formItem?.otherOptions"
                              style="width: 100%;"
                              :model-value="props.modelValue[`${formItem?.field}`]"
                              @update:model-value="handleUpdateModelValue($event,formItem?.field)"/>
            </template>

            <!--   select 选择框   -->
            <template v-else-if="formItem?.type === 'select'">
              <el-select :placeholder="formItem?.placeholder"
                         v-bind="formItem?.otherOptions"
                         style="width: 100%;"
                         :model-value="props.modelValue[`${formItem?.field}`]"
                         @update:model-value="handleUpdateModelValue($event,formItem?.field)">
                <el-option v-for="option in formItem?.options"
                           :key="option.value"
                           :value="option.value">
                  {{ option.title }}
                </el-option>
              </el-select>
            </template>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <!--  底部插槽  -->
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType, defineEmits } from "vue"
import { IFormItem } from "common/form"

const props = defineProps({
  // 表单元素列表
  formItems: {
    type: Array as PropType<IFormItem[]>,
    default: () => [],
  },

  // 用于绑定表单数据的对象
  modelValue: {
    type: Object,
    default: () => ({}),
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

const emit = defineEmits()

// 发射事件通知父组件更新 modelValue
const handleUpdateModelValue = (newValue, key) => {
  // 更新对应 key 的值
  emit('update:modelValue', {...props.modelValue, [key]: newValue})
}
</script>

<style lang="scss" scoped>
#lx-form-frame {
  .header {

  }

  .footer {

  }
}
</style>