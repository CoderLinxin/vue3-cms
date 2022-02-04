<!--  表单搜索组件  -->
<template>
  <LXFormFrame v-bind="searchConfig"
               class="form-frame"
               v-model="formData"
               id="page-search">
    <template #header>
      <h2 class="high-search">高级检索</h2>
    </template>

    <template #footer>
      <div class="search-button">
        <el-button icon="refresh"
                   @click="handleClearFormData">重置
        </el-button>
        <el-button type="primary"
                   icon="search"
                   @click="handlePageSearch">搜索
        </el-button>
      </div>
    </template>
  </LXFormFrame>
</template>

<script lang="ts" setup>
import { defineProps, PropType, ref, defineEmits } from 'vue'
import LXFormFrame from 'common/form'
import type { IFormFrame } from "common/form"
import emitter from '@/utils/bus'

// 用于生成表单的配置数据
const {searchConfig} = defineProps({
  searchConfig: {
    type: Object as PropType<IFormFrame>,
    required: true,
  },
})

// 初始化动态绑定的表单数据（key 由配置项中表单元素的 field 字段决定）
const originalFormData = {}
const formItems = (searchConfig as IFormFrame).formItems
for (const formItem of formItems)
  originalFormData[formItem.field] = ''
const formData = ref(originalFormData)

const emits = defineEmits(['resetBtnClick', 'searchBtnClick'])

// 重置表单数据
const handleClearFormData = () => formData.value = originalFormData

const handlePageSearch = () => {
  // 通知父组件根据搜索条件请求接口数据
  emits('searchBtnClick', formData.value)
}
</script>

<style lang="scss" scoped>
#page-search {
  padding-bottom: 10px;

  .high-search {
    text-align: center;
  }

  .form-frame {
    margin-top: 20px;
    padding: 0 20px;
  }

  .search-button {
    display: flex;
    justify-content: right;
    padding-right: 30px;
  }
}
</style>