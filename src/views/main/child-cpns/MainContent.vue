<template>
  <div id="main-content">
    <el-container class="main-content">
      <!--  左边菜单导航  -->
      <el-aside :width="getNavWidth"
                class="main-aside">
        <MainNavMenu/>
      </el-aside>

      <!--  右边内容  -->
      <el-container>
        <!--  顶部 header 部分  -->
        <el-header class="main-header">
          <MainNavHeader @fold-change="handleFoldChange"/>
        </el-header>

        <!--   中部内容部分  -->
        <el-main class="main">
          <div class="main-content">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref, provide, readonly, computed } from "vue"
import MainNavMenu from 'components/main-nav-menu'
import MainNavHeader from 'components/main-nav-header'

const isFold = ref(false)
const getNavWidth = computed(() => !isFold.value ? '210px' : '60px') // 切换折叠菜单时更新导航宽度

// 切换菜单折叠
const handleFoldChange = () => {
  isFold.value = !isFold.value
}
provide('isFold', readonly(isFold))
</script>

<style lang="scss" scoped>
#main-content {
  .main-content {
  }

  .main-aside {
    background-color: #001529;
    overflow: hidden;
    transition: width 300ms ease-out;
  }

  .main-header {
    display: flex;
    align-items: center;
    height: 48px;
    color: #333;
  }

  .main {
    display: flex;
    justify-content: center;
    background-color: #f0f2f5;
    
    .main-content{
      width: 100%;
      border-radius: 10px;
      background-color: white;
    }
  }
}
</style>