<!--  用户管理面板  -->
<template>
  <div id="header-user-info">
    <div class="user-info">
      <el-dropdown>
          <span class="el-dropdown-link">
            <el-avatar :size="30" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"/>
            <span>{{ userInfo.name }}</span>
          </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleExitClick">退出登录</el-dropdown-item>
            <el-dropdown-item divided>用户信息</el-dropdown-item>
            <el-dropdown-item>系统管理</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue"
import { useStore } from "vuex"
import localCache from "@/utils/cache"
import { useRouter } from "vue-router"

const store = useStore()
const userInfo = computed(() => store.state.login.userInfo)

const router = useRouter()
// 退出登录按钮的点击
const handleExitClick = () => {
  localCache.deleteCache('token') // 清除 token
  router.push('/main') // 进行路由跳转（缺少 token 会跳转到登录页）
}
</script>

<style lang="scss" scoped>
#header-user-info {
  .el-dropdown-link {
    display: flex;
    align-items: center;
    user-select: none;

    > :first-child {
      margin: 0 15px;
    }
  }
}
</style>