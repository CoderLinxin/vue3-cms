<!-- 手机验证码登录面板 -->
<template>
  <div id="login-phone">
    <el-form label-width="70px" :model="phone" :rules="rules">
      <el-form-item label="手机号" prop="phoneNum">
        <el-input v-model.number="phone.phoneNum"/>
      </el-form-item>

      <el-form-item label="验证码" prop="verifyCode">
        <div class="verify-code">
          <el-input v-model="phone.verifyCode"/>
          <el-button type="primary" class="get-verify-code">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { rules } from "../config/phone-config"

const phone = reactive({
  phoneNum: '',
  verifyCode: '',
})
</script>

<style lang="scss" scoped>
#login-phone {
  
  .verify-code{
    display: flex;
    align-items: center;
    
    .get-verify-code{
      margin-left: 10px;
    }
  }
}
</style>