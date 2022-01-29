<!-- 登录界面 -->
<template>
  <div id="login">
    <LoginContent/>
  </div>
</template>

<script lang="ts" setup>
import LoginContent from './child-cpns/LoginContent'
</script>

<style lang="scss" scoped>
#login {
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("../../assets/img/login-bg.svg");

  width: 100%;
  height: 100%;
}
</style>