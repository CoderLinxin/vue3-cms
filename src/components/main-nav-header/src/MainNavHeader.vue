<!--  主页顶部组件  -->
<template>
  <div id="main-nav-header">
    <!--  左边抽屉图标  -->
    <el-icon @click="handleFoldClick" class="drawer">
      <expand v-if="!isFold"/>
      <fold v-else/>
    </el-icon>

    <!--  右边部分  -->
    <div class="header-content">
      <!--   面包屑   -->
      <div class="crumbs">
        <Breadcrumb :crumb-props="crumbProps"/>
      </div>

      <!--  用户管理部分  -->
      <div class="user-admin">
        <!--   功能提示按钮   -->
        <div class="icons">
          <el-icon class="icon">
            <ChatDotRound/>
          </el-icon>
          <el-icon class="icon">
            <Bell/>
          </el-icon>
          <el-icon class="icon">
            <CollectionTag/>
          </el-icon>
        </div>

        <!--   用户信息(下拉)面板   -->
        <HeaderUserInfo class="user-info"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HeaderUserInfo from './HeaderUserInfo'
import { computed, defineEmits, inject, ref } from "vue"
import Breadcrumb, { ICrumbType } from "common/breadcrumb"
import { useStore } from "vuex"
import { useRoute } from "vue-router"
import { getCrumbPropsWithCurrentPath } from '@/utils/map-menu'
import { UserMenusType } from "service/login/types"

// 计算当前菜单路径
const crumbProps = computed<ICrumbType[]>(() => {
  const route = useRoute()
  const store = useStore() // route 改变时计算属性会重新计算
  return getCrumbPropsWithCurrentPath(
    store.state.login.userMenus as any as UserMenusType,
    route.path,
  )
})

const emit = defineEmits()
// 通知父组件切换菜单折叠
const handleFoldClick = () => {
  emit('foldChange')
}

const isFold = inject<boolean>('isFold', false)
</script>

<style lang="scss" scoped>
#main-nav-header {
  display: flex;
  align-items: center;
  width: 100%;

  .drawer {
    font-size: 30px;
    cursor: pointer;
  }

  .header-content {
    display: flex;
    flex-grow: 1;
    justify-content: space-between;

    .crumbs {
      display: flex;
      align-items: center;
      margin-left: 10px;
    }

    .user-admin {
      display: flex;
      align-items: center;
      margin-right: 20px;

      .icons {
        display: flex;
        align-items: center;

        > * {
          font-size: 20px;
          margin: 0 7px;
          cursor: pointer;
        }
      }

      .user-info {
        position: relative;
        top: 2px;
      }
    }
  }
}
</style>