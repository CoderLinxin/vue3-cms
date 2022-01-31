<!-- main 页面菜单导航栏 -->
<template>
  <div id="main-nav">
    <el-menu class="el-menu"
             background-color="#0c2135"
             text-color="#dae0e5"
             :default-active="defaultActive"
             active-text-color="#fff"
             :collapse="isFold">
      <template v-for="(menu,index) in userMenus" :key="menu.id">
        <!--  一级菜单  -->
        <template v-if="menu.type === 1">
          <el-sub-menu class="el-sub-menu"
                       :index="menu.id+''">
            <!--  二级菜单标题部分  -->
            <template #title>
              <div class="sub-menu-title">
                <el-icon>
                  <component :is="Icons[index]"></component>
                </el-icon>
                <span>{{ menu.name }}</span>
              </div>
            </template>
            <!--  二级菜单  -->
            <el-menu-item v-for="menuItem in menu.children"
                          :key="menuItem.id"
                          :index="menuItem.id+''"
                          class="el-menu-item"
                          @click="handlePageNav(menuItem)">
              {{ menuItem.name }}
            </el-menu-item>
          </el-sub-menu>
        </template>
        <!--  （顶级菜单就是二级菜单的情况）  -->
        <template v-else-if="menu.type === 2">
          <el-menu-item class="el-menu-item"
                        :index="menu.id+''"
                        @click="handlePageNav(menu)">
            {{ menu.name }}
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from "vue-router"
import { useStore } from "../../../store"
import { computed, inject, ref } from "vue"
import { Child, Child2, IUserMenu, UserMenusType } from "../../../service/login/types"
import { ShoppingCartFull, Management, Monitor, ChatLineSquare } from "@element-plus/icons-vue"
import { getMenuWithPath } from "../../../utils/map-menu"

const store = useStore()
const router = useRouter()
const userMenus = computed<UserMenusType>(() => store.state.login.userMenus)
const isFold = inject<boolean>('isFold', false)
const route = useRoute()
const currentMenu = getMenuWithPath(userMenus.value, route.path)
const defaultActive = ref(currentMenu.id + '') // 根据当前路由对应的菜单id设置默认激活的导航栏

// 一些随机图标
const Icons = [ShoppingCartFull, Management, Monitor, ChatLineSquare]

// 导航到对应页面
const handlePageNav = (menuItem: IUserMenu | Child | Child2) => {
  router.push({
    path: menuItem.url ?? '/page-not-found',
  })
}
</script>

<style lang="scss" scoped>
#main-nav {
  .el-menu {
    border-right: none;
  }

  .sub-menu-title {
    display: flex;
    align-items: center;
    color: #f6f6f6;

    > :last-child {
      margin-left: 20px;
    }
  }

  .el-menu-item {
    padding-left: 70px !important;
  }

  :deep(.el-menu-item:hover) {
    color: #fff !important;
    background-color: #0a52a1 !important;
  }

  :deep(.is-active) {
    background-color: #0a52a1 !important;
  }
}
</style>