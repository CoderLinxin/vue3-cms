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

      <!--   预留默认插槽（用于某一具体页面的个性化配置）   -->
      <slot></slot>

      <!--   弹窗操作按钮   -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消
          </el-button>
          <el-button type="primary"
                     @click="handleConfirmClick">确定
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
import { ModeType } from "components/page-modal"
import { useStore } from "@/store"

// 弹窗组件相关配置
const props = defineProps({
  modalConfig: {
    type: Object as PropType<IFormFrame>,
    required: true,
  },

  // 页面名称，用于关联一些后台接口，也用于标识当前页面
  pageName: {
    type: String,
    required: true,
  },

  // 网络请求其他参数（可选）
  otherInfo: {
    type: Object,
    default: () => ({}),
  },
})

const title = ref('') // 弹窗标题
const dialogVisible = ref(false) // 弹窗是否可见
const formData = ref({}) // 绑定 LXFormFrame 的表单数据
const mode = ref<ModeType>('create') // 当前弹窗的模式（新增数据/编辑数据）

// 暴露出属性
defineExpose<IPageModalExpose>({
  dialogVisible,
  title,
  formData,
  mode,
})

const store = useStore()

// 处理确定按钮的点击
const handleConfirmClick = () => {
  switch (mode.value) {
    case 'edit': // 编辑一条数据
      store.dispatch('main/editPageDataAction', {
        pageName: props.pageName, editData: {...formData.value, ...props.otherInfo},
      })
      break
    case 'create': // 新增一条数据
      store.dispatch('main/createPageDataAction', {
        pageName: props.pageName, newData: {...formData.value, ...props.otherInfo},
      })
      break
  }

  // 关闭弹窗
  dialogVisible.value = false
}
</script>

<style lang="scss" scoped>
#page-modal {
  .dialog-footer {
    position: relative;
    bottom: 10px;
  }
}
</style>