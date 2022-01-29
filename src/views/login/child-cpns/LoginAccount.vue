<!-- 账号密码登录面板 -->
<template>
  <div id="login-account">
    <el-form label-width="70px" :model="account"
             :rules="rules" ref="formRef">
      <el-form-item label="账号" prop="username">
        <el-input v-model="account.username"/>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, defineExpose, ref } from "vue"
import { ElForm } from "element-plus/lib/components"
import { useStore } from 'vuex'

import { rules } from "../config/account-config"
import type { IAccountExposeType } from "../config/account-config"
import localCache from "../../../utils/cache"

const store = useStore()

// 用户名/密码
const account = reactive({
  username: localCache.getCache('username') ?? '',
  password: localCache.getCache('password') ?? '',
})

// 拿到 el-form
const formRef = ref<InstanceType<typeof ElForm>>()

// 暴露数据给父组件
defineExpose<IAccountExposeType>({
  // 用户登录
  loginAction(isKeepCode) {
    // valid 表示是否通过所有验证
    // obj 包含了没有通过验证的字段
    formRef.value.validate((valid, obj) => {
      if (valid) {
        // 是否保存密码
        isKeepCode
          // 设置缓存
          ? (localCache.setCache('username', account.username),
            localCache.setCache('password', account.password))
          // 清除密码缓存
          : (localCache.deleteCache('username'),
            localCache.deleteCache('password'))
  
        // 发送登录请求
        store.dispatch('login/accountLoginAction', {...account})
      }
    })
  },
})
</script>

<style lang="scss" scoped>
#login-account {
}
</style>