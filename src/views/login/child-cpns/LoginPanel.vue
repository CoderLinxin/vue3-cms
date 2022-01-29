<!-- 登录面板 -->
<template>
  <div id="login-panel">
    <h2 class="title">后台管理系统</h2>
    <!--  登录界面  -->
    <el-tabs type="border-card"
             :stretch="true">
      <el-tab-pane>
        <template #label>
          <span class="tab"><el-icon><user-filled/></el-icon> 账号登录</span>
        </template>
        <LoginAccount ref="accountRef"/>
      </el-tab-pane>

      <el-tab-pane>
        <template #label>
          <span class="tab"><el-icon><iphone/></el-icon> 手机登录</span>
        </template>
        <LoginPhone/>
      </el-tab-pane>
    </el-tabs>

    <!--  记住密码  -->
    <div class="operate">
      <el-checkbox v-model="isKeepCode">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <!--  登录按钮  -->
    <el-button class="login"
               type="primary"
               @click="handleLoginClick">
      立即登录
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { IAccountExposeType } from "../config/account-config"
import LoginAccount from './LoginAccount'
import LoginPhone from './LoginPhone'

const isKeepCode = ref(true) // 是否记住密码
const accountRef = ref<IAccountExposeType>() // 拿到组件对象

const handleLoginClick = () => {
  accountRef.value.loginAction(isKeepCode.value)
}
</script>

<style lang="scss" scoped>
#login-panel {
  width: 320px;

  .title {
    text-align: center;
  }

  .tab {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .operate {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
  }

  .login {
    width: 100%;
    font-size: 18px;
    height: 40px;
  }
}
</style>