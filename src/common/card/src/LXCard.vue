<!--  基础的卡片组件  -->
<template>
  <div id="lx-card">
    <el-card>
      <template #header>
        <div class="card-header"><span>{{ title }}</span></div>
      </template>
      
      <div class="item">
        <slot></slot>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: () => '',
  },
})
</script>

<style lang="scss" scoped>
#lx-card {
  .box-card {
    &:deep(.el-card__header) {
      padding: 10px 20px !important;
    }
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
  }

  .item {
    margin-bottom: 10px;
  }
}
</style>