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
          <el-form-item :label="formItem?.label"
                        v-if="formItem?.type === 'input' || formItem?.type === 'password'">
            <el-input :show-password="formItem?.type === 'password'"
                      :placeholder="formItem?.placeholder"
                      v-bind="formItem?.otherOptions"
                      v-model="formDataProps[`${formItem?.field}`]"/>
          </el-form-item>

          <!--   picker   -->
          <el-form-item :label="formItem?.label"
                        v-else-if="formItem?.type === 'datepicker'">
            <el-date-picker v-bind="formItem?.otherOptions"
                            style="width: 100%;"
                            v-model="formDataProps[`${formItem?.field}`]"/>
          </el-form-item>

          <!--   select 选择框   -->
          <el-form-item :label="formItem?.label"
                        v-else-if="formItem?.type === 'select'">
            <el-select :placeholder="formItem?.placeholder"
                       v-bind="formItem?.otherOptions"
                       style="width: 100%;"
                       v-model="formDataProps[`${formItem?.field}`]">
              <el-option v-for="option in formItem?.options"
                         :key="option.value"
                         :value="option.value"/>
            </el-select>
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
import { defineProps, PropType, defineEmits, watch, ref, onUnmounted } from "vue"
import { IFormItem } from "common/form"
import emitter from '@/utils/bus'
// {formItems, modelValue, formItemStyle, colLayout}
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
// 对传递进来的 formData 进行二次包装
let formDataProps = ref({...props.modelValue})
// 监听 formDataProps 的改变,然后通知父组件更新 modelValue，而不是去直接修改 modelValue
watch(formDataProps, (newFormData) => {
  // 这里需要对 newFormData 进行深拷贝，防止父组件的状态的引用被修改为 formDataProps，这样子组件可以直接修改父组件的内容
  emit('update:modelValue', {...newFormData})
}, {deep: true})

// 父组件更新 modelValue 时需手动同步 formDataProps
emitter.on('clearFormDataByParent', emptyModelValue => formDataProps.value = emptyModelValue as any)
onUnmounted(() => emitter.off('clearFormDataByParent'))
</script>

<style lang="scss" scoped>
#lx-form-frame {
  .header {

  }

  .footer {

  }
}
</style>