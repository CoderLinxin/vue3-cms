<!--  页面弹窗组件  -->
<template>
  <div id="page-modal">
    <el-dialog v-model="dialogVisible"
               :title="title"
               width="30%" center
               destroy-on-close>
      <!--  弹窗主体内容  -->
      <LXFormFrame v-bind="props.modalConfig"
                   v-model="formData"/>

      <!--   弹窗操作按钮   -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消
          </el-button>
          <el-button type="primary"
                     @click="dialogVisible = false">确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType, ref } from 'vue'
import LXFormFrame from 'common/form'
import type { IFormFrame } from "common/form"
import type { IPageModalExpose } from "components/page-modal"

// 弹窗组件相关配置
const props = defineProps({
  modalConfig: {
    type: Object as PropType<IFormFrame>,
    required: true,
  },
})

const title = ref('')
const dialogVisible = ref(false) // 弹窗是否可见
const formData = ref({}) // 绑定 LXFormFrame 的表单数据

defineExpose<IPageModalExpose>({
  dialogVisible,
  title,
  formData,
})
</script>

<style lang="scss" scoped>
#page-modal {
  .dialog-footer {
    position: relative;
    bottom: 10px;
  }
}
</style>