<!-- main 页面菜单导航组件 -->
<template>
  <div id="main-nav-menu">
    <!--  头部标题部分  -->
    <div class="header">
      <img src="~assets/img/logo.svg" alt="logo" class="logo">
      <span class="title">Vue3+Ts</span>
    </div>

    <!--  菜单导航部分  -->
    <MainNav/>
  </div>
</template>

<script lang="ts" setup>
import MainNav from './MainNav'
</script>

<style lang="scss" scoped>
#main-nav-menu {
  .header {
    display: flex;
    align-items: center;
    padding: 10px 0;
    height: 28px;

    > * {
      margin-left: 20px;
    }

    >:first-child{
      position: relative;
      left: -2.5px;
    }

    .logo {
      height: 100%;
    }

    .title {
      color: white;
    }
  }
}
</style>